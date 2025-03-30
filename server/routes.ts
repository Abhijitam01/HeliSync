import type { Express, Request as ExpressRequest, Response } from "express";
import { NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processWebhookEvent, createHeliusWebhook, deleteHeliusWebhook } from "./helius";
import admin from "firebase-admin";
import { insertUserSchema, insertCredentialsSchema, insertPreferencesSchema, loginUserSchema } from "@shared/schema";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";

// For password hashing
const scryptAsync = promisify(scrypt);

// JWT Secret (Should be an environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "helisync-secret-key";
const JWT_EXPIRES_IN = "7d";

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${derivedKey.toString("hex")}.${salt}`;
}

// Helper function to verify passwords
async function verifyPassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split(".");
  const derivedKey = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  const keyBuffer = Buffer.from(hashedPassword, "hex");
  return timingSafeEqual(derivedKey, keyBuffer);
}

// Define custom request type with authenticated property for routes that verify tokens
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    uid: string;
    [key: string]: any;
  };
}

// Define standard request type with optional user property
interface Request extends ExpressRequest {
  user?: {
    uid: string;
    [key: string]: any;
  };
}

// Define JWT user type
interface JWTUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Type guard to check if a request is authenticated
function isAuthenticated(req: Request): req is AuthenticatedRequest {
  return req.user !== undefined;
}

// JWT Auth Middleware
const verifyJwtToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split('Bearer ')[1];
  
  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }
  
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JWTUser;
    req.user = { 
      uid: decodedToken.id.toString(),
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Firebase Auth Middleware
const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Direct database authentication routes
  app.post('/api/auth/signup', async (req: Request, res: Response) => {
    try {
      const { username, email, password, displayName } = req.body;
      
      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
      }
      
      // Check if user already exists
      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(password);
      
      // Create new user
      const newUser = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        displayName: displayName || username,
        role: 'user',
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: newUser.id, 
          username: newUser.username, 
          email: newUser.email, 
          role: newUser.role 
        }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      // Update last login time
      await storage.updateLastLogin(newUser.id);
      
      // Return user data and token
      res.status(201).json({
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          displayName: newUser.displayName,
          role: newUser.role,
        },
        token
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  });
  
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Verify password
      if (!user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      const isPasswordValid = await verifyPassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      // Update last login time
      await storage.updateLastLogin(user.id);
      
      // Return user data and token
      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
        token
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Failed to login user' });
    }
  });
  
  // Logout endpoint
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    // In a stateful session system, we would clear session here
    // For JWT, the client is responsible for removing the token from storage
    
    // Return success response
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
  
  // Firebase authentication routes (keep for backward compatibility)
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { userId, email, displayName, photoURL } = req.body;
      
      // Generate a random username for Firebase users
      const username = `user_${Math.random().toString(36).substring(2, 10)}`;
      
      // Check if user already exists
      const existingUser = await storage.getUserByFirebaseId(userId);
      if (existingUser) {
        return res.status(200).json(existingUser);
      }
      
      // Create new user
      const newUser = await storage.createUser({
        firebaseId: userId,
        username,
        email,
        displayName: displayName || null,
        photoURL: photoURL || null,
      });
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  });
  
  // Create an admin user for testing if none exists
  const createDemoUsers = async () => {
    try {
      // Check if admin user exists
      const adminExists = await storage.getUserByUsername("admin");
      if (!adminExists) {
        const hashedPassword = await hashPassword("admin123");
        await storage.createUser({
          username: "admin",
          email: "admin@helisync.com",
          password: hashedPassword,
          displayName: "Admin User",
          role: "admin",
        });
        console.log("Created demo admin user");
      }
      
      // Check if regular user exists
      const userExists = await storage.getUserByUsername("user");
      if (!userExists) {
        const hashedPassword = await hashPassword("user123");
        await storage.createUser({
          username: "user",
          email: "user@helisync.com",
          password: hashedPassword,
          displayName: "Demo User",
          role: "user",
        });
        console.log("Created demo regular user");
      }
    } catch (error) {
      console.error("Error creating demo users:", error);
    }
  };
  
  // Create demo users
  createDemoUsers();
  
  // Protected routes with JWT Auth
  app.use('/api/user', verifyJwtToken);
  app.use('/api/database', verifyJwtToken);
  app.use('/api/indexing', verifyJwtToken);
  app.use('/api/webhook', verifyJwtToken);
  
  // User routes
  app.get('/api/user/profile', async (req: Request, res: Response) => {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Check if we have a user ID from JWT
      if (req.user.id) {
        const user = await storage.getUser(req.user.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        // Get user's database credentials and preferences
        const credentials = await storage.getCredentials(user.id);
        const preferences = await storage.getPreferences(user.id);
        
        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: user.role,
          credentials,
          preferences
        });
      } 
      // Fallback to uid if no explicit id
      else if (req.user.uid) {
        // Try first with the uid as the user id (for JWT tokens)
        let user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        // Get user's database credentials and preferences
        const credentials = await storage.getCredentials(user.id);
        const preferences = await storage.getPreferences(user.id);
        
        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: user.role,
          credentials,
          preferences
        });
      } else {
        return res.status(404).json({ message: 'User ID not found in token' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  });
  
  // Database credentials routes
  app.post('/api/database/credentials', async (req: Request, res: Response) => {
    try {
      const parsedCredentials = insertCredentialsSchema.safeParse(req.body);
      
      if (!parsedCredentials.success) {
        return res.status(400).json({ message: 'Invalid credentials data', errors: parsedCredentials.error });
      }
      
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Try to get user by ID first (for JWT) then by Firebase ID as fallback
      let user;
      if (req.user.id) {
        user = await storage.getUser(req.user.id);
      } else if (req.user.uid) {
        // Try with the uid as the user id (for JWT tokens)
        user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
      }
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if user already has credentials
      const existingCredentials = await storage.getCredentials(user.id);
      if (existingCredentials) {
        // Update existing credentials
        const updatedCredentials = await storage.updateCredentials(
          existingCredentials.id,
          { ...parsedCredentials.data, userId: user.id }
        );
        return res.status(200).json(updatedCredentials);
      }
      
      // Create new credentials
      const newCredentials = await storage.saveCredentials({
        ...parsedCredentials.data,
        userId: user.id
      });
      
      res.status(201).json(newCredentials);
    } catch (error) {
      console.error('Error saving database credentials:', error);
      res.status(500).json({ message: 'Failed to save database credentials' });
    }
  });
  
  app.post('/api/database/validate', async (req: Request, res: Response) => {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Try to get user by ID first (for JWT) then by Firebase ID as fallback
      let user;
      if (req.user.id) {
        user = await storage.getUser(req.user.id);
      } else if (req.user.uid) {
        // Try with the uid as the user id (for JWT tokens)
        user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
      }
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const credentials = await storage.getCredentials(user.id);
      if (!credentials) {
        return res.status(404).json({ message: 'Database credentials not found' });
      }
      
      // In a real implementation, you would test the connection here
      // For now we'll simulate validation
      const updatedCredentials = await storage.updateCredentials(
        credentials.id,
        { isValidated: true }
      );
      
      res.status(200).json({ success: true, credentials: updatedCredentials });
    } catch (error) {
      console.error('Error validating database connection:', error);
      res.status(500).json({ message: 'Failed to validate database connection' });
    }
  });
  
  // Indexing preferences routes
  app.post('/api/indexing/preferences', async (req: Request, res: Response) => {
    try {
      const parsedPreferences = insertPreferencesSchema.safeParse(req.body);
      
      if (!parsedPreferences.success) {
        return res.status(400).json({ message: 'Invalid preferences data', errors: parsedPreferences.error });
      }
      
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Try to get user by ID first (for JWT) then by Firebase ID as fallback
      let user;
      if (req.user.id) {
        user = await storage.getUser(req.user.id);
      } else if (req.user.uid) {
        // Try with the uid as the user id (for JWT tokens)
        user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
      }
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if user already has preferences
      const existingPreferences = await storage.getPreferences(user.id);
      if (existingPreferences) {
        // Update existing preferences
        const updatedPreferences = await storage.updatePreferences(
          existingPreferences.id,
          { ...parsedPreferences.data, userId: user.id }
        );
        return res.status(200).json(updatedPreferences);
      }
      
      // Create new preferences
      const newPreferences = await storage.savePreferences({
        ...parsedPreferences.data,
        userId: user.id
      });
      
      res.status(201).json(newPreferences);
    } catch (error) {
      console.error('Error saving indexing preferences:', error);
      res.status(500).json({ message: 'Failed to save indexing preferences' });
    }
  });
  
  // Webhook logs routes
  app.get('/api/webhook/logs', async (req: Request, res: Response) => {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Try to get user by ID first (for JWT) then by Firebase ID as fallback
      let user;
      if (req.user.id) {
        user = await storage.getUser(req.user.id);
      } else if (req.user.uid) {
        // Try with the uid as the user id (for JWT tokens)
        user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
      }
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;
      const logs = await storage.getLogsForUser(user.id, limit);
      
      res.status(200).json(logs);
    } catch (error) {
      console.error('Error fetching webhook logs:', error);
      res.status(500).json({ message: 'Failed to fetch webhook logs' });
    }
  });
  
  // Helius webhook routes
  app.post('/api/webhook/register', async (req: Request, res: Response) => {
    try {
      const { webhookUrl } = req.body;
      
      if (!webhookUrl) {
        return res.status(400).json({ message: 'Webhook URL is required' });
      }
      
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Try to get user by ID first (for JWT) then by Firebase ID as fallback
      let user;
      if (req.user.id) {
        user = await storage.getUser(req.user.id);
      } else if (req.user.uid) {
        // Try with the uid as the user id (for JWT tokens)
        user = await storage.getUser(parseInt(req.user.uid));
        
        // If not found, try with Firebase ID
        if (!user) {
          user = await storage.getUserByFirebaseId(req.user.uid);
        }
      }
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const webhookData = await createHeliusWebhook(user.id, webhookUrl);
      
      res.status(201).json(webhookData);
    } catch (error) {
      console.error('Error registering webhook:', error);
      res.status(500).json({ message: 'Failed to register webhook' });
    }
  });
  
  app.delete('/api/webhook/:webhookId', async (req: Request, res: Response) => {
    try {
      const { webhookId } = req.params;
      
      await deleteHeliusWebhook(webhookId);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting webhook:', error);
      res.status(500).json({ message: 'Failed to delete webhook' });
    }
  });
  
  // Webhook endpoint for Helius
  app.post('/webhook/:userId', async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const payload = req.body;
      
      // Process the webhook event
      await processWebhookEvent(payload, parseInt(userId, 10));
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Failed to process webhook' });
    }
  });
  
  // Analytics API endpoints
  app.get('/api/analytics/summary', verifyJwtToken, async (req: Request, res: Response) => {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // For the demo, we'll return mock data
      // In a real app, this would query the database for real statistics
      const analyticsData = {
        nftBids: {
          total: 1458,
          change: 12,
          platforms: {
            magicEden: 45,
            tensor: 30,
            hadeswap: 15,
            other: 10
          }
        },
        tokenPrices: {
          total: 3275,
          change: 8,
          tokens: {
            SOL: 115.80,
            BONK: 0.00030,
            JTO: 2.50,
            PYTH: 0.55
          }
        },
        lendingEvents: {
          total: 895,
          change: 5,
          platforms: {
            solend: 50,
            mango: 42,
            drift: 26
          }
        },
        indexingStatus: {
          recordsIndexed: 5628,
          dbSize: '1.2 GB',
          avgResponseTime: '95 ms',
          webhookSuccessRate: '99.8%'
        }
      };
      
      res.status(200).json(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  });
  
  app.get('/api/analytics/historical-data', verifyJwtToken, async (req: Request, res: Response) => {
    try {
      if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const { metric, timeframe } = req.query;
      
      // Generate dates for the requested timeframe
      const days = timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 7;
      const data = [];
      
      const today = new Date();
      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        
        if (metric === 'nft-bids') {
          // Generate random NFT bid data
          data.unshift({
            date: formattedDate,
            magicEden: Math.floor(40 + Math.random() * 50),
            tensor: Math.floor(25 + Math.random() * 40),
            other: Math.floor(8 + Math.random() * 20)
          });
        } else if (metric === 'token-prices') {
          // Generate random token price data
          data.unshift({
            date: formattedDate,
            SOL: (100 + Math.random() * 20).toFixed(2),
            BONK: (0.0002 + Math.random() * 0.0001).toFixed(6),
            JTO: (2.3 + Math.random() * 0.3).toFixed(2),
            PYTH: (0.4 + Math.random() * 0.2).toFixed(2)
          });
        } else if (metric === 'lending') {
          // Generate random borrowable token data
          data.unshift({
            date: formattedDate,
            solend: Math.floor(30 + Math.random() * 25),
            mango: Math.floor(25 + Math.random() * 20),
            drift: Math.floor(12 + Math.random() * 15)
          });
        } else {
          // Default to NFT bid data if no valid metric provided
          data.unshift({
            date: formattedDate,
            magicEden: Math.floor(40 + Math.random() * 50),
            tensor: Math.floor(25 + Math.random() * 40),
            other: Math.floor(8 + Math.random() * 20)
          });
        }
      }
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      res.status(500).json({ message: 'Failed to fetch historical data' });
    }
  });

  return httpServer;
}

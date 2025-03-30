import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import supertest from 'supertest';
import express from 'express';
import { registerRoutes } from '../../server/routes';

// Mock the storage functions
vi.mock('../../server/storage', () => ({
  storage: {
    getUserByUsername: vi.fn(),
    getUserByEmail: vi.fn(),
    createUser: vi.fn(),
    updateLastLogin: vi.fn(),
    getCredentials: vi.fn(),
    saveCredentials: vi.fn(),
    updateCredentials: vi.fn(),
    getPreferences: vi.fn(),
    savePreferences: vi.fn(),
    updatePreferences: vi.fn(),
    getLogsForUser: vi.fn(),
    createLog: vi.fn(),
  },
}));

// Mock the Helius functions
vi.mock('../../server/helius', () => ({
  createHeliusWebhook: vi.fn(),
  deleteHeliusWebhook: vi.fn(),
  processWebhookEvent: vi.fn(),
}));

// Mock jwt
vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(() => 'mock-token'),
  verify: vi.fn((token, secret, callback) => {
    if (token === 'valid-token') {
      callback(null, { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' });
    } else {
      callback(new Error('Invalid token'));
    }
  }),
}));

describe('API Integration Tests', () => {
  let app;
  let request;

  beforeEach(async () => {
    // Create a new express app for each test
    app = express();
    app.use(express.json());
    
    // Register routes to the app
    await registerRoutes(app);
    
    // Create a supertest request object
    request = supertest(app);
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Authentication Endpoints', () => {
    it('POST /api/auth/register should register a new user', async () => {
      const userData = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      };

      // Mock storage functions for registration
      vi.mocked(storage.getUserByUsername).mockResolvedValue(undefined);
      vi.mocked(storage.getUserByEmail).mockResolvedValue(undefined);
      vi.mocked(storage.createUser).mockResolvedValue({
        id: 1,
        username: userData.username,
        email: userData.email,
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      });

      const response = await request
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.username).toBe(userData.username);
      expect(storage.getUserByUsername).toHaveBeenCalledWith(userData.username);
      expect(storage.getUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(storage.createUser).toHaveBeenCalled();
    });

    it('POST /api/auth/login should login an existing user', async () => {
      const loginData = {
        username: 'testuser',
        password: 'password123',
      };

      // Mock storage functions for login
      vi.mocked(storage.getUserByUsername).mockResolvedValue({
        id: 1,
        username: loginData.username,
        email: 'test@example.com',
        password: 'hashed_password', // This would be a properly hashed password in reality
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      });
      vi.mocked(storage.updateLastLogin).mockResolvedValue();

      // Mock verifyPassword to return true
      const verifyPassword = vi.fn().mockResolvedValue(true);
      global.verifyPassword = verifyPassword;

      const response = await request
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.username).toBe(loginData.username);
      expect(storage.getUserByUsername).toHaveBeenCalledWith(loginData.username);
      expect(storage.updateLastLogin).toHaveBeenCalled();
    });
  });

  describe('Database Credentials Endpoints', () => {
    it('POST /api/database/credentials should save credentials', async () => {
      const credentialsData = {
        hostname: 'db.example.com',
        port: '5432',
        username: 'postgres',
        password: 'password123',
        databaseName: 'heliusdata',
      };

      // Mock middleware to verify JWT
      app.use((req, res, next) => {
        req.user = { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' };
        next();
      });

      // Mock storage functions
      vi.mocked(storage.saveCredentials).mockResolvedValue({
        id: 1,
        userId: 1,
        ...credentialsData,
        isValidated: false,
        createdAt: new Date()
      });

      const response = await request
        .post('/api/database/credentials')
        .set('Authorization', 'Bearer valid-token')
        .send(credentialsData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.hostname).toBe(credentialsData.hostname);
      expect(storage.saveCredentials).toHaveBeenCalled();
    });

    it('POST /api/database/validate should validate credentials', async () => {
      const credentialsData = {
        id: 1,
        hostname: 'db.example.com',
        port: '5432',
        username: 'postgres',
        password: 'password123',
        databaseName: 'heliusdata',
      };

      // Mock middleware to verify JWT
      app.use((req, res, next) => {
        req.user = { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' };
        next();
      });

      // Mock storage functions
      vi.mocked(storage.getCredentials).mockResolvedValue({
        id: 1,
        userId: 1,
        ...credentialsData,
        isValidated: false,
        createdAt: new Date()
      });
      
      vi.mocked(storage.updateCredentials).mockResolvedValue({
        id: 1,
        userId: 1,
        ...credentialsData,
        isValidated: true,
        createdAt: new Date()
      });

      // Mock database connection validation
      const pg = require('pg');
      pg.Client = class {
        connect() { return Promise.resolve(); }
        end() { return Promise.resolve(); }
      };

      const response = await request
        .post('/api/database/validate')
        .set('Authorization', 'Bearer valid-token')
        .send({ id: 1 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.credentials.isValidated).toBe(true);
      expect(storage.getCredentials).toHaveBeenCalled();
      expect(storage.updateCredentials).toHaveBeenCalled();
    });
  });

  describe('Indexing Preferences Endpoints', () => {
    it('POST /api/indexing/preferences should save preferences', async () => {
      const preferencesData = {
        nftBids: true,
        tokenPrices: true,
        borrowableTokens: false,
      };

      // Mock middleware to verify JWT
      app.use((req, res, next) => {
        req.user = { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' };
        next();
      });

      // Mock storage functions
      vi.mocked(storage.savePreferences).mockResolvedValue({
        id: 1,
        userId: 1,
        ...preferencesData,
        createdAt: new Date()
      });

      // Mock Helius webhook creation
      vi.mocked(createHeliusWebhook).mockResolvedValue({ id: 'webhook-id' });

      const response = await request
        .post('/api/indexing/preferences')
        .set('Authorization', 'Bearer valid-token')
        .send(preferencesData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nftBids).toBe(preferencesData.nftBids);
      expect(storage.savePreferences).toHaveBeenCalled();
      expect(createHeliusWebhook).toHaveBeenCalled();
    });
  });

  describe('Webhook Logs Endpoints', () => {
    it('GET /api/webhook/logs should retrieve logs', async () => {
      // Mock middleware to verify JWT
      app.use((req, res, next) => {
        req.user = { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' };
        next();
      });

      // Mock storage functions
      vi.mocked(storage.getLogsForUser).mockResolvedValue([
        {
          id: 1,
          userId: 1,
          message: 'Test log 1',
          type: 'info',
          timestamp: new Date().toISOString(),
          createdAt: new Date()
        },
        {
          id: 2,
          userId: 1,
          message: 'Test log 2',
          type: 'success',
          timestamp: new Date().toISOString(),
          createdAt: new Date()
        }
      ]);

      const response = await request
        .get('/api/webhook/logs')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(storage.getLogsForUser).toHaveBeenCalledWith(1, undefined);
    });

    it('POST /webhook/:userId should process webhook events', async () => {
      const webhookPayload = {
        accountData: [{ /* mock account data */ }],
        events: [{ /* mock events */ }],
        slot: 12345,
        blockTime: Date.now()
      };

      // Mock processWebhookEvent
      vi.mocked(processWebhookEvent).mockResolvedValue({ success: true });

      const response = await request
        .post('/webhook/1')
        .send(webhookPayload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(processWebhookEvent).toHaveBeenCalledWith(webhookPayload, 1);
    });
  });
});
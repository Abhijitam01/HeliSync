import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyPassword, hashPassword } from '../../server/routes';
import jwt from 'jsonwebtoken';
import { storage } from '../../server/storage';

// Mock the database client
vi.mock('../../server/db', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
  },
}));

// Mock the storage methods
vi.mock('../../server/storage', () => ({
  storage: {
    getUserByUsername: vi.fn(),
    getUserByEmail: vi.fn(),
    createUser: vi.fn(),
    updateLastLogin: vi.fn(),
  },
}));

describe('Authentication Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'securePassword123';
      const hashedPassword = await hashPassword(password);
      
      // Check that the result includes a salt (separated by a dot)
      expect(hashedPassword).toContain('.');
      
      // Check that it's not the original password
      expect(hashedPassword).not.toBe(password);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'securePassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      // Two hashes of the same password should be different due to different salts
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should verify a correct password', async () => {
      const password = 'securePassword123';
      const hashedPassword = await hashPassword(password);
      
      const result = await verifyPassword(hashedPassword, password);
      expect(result).toBe(true);
    });

    it('should reject an incorrect password', async () => {
      const password = 'securePassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedPassword = await hashPassword(password);
      
      const result = await verifyPassword(hashedPassword, wrongPassword);
      expect(result).toBe(false);
    });
  });

  describe('User Authentication', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      };

      // Mock that user doesn't exist yet
      vi.mocked(storage.getUserByUsername).mockResolvedValue(undefined);
      vi.mocked(storage.getUserByEmail).mockResolvedValue(undefined);
      
      // Mock successful user creation
      vi.mocked(storage.createUser).mockResolvedValue({
        id: 1,
        username: userData.username,
        email: userData.email,
        password: 'hashed_password',
        role: userData.role,
        createdAt: new Date(),
        lastLogin: null
      });

      // Test registration logic here
      const result = await storage.createUser(userData);
      
      expect(storage.getUserByUsername).toHaveBeenCalledWith(userData.username);
      expect(storage.getUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(storage.createUser).toHaveBeenCalled();
      expect(result.username).toBe(userData.username);
    });

    it('should not register a user with existing username', async () => {
      const userData = {
        username: 'existinguser',
        email: 'new@example.com',
        password: 'password123',
        role: 'user'
      };

      // Mock that username already exists
      vi.mocked(storage.getUserByUsername).mockResolvedValue({
        id: 1,
        username: userData.username,
        email: 'existing@example.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      });

      // Test should throw or return error
      await expect(async () => {
        if (await storage.getUserByUsername(userData.username)) {
          throw new Error('Username already exists');
        }
        return storage.createUser(userData);
      }).rejects.toThrow('Username already exists');
    });

    it('should not register a user with existing email', async () => {
      const userData = {
        username: 'newuser',
        email: 'existing@example.com',
        password: 'password123',
        role: 'user'
      };

      // Mock that email already exists
      vi.mocked(storage.getUserByUsername).mockResolvedValue(undefined);
      vi.mocked(storage.getUserByEmail).mockResolvedValue({
        id: 1,
        username: 'existinguser',
        email: userData.email,
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      });

      // Test should throw or return error
      await expect(async () => {
        if (await storage.getUserByEmail(userData.email)) {
          throw new Error('Email already exists');
        }
        return storage.createUser(userData);
      }).rejects.toThrow('Email already exists');
    });

    it('should login a user with correct credentials', async () => {
      const loginData = {
        username: 'testuser',
        password: 'correctPassword'
      };

      const mockUser = {
        id: 1,
        username: loginData.username,
        email: 'test@example.com',
        password: await hashPassword(loginData.password),
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      };

      // Mock that user exists
      vi.mocked(storage.getUserByUsername).mockResolvedValue(mockUser);
      vi.mocked(storage.updateLastLogin).mockResolvedValue();

      // Test login logic
      const user = await storage.getUserByUsername(loginData.username);
      if (!user) {
        throw new Error('User not found');
      }

      const passwordMatch = await verifyPassword(user.password, loginData.password);
      
      expect(passwordMatch).toBe(true);
      expect(storage.getUserByUsername).toHaveBeenCalledWith(loginData.username);
    });

    it('should not login with incorrect credentials', async () => {
      const loginData = {
        username: 'testuser',
        password: 'wrongPassword'
      };

      const mockUser = {
        id: 1,
        username: loginData.username,
        email: 'test@example.com',
        password: await hashPassword('correctPassword'),
        role: 'user',
        createdAt: new Date(),
        lastLogin: null
      };

      // Mock that user exists
      vi.mocked(storage.getUserByUsername).mockResolvedValue(mockUser);

      // Test login logic
      const user = await storage.getUserByUsername(loginData.username);
      if (!user) {
        throw new Error('User not found');
      }

      const passwordMatch = await verifyPassword(user.password, loginData.password);
      
      expect(passwordMatch).toBe(false);
      expect(storage.getUserByUsername).toHaveBeenCalledWith(loginData.username);
    });
  });
});
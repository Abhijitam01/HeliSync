import {
  users,
  databaseCredentials,
  indexingPreferences,
  webhookLogs,
  type User,
  type InsertUser,
  type DatabaseCredentials,
  type InsertCredentials,
  type IndexingPreferences,
  type InsertPreferences,
  type WebhookLog,
  type InsertWebhookLog,
} from "@shared/schema";

import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseId(firebaseId: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateLastLogin(userId: number): Promise<void>;
  
  // Database credentials operations
  getCredentials(userId: number): Promise<DatabaseCredentials | undefined>;
  saveCredentials(credentials: InsertCredentials): Promise<DatabaseCredentials>;
  updateCredentials(id: number, credentials: Partial<InsertCredentials>): Promise<DatabaseCredentials | undefined>;
  
  // Indexing preferences operations
  getPreferences(userId: number): Promise<IndexingPreferences | undefined>;
  savePreferences(preferences: InsertPreferences): Promise<IndexingPreferences>;
  updatePreferences(id: number, preferences: Partial<InsertPreferences>): Promise<IndexingPreferences | undefined>;
  
  // Webhook logs operations
  getLogsForUser(userId: number, limit?: number): Promise<WebhookLog[]>;
  createLog(log: InsertWebhookLog): Promise<WebhookLog>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByFirebaseId(firebaseId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseId, firebaseId));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateLastLogin(userId: number): Promise<void> {
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, userId));
  }

  // Database credentials operations
  async getCredentials(userId: number): Promise<DatabaseCredentials | undefined> {
    const [credentials] = await db
      .select()
      .from(databaseCredentials)
      .where(eq(databaseCredentials.userId, userId));
    return credentials;
  }

  async saveCredentials(insertCredentials: InsertCredentials): Promise<DatabaseCredentials> {
    const [credentials] = await db
      .insert(databaseCredentials)
      .values(insertCredentials)
      .returning();
    return credentials;
  }

  async updateCredentials(
    id: number,
    updateData: Partial<InsertCredentials>
  ): Promise<DatabaseCredentials | undefined> {
    const [updated] = await db
      .update(databaseCredentials)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(databaseCredentials.id, id))
      .returning();
    return updated;
  }

  // Indexing preferences operations
  async getPreferences(userId: number): Promise<IndexingPreferences | undefined> {
    const [preferences] = await db
      .select()
      .from(indexingPreferences)
      .where(eq(indexingPreferences.userId, userId));
    return preferences;
  }

  async savePreferences(insertPreferences: InsertPreferences): Promise<IndexingPreferences> {
    const [preferences] = await db
      .insert(indexingPreferences)
      .values(insertPreferences)
      .returning();
    return preferences;
  }

  async updatePreferences(
    id: number,
    updateData: Partial<InsertPreferences>
  ): Promise<IndexingPreferences | undefined> {
    const [updated] = await db
      .update(indexingPreferences)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(indexingPreferences.id, id))
      .returning();
    return updated;
  }

  // Webhook logs operations
  async getLogsForUser(userId: number, limit = 100): Promise<WebhookLog[]> {
    return db
      .select()
      .from(webhookLogs)
      .where(eq(webhookLogs.userId, userId))
      .orderBy(webhookLogs.timestamp)
      .limit(limit);
  }

  async createLog(insertLog: InsertWebhookLog): Promise<WebhookLog> {
    const [log] = await db.insert(webhookLogs).values(insertLog).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();

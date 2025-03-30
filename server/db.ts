import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

// Use the provided Neon DB URL
const DATABASE_URL = "postgresql://neondb_owner:npg_qJ20Wegjdipy@ep-blue-haze-a5yh2gob-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require";

// Configure postgres.js client
const queryClient = postgres(DATABASE_URL, {
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Idle connection timeout in seconds
  connect_timeout: 10, // Connection timeout in seconds
});

export const db = drizzle(queryClient, { schema });

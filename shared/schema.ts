import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const conversions = pgTable("conversions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  originalFormat: text("original_format").notNull(),
  targetFormat: text("target_format").notNull(),
  settings: json("settings"),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversionSchema = createInsertSchema(conversions).pick({
  fileName: true,
  originalFormat: true,
  targetFormat: true,
  settings: true,
});

export const conversionSettingsSchema = z.object({
  outputFormat: z.string(),
  quality: z.enum(['high', 'medium', 'low']),
  noiseReduction: z.boolean().default(false),
  autoCompression: z.boolean().default(false),
  ocr: z.boolean().default(false),
  transcription: z.boolean().default(false),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConversion = z.infer<typeof insertConversionSchema>;
export type Conversion = typeof conversions.$inferSelect;
export type ConversionSettings = z.infer<typeof conversionSettingsSchema>;

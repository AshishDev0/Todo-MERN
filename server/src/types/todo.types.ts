import { z } from "zod";

// schema for validation
export const todoSchema = z.object({
  name: z.string().min(3, "Todo must be at least 3 characters long"),
  description: z.string().min(1, "Description is required"),
  completed: z.boolean().optional().default(false),
  dueDate: z.string().optional().default(() => new Date().toISOString()),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

// type inference from schema
export type TodoInput = z.infer<typeof todoSchema>;

// Interface for the mongodb document
export interface ITodo {
  name: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

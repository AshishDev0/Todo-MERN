import mongoose, { Schema, Document } from "mongoose";
import { TodoInput } from "../types/todo.types";

export interface ITodo extends Document {
  name: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      set: function (v: string | Date) {
        if (!v) return undefined;
        try {
          return new Date(v);
        } catch (error) {
          console.error("Error converting date:", error);
          return undefined;
        }
      },
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be either low, medium, or high",
      },
      default: "medium",
      set: function (v: string): "low" | "medium" | "high" {
        if (!v) return "medium";
        const normalized = v.toLowerCase();
        if (
          normalized === "low" ||
          normalized === "medium" ||
          normalized === "high"
        ) {
          return normalized;
        }
        return "medium";
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add a pre-save middleware to ensure data is properly formatted
todoSchema.pre("save", function (next) {
  // console.log("Pre-save middleware - Current document:", this.toObject());
  if (this.priority) {
    this.priority = this.priority.toLowerCase() as "low" | "medium" | "high";
  }
  if (this.dueDate) {
    try {
      this.dueDate = new Date(this.dueDate);
    } catch (error) {
      console.error("Error converting date in pre-save:", error);
    }
  }
  next();
});

// Add a pre-update middleware
todoSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;
  // console.log("Pre-update middleware - Update object:", update);
  if (update?.priority) {
    const normalized = update.priority.toLowerCase();
    if (
      normalized === "low" ||
      normalized === "medium" ||
      normalized === "high"
    ) {
      update.priority = normalized;
    }
  }
  if (update?.dueDate) {
    try {
      update.dueDate = new Date(update.dueDate);
    } catch (error) {
      console.error("Error converting date in pre-update:", error);
    }
  }
  next();
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);

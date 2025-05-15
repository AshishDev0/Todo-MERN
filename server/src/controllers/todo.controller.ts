import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo.model";
import { AppError } from "../types/error.types";
import { todoSchema } from "../types/todo.types";

// Create todo
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body against schema
    const validatedData = todoSchema.parse(req.body);

    const { name, description, dueDate, priority } = validatedData;

    const todo = await Todo.create({
      name,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
    });

    // console.log("Created todo:", todo);

    res.status(201).json(todo);
    return;
  } catch (error: any) {
    console.error("Error creating todo:", error);
    if (error.name === "ZodError") {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }

    res.status(400).json({ message: error.message });
    return;
  }
};

// Read all todos
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get a particular todo
export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return next(new AppError(404, "Todo not found"));

    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// Update a particular todo
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Validate request body against schema
    const validatedData = todoSchema.partial().parse(req.body);

    const { name, description, completed, dueDate, priority } = validatedData;

    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        name,
        description,
        completed,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // console.log("Updated todo:", todo);
    res.json(todo);
  } catch (error: any) {
    console.error("Error updating todo:", error);
    if (error.name === "ZodError") {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a particular todo
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

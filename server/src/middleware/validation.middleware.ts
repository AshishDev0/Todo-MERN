import { Request, Response, NextFunction } from "express";
import { todoSchema } from "../types/todo.types";

export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = todoSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    next(error);
  }
};

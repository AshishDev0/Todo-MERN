import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/error.types";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: err.errors[0].message,
    });
  }

  console.error("Error", err);
  return res.status(500).json({
    status: "error",
    message: "Interval Servor Error",
  });
};

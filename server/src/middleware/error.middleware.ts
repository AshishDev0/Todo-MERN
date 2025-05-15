import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../types/error.types";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: err.errors[0].message,
    });
    return;
  }

  console.error("Error", err);
  res.status(500).json({
    status: "error",
    message: "Interval Servor Error",
  });
};

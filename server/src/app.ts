import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";
import { AppError } from "./types/error.types";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todos", todoRoutes);

app.use((req, res, next) => {
  next(new AppError(404, "Route not found"));
});

app.use(errorHandler as express.ErrorRequestHandler);

export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";
import { AppError } from "./types/error.types";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/todos", todoRoutes);

app.use((req, res, next) => {
  next(new AppError(404, "Route not found"));
});

// app.use(errorHandler)

export default app;

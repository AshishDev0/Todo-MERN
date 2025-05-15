import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { validateTodo } from "../middleware/validation.middleware";

const router = Router();

router.post("/", validateTodo, createTodo);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.put("/:id", validateTodo, updateTodo);
router.delete("/:id", deleteTodo);

export default router;

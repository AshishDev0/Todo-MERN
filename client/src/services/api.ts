import axios from "axios";
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
} from "../types/todo.types";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get("/todos");
    // console.log("API Response:", response.data);
    return response.data;
  },

  getOne: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: CreateTodoInput): Promise<Todo> => {
    // console.log("Creating todo with data:", todo);
    const response = await api.post("/todos", {
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString() : undefined,
    });
    // console.log("Create todo response:", response.data);
    return response.data;
  },

  update: async (id: string, todo: UpdateTodoInput): Promise<Todo> => {
    // console.log("Updating todo with data:", todo);
    const response = await api.put(`/todos/${id}`, {
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString() : undefined,
    });
    // console.log("Update todo response:", response.data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

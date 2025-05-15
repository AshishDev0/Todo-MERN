import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  TodoState,
  CreateTodoInput,
  UpdateTodoInput,
} from "../types/todo.types";
import { todoApi } from "../services/api";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchAll", async () => {
  try {
    const response = await todoApi.getAll();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});

export const createTodo = createAsyncThunk(
  "todos/create",
  async (todo: CreateTodoInput) => {
    return await todoApi.create(todo);
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, data }: { id: string; data: UpdateTodoInput }) => {
    return await todoApi.update(id, data);
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    await todoApi.delete(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
        state.todos = [];
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;

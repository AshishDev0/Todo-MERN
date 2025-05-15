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
  const response = await todoApi.getAll();
  // console.log("Todos fetched in thunk:", response);
  return response;
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
        // console.log("Fetch todos pending...");
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        // console.log("Fetch todos fulfilled:", action.payload);
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        // console.log("Fetch todos rejected:", action.error);
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
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

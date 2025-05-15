export type Priority = "low" | "medium" | "high";

export interface Todo {
  _id: string;
  name: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  name: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
}

export interface UpdateTodoInput {
  name?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: Priority;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

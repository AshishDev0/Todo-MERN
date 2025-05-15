import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTodos } from "../../store/todoSlice";
import { TodoItem } from "./TodoItem";
import { AddTodoDialog } from "./AddTodoDialog";
import { Loader2 } from "lucide-react";

export function TodoList() {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todos);

  useEffect(() => {
    // console.log("Fetching todos...");
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    // console.log("Current todos state:", { todos, loading, error });
  }, [todos, loading, error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-destructive mb-2">Error loading tasks</div>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Tasks</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {todos?.length || 0} {todos?.length === 1 ? "task" : "tasks"}
          </p>
        </div>
        <AddTodoDialog />
      </div>

      <div className="space-y-3">
        {!todos || todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No tasks yet</div>
            <p className="text-sm text-muted-foreground">
              Add your first task to get started
            </p>
          </div>
        ) : (
          todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        )}
      </div>
    </div>
  );
}

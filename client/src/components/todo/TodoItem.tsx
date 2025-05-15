import { useState } from "react";
import type { Todo } from "../../types/todo.types";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Calendar, Trash2, Pencil, Clock } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateTodo, deleteTodo } from "../../store/todoSlice";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AddTodoDialog } from "./AddTodoDialog";

interface TodoItemProps {
  todo: Todo;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [_, setIsEditDialogOpen] = useState(false);

  const handleToggle = () => {
    const newStatus = !todo.completed;
    toast.promise(
      dispatch(
        updateTodo({
          id: todo._id,
          data: { ...todo, completed: newStatus },
        })
      ),
      {
        loading: newStatus
          ? "Marking as completed..."
          : "Marking as incomplete...",
        success: newStatus ? "Task completed!" : "Task marked as incomplete",
        error: "Failed to update task status",
      }
    );
  };

  const handleDelete = () => {
    toast.promise(dispatch(deleteTodo(todo._id)), {
      loading: "Deleting task...",
      success: "Task deleted successfully",
      error: "Failed to delete task",
    });
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="h-4 w-4 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              "text-base font-medium",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.name}
          </span>
          {todo.description && (
            <span
              className={cn(
                "text-sm text-muted-foreground truncate",
                todo.completed && "line-through"
              )}
            >
              {todo.description}
            </span>
          )}
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge
              variant="secondary"
              className={cn(
                "px-2 py-0.5 text-xs font-medium",
                priorityColors[todo.priority]
              )}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </Badge>
            {todo.dueDate && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-3 w-3" />
                      {format(new Date(todo.dueDate), "MMM d, yyyy")}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Due on {format(new Date(todo.dueDate), "MMM d, yyyy")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {format(new Date(todo.createdAt), "MMM d, yyyy")}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Created on {format(new Date(todo.createdAt), "MMM d, yyyy")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <AddTodoDialog
          todo={todo}
          isEdit={true}
          onOpenChange={setIsEditDialogOpen}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

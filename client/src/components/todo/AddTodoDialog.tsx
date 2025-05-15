import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createTodo, updateTodo } from "../../store/todoSlice";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import type { Todo } from "../../types/todo.types";

interface AddTodoDialogProps {
  todo?: Todo;
  isEdit?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
}

export function AddTodoDialog({
  todo,
  isEdit = false,
  onOpenChange,
  trigger,
}: AddTodoDialogProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  useEffect(() => {
    if (todo && isEdit) {
      setName(todo.name);
      setDescription(todo.description || "");
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : new Date());
      setPriority(todo.priority);
    }
  }, [todo, isEdit]);

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Task name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Task name must be at least 3 characters long";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const todoData = {
      name: name.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString(),
      priority,
    };

    const toastId = toast.loading(
      isEdit ? "Updating task..." : "Creating task..."
    );

    try {
      if (isEdit && todo) {
        await dispatch(updateTodo({ id: todo._id, data: todoData })).unwrap();
        toast.success("Task updated successfully!", {
          id: toastId,
        });
      } else {
        await dispatch(createTodo(todoData)).unwrap();
        toast.success("Task created successfully!", {
          id: toastId,
        });
      }

      // Reset form
      setName("");
      setDescription("");
      setDueDate(new Date());
      setPriority("medium");
      setErrors({});
      setOpen(false);
      onOpenChange?.(false);
    } catch (error) {
      toast.error(isEdit ? "Failed to update task" : "Failed to create task", {
        id: toastId,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen) {
      // Reset form when dialog is closed
      setName("");
      setDescription("");
      setDueDate(new Date());
      setPriority("medium");
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="">{isEdit ? "Edit Todo" : "Add Todo"}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Todo" : "Add New Todo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter todo name"
              className={cn(errors.name && "border-red-500")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className={cn(errors.description && "border-red-500")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 flex-1">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setPriority(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Update Todo" : "Add Todo"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

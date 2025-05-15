import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createTodo } from "../../store/todoSlice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

const todoSchema = z.object({
  name: z.string().min(1, "Todo name is required"),
  description: z.string(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export function TodoForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TodoFormData) => {
    dispatch(createTodo(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        {...register("name")}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit">
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </form>
  );
}

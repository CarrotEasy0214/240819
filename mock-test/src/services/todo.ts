import Todo from "../models/Todo";

export const add = async (title: string) => {
  if (title?.length) {
    const todo = await Todo.create({ title });
    return todo;
  } else {
    throw new Error("plz input title");
  }
};

export const getList = async () => {
  const todos = await Todo.findAll();
  return todos;
};

export const patchTodo = async ({ id, title, isCompleted }: { id: number; title?: string; isCompleted?: boolean }) => {
  try {
    const todo = await Todo.findByPk(id);
    if (todo === null) throw new Error("not found todo item");
    if (title !== undefined) todo.title = title;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;
    await todo.save();
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  const todo = await Todo.findByPk(id);
  if (todo === null) throw new Error("not found todo item");
  await todo.destroy();
  return await Todo.findAll();
};

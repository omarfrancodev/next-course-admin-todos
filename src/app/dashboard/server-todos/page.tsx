import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos";


export const metadata = {
    title: 'Server Listado de Todos',
    description: 'Listado de Todos',
};

export default async function ServerTodosPage() {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'asc' } });

    return (
        <div>
            <span className="text-2xl font-semibold">Server Actions</span>
            <div className="w-full px-5 mx-5 my-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}
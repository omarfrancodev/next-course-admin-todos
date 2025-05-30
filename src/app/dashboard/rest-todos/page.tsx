export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos";


export const metadata = {
    title: 'Listado de Todos',
    description: 'Listado de Todos',
};

export default async function RestTodosPage() {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'asc' } });

    return (
        <div>
            <span className="text-2xl font-semibold">Rest Todos</span>
            <div className="w-full px-5 mx-5 my-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}
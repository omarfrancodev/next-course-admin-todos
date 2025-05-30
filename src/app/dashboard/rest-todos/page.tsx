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
            <div className="w-full px-5 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}
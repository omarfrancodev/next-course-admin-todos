export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'Server Listado de Todos',
    description: 'Listado de Todos',
};

export default async function ServerTodosPage() {
    const user = await getUserSession();

    if (!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'asc' } });

    return (
        <div>
            <span className="text-2xl font-semibold">Server Actions</span>
            <div className="w-full px-5 mx-5 my-5">
                <NewTodo userId={user.id as string} />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}
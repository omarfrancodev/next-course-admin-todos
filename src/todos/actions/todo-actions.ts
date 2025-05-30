"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000));

export const toggleTodo = async (path: string, id: string, complete: boolean): Promise<Todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) throw new Error(`Todo with id ${id} not found`);

    const updatedTodo = await prisma.todo.update({ where: { id: id }, data: { complete: complete } });

    revalidatePath(path)
    return updatedTodo;
}

export const addTodo = async (description: string) => {
    try {
        const todo = await prisma.todo.create({ data: { description } });
        revalidatePath("/dashboard/server-todos")
        return todo;
    } catch {
        return {
            message: "Error creating todo",
        };
    }
}

export const deleteCompleted = async () => {

    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath("/dashboard/server-todos")
}

export const fillTodos = async () => {
    await prisma.todo.deleteMany();

    for (const data of [
        { description: "Piedra del Alma", complete: true },
        { description: "Piedra del Tiempo" },
        { description: "Piedra del Poder" },
        { description: "Piedra del Realidad" },
        { description: "Piedra del Mente" },
        { description: "Piedra del Espacio" },
    ]) {
        await prisma.todo.create({ data });
    }
    revalidatePath("/dashboard/server-todos")
}
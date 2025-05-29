import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { boolean, object, string } from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async (id: string) => await prisma.todo.findFirst({ where: { id } });


export async function GET(request: Request, { params }: Segments) {
    const { id } = await params
    const todo = await getTodo(id);

    if (!todo) return NextResponse.json({ message: `Todo with id ${id} not found` }, { status: 404 });

    return NextResponse.json(todo, { status: 200 });
}

const putSchema = object({
    description: string().optional(),
    complete: boolean().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
    const { id } = await params;
    const todo = await getTodo(id);

    if (!todo) return NextResponse.json({ message: `Todo with id ${id} not found` }, { status: 404 });
    try {

        const { description, complete } = await putSchema.validate(await req.json());
        const updatedTodo = await prisma.todo.update({ where: { id: id }, data: { description, complete } });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
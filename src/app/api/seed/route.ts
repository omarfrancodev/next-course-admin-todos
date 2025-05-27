import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Todo } from '../../../generated/prisma/index';

export async function GET() {
    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: "Piedra del Alma", complete: true },
            { description: "Piedra del Tiempo" },
            { description: "Piedra del Poder" },
            { description: "Piedra del Realidad" },
            { description: "Piedra del Mente" },
            { description: "Piedra del Espacio" },
        ]
    })


    return NextResponse.json({ message: 'Seed executed successfully' }, { status: 200 });
}
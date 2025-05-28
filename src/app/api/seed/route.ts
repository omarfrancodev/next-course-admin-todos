import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
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

    return NextResponse.json({ message: 'Seed executed successfully' }, { status: 200 });
}
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'

export async function GET() {
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            name: "test1",
            email: "test1@gmail.com",
            password: bcrypt.hashSync("123456", 10),
            roles: ['user', 'admin', 'super-user'],
            todos: {
                create: [
                    { description: "Piedra del Alma", complete: true },
                    { description: "Piedra del Tiempo" },
                    { description: "Piedra del Poder" },
                    { description: "Piedra del Realidad" },
                    { description: "Piedra del Mente" },
                    { description: "Piedra del Espacio" },
                ]
            }
        }
    })

    // for (const data of [
    //     { description: "Piedra del Alma", complete: true },
    //     { description: "Piedra del Tiempo" },
    //     { description: "Piedra del Poder" },
    //     { description: "Piedra del Realidad" },
    //     { description: "Piedra del Mente" },
    //     { description: "Piedra del Espacio" },
    // ]) {
    //     await prisma.todo.create({ data });
    // }

    return NextResponse.json({ message: 'Seed executed successfully' }, { status: 200 });
}
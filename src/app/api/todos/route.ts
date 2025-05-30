import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { boolean, object, string } from 'yup';

interface CustomPaginationResponse {
    metadata: {
        total: number,
        limit: number,
        offset: number,
    },
    links: {
        self: string,
        prev: string | null,
        next: string | null,
    },
    data: object[]
}

const generateCustomPaginationResponse = (
    data: object[], total: number, limit: number, offset: number, origin: string, pathname: string): CustomPaginationResponse => {
    return {
        metadata: {
            total,
            limit,
            offset,
        },
        links: {
            self: `${origin}${pathname}?limit=${limit}&offset=${offset}`,
            prev: (offset - limit < 0) ? null : `${origin}${pathname}?limit=${limit}&offset=${offset - limit}`,
            next: (offset + limit >= total) ? null : `${origin}${pathname}?limit=${limit}&offset=${offset + limit}`,
        },
        data
    }
}

export async function GET(request: Request) {
    const { searchParams, origin, pathname } = new URL(request.url);
    let limit = Number(searchParams.get('limit') ?? '10');
    let offset = Number(searchParams.get('offset') ?? '0');

    if (isNaN(Number(limit)) || isNaN(Number(offset))) {
        return NextResponse.json({ message: 'Limit and offset must be numbers' }, { status: 400 });
    }

    if (limit <= 0) limit = 10;
    if (offset < 0) offset = 0;

    const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset,
    });

    const totalTodos = await prisma.todo.count();
    const response: CustomPaginationResponse = generateCustomPaginationResponse(todos, totalTodos, limit, offset, origin, pathname);

    return NextResponse.json(response, { status: 200 });
}

const postSchema = object({
    description: string().required(),
    complete: boolean().optional().default(false),
});

export async function POST(req: Request) {
    try {

        const { description, complete } = await postSchema.validate(await req.json());

        const todo = await prisma.todo.create({ data: { description, complete } });

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE() {
    await prisma.todo.deleteMany({ where: { complete: true } });

    return NextResponse.json({ message: 'Todos deleted successfully' }, { status: 200 });
}
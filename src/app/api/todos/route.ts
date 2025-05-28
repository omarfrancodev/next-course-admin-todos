import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface CustomResponse {
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

    const self = `${origin}${pathname}?limit=${limit}&offset=${offset}`;
    const prev = (offset - limit < 0) ? null : `${origin}${pathname}?limit=${limit}&offset=${offset - limit}`;
    const next = (offset + limit >= totalTodos) ? null : `${origin}${pathname}?limit=${limit}&offset=${offset + limit}`;

    const response: CustomResponse = {
        metadata: {
            total: totalTodos,
            limit: limit,
            offset: offset,
        },
        links: {
            self: self,
            prev: prev,
            next: next,
        },
        data: todos
    }

    return NextResponse.json(response, { status: 200 });
}
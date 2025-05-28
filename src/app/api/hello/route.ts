import { NextResponse, NextRequest } from 'next/server'

export async function GET() {
    return NextResponse.json(
        { message: 'Hello World' },
        { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function POST(req: Request) {
    const { title } = await req.json();

    return NextResponse.json({ data: { title } }, { status: 201 });
}
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    return new Response(JSON.stringify({
        message: 'Hello World'
    }), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function POST(req: Request) {
    const { title } = await req.json();

    return NextResponse.json({ data: { title } }, { status: 201 });
}
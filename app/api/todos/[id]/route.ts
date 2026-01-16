import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!todo || todo.userId !== parseInt((session.user as any).id)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, importance, checked } = await request.json();

        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!todo || todo.userId !== parseInt((session.user as any).id)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                title: title !== undefined ? title : todo.title,
                importance: importance !== undefined ? importance : todo.importance,
                checked: checked !== undefined ? checked : todo.checked,
            },
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!todo || todo.userId !== parseInt((session.user as any).id)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        await prisma.todo.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

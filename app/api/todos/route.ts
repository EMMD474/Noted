import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const todos = await prisma.todo.findMany({
            where: { userId: parseInt((session.user as any).id) },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(todos);
    } catch (error) {
        console.error("Fetch todos error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, importance } = await request.json();

        if (!title) {
            return NextResponse.json({ message: "Title is required" }, { status: 400 });
        }

        const todo = await prisma.todo.create({
            data: {
                title,
                importance: importance || "normal",
                checked: false,
                userId: parseInt((session.user as any).id),
            },
        });

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Create todo error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

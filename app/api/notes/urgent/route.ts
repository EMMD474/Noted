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
        const pendingTodos = await prisma.note.findMany({
            where: { userId: parseInt((session.user as any).id), importance: "urgent" },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(pendingTodos);
    } catch (error) {
        console.error("Fetch pending todos error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
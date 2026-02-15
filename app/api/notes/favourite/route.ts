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
        const favouriteNotes = await prisma.note.findMany({
            where: { userId: parseInt((session.user as any).id), favourite: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(favouriteNotes);
    } catch (error) {
        console.error("Fetch favourite notes error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
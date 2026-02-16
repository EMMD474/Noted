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
        const note = await prisma.note.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!note || note.userId !== parseInt((session.user as any).id)) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 });
        }

        return NextResponse.json(note);
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
        const { title, content, importance, favourite } = await request.json();

        const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
        });

        const currentUserId = parseInt((session.user as any).id);

        if (!note || note.userId !== currentUserId) {
            console.warn("Update Error: Note not found or user mismatch", {
                noteId: id,
                noteUserId: note?.userId,
                currentUserId
            });
            return NextResponse.json({ message: "Note not found" }, { status: 404 });
        }

        const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: {
                title: title !== undefined ? title : note.title,
                content: content !== undefined ? content : note.content,
                importance: importance !== undefined ? importance : note.importance,
                favourite: favourite !== undefined ? favourite : note.favourite,
            },
        });

        return NextResponse.json(updatedNote);
    } catch (error) {
        console.error("PUT Note update error:", error);
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
        const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
        });

        if (!note || note.userId !== parseInt((session.user as any).id)) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 });
        }

        await prisma.note.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

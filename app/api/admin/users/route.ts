import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getAdminDashboardData, isAdminSessionUser } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!isAdminSessionUser(session.user)) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const data = await getAdminDashboardData();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Fetch admin dashboard error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type SessionLikeUser = {
    email?: string | null;
    role?: UserRole | null;
    isAdmin?: boolean | null;
};

const getAdminEmails = () =>
    (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

export const isAdminSessionUser = (user?: SessionLikeUser | null) => {
    if (!user) {
        return false;
    }

    if (user.isAdmin) {
        return true;
    }

    if (user.role === UserRole.ADMIN) {
        return true;
    }

    if (!user.email) {
        return false;
    }

    return getAdminEmails().includes(user.email.toLowerCase());
};

export const getAdminDashboardData = async () => {
    const [totalUsers, totalNotes, totalTodos, verifiedUsers, pendingTodos, users] = await Promise.all([
        prisma.user.count(),
        prisma.note.count(),
        prisma.todo.count(),
        prisma.user.count({
            where: {
                emailVerified: {
                    not: null,
                },
            },
        }),
        prisma.todo.count({
            where: {
                checked: false,
            },
        }),
        prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                emailVerified: true,
                _count: {
                    select: {
                        notes: true,
                        todos: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
    ]);

    const usersWithCounts = users.map((user) => ({
        ...user,
        noteCount: user._count.notes,
        todoCount: user._count.todos,
        totalItems: user._count.notes + user._count.todos,
    }));

    const mostActiveUsers = [...usersWithCounts]
        .sort((left, right) => {
            if (right.totalItems === left.totalItems) {
                return right.createdAt.getTime() - left.createdAt.getTime();
            }

            return right.totalItems - left.totalItems;
        })
        .slice(0, 5);

    return {
        stats: {
            totalUsers,
            totalNotes,
            totalTodos,
            verifiedUsers,
            pendingTodos,
            adminUsers: users.filter((user) => user.role === UserRole.ADMIN).length,
        },
        recentUsers: usersWithCounts.slice(0, 5),
        mostActiveUsers,
        users: usersWithCounts,
    };
};

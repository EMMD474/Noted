import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { isAdminSessionUser } from "@/lib/admin";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password && (await verifyPassword(credentials.password, user.password))) {
                    return {
                        id: user.id,
                        name: user.username ?? user.email,
                        email: user.email,
                        role: user.role,
                    };
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            const jwtToken = token as JWT & { id?: string; role?: UserRole };
            if (user) {
                jwtToken.id = user.id;
                jwtToken.role = (user as { role?: UserRole }).role;
            }

            if ((!jwtToken.id || !jwtToken.role) && token.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                    select: { id: true, role: true },
                });

                if (dbUser) {
                    jwtToken.id = dbUser.id;
                    jwtToken.role = dbUser.role;
                }
            }

            if (!jwtToken.id && token.sub) {
                jwtToken.id = token.sub;
            }

            return jwtToken;
        },
        async session({ session, token }) {
            if (session.user) {
                const sessionUser = session.user as typeof session.user & {
                    id?: string;
                    role?: UserRole;
                    isAdmin?: boolean;
                };
                const sessionToken = token as JWT & { id?: string; role?: UserRole };

                sessionUser.id = sessionToken.id;
                sessionUser.role = sessionToken.role;
                sessionUser.isAdmin = isAdminSessionUser({
                    email: session.user.email,
                    role: sessionToken.role,
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

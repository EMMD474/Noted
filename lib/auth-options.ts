import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
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
                        id: String(user.id),
                        name: user.username ?? user.email,
                        email: user.email,
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
            const jwtToken = token as JWT & { id?: string };
            if (user) {
                jwtToken.id = user.id;
            }
            if (!jwtToken.id && token.sub) {
                jwtToken.id = token.sub;
            }
            return jwtToken;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as typeof session.user & { id?: string }).id = (token as JWT & { id?: string }).id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

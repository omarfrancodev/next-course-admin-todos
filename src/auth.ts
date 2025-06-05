import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import async from './app/dashboard/page';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        GitHub,
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn() {
            return true;
        },
        async jwt({ token }) {
            if (!token.email) return token;
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email ?? "no-email",
                },
            })

            token.roles = dbUser?.roles ?? [];
            token.id = dbUser?.id ?? "no-id";

            return token;
        },
        async session({ token, session }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }

            return session;
        },
    }
})
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { signInEmailPassword } from "./auth/actions/auth-actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        GitHub,
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials) => {
                const user = await signInEmailPassword(credentials?.email as string, credentials?.password as string);

                if (!user) return null

                // return user object with their profile data
                return user
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn() {
            return true;
        },
        async jwt({ token }) {
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
"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { User } from "next-auth";


export const signInAction = async () => signIn()

export const signInWithGithub = async () => {
    await signIn("github")
}

export const signOutAction = async () => {
    await signOut()
}

export const signInEmailPassword = async (email: string, password: string) => {
    if (!email || !password) return null;

    const user = await prisma.user.findUnique({ where: { email: email, } })

    if (!user) {
        // return null
        const newUser = await createUser(email, password);
        return newUser;
    }

    if (!bcrypt.compareSync(password, user.password ?? '')) return null

    return user;

}

const createUser = async (email: string, password: string) => {
    const user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password, 10),
            name: email.split("@")[0],
        }
    })

    return user;
}

export const getUserSession = async (): Promise<User | null> => {
    const session = await auth()
    return session?.user ?? null
}
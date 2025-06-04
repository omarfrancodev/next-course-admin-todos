"use client"
import { WidgetItem } from "@/components";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";


export default function ProfilePage() {
    const { data: session } = useSession()

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div>
            <WidgetItem title="Usuario conectado server side">
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Nombre: {session.user?.name}</span>
                    <span className="text-lg font-semibold">Email: {session.user?.email}</span>
                </div>
            </WidgetItem>
        </div>
    );
}
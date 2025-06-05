// "use client"
import { auth } from "@/auth";
import { WidgetItem } from "@/components";
// import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";


export default async function ProfilePage() {
    // const { data: session } = useSession()
    const session = await auth();

    // if (!session) {
    //     redirect('/api/auth/signin');
    // }

    return (
        <div>
            <WidgetItem title="Usuario conectado server side">
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Nombre: {session?.user?.name ?? 'Sin nombre'}</span>
                    <span className="text-lg font-semibold">Email: {session?.user?.email ?? 'Sin email'}</span>
                    <span className="text-lg font-semibold">Imagen: {session?.user?.image ?? 'Sin imagen'}</span>
                    <span className="text-lg font-semibold">ID: {session?.user?.id ?? 'Sin id'}</span>
                    <span className="text-lg font-semibold capitalize">Roles: {session?.user?.roles?.join(', ') ?? 'Sin roles'}</span>
                </div>
            </WidgetItem>
        </div>
    );
}
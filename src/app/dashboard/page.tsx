import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
};

export default async function DashboardPage() {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <WidgetItem title="Usuario conectado server side">
                <div className="flex flex-col gap-2 text-clip break-all">
                    <span className="text-lg font-semibold">Nombre: {session.user?.name}</span>
                    <span className="text-lg font-semibold">Email: {session.user?.email}</span>
                    <span className="text-md font-normal">Data: {JSON.stringify(session, null, 2)}</span>
                </div>
            </WidgetItem>
        </div>
    );
}
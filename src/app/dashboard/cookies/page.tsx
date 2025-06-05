import { signInWithGithub } from "@/auth/index";
import { TabBar } from "@/components";
import { SignIn } from "@/components/sign-in/sign-in";
import { cookies } from "next/headers";
import { FaGithub } from "react-icons/fa6";


export const metadata = {
    title: 'Cookies Page',
    description: 'Cookies Page',
};

export default async function CookiesPage() {
    const cookieStore = await cookies();
    const selectedTab = Number(cookieStore.get('selectedTab')?.value ?? '1');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
                <span className="text-3xl">Tabs</span>
                <TabBar currentTab={selectedTab} />
                <SignIn action={signInWithGithub}>
                    Signin with GitHub<FaGithub size={20} />
                </SignIn>
            </div>
        </div>
    );
}
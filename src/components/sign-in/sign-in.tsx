
import { signIn } from "@/auth"
import { FaGithub } from "react-icons/fa6"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button className="flex w-60 items-center px-4 py-2 bg-slate-800 hover:bg-slate-900 rounded-lg text-white justify-between cursor-pointer" type="submit">Signin with GitHub<FaGithub size={20} /></button>
        </form>
    )
} 
interface Props {
    className?: string,
    children?: React.ReactNode,
    action: () => void
}

export const SignIn = ({ className, children, action }: Props) => {
    const classNameFeatures = className || "bg-slate-800 hover:bg-slate-900 rounded-lg text-white my-2";
    return (
        <form
            action={action}
        >
            <button className={`flex w-60 items-center px-4 py-2 justify-between cursor-pointer ` + classNameFeatures} type="submit">
                {children || (<span className="flex flex-1 justify-center items-center">Sign In</span>)
                }
            </button>
        </form>
    )
} 
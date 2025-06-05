interface Props {
    className?: string,
    children?: React.ReactNode,
    action: () => void
}

export const SignOut = ({ className, children, action }: Props) => {
    const classNameFeatures = className || "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gray-100 cursor-pointer";
    return (
        <form
            action={action}
        >
            <button className={classNameFeatures} type="submit">
                {children || (<span className="flex flex-1 justify-center items-center">Sign Out</span>)
                }
            </button>
        </form>
    )
}
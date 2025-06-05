import Image from 'next/image'
import Link from 'next/link'
import { CiLogout } from 'react-icons/ci'
import { SidebarItem } from '../sidebar-item/SidebarItem'
import { MdDashboard } from 'react-icons/md'
import { IoBasketOutline, IoCheckboxOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5'
import { FaCookie } from 'react-icons/fa'
import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { SignOut } from '@/components/sign-out/sign-out'
import { signInAction, signOutAction } from '@/auth/actions/session-actions'

const navigation = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard size={30} />
    },
    {
        name: 'Rest TODOS',
        path: '/dashboard/rest-todos',
        icon: <IoCheckboxOutline size={30} />
    },
    {
        name: 'Server Actions',
        path: '/dashboard/server-todos',
        icon: <IoListOutline size={30} />
    },
    {
        name: 'Cookies',
        path: '/dashboard/cookies',
        icon: <FaCookie size={30} />
    },
    {
        name: 'Products',
        path: '/dashboard/products',
        icon: <IoBasketOutline size={30} />
    },
    {
        name: 'Profile',
        path: '/dashboard/profile',
        icon: <IoPersonOutline size={30} />
    }
]

export const Sidebar = async () => {
    const session = await auth()

    const userAvatar = session?.user?.image ?? "https://avatars.githubusercontent.com/u/31113941?v=4"
    const userName = session?.user?.name ?? ''
    const userRoles = session?.user?.roles ?? []

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="/dashboard" title="home">
                        <Image src="https://html.tailus.io/blocks/customers/openai.svg"
                            width={128}
                            height={128}
                            alt="tailus logo" />
                    </Link>
                </div>

                <div className="mt-8 text-center">

                    <Image src={userAvatar}
                        width={40}
                        height={40}
                        alt={userName}
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
                </div>

                <div className="space-y-2 tracking-wide mt-8">
                    {navigation.map((item, index) => (
                        <SidebarItem
                            key={index}
                            path={item.path}
                            title={item.name}
                            icon={item.icon}
                        />
                    ))}

                </div>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                {session != null
                    ? (
                        <SignOut action={signOutAction}>
                            <CiLogout />
                            <span className="group-hover:text-gray-700">Logout</span>
                        </SignOut>
                    )
                    : (
                        <SignOut action={signInAction}>
                            <CiLogout />
                            <span className="group-hover:text-gray-700">Login</span>
                        </SignOut>
                    )}

            </div>
        </aside >
    )
}

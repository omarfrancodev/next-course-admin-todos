"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./SidebarItem.module.css"
import React from "react";

interface Props {
    path: string,
    title: string,
    icon: React.ReactNode
}


export const SidebarItem = ({ path: route, title, icon }: Props) => {
    const isActive = usePathname() === route
    return (
        <Link href={route} className={`group ${isActive ? style["active-link"] : style.link}`}>
            {icon}
            <span className={`group-hover:underline ${isActive ? style["active-title"] : ""}`}>{title}</span>
        </Link >
    )
}

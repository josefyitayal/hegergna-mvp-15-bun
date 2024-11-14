"use client"

import { Box, ChartLine, Home, Plus, Store, User, WalletCards } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { usePathname } from "next/navigation"

const sidebarData = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: Box,
        label: "Products",
        href: `/products`,
        subMenu: [
            {
                label: "Add Product",
                href: `/products/add`
            },
            {
                label: "Discounts",
                href: `/products/Discounts`,
            },
            {
                label: "Collections",
                href: `/products/Collections`,
            }
        ]
    },
    {
        icon: WalletCards,
        label: "Orders",
        href: `/Orders`,
    },
    {
        icon: User,
        label: "Customers",
        href: `/Customers`,
    },
    {
        icon: ChartLine,
        label: "Analytics",
        href: `/Analytics`,
    }
]

function SidebarD({ userId }) {
    const pathName = usePathname()
    const currentPath = pathName.replace(`/dashboard/${userId}`, "")
    console.log(currentPath)
    const [selected, setSelected] = useState(currentPath)
    const [subMenu, setSubMenu] = useState("")
    return (
        <div className="w-[300px] flex flex-col p-3 h-[calc(100vh-57px)] border-r">
            {sidebarData.map((item, index) => (
                <div key={index}>
                    <Button variant={`${currentPath === item.href ? "default" : "ghost"}`} className={`w-full justify-start gap-2 h-10`} onClick={() => { setSelected(item.label); setSubMenu(item.subMenu ? true : false) }}>
                        <Link href={`/dashboard/${userId}${item.href}`} className="w-full flex items-center gap-2 text-lg">
                            <item.icon />
                            <p>{item.label}</p>
                        </Link>
                    </Button>
                    {item.subMenu?.length > 0 && item.label === selected && (
                        <div className="pl-7">
                            {item.subMenu.map((subItem, subIndex) => (
                                <Button variant="ghost" className={`w-full justify-start gap-2 transition-all duration-300 ${subMenu === subItem.label ? "bg-gray-100" : ""}`} key={subIndex} onClick={() => { setSubMenu(subItem.label); setSelected(item.label) }}>
                                    <Link href={`/dashboard/${userId}${subItem.href}`} className="w-full flex items-center gap-2 text-lg">
                                        <p>{subItem.label}</p>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <Separator className="my-2" />
            <Button variant="ghost" className={`w-full justify-start gap-2 h-10`} >
                <Link href={`/dashboard/`} className="w-full flex items-center gap-2 text-lg">
                    <Store />
                    <p>Online Store</p>
                </Link>
            </Button>
        </div>
    )
}

export default SidebarD
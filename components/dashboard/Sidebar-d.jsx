"use client"

import { Box, ChartLine, CirclePercent, Group, Home, Store, User, WalletCards } from "lucide-react"
import { Button } from "../ui/button"
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
    },
    {
        icon: Group,
        label: "Collection",
        href: "/collections"
    },
    {
        icon: CirclePercent,
        label: "Discount",
        href: "/discounts"
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

function SidebarD({ userId, storeId }) {
    const pathName = usePathname()
    const currentPath = pathName.replace(`/dashboard/${userId}/${storeId}`, "").split("/")
    console.log(currentPath)
    return (
        <div className="w-[300px] flex flex-col p-3 h-[calc(100vh-57px)] border-r">
            {sidebarData.map((item, index) => (
                <div key={index}>
                    <Button variant={`${`/${currentPath[1]}` === item.href ? "default" : "ghost"}`} className={`w-full justify-start gap-2 h-10`}>
                        <Link href={`/dashboard/${userId}/${storeId}${item.href}`} className="w-full flex items-center gap-2 text-lg">
                            <item.icon />
                            <p>{item.label}</p>
                        </Link>
                    </Button>
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
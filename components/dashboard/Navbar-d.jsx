import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "@/lib/actions/user.action"
import { SignOutButton } from "@clerk/nextjs"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

async function NavbarD() {
    const clerkUser = await currentUser()
    if (!clerkUser) return null

    return (
        <div className="flex justify-between items-center py-2 px-10 border border-b-gray-200">
            <div>
                <Link href="/dashboard">
                    <Image src="/hegergna-logo.png" alt="logo" width={50} height={50} className="size-9"/>
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="icon"><Bell /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[300px] overflow-y-auto">
                        <div>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                            <h3 className="text-lg font-semibold w-full text-center rounded-md p-2 hover:bg-gray-100 cursor-pointer">Notifications</h3>
                        </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-md p-2 size-9 font-bold text-lg">{clerkUser.firstName[0]}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/dashboard/user">{clerkUser.emailAddresses[0].emailAddress}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/dashboard/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SignOutButton>
                                Logout
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default NavbarD
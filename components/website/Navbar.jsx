import Link from "next/link"
import { Button } from "../ui/button"
import { currentUser } from "@clerk/nextjs/server"

async function Navbar() {
    const clerkUser = await currentUser()
    const isSignedIn = clerkUser ? true : false
  return (
    <div className="flex px-10 py-3 items-center justify-between">
        <div className="flex items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold italic">HegergnaShop</h1>
            </div>
            <ul className="flex items-center gap-4">
                <li>
                    <Link href="/" className="text-lg">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="text-lg">About</Link>
                </li>
                <li>
                    <Link href="/contact" className="text-lg">Contact</Link>
                </li>
                <li>
                    <Link href="/pricing" className="text-lg">Pricing</Link>
                </li>
            </ul>
        </div>
        <div className="flex items-center gap-4">
            {isSignedIn ? (
                <>
                    <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </>
            ): (
                <>
                    <Button variant="secondary">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button>
                        <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                </>
            )}
        </div>
    </div>
  )
}

export default Navbar
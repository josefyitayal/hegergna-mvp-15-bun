import Link from "next/link"
import { Button } from "../ui/button"

function TopBanner({title, description="", href, btnText}) {
  return (
    <div className="w-full h-10 px-7 py-2 bg-primary flex justify-between items-center">
        <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-sm">{description}</p>
        </div>
        <div>
            <Button asChild>
                <Link href={href}>{btnText}</Link>
            </Button>
        </div>
    </div>
  )
}

export default TopBanner
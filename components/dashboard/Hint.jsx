import { CircleHelp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export function Hint({description}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="icon" className="p-0 m-0 h-fit"><CircleHelp className=""/></Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <p>{description}</p>
            </HoverCardContent>
        </HoverCard>
    )
}

"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"


function BackButton() {
    const router = useRouter()
    return (
        <Button variant="icon" onClick={() => router.back()}>
            <ArrowLeft />
        </Button>
    )
}

export default BackButton
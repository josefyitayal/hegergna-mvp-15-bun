import { Loader2 } from "lucide-react"

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
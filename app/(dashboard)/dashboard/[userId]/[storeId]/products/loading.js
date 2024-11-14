import { Skeleton } from "@/components/ui/skeleton"

function loading() {
  return (
    <div className="flex flex-col gap-3">
        <Skeleton className={"w-full h-14"}/>
        <Skeleton className={"w-full h-32"}/>
    </div>
  )
}

export default loading
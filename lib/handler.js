
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"

function ForToast(title="", description="", variant="default") {
  "use client"
  const { toast } = useToast()
  toast({
    variant: variant,
    title: title,
    description: description
  })
  return (
    <></>
  )
}

export function handleStatus(status) {
  switch (status) {
    case "clerkUserNotFound":
      return redirect("/auth/sign-up")
    case "userNotFound":
      return redirect("/auth/onboarding")
    case "userNotActive":
      return redirect("/auth/onboarding")
    case "userNotFinishedOnboarding":
      return redirect("/auth/onboarding")
    case "upgradeToPlus":
      return <ForToast title="Upgrade To Plus" description="Upgrade to plus for more access" />
    case "storeCreatingFailed":
      return <ForToast title="Something went wrong when creating store" />
    case "storeLimitReached":
      return <ForToast title="You reach you limit" />
    case "mediaLimitationReached":
      return <ForToast title="You reach you limit" />
    case "storeNotFound":
      return redirect("/")
  }
}
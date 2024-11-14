import { clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function handleStatus(status) {
  switch (status) {
    case "clerkUserNotFound":
      return redirect("/auth/sign-up")
    case "userNotFound":
      return redirect("/auth/onboarding")
    case "userNotActive":
      return redirect("/auth/onboarding")
    case "userFinishedOnboarding":
      return redirect("/dashboard")
    case "userNotFinishedOnboarding":
      return redirect("/auth/onboarding")
  }
}

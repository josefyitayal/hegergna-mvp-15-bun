import { clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



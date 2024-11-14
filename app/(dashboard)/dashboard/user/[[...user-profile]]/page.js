import { UserProfile } from "@clerk/nextjs"

function page() {
  return (
    <div className="flex justify-center items-center h-screen">
        <UserProfile />
    </div>
  )
}

export default page
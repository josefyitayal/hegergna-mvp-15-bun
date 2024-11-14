import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "./user.action"
import { client } from "../db"

export async function getStoreById(storeId) {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) throw new Error("clerk user not found")

        const user = await getUserByClerkId(clerkUser.id)
        if (!user) throw new Error("user not found")

        const store = await client.store.findUnique({
            where: {
                id: storeId,
                ownerId: user.id
            }
        })

        if (!store) throw new Error("store not found")

        return store
    } catch(error) {
        console.log("error occur in getStoreById function")
        throw error
    }
}
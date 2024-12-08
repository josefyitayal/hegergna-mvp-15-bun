import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "./user.action"
import { client } from "../db"
import { getPlanWithPricing } from "./dbFunctions"

export async function getStoreById(storeId) {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return {status: "clerkUserNotFound", message: "", data: null}

        const user = await getUserByClerkId(clerkUser.id)
        if (!user) return {status: "userNotFound", message: "", data: null}

        const store = await client.store.findUnique({
            where: {
                id: storeId,
                ownerId: user.id
            }
        })

        if (!store) return {status: "storeNotFound", message: "", data: null}

        return {status: "success", message: "", data: store}
    } catch (error) {
        console.log("error occur in getStoreById function")
        throw error
    }
}

/**
 * create store by user id and validate if user have permission to create store
 */
export async function createStore(userId, storeName, storePhone, storeEmail, storeDescription) {
    const clerkUser = await currentUser()
    if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }
    const user = await client.user.findUnique({
        where: {
            id: userId,
            clerkId: clerkUser.id
        },
        include: {
            subscriptions: true,
            stores: true
        }
    })
    if (!user) return { status: "userNotFound", message: "", data: null }

    const { status, data } = await getPlanWithPricing(user.subscriptions.planId, user.subscriptions.pricingId)

    if (!data) {
        return { status: status, message: "", data: null }
    }

    if (data.name === "Basic") {
        return { status: "upgradeToPlus", message: "Basic plan are not allowed to create store greater that 1. upgrade to plus to create more stores", data }
    }
    if (data.name === "Plus") {
        if (user.stores.length < 3) {
            const store = await client.stores.create({
                data: {
                    name: storeName,
                    description: storeDescription,
                    email: storeEmail,
                    phone: storePhone,
                    domain: storeName.toLowerCase().replace(/\s+/g, ''),
                },
                include: {
                    products: true,
                    collections: true
                }
            })
            if (!store) return {status: "storeCreatingFailed", message: "something went wrong", data: null}

            return {status: "success", message: "", data: store}
        }else {
            return {status: "storeLimitReached", message: "You have reached the maximum number of stores allowed for the Plus plan.", data: null}
        }
    }
}
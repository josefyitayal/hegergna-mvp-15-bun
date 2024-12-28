"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "../db"
import { collectionZodSchema } from "../zodSchemas"


export const getAllCollections = async (storeId) => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerkUser.id
            },
            include: {
                stores: {
                    where: {id: storeId},
                    include: {
                        collections: {
                            include: {
                                products: true
                            }
                        }
                    }
                }
            }
        })
        if (!user) return { status: "userNotFound", message: "", data: null }
        if (user.stores[0].collections) {
            return {status: "success", message: "", data: user.stores[0].collections}
        }else {
            return {status: "collectionNotFound", message: "", data: null}
        }
    } catch (error) {
        throw error
    }
}

export const getCollectionById = async (storeId, collectionId) => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerkUser.id
            },
            include: {
                stores: {
                    where: {id: storeId},
                    include: {
                        collections: {
                            where: {id: collectionId},
                            include: {
                                products: true
                            }
                        }
                    }
                }
            }
        })
        if (!user) return { status: "userNotFound", message: "", data: null }

        if (user.stores[0].collections) {
            return {status: "success", message: "", data: user.stores[0].collections}
        }else {
            return {status: "collectionNotFound", message: "", data: null}
        }
    }catch(error) {
        throw error
    }
}

export const createCollection = async (title, description, isActive, products, storeId) => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const validationResult = collectionZodSchema.safeParse({title, description, isActive, products})
        if(validationResult.success) {
            const collection = client.collection.create({
                data: {
                    name: title,
                    description: description,
                    isActive: isActive,
                    store: {
                        connect: {id: storeId}
                    },
                    products: {
                        connect: products.map((product) => ({ id: product.id }))
                    },
                }
            })
            if(collection) return {status: "success", message: "", data: collection}
            else {return {status: "collectionNotCreated", message: "", data: null}}
        }else {
            return {status: "validationError", message: validationResult.error, data: null}
        }
    }catch (error) {
        throw error
    }
}
"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "../db"

export async function createProduct(storeId, title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, sku, collections, variants) {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: { clerkId: clerkUser.id },
            include: {
                stores: {
                    include: {
                        products: true,
                        collections: true,
                        media: true
                    }
                }
            }
        })

        if (!user) return { status: "userNotFound", message: "", data: null }

        const correctCollections = collections ? { connect: collections.map(id => ({ id })) } : {create: []}

        const correctVariants = variants ? {
            create: variants.map((variant) => ({
                type: variant.type,
                attribute: {
                    create: variant.attributes.map((attribute) => ({
                        name: attribute.name,
                        price: parseFloat(attribute.price),
                        stock: parseFloat(attribute.stock)
                    }))
                }
            }))
        } : {create: []}
        const product = client.product.create({
            data: {
                name: title,
                description: description,
                media: images,
                price: parseFloat(price),
                comparePrice: parseFloat(comparePrice),
                profit: profit,
                cost: parseFloat(cost),
                margin: margin,
                isPublished: isPublish,
                category: category,
                stock: Number(stock),
                sku: sku,
                collection:correctCollections,
                variant: correctVariants,
                store: {
                    connect: {id: storeId}
                },
            }
        })

        if (!product) return {status: "productNotCreated", message: "", data: null}        
        return {status: "success", message: "Product successfully created", data: product}
    } catch (error) {
        throw error
    }
}


export async function getAllProduct(storeId) {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: { clerkId: clerkUser.id },
            include: {
                stores: {
                    where: {
                        id: storeId
                    },
                    include: {
                        products: true,
                    }
                }
            }
        })

        if (!user) return { status: "userNotFound", message: "", data: null }
        if (user.stores[0].products) {
            return {status: "success", message: "", data: user.stores[0].products}
        }else {
            return {status: "productNotFound", message: "", data: null}
        }
    } catch (error) {
        throw error
    }
}
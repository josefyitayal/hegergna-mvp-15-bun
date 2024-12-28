"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "../db"
import { getUserByClerkId } from "./user.action"
import axios from "axios"

export const getPlans = async () => {
    try {
        const plans = await client.plan.findMany({
            include: {
                pricing: true
            }
        })
        return JSON.parse(JSON.stringify(plans))
    } catch (error) {
        console.error("Error fetching plans:", error)
        throw error
    }
}


export const getPlanWithPricing = async (planId, pricingId) => {
    console.log(planId, pricingId)
    try {
        const plan = await client.plan.findUnique({
            where: {
                id: planId
            },
            include: {
                pricing: {
                    where: {
                        id: pricingId
                    }
                }
            }
        })
        if (!plan) return { status: "planNotFound", message: "", data: null }
        return { status: "success", message: "", data: plan }
    } catch (error) {
        console.error("Error fetching plan with pricing:", error)
        throw error
    }
}

export const getPricingById = async (pricingId) => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const pricing = await client.pricing.findUnique({
            where: {
                id: pricingId
            }
        })

        if (!pricing) throw { status: "pricingNotFound", message: "pricing is not found", data: null }

        return { status: "success", message: "", data: pricing }
    } catch (error) {
        throw error
    }
}


export const createChapaSubAccount = async (storeName, selectedBank, bankAccountNumber, bankAccountName, splitValue) => {
    try {
        let chapaSubAccountId;
        const chapaResponse = await axios.post(
            process.env.CHAPA_SUBACCOUNT_URL,
            {
                business_name: storeName,
                account_name: bankAccountName,
                bank_code: Number(selectedBank),
                account_number: bankAccountNumber,
                split_value: splitValue,
                split_type: process.env.SPLIT_TYPE,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (chapaResponse.data.status === "success") {
            chapaSubAccountId = chapaResponse.data.data.subaccount_id;
        } else {
            return { status: "error", message: "Please insert correct details", data: null }
        }

        if (!chapaSubAccountId) return { status: "ChapaSomeThingWentWrong", message: "Something went wrong when connecting your bank account", data: null }

        return { status: "success", message: "successfully created", data: chapaSubAccountId }
    } catch (error) {
        console.log(error.response.data)
    }
}


export const getAllMediaData = async () => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerkUser.id
            },
            include: {
                stores: {
                    include: { media: true }
                }
            }
        })
        if (!user) return { status: "userNotFound", message: "", data: null }

        return { status: "success", message: "", data: user.stores[0].media }
    } catch (error) {
        throw error
    }
}

export const uploadToMedia = async (fileId, name, filePath, thumbnailUrl, url) => {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerkUser.id
            },
            include: {
                stores: {
                    include: { media: true }
                }
            }
        })
        if (!user) return { status: "userNotFound", message: "", data: null }
        // if (user.stores.media.length >= 110) return { status: "mediaLimitationReached", message: "Your media is full" }
        console.log(user)
        const media = await client.media.create({
            data: {
                fileId,
                name,
                filePath,
                thumbnailUrl,
                url,
                storeId: user.stores[0].id
            }
        })
        if (!media) return { status: "mediaCreatingFailed", message: "", data: null }
        return { status: "success", message: "", data: media }
    } catch (error) {
        throw error
    }
}



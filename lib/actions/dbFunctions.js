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

export const getPlanById = async (planId) => {
    try {
        const plan = await client.plan.findUnique({
            where: {
                id: planId
            }
        })
        return JSON.parse(JSON.stringify(plan))
    } catch (error) {
        console.log("error occur in getPlanById function")
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
        return plan
    } catch (error) {
        console.error("Error fetching plan with pricing:", error)
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
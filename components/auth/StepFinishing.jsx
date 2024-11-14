"use client"

import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { finishingUserAndCreateStore } from "@/lib/actions/user.action"

function StepFinishing() {
    const router = useRouter()
    const [formData, setFormData] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    const handleTryAgain = () => {
        router.push("/auth/onboarding?step=1")
    }

    // First useEffect to handle mounting state
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Second useEffect to handle localStorage
    useEffect(() => {
        if (isMounted) {
            try {
                const row2Data = localStorage.getItem("step-2")
                const row3Data = localStorage.getItem("step-3") 
                const row4Data = localStorage.getItem("step-4")
                
                const step1Data = localStorage.getItem("step-1")
                const step2Data = row2Data ? JSON.parse(row2Data) : null;
                const step3Data = row3Data ? JSON.parse(row3Data) : null;
                const step4Data = row4Data ? JSON.parse(row4Data) : null;
                setFormData({ step1Data, step2Data, step3Data, step4Data })
            } catch (error) {
                console.error("Error loading data from localStorage:", error)
            }
        }
    }, [isMounted])

    // const saleType = formData.step1Data;
    // const { planId, pricingId } = formData.step2Data || {};
    // const { storeName, storeEmail, storePhone, storeDescription } = formData.step3Data;
    // const { selectedBank, bankAccountNumber, bankAccountName } = formData.step4Data || {};

    // console.log("step 1", saleType, "yyyyyyyyyyyyyyyyyyyyyyy")
    // console.log("step 2", planId, pricingId, "yyyyyyyyyyyyyyyyyyyyyyy")
    // console.log("step 3", storeName, storeEmail, storePhone, storeDescription, "yyyyyyyyyyyyyyyyyyyyyyy")
    // console.log("step 4", selectedBank, bankAccountNumber, bankAccountName, "yyyyyyyyyyyyyyyyyyyyyyy")

    const { data, error, isLoading, mutate } = useMutation({
        mutationFn: async () => {
            if (!formData) return null
            try {
                const res = await finishingUserAndCreateStore(
                    formData.step1Data, 
                    formData.step2Data, 
                    formData.step3Data, 
                    formData.step4Data
                )
                return res.data
            } catch (error) {
                if (error.code === 'P2028') {  // Prisma transaction timeout error
                    throw new Error('Database is currently busy. Please try again.')
                }
                throw error
            }
        },
        retry: 3,  // Will retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),  // Exponential backoff
        onError: (error) => {
            console.error('Mutation error:', error)
        }
    })

    useEffect(() => {
        if (data) {
            const { store } = data
            router.push(`/dashboard/${store.id}`)
        }
    }, [data, router])
    // 0900123456
    // Effect to trigger mutation when formData is available
    useEffect(() => {
        if (formData) {
            console.log("mutation with formData")
            mutate()
        }
    }, [formData, mutate])

    // Don't render anything until mounted
    if (!isMounted) {
        return null
    }

    if (!formData) {
        console.log("formData not available")
        return (
            <div className="h-[500px] flex flex-col justify-center items-center gap-5">
                <Loader2 className="animate-spin" />
                <p className="text-2xl font-semibold">Loading...</p>
            </div>
        )
    }

    if (isLoading) {
        console.log("isLoading")
        return (
            <div className="h-[500px] flex flex-col justify-center items-center gap-5">
                <Loader2 className="animate-spin" />
                <p className="text-2xl font-semibold">Creating your store...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-[500px] flex flex-col justify-center items-center gap-5">
                <p className="text-2xl font-semibold text-red-500">Error occurred</p>
                <p>{error.message}</p>
                <button 
                    onClick={handleTryAgain}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        )
    }

    

    return null
}

export default StepFinishing
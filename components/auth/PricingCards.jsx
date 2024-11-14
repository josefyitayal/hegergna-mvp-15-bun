"use client"

import { getPlans } from "@/lib/actions/dbFunctions"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Check } from "lucide-react"

function PricingCards({onPlanClick}) {
    const { data: plans, isLoading, error } = useQuery({
        queryKey: ['fetching-all-plans'],
        queryFn: getPlans,
        staleTime: Infinity, // Data will never be considered stale
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchOnReconnect: false,
    })

    const [frequency, setFrequency] = useState("Monthly")

    if (error) return <div>Error fetching plans</div>
    if (isLoading) return <div className="flex justify-center items-center w-full">Loading...</div>

    function handlePlanClick(ids) {
        onPlanClick(ids)
    }

    return (
        <div className="flex flex-col gap-5">
            <div className='w-full flex justify-center'>
                <Button className={"rounded-r-none rounded-l-lg"} variant={frequency === "Monthly" ? "default" : "outline"} onClick={() => setFrequency("Monthly")}>Monthly</Button>
                <Button className="rounded-l-none rounded-r-lg" variant={frequency === "Yearly" ? "default" : "outline"} onClick={() => setFrequency("Yearly")}>Yearly</Button>
            </div>
            <div className="grid grid-cols-2 gap-10">
                {plans.map((plan) => (
                    <div key={plan.id} className="flex flex-col gap-2 p-2">
                        <h1 className="text-xl font-semibold pl-[10px]">{plan.name}</h1>
                        <p className='text-gray-800 text-3xl font-bold'>{plan.pricing.find((p) => p.frequency === frequency).price} Birr<span className='text-sm text-gray-500'>/Month</span></p>
                        <p className="text-gray-500">{plan.description}</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='w-full'>Start free Trail</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>You selected {plan.name}</DialogTitle>
                                    <DialogDescription>Click on the button below to start your free trial. After the trail ended you will be redirected to the payment page.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button onClick={() => handlePlanClick({planId: plan.id, pricingId: plan.pricing.find((p) => p.frequency === frequency).id, splitValue: plan.pricing.find((p) => p.frequency === frequency).splitValue, frequency: plan.pricing.find((p) => p.frequency === frequency).frequency})}>Start free Trail</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {plan.features.map((feature, index) => (
                            <p key={index} className='flex gap-2'><Check /> {feature}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingCards
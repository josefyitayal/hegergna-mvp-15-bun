"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import Image from "next/image"
import InputField from "../global/InputField"
import { useMutation } from "@tanstack/react-query"
import { createChapaSubAccount, getPlanWithPricing } from "@/lib/actions/dbFunctions"
import { handleStatus } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const banks = [
    {
        id: 880,
        swift: "DASHETAA",
        name: "Dashen Bank",
        image: "/dashen bank logo.png"
    },
    {
        id: 946,
        swift: "CBETETAA",
        name: "Commercial Bank of Ethiopia (CBE)",
        image: "/cbe bank logo.jfif"
    },
    {
        id: 347,
        swift: "ABYSETAA",
        name: "Bank of Abyssinia",
        image: "/abyssinia bank logo.webp"
    },
    {
        id: 656,
        swift: "AWINETAA",
        name: "Awash Bank",
        image: "/awash bank logo.png"
    },
    {
        id: 855,
        swift: "TELEBIRR",
        name: "telebirr",
        image: "/telebirr logo.jfif"
    }
]

function StepFour({onNext, onPrev, storeName, splitValue}) {
    const {toast} = useToast()
    const [selectedBank, setSelectedBank] = useState(null)
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [bankAccountName, setBankAccountName] = useState("")

    

    const {data, isLoading, error, mutate} = useMutation({
        mutationKey: ["createChapaSubAccound"],
        mutationFn: async () => {
            const {status, data} = await createChapaSubAccount(storeName, selectedBank, bankAccountNumber, bankAccountName, splitValue)
            handleStatus(status)
            if (data) return data
        }
    })


    function handleNext() {
        if (selectedBank && bankAccountNumber && bankAccountName) {
            mutate();
        } else {
            toast({
                variant: "destructive",
                description: "Please fill in all fields to continue"
            });
        }
    }
    
    // Use useEffect to handle side effects
    useEffect(() => {
        if (isLoading) {
            // Show loading indicator
            console.log("Loading...");
        }
        if (error) {
            // Handle error
            console.error(error);
            throw error;
        }
        if (data) {
            // Proceed to next step with data
            onNext(data);
        }
    }, [isLoading, error, data]);

    return (
        <div className="p-5 flex flex-col rounded-md shadow-md bg-white lg:w-2/4 sm:w-full md:w-3/4 h-fit border border-gray-300 w-fit gap-5">
            {isLoading && (
                <Loading/>
            )}
            <div>
                <h1 className="heading-2">Choose payment method to accept payments</h1>
                <p className="paragraph">Select supported bank to accept payments</p>
            </div>
            <div className="flex flex-col gap-5">
                <ToggleGroup type="single" value={selectedBank} onValueChange={setSelectedBank} className="my-toggle-group grid grid-cols-5 w-full">
                    {banks.map((bank) => (
                        <ToggleGroupItem key={bank.id} value={bank.id.toString()} className="size-20 overflow-hidden rounded-md toggle-item">
                            <Image src={bank.image} alt={bank.name} width={1000} height={1000} className="object-cover" />
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <InputField label="Bank Account Name" placeholder="Enter bank account name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
                <InputField label="Bank Account Number" placeholder="Enter bank account number" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
            </div>
            <div className='flex justify-between'>
                <Button variant='ghost' onClick={onPrev}>
                    <ArrowLeftIcon />
                    Back
                </Button>
                <Button onClick={handleNext}>
                    Done
                    <ArrowRightIcon />
                </Button>
            </div>
        </div>
    )
}

export default StepFour
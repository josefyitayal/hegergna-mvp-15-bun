"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "../ui/button"
import InputField from "../global/InputField"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// creating a store

function StepThree({onNext, onPrev}) {
    const { toast } = useToast()
    const [storeName, setStoreName] = useState("")
    const [storeEmail, setStoreEmail] = useState("")
    const [storePhone, setStorePhone] = useState("")
    const [storeDescription, setStoreDescription] = useState("")

    function handleNext() {
        if (storeName && storePhone && storeDescription) {
            onNext({storeName, storeEmail, storePhone, storeDescription})
        }else {
            toast({
                variant: "destructive",
                description: "please fill that out?"
            })
        }
    }

    return (
        <div className="p-5 flex flex-col rounded-md shadow-md bg-white lg:w-2/4 sm:w-full md:w-3/4 h-fit border border-gray-300 w-fit gap-5">
            <div>
                <h1 className="heading-2">Hold on it's almost done</h1>
                <p className="paragraph">Create you store now</p>
            </div>
            <div className="flex flex-col gap-4 w-[600px]">
                <InputField label="Store Name" type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                <InputField label="Store Email" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
                <InputField label="Store Phone Number" type="phone" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
                <div>
                    <p className="pl-[10px] text-gray-500">Store Description</p>
                    <textarea className="w-full border border-gray-300 rounded-md p-2 max-h-[100px] min-h-[100px]" value={storeDescription} onChange={(e) => setStoreDescription(e.target.value)} />
                </div>
            </div>
            <div className='flex justify-between'>
                <Button variant='ghost' onClick={() => onPrev}>
                    <ArrowLeftIcon />
                    Back
                </Button>
                <Button variant="ghost" onClick={handleNext}>
                    Next
                    <ArrowRightIcon />
                </Button>
            </div>
        </div>
    )
}

export default StepThree
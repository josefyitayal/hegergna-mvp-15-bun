"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "../ui/button"
import PricingCards from "./PricingCards"
import { useRouter } from "next/navigation"

// selecting a plan

function StepTwo({onNext, onPrev}) {
    const router = useRouter()  

    function onPlanClick(plan) {
        onNext(plan)
    }

    function handleLater() {
        onNext("later")
    }

    return (
        <div className="p-5 flex flex-col rounded-md shadow-md bg-white lg:w-2/4 sm:w-full md:w-3/4 h-fit border border-gray-300 w-fit gap-5">
            <div>
                <h1 className="heading-2">Choose the plan that best suits your needs</h1>
                <p className="paragraph">Start with a free trail and pay as you grow.</p>
            </div>
            <div className="">
                <PricingCards onPlanClick={onPlanClick} />
            </div>
            <div className='flex justify-between'>
                <Button variant='ghost' onClick={() => onPrev}>
                    <ArrowLeftIcon />
                    Back
                </Button>
                <Button variant="ghost" onClick={handleLater}>
                    Later
                    <ArrowRightIcon />
                </Button>
            </div>
        </div>
    )
}

export default StepTwo
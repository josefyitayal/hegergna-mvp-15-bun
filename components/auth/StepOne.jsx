"use client"

import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { ArrowRight, Box, Truck } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

function StepOne({ onNext }) {
    const { toast } = useToast()
    const [data, setData] = useState()
    function handleNext() {
        if (data) {
            onNext(data)
        } else {
            toast({
                variant: "destructive",
                description: "Pleas Select to continue"
            })
        }
    }
    return (
        <div className='p-5 flex flex-col rounded-md shadow-md bg-white lg:w-2/4 sm:w-full md:w-3/4 h-fit border border-gray-300 w-fit gap-5'>
            <div>
                <h1 className='heading-2'>How Will You Fulfill Orders?</h1>
                <p className='paragraph'>Select how you want to operate your business on our platform.</p>
            </div>
            <div>
                <ToggleGroup type={"single"} onValueChange={(value) => setData(value)} value={data} className="my-toggle-group grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ToggleGroupItem variant="outline" value={"selfFulfillment"} className="flex gap-4 w-full h-fit p-2 toggle-item">
                        <Box size={45} />
                        <div className='flex flex-col items-start'>
                            <p className='heading-3'>Self-Fulfilled</p>
                            <p className='paragraph-sm text-start'>Manage your inventory and order fulfillment independently</p>
                        </div>
                    </ToggleGroupItem>
                    <ToggleGroupItem variant="outline" disabled value="dropshipping" className="h-fit relative flex items-center justify-center toggle-item">
                            <p className='font-bold text-lg absolute z-10 text-black'>Coming soon</p>
                            <div className="flex gap-4 w-full h-fit p-2 opacity-50">
                                <Truck size={45} />
                                <div className='flex flex-col items-start'>
                                    <p className='heading-3'>Dropshipping</p>
                                    <p className='paragraph-sm text-start'>ships products directly from suppliers to customers</p>
                                </div>
                            </div>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='flex justify-end'>
                <Button className="flex items-center gap-1" variant="ghost" onClick={handleNext}>
                    Next
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default StepOne
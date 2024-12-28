"use client"

import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { useEffect, useState } from "react"
import { handleStatus } from "@/lib/handler"
import { getAllProduct } from "@/lib/actions/product.action"
import Image from "next/image"


export default function ProductDropdown({selectedProduct, storeId}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchingProduct() {
            setIsLoading(true)
            const {status, data: productsData} = await getAllProduct(storeId)
            handleStatus(status)
            setProducts(productsData)
            setIsLoading(false)
        }
        if (open) {
            fetchingProduct()
        }
    }, [open])


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-2/4 justify-between"
                >
                    {/* {value ? (
                        products.find((product) => product.id === value).name
                    ) : ( */}
                        <span className="flex items-center gap-2">
                            <Plus/>
                            Add product
                        </span>
                    {/* )} */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                {isLoading ? (
                    <div className="size-full flex items-center justify-center w-full">
                        <Loader2 className="animate-spin" />
                    </div>
                ): (
                    <Command >
                        <CommandInput placeholder="Search collection..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>There is no Product</CommandEmpty>
                            <CommandGroup>
                                {products?.map((prod) => (
                                    <CommandItem
                                        key={prod.id}
                                        value={prod.id}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            selectedProduct(prod)
                                            setOpen(false)
                                        }}
                                        className="flex items-center gap-4 justify-between"
                                    >
                                        <Image src={prod.media[0].thumbnailUrl} alt="thumbnailUrl" width={50} height={50} className="size-10 object-cover" />
                                        <p className="font-semibold">{prod.name}</p>
                                        <p className={prod.isPublished ? "bg-green-500 rounded-full p-1 px-2" : "bg-red-500 rounded-full p-1 px-2"}>{prod.isPublished ? "Active" : "inActive"}</p>
                                        {/* <Check
                                            className={cn(
                                                "ml-auto",
                                                value === prod.id ? "opacity-100" : "opacity-0"
                                            )}
                                        /> */}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                )}
            </PopoverContent>
        </Popover>
    )
}

"use client"

import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

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
import { getAllCollections } from "@/lib/actions/dbFunctions"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export default function CollectionDropDown({selectedCollection, setSelectedCollection}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [collections, setCollections] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchingCollection() {
            setIsLoading(true)
            const {status, data: collectionData} = await getAllCollections()
            handleStatus(status)
            setCollections(collectionData)
            setIsLoading(false)
        }
        if (open) {
            fetchingCollection()
        }
    }, [open])


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? collections.find((collection) => collection.id === value).name
                        : "Select collection"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                {isLoading ? (
                    <div className="size-full flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ): (
                    <Command>
                        <CommandInput placeholder="Search collection..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>There is no collection</CommandEmpty>
                            <CommandGroup>
                                {collections?.map((coll) => (
                                    <CommandItem
                                        key={coll.id}
                                        value={coll.id}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {coll.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === coll.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
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

"use client"

import { use, useEffect } from 'react'
import BackButton from '@/components/dashboard/BackButton'
import ProductDropdown from '@/components/dashboard/ProductDropdown'
import Tiptap from '@/components/richTextEditor/Tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { collectionZodSchema } from '@/lib/zodSchemas'
import { toast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { createCollection } from '@/lib/actions/collection.action'
import { handleStatus } from '@/lib/handler'
import { redirect } from 'next/navigation'

function page({ params }) {
    const { userId, storeId } = use(params)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isActive, setIsActive] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(products)
    }, [products])

    async function handleCreatingCollection() {
        //validate
        console.log(title, description, isActive, products)
        const validationResult = collectionZodSchema.safeParse({ title, description, isActive, products })
        if (!validationResult.success) {
            toast({
                title: "Validation Error",
                description: validationResult.error.flatten().fieldErrors,
                variant: "destructive",
            })
            console.log("validation error: ", validationResult.error.flatten().fieldErrors)
        } else {
            const { status } = await createCollection(title, description, isActive, products, storeId)
            handleStatus(status)
            if (status === "success") {
                redirect(`/dashboard/${userId}/${storeId}/collections`)
            }
        }
    }

    function selectedProduct(prod) {
        setProducts((prev) => {
            const exists = prev.some((p) => p.id === prod.id); 
            // If it doesn't exist, add it to the array 
            if (!exists) { return [...prev, prod]; } 
            // If it exists, return the previous array unchanged 
            return prev;
        })
    }
    return (
        <div className='flex flex-col gap-7'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <BackButton />
                    <p className='heading-3'>Create collection</p>
                </div>
                <Button onClick={handleCreatingCollection}>Save</Button>
            </div>

            <div className='flex flex-col gap-4 bg-white shadow-sm rounded-md p-5'>
                <div className='flex flex-col gap-2'>
                    <p className='heading-3'>Name</p>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='flex flex-col gap-2 '>
                    <p className='heading-3'>Description</p>
                    <div className="flex flex-col w-full rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                        <Tiptap content={description} handleChange={(e) => setDescription(e)} />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='heading-3'>Status</p>
                    <Select onValueChange={(e) => { setIsActive(e === "active" ? true : false); }} value={isActive === true ? "active" : "draft"}>
                        <SelectTrigger>{isActive === true ? "Active" : "Draft"}</SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-2 '>
                    <p className='heading-3'>Products</p>
                    <div className='flex flex-col gap-2'>
                        <ProductDropdown selectedProduct={selectedProduct} storeId={storeId} />
                        <div>
                            {products?.map((product) => (
                                <div key={product.id} className='flex items-center justify-between'>
                                    <Image src={product.media[0].thumbnailUrl} alt='thumbnailUrl' width={100} height={100} className='size=20 object-cover' />
                                    <p className='font-bold font-xl'>{product.name}</p>
                                    <p className={product.isPublished ? "bg-green-500 rounded-full p-1 px-2" : "bg-red-500 rounded-full p-1 px-2"}>{product.isPublished ? "Active" : "isActive"}</p>
                                    <p>{product.category ? product.category : "No category"}</p>
                                    <Button variant="icon" onClick={() => setProducts((prev) => prev.filter((eachProd) => eachProd.id !== product.id))}><Trash2/> </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
"use client"

import { use, useEffect } from 'react'
import BackButton from '@/components/dashboard/BackButton'
import MediaModel from '@/components/dashboard/MediaModel'
import InputField from '@/components/global/InputField'
import Tiptap from '@/components/richTextEditor/Tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IKImage } from 'imagekitio-next'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import VariantForm from '@/components/dashboard/ProductVariant'
import CategoryDropdown from '@/components/dashboard/CategoryDropdown'
import CollectionDropDown from '@/components/dashboard/CollectionDropdown'
import { productZodSchema } from '@/lib/zodSchemas'
import { toast } from '@/hooks/use-toast'
import { createProduct } from '@/lib/actions/product.action'
import { useMutation } from '@tanstack/react-query'
import { redirect } from 'next/dist/server/api-utils'
import { handleStatus } from '@/lib/handler'
import { Checkbox } from '@/components/ui/checkbox'


const variantLists = ["Size", "Color", "Material", "Capacity", "Flavor", "Weight", "Length"]

function page({ params }) {
  const { userId, storeId } = use(params)
  //basic
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  //price
  const [price, setPrice] = useState(0)
  const [comparePrice, setComparePrice] = useState(0)
  const [profit, setProfit] = useState(0)
  const [cost, setCost] = useState(0)
  const [margin, setMargin] = useState("")
  // inventory
  const [isPublish, setIsPublish] = useState(false)
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState(0)
  const [isGenerateSKU, setIsGenerateSKU] = useState(false)
  const [sku, setSku] = useState("")
  //variant and collection
  const [collections, setCollections] = useState(null)
  const [variants, setVariants] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  function calculatingProfit() {
    setProfit(price - cost)
  }
  function calculatingMargin() {
    setMargin(cost ? `${((price - cost) / price * 100).toFixed(2)}%` : 0)
  }
  useEffect(() => {
    calculatingProfit()
    calculatingMargin()
  }, [cost, price])

  // const { data, error, mutate } = useMutation({
  //   mutationKey: ["createProduct"],
  //   mutationFn: async ({ storeId, title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, sku, collections, variants }) => {
  //     setIsLoading(true)
  //     const { status, data } = await createProduct(storeId, title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, sku, collections, variants)
  //     console.log(status, "======== this is status")
  //     handleStatus(status)
  //     setIsLoading(false)
  //     if (data) return data
  //   }
  // })

  // if (error) {
  //   console.log("this is from useMutation error trying to save product")
  //   throw error
  // }

  function generateSKU() {
    // Get the current year and month
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero if needed

    // Remove spaces and convert to uppercase
    const formattedCategory = category.replace(/\s+/g, '').toUpperCase();
    const formattedName = title.replace(/\s+/g, '').toUpperCase();

    // Combine the formatted strings to create the SKU
    const sku = `${formattedCategory}-${formattedName}-${year}-${month}`;
    console.log(sku, "from sku generator")
    return sku;
  }

  async function handleProductSave() {
    setIsLoading(true)
    let newSku = sku; 
    if (isGenerateSKU) { 
      newSku = generateSKU(); 
      setSku(newSku); 
    }
    const validationResult = productZodSchema.safeParse(
      { title, description, media: images, price: parseFloat(price), comparePrice: parseFloat(comparePrice), profit: parseFloat(profit), cost: parseFloat(cost), margin, isPublish, category, stock: parseFloat(stock), newSku, collections, variants }
    )
    if (!validationResult.success) {
      // Handle validation errors
      toast({
        title: "Validation Error",
        description: validationResult.error.error,
        variant: "destructive",
      });
      console.error('Validation failed:', validationResult.error);
      // throw new Error('Validation failed');
    }
    // mutate({ storeId, title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, sku, collections, variants })
    console.log(newSku)
    const { status, data } = await createProduct(storeId, title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, newSku, collections, variants)
    handleStatus(status)
    setIsLoading(false)
    if (data) {
      // TODO the redirect not working but any thing is working i think
      redirect(`/dashboard/${userId}/${storeId}/products`)
    }

  }


  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <BackButton />
          Add product
        </div>
        <Button onClick={handleProductSave}>
          {isLoading ? (<><Loader2 className='animate-spin' /> Saving</>) : ('Save')}
        </Button>
      </div>

      <div className='flex flex-col gap-7'>
        <div className="flex flex-col gap-5 bg-white shadow-sm rounded-md p-5">
          <div className='flex flex-col gap-2'>
            <p className='heading-3'>Title</p>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2 '>
            <p className='heading-3'>Description</p>
            <div className="flex flex-col w-full rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
              <Tiptap content={description} handleChange={(e) => setDescription(e)} />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-white shadow-sm rounded-md p-5'>
          <p className='heading-3'>Photos</p>
          <div className='rounded-md border border-input bg-background ring-offset-background grid grid-cols-2 min-h-[215px]'>
            {images.map((img, index) => (
              <IKImage key={index} path={img.filePath} alt='media' width={500} height={500} className='object-cover w-[250px] h-auto' />
            ))}
            {images.length < 2 && (
              <MediaModel selectedMedia={(some) => setImages((prev) => [...prev, some])} />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-white shadow-sm rounded-md p-5'>
          <p className="heading-3">Inventory</p>
          <Select onValueChange={(e) => { setIsPublish(e === "active" ? true : false); }} value={isPublish === true ? "active" : "draft"}>
            <SelectTrigger>{isPublish === true ? "Active" : "Draft"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          <InputField label={"Stock"} type={"number"} value={stock} onChange={(e) => setStock(e.target.value)} hint='How many product you have on hand' />
          <div className='flex items-center gap-2'>
            <Checkbox checked={isGenerateSKU} onCheckedChange={() => setIsGenerateSKU((prev) => !prev)} />
            <p>Generate SKU</p>
          </div>
          <InputField label={"SKU"} type={"text"} disabled={isGenerateSKU} value={sku} onChange={(e) => setSku(e.target.value)} optional hint='A unique identifier for each product or variant in your inventory.' />
          <CategoryDropdown selectedCategory={category} setSelectedCategory={setCategory} />
        </div>

        <div className='flex flex-col gap-2 bg-white shadow-sm rounded-md p-5'>
          <p className='heading-3'>Prices</p>
          <div className='flex items-center gap-5'>
            <InputField label={"Price"} type={"number"} value={price} onChange={(e) => setPrice(e.target.value)} />
            <InputField label={"Compare Price"} hint='This is the original price of the product before any discounts.' type="number" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} />
          </div>
          <div className='flex items-center justify-between gap-5'>
            <InputField label={"Cost"} className='w-full' type="number" hint="how much does the product cost to make" value={cost} onChange={(e) => setCost(e.target.value)} />
            <InputField label={"Profit"} className='w-full' disabled type="number" value={profit} onChange={() => setProfit(e.target.value)} />
            <InputField label={"Margin"} className='w-full' disabled type="text" value={margin} onChange={() => setMargin(e.target.value)} />
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-white shadow-sm rounded-md p-5'>
          <p className='heading-3'>Collection and Variant</p>
          <p className='pl-[10px] text-gray-500'>Add Collection</p>
          <CollectionDropDown selectedCollection={collections} setSelectedCollection={setCollections} storeId={storeId} />
          <p className='pl-[10px] text-gray-500'>Add variant</p>
          <VariantForm variants={variants} setVariants={setVariants} />
        </div>
      </div>
    </div>
  )
}

export default page
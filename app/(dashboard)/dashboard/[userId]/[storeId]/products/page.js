import { columns } from '@/components/dashboard/data-table/columns'
import { DataTable } from '@/components/dashboard/data-table/data-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { getAllProduct } from '@/lib/actions/product.action'
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function page({ params }) {
  const { userId, storeId } = await params
  const {status, data:products} = await getAllProduct(storeId)
  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='heading-3'>Products</h2>
        <div className='flex gap-5 items-center justify-between'>
          <Button asChild>
            <Link href={`/dashboard/${userId}/${storeId}/products/add`} className="flex items-center gap-1">
              <Plus />
              Add product
            </Link>
          </Button>
        </div>
      </div>

      <div className="w-full">
        {products ? (
          <div className='flex flex-col items-center justify-center gap-4 bg-white shadow-sm rounded-md p-5'>
            <DataTable data={products} />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 bg-white shadow-sm rounded-md p-5'>
            <Image src={"/Empty Box.png"} alt='empty box' width={500} height={500} className='size-52' />
            <div>
              <p className='heading-2 text-center'>There is no Product</p>
              <p className='paragraph text-center'>Add products by clicking the button</p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/${userId}/${storeId}/products/add`} className="flex items-center gap-1">
                <Plus />
                Add product
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
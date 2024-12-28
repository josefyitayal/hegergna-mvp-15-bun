import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllCollections } from '@/lib/actions/collection.action'
import { handleStatus } from '@/lib/handler'
import { Group, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function page({ params }) {
  const { userId, storeId } = await params
  const { status, data: collections } = await getAllCollections(storeId)
  handleStatus(status)
  console.log(collections, "from collection page", status)
  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='heading-3'>Collections</h2>
        {collections ?
          <Button asChild>
            <Link href={`/dashboard/${userId}/${storeId}/collections/create`}>
              Create collection
            </Link>
          </Button> : ""}
      </div>
      <div>
        {collections ? (
          <div className='w-full flex flex-col items-center gap-4 bg-white rounded-md'>
            <Table>
              <TableCaption>A list of your product collections.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Create at</TableHead>
                  <TableHead className="text-right w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collections?.map((collection) => (
                  <TableRow key={collection.id} component="a" >
                    <TableCell className="font-medium">{collection.name}</TableCell>
                    <TableCell>
                      <p dangerouslySetInnerHTML={{ __html: collection.description }} className='text-ellipsis'></p>
                    </TableCell>
                    <TableCell>{collection.products.length}</TableCell>
                    <TableCell className="text-right">
                      {new Date(collection.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/dashboard/${userId}/${storeId}/collections/${collection.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='w-full flex flex-col items-center gap-4 py-14 bg-white rounded-md'>
            <Group size={100} />
            <p className='heading-2'>No collection</p>
            <p>Group your products collections</p>
            <Button asChild>
              <Link href={`/dashboard/${userId}/${storeId}/collections/create`}>
                Create collection
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
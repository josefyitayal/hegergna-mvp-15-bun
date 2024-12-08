import InputField from '@/components/global/InputField'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createStore } from '@/lib/actions/store.action'
import { verifyUser } from '@/lib/actions/user.action'
import { handleStatus } from '@/lib/handler'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function page({ userId }) {
    const { status, data } = await verifyUser(userId)
    handleStatus(status)
    if (data.stores.length === 1) {
        return redirect(`/dashboard/${data.id}/${data.stores[0].id}`)
    }

    async function handleCreatingStore(formData) {
        "use server"
        const {status, data: store} = await createStore(userId, formData.get("storeName"), formData.get("storePhone"), formData.get("storeEmail"), formData.get("storeDescription")) 
        handleStatus(status)
        if (data) {
            return redirect(`/dashboard/${userId}/${store.id}`)
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div>
                <div>
                    <h1 className='heading-1'>All stores</h1>
                    <Dialog>
                        <DialogTrigger><Plus /> Create Store</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Store</DialogTitle>
                            </DialogHeader>
                            <form action={handleCreatingStore} className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <InputField label="Store Name" type="text" name='storeName' />
                                    <InputField label="Store Email" type="email" name='storeEmail' />
                                    <InputField label="Store Phone Number" type="phone" name='storePhone' />
                                    <div>
                                        <p className="pl-[10px] text-gray-500">Store Description</p>
                                        <textarea className="w-full border border-gray-300 rounded-md p-2 max-h-[100px] min-h-[100px]" name='storeDescription' />
                                    </div>
                                </div>
                                <div className='w-full flex justify-end'>
                                    <Button type={"submit"}>
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    {data.stores.map((store, index) => (
                        <Link href={`/dashboard/${userId}/${store.id}`} key={index}>

                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
import { verifyUser } from '@/lib/actions/user.action'
import { handleStatus } from '@/lib/handler'
import { Circle } from 'lucide-react'
import React from 'react'

async function page({params}) {
  const {userId} = await params
  
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold'>Welcome to your dashboard</h1>
          <p>Get ready to sell. here is some guide how to start selling</p>
        </div>
        <div className='flex flex-col gap-2 rounded-md w-full bg-white p-5 shadow-md'>
          <h2 className='flex items-center gap-2'><Circle className='size-4'/> First start by add products</h2>
          <h2 className='flex items-center gap-2'><Circle className='size-4'/> Customize your online store</h2>
          <h2 className='flex items-center gap-2'><Circle className='size-4'/> Add pick up address</h2>
          <h2 className='flex items-center gap-2'><Circle className='size-4'/> Finally sell</h2>
        </div>
      </div>
    </div>
  )
}

export default page
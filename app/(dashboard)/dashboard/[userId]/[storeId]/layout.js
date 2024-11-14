import NavbarD from '@/components/dashboard/Navbar-d'
import SidebarD from '@/components/dashboard/Sidebar-d'
import TopBanner from '@/components/global/TopBanner'
import { verifyUser } from '@/lib/actions/user.action'
import { handleStatus } from '@/lib/utils'
import React from 'react'

async function Layout({ children, params }) {
  const { userId } = await params
  const { status, data: user } = await verifyUser(userId)
  handleStatus(status)
  console.log(user, status)
  return (
    <div>
      {user.chapaSubAccountId && (
        <TopBanner
          title={"select plan"}
          description='select a plan to access all features based on the specific subscription plan.'
          href={'/auth/plan-selection'}
          btnText={"select plan"}
        />
      )}
      <NavbarD />
      <div className="flex">
        <SidebarD userId={user.id} />
        <main className="flex-1 py-5 px-20 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}

export default Layout
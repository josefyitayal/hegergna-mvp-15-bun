import NavbarD from '@/components/dashboard/Navbar-d'
import SidebarD from '@/components/dashboard/Sidebar-d'
import TopBanner from '@/components/global/TopBanner'
import { getStoreById } from '@/lib/actions/store.action'
import { verifyUser } from '@/lib/actions/user.action'
import { handleStatus } from '@/lib/handler'
import { Providers } from '@/providers/provider'
import React from 'react'


export const metadata = {
  title: "Dashboard - HegergnaShop",
  description: "Bring you store to internet with hegergna",
};


async function Layout({ children, params }) {
  const { userId, storeId } = await params
  const { status, data: user } = await verifyUser(userId)
  const {status:storeStatus, data:storeData} = await getStoreById(storeId)
  handleStatus(status)
  handleStatus(storeStatus)
  return (
    <Providers>
      <div>
        {status === "dontHaveSubAccount" && (
          <TopBanner
            title={"select plan"}
            description='select a plan to access all features based on the specific subscription plan.'
            href={'/auth/plan-selection'}
            btnText={"select plan"}
          />
        )}
        <NavbarD />
        <div className="flex">
          <SidebarD userId={user.id} storeId={storeId} />
          <main className="flex-1 py-5 px-2 sm:px-4 md:px-6 lg:px-24 bg-gray-100 ">{children}</main>
        </div>
      </div>
    </Providers>
  )
}

export default Layout
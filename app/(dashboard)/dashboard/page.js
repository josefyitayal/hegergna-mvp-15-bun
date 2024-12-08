import { checkUserFinishOnboarding } from '@/lib/actions/user.action'
import { handleStatus } from '@/lib/handler'
import { redirect } from 'next/navigation'

async function page() {
  const { status, data: user } = await checkUserFinishOnboarding()
  handleStatus(status)
  if (user.stores.length > 1) {
    redirect(`/dashboard/${user.id}`)
  }else {
    redirect(`/dashboard/${user.id}/${user.stores[0].id}`)
  }
  
}

export default page
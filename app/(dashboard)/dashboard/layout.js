import React from 'react'

async function Layout({ children }) {
    const { status, data: user } = await checkUserFinishOnboarding()
    handleStatus(status)

    return redirect(`/dashboard/${user.id}`)
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default Layout
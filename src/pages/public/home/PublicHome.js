import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Navigation, TopHeader } from 'components'
const PublicPage = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <TopHeader />
            <Header />
            <Navigation />
            <div className="w-full flex flex-col items-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default PublicPage
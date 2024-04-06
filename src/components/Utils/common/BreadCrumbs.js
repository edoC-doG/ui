import React, { memo } from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'


const BreadCrumbs = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ]
    const breadcrumb = useBreadcrumbs(routes)
    return (
        <div className=' flex text-sm gap-1 items-center'>
            {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, idx, self) => (
                <Link
                    className='flex gap-1 items-center hover:text-main'
                    key={match.pathname}
                    to={match.pathname}
                >
                    <span className='capitalize'>
                        {breadcrumb}
                    </span>
                    {idx !== self.length - 1 && <IoIosArrowForward />}
                </Link>
            ))
            }
        </div>
    )
}

export default memo(BreadCrumbs)
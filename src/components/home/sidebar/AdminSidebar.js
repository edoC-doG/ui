import React, { Fragment, memo, useCallback, useState } from 'react'
import logo from 'assets/logo.png'
import { sideBarAdmin } from 'utils/constFiel'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from 'utils/icons'

const { AiOutlineCaretDown, AiOutlineCaretUp } = icons
const activeStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500 text-gray-100'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-300'


const AdminSidebar = () => {
    const [actived, setActived] = useState([])
    const handleShowTab = useCallback((tabId) => {
        if (actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev, tabId])
    }, [actived])
    return (
        <div className=' h-full py-4 bg-white'>
            <Link to={'/'} className='flex flex-col justify-center items-center gap-2 p-4'>
                <img
                    src={logo}
                    alt="Logo"
                    className='w-[200px] object-contain'
                />
                <small>Admin Workspace</small>
            </Link>
            <div>
                {sideBarAdmin.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' &&
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                            >
                                <span>{el.icons}</span>
                                <span>{el.text}</span>
                            </NavLink>
                        }
                        {el.type === 'PARENT' &&
                            <div
                                className='flex flex-col'
                                onClick={() => handleShowTab(el.id)}
                            >
                                <div className='flex items-center justify-between px-4 py-2 hover:bg-blue-300 cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <span>{el.icons}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    {actived.some(id => id === +el.id) ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                                </div>
                                {actived.some(id => id === +el.id) &&
                                    <div
                                        className='flex flex-col'
                                    >
                                        {el?.submenu?.map((item, idx) => (
                                            <NavLink
                                                to={item.path}
                                                key={idx}
                                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-10')}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))}
                                    </div>}
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(AdminSidebar)
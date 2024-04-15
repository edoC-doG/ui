import React, { Fragment, memo, useEffect, useState } from 'react'
import logo from 'assets/logo.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice'

const Header = () => {
    const { current } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    const dispatch = useDispatch()
    const { RiPhoneFill, MdMail, BsHandbagFill, FaUserCircle } = icons
    useEffect(() => {
        const handleClickoutOptions = (e) => {
            const profile = document.getElementById('profile')
            if (!profile?.contains(e.target)) setIsShowOption(false)
        }
        document.addEventListener('click', handleClickoutOptions)
        return () => {
            document.removeEventListener('click', handleClickoutOptions)
        }
    }, [])
    return (
        <div className='w-main flex justify-between h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[234px] object-contain' />
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex gap-4 items-center'>
                        <RiPhoneFill color='red' />
                        <span className='font-semibold'>(+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdMail color='red' />
                        <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && <Fragment>
                    <div className='flex items-center justify-center gap-2 px-6 border-r cursor-pointer'>
                        <BsHandbagFill color='red' />
                        <span>{`${current?.cart?.length || 0} item(s)`}</span>
                    </div>
                    <div
                        className='relative flex items-center justify-center px-6 gap-2 cursor-pointer'
                        onClick={() => setIsShowOption(prev => !prev)}
                        id='profile'
                    >
                        <FaUserCircle color='red' />
                        <span>Profile</span>
                        {isShowOption &&
                            <div
                                className='w-full flex flex-col absolute top-full left-4 bg-gray-100 min-w-[150px] py-2'
                                onClick={e => e.stopPropagation()}
                            >
                                <Link
                                    className=' w-full p-2 hover:bg-red-400'
                                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                                >
                                    Personal
                                </Link>
                                {+current.role === 2000 && <Link
                                    className=' w-full p-2 hover:bg-red-400'
                                    to={`/${path.ADMIN}/${path.DASHBOARD}`}
                                >
                                    Admin Workspace
                                </Link>}
                                <span
                                    onClick={() => dispatch(logout())}
                                    className=' w-full p-2 hover:bg-red-400'
                                >
                                    Logout
                                </span>
                            </div>}
                    </div>
                </Fragment>}
            </div>
        </div>
    )
}

export default memo(Header)
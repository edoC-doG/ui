import React, { Fragment, memo } from 'react'
import logo from 'assets/logo.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useSelector } from 'react-redux';

const Header = () => {
    const { current } = useSelector(state => state.user)
    const { RiPhoneFill, MdMail, BsHandbagFill, FaUserCircle } = icons
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
                        <span>0 item(s)</span>
                    </div>
                    <Link
                        className='flex items-center justify-center px-6 gap-2 cursor-pointer'
                        to={current?.role === 2003 ? `/${path.MEMBER}/${path.PERSONAL}` : `/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                        <FaUserCircle color='red' />
                        <span>Profile</span>
                    </Link>
                </Fragment>}
            </div>
        </div>
    )
}

export default memo(Header)
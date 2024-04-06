import React, { memo } from 'react'
import icons from 'utils/icons'

const { MdMail } = icons
const Footer = () => {
    return (
        <div className='w-full'>
            <div className='w-full h-[103px] flex justify-center items-center bg-main'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-[20px] text-gray-100'>SIGN UP TO NEWSLETTER</span>
                        <span className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</span>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input
                            type="text"
                            placeholder='Email Address'
                            className='w-full p-4 pr-0 outline-none border-none rounded-l-full text-gray-100 bg-[#F04646]
                        placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50 placeholder:italic'
                        />
                        <div className='w-[56px] h-[56px] flex justify-center items-center bg-[#F04646] rounded-r-full'>
                            <MdMail size={16} color='white' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[407px] bg-gray-900 flex justify-center items-center text-white text-[13px]'>
                <div className='w-main flex'>
                    <div className='flex-2 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium pl-[15px] border-main border-l-2'>
                            ABOUT US
                        </h3>
                        <span>
                            <span>Address: </span>
                            <span className='opacity-70'>Nguyen Van Dau St, Binh Thanh District, HCM City, VN</span>
                        </span>
                        <span>
                            <span>Phone: </span>
                            <span className='opacity-70'>(+1234)56789xxx</span></span>
                        <span>
                            <span>Mail: </span>
                            <span className='opacity-70'>longnmse@gmail.com</span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium pl-[15px] border-main border-l-2'>
                            INFORMATION
                        </h3>
                        <span>Typography</span>
                        <span>Gallery</span>
                        <span>Store Location</span>
                        <span>Today's Deals</span>
                        <span>Contact</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium pl-[15px] border-main border-l-2'>
                            WHO WE ARE
                        </h3>
                        <span>Help</span>
                        <span>Free Shipping</span>
                        <span>FAQs</span>
                        <span>Return & Exchanging</span>
                        <span>Testimonials</span>
                    </div>
                    <div className='flex-1'>
                        <h3 className='mb-[20px] text-[15px] font-medium pl-[15px] border-main border-l-2'>
                            #DIGITALWORLDSTORE
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)
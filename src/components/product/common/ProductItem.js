import React, { memo, useState } from 'react'
import { formatMoney, formatPrice, renderStarFromNumber } from 'utils/helper'
import label from 'assets/new.png'
import labelBlue from 'assets/trending.png'
import { SelectOption } from '../..'
import icons from 'utils/icons';
import withBase from 'hocs/withBase'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'

const { AiFillEye, IoMenu, BsFillSuitHeartFill } = icons

const ProductItem = ({ productData, isNew, normal, navigate, dispatch }) => {
    const [isShowOption, setIsShowOption] = useState(false)
    const handleClickOptions = (e, flag) => {
        e.stopPropagation()
        if (flag === 'Menu') navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
        if (flag === 'WishList') console.log('WishList')
        if (flag === 'QuickView') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView /> }))
        }
    }
    return (
        <div className='w-full text-base px-[10px]'>
            <div
                className='w-full border p-[15px] flex-col flex items-center gap-2'
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex gap-4 justify-center animate-slide-top'>
                        <span onClick={e => handleClickOptions(e, 'QuickView')}> <SelectOption icon={<AiFillEye />} /></span>
                        <span onClick={e => handleClickOptions(e, 'Menu')}><SelectOption icon={<IoMenu />} /></span>
                        <span onClick={e => handleClickOptions(e, 'WishList')}> <SelectOption icon={<BsFillSuitHeartFill />} /></span>
                    </div>}
                    <img
                        onClick={e => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
                        src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                        alt="Images"
                        className='w-[274px] h-[274px] object-cover cursor-pointer'
                    />
                    {!normal && <img
                        src={isNew ? label : labelBlue}
                        alt=""
                        className={`absolute w-[100px] h-[35px] top-0 right-0 object-cover `}
                    />}
                </div>
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(formatPrice(productData?.price))} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default withBase(memo(ProductItem))
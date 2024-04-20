import withBase from 'hocs/withBase'
import React, { memo } from 'react'
import { formatMoney, formatPrice, renderStarFromNumber, } from 'utils/helper'

const ProductCard = ({ price, totalRatings, title, image, pid, navigate, category }) => {

    return (
        <div
            className='w-1/3 flex-auto cursor-pointer flex px-[10px] mb-[20px]'
            onClick={(e) => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
        >
            <div className='w-full flex border'>
                <img
                    src={image}
                    alt='products'
                    className='w-[120px] object-contain p-4'
                />
                <div className='w-full flex flex-col items-start gap-1 mt-[15px] text-xs'>
                    <span className='line-clamp-1 capitalize text-sm'>{title?.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings, 20)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{`${formatMoney(formatPrice(price))} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default withBase(memo(ProductCard))
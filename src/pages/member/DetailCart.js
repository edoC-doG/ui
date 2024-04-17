import { BreadCrumbs, Button, OrderItem } from 'components'
import withBase from 'hocs/withBase'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatMoney, formatPrice } from 'utils/helper'
import path from 'utils/path'

const DetailCart = ({ location }) => {
    const { currentCart } = useSelector(state => state.user)
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>My Cart</h3>
                    <BreadCrumbs category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <div className='w-main mx-auto flex flex-col border my-8'>
                <div className='w-main mx-auto font-bold bg-main py-3 grid grid-cols-10 text-white'>
                    <span className='text-center flex justify-start px-4 col-span-6 w-full'>List Product</span>
                    <span className='text-center col-span-1 w-full'>Quantity</span>
                    <span className='text-center col-span-2 w-full'>Price</span>
                    <span className='text-center col-span-1 w-full'>Action</span>
                </div>
                {!currentCart && <span className='text-xs italic'>Your Cart is Empty</span>}
                {currentCart?.map((el, idx) => (
                    <OrderItem
                        el={el}
                        key={idx}
                        defaultQuantity={el.quantity}
                        title={el.title}
                        color={el.color}
                        thumbNail={el.thumbNail}
                        price={el.price}
                        pid={el?.product._id}
                    />
                ))
                }
            </div>
            <div className='w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3'>
                <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal:</span>
                    <span className='text-main font-bold'>{`${formatMoney(formatPrice(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)))}`}</span>
                </span>
                <span className='text-xs italic'>Shipping, taxes, and discount calculated at checkout</span>
                <Button><Link to={`/${path.CHECK_OUT}`}>Check out</Link></Button>
            </div>
        </div >
    )
}
export default withBase(memo(DetailCart))
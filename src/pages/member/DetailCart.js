import { BreadCrumbs, Button, OrderItem } from 'components'
import withBase from 'hocs/withBase'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { formatMoney, formatPrice } from 'utils/helper'



const DetailCart = ({ location, dispatch }) => {
    const { current } = useSelector(state => state.user)
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>My Cart</h3>
                    <BreadCrumbs category={location?.pathname} />
                </div>
            </div>
            <div className='w-main mx-auto flex flex-col border my-8'>
                <div className='w-main mx-auto font-bold bg-main py-3 grid grid-cols-10 text-white'>
                    <span className='text-center flex justify-start px-4 col-span-6 w-full'>List Product</span>
                    <span className='text-center col-span-1 w-full'>Quantity</span>
                    <span className='text-center col-span-2 w-full'>Price</span>
                    <span className='text-center col-span-1 w-full'>Action</span>
                </div>
                {!current?.cart && <span className='text-xs italic'>Your Cart is Empty</span>}
                {current?.cart?.map((el, idx) => (
                    <OrderItem el={el} idx={idx} />
                ))
                }
            </div>
            <div className='w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3'>
                <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal:</span>
                    <span className='text-main font-bold'>{`${formatMoney(formatPrice(current?.cart?.reduce((sum, el) => +el.price + sum, 0)))}`}</span>
                </span>
                <span className='text-xs italic'>Shipping, taxes, and discount calculated at checkout</span>
                <Button>Check out</Button>
            </div>
        </div >
    )
}
export default withBase(memo(DetailCart))
import React, { memo, useEffect, useState } from 'react'
import payment from 'assets/online-payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney, formatPrice } from 'utils/helper'
import { Congrat, Paypal } from 'components'
import withBase from 'hocs/withBase'
import { getCurrentUser } from 'store/user/asyncAction'


const Checkout = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.user)
    console.log(currentCart)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(() => {
        if (isSuccess) dispatch(getCurrentUser())
    }, [isSuccess])
    return (
        <div className='p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
            {isSuccess && <Congrat />}
            <div className='w-full flex justify-center items-center col-span-3'>
                <img src={payment} alt="img" className='max-h-[70%] object-contain' />
            </div>
            <div className='w-full flex flex-col justify-center col-span-7 gap-6'>
                <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
                <div className='flex w-full gap-6'>
                    <div className=' flex flex-col gap-6'>
                        <div className='flex-1'>
                            <table className='table-auto mb-6'>
                                <thead>
                                    <tr className='border bg-sky-400'>
                                        <th className='text-start p-2 text-white'>Products</th>
                                        <th className='text-center p-2 text-white'>Quantity</th>
                                        <th className='text-end p-2 text-white'>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCart?.map(el => (
                                        <tr className='border' key={el._id}>
                                            <td className='text-start p-2'>{el.title}</td>
                                            <td className='text-center p-2'>{el.quantity}</td>
                                            <td className='text-end p-2'>{`${formatMoney(formatPrice(el.price))} VND`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='w-[70%] mx-auto'>
                            <Paypal
                                setIsSuccess={setIsSuccess}
                                payload={{
                                    products: currentCart,
                                    total: Math.round(formatPrice(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)) / 23500),
                                    address: current?.address
                                }}
                                amount={Math.round(formatPrice(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)) / 23500)}
                            />
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2 justify-center'>
                            <span className='flex items-center gap-8 text-lg'>
                                <span>Subtotal:</span>
                                <span className='text-main font-bold'>{`${formatMoney(formatPrice(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)))} VND`}</span>
                            </span>
                            <span className='flex items-center gap-8 text-lg'>
                                <span>Address:</span>
                                <span className='text-main font-bold'>{current?.address}</span>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withBase(memo(Checkout))
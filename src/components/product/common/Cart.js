import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { showCart } from 'store/app/appSlice'
import { formatMoney, formatPrice } from 'utils/helper'
import icons from 'utils/icons'
import withBase from 'hocs/withBase'
import { Button } from 'components';
import { toast } from 'react-toastify'
import { getCurrentUser } from 'store/user/asyncAction'
import { apiRemoveCart } from 'apis'
import path from 'utils/path'

const { AiOutlineCloseCircle, IoTrashBinOutline } = icons
const Cart = ({ dispatch, navigate }) => {
    const { current } = useSelector(state => state.user)
    const removeCart = async (pid, color) => {
        const res = await apiRemoveCart(pid, color)
        if (res.success) {
            dispatch(getCurrentUser())
        }
        else toast.error(res.mes)
    }
    return (
        <div onClick={e => e.stopPropagation()} className='w-[400px] h-screen bg-black grid grid-rows-10 text-white p-6'>
            <header className='py-4 h-full border-b flex justify-between items-center row-span-1 font-bold text-2xl'>
                <span>Your Cart</span>
                <span
                    onClick={() => dispatch(showCart())}
                    className='p-2 cursor-pointer'
                >
                    <AiOutlineCloseCircle size={20} />
                </span>
            </header>
            <section className='row-span-7 flex flex-col max-h-full overflow-y-auto gap-3 py-3'>
                {!current?.cart && <span className='text-xs italic'>Your Cart is Empty</span>}
                {current?.cart && current?.cart?.map(el => (
                    <div key={el._id} className='flex justify-between items-center '>
                        <div className='flex gap-2'>
                            <img src={el.thumbNail} alt="thumb" className='w-16 h-16 object-cover' />
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm text-main'>{el.title}</span>
                                <span className='text-[10px]'>{el.color}</span>
                                <span className='text-sm'   >{`${formatMoney(formatPrice((el.price)))} VNĐ`}</span>
                            </div>
                        </div>
                        <span
                            onClick={() => removeCart(el.product?._id, el.color)}
                            className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer'
                        >
                            <IoTrashBinOutline size={16} />
                        </span>
                    </div>
                ))
                }
            </section >
            <div className='row-span-2 h-full flex flex-col justify-between'>
                <div className='flex items-center justify-between pt-4 border-t'>
                    <span>Subtotal:</span>
                    <span>{formatMoney(formatPrice(current?.cart?.reduce((sum, el) => sum + Number(el.price), 0))) + 'VNĐ'}</span>
                </div>
                <span className='text-center text-gray-700 italic text-xs'>
                    Shipping , taxes, and discounts calculate at checkout.
                </span>
                <Button
                    handleOnClick={() => {
                        dispatch(showCart())
                        navigate(`/${path.DETAIL_CART}`)
                    }}
                    style={`rounded-none w-full bg-main py-3`}
                >
                    Shopping cart
                </Button>
            </div>
        </div >
    )
}

export default withBase(memo(Cart))
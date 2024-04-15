import { apiRemoveCart } from 'apis'
import { BreadCrumbs, Button, SelectQuantityPro } from 'components'
import withBase from 'hocs/withBase'
import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCurrentUser } from 'store/user/asyncAction'
import { formatMoney, formatPrice } from 'utils/helper'
import icons from 'utils/icons'

const { AiOutlineCloseCircle, IoTrashBinOutline } = icons
const DetailCart = ({ location, dispatch }) => {
    const { current } = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(1)
    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else setQuantity(number)
    }, [quantity])
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) {
            toast.warning('Do not buy item has quantity equal than 0')
            return
        }
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])
    const removeCart = async (pid) => {
        const res = await apiRemoveCart(pid)
        if (res.success) {
            dispatch(getCurrentUser())
        }
        else toast.error(res.mes)
    }
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
                    <div key={idx} className='w-main mx-auto font-bold border-b  py-3 grid grid-cols-10'>
                        <div className='col-span-6 w-full text-center'>
                            <div className='flex gap-2'>
                                <img src={el.product?.thumb} alt="thumb" className='w-20 h-20 object-cover' />
                                <div className='flex flex-col items-start justify-center gap-1'>
                                    <span className='text-sm text-main'>{el.product?.title}</span>
                                    <span className='text-[10px] font-main'>{el.color}</span>
                                </div>
                            </div>
                        </div>
                        <span className='col-span-1 w-full text-center flex items-center justify-center'>
                            <div>
                                <SelectQuantityPro
                                    quantity={quantity}
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                />
                            </div>
                        </span>
                        <span className='col-span-2 w-full text-center text-sm flex items-center justify-center font-semibold'>{`${formatMoney(formatPrice((el.product?.price)))} VNĐ`}</span>
                        <span
                            onClick={() => removeCart(el.product?._id)}
                            className='col-span-1 rounded-full flex items-center justify-center hover:text-main cursor-pointer'
                        >
                            <IoTrashBinOutline size={24} />
                        </span>
                    </div >))
                }
            </div>
            <div className='w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3'>
                <span className='flex items-center gap-8 text-sm'>
                    <span>Subtotal:</span>
                    <span className='text-main font-bold'>{`${formatMoney(formatPrice(current?.cart?.reduce((sum, el) => +el.product?.price + sum, 0)))}`}</span>
                </span>
                <span className='text-xs italic'>Shipping, taxes, and discount calculated at checkout</span>
                <Button>Check out</Button>
            </div>
        </div >
    )
}
export default withBase(memo(DetailCart))
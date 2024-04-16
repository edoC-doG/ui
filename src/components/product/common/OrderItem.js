import { apiRemoveCart } from 'apis'
import React, { memo, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { getCurrentUser } from 'store/user/asyncAction'
import icons from 'utils/icons'
import { SelectQuantityPro } from 'components'
import { formatMoney, formatPrice } from 'utils/helper'
const { IoTrashBinOutline } = icons
const OrderItem = ({ el, idx }) => {
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
    const removeCart = async (pid, color) => {
        const res = await apiRemoveCart(pid, color)
        if (res.success) {
            dispatchEvent(getCurrentUser())
        }
        else toast.error(res.mes)
    }
    return (
        <div key={idx} className='w-main mx-auto font-bold border-b  py-3 grid grid-cols-10'>
            <div className='col-span-6 w-full text-center'>
                <div className='flex gap-2'>
                    <img src={el.thumbNail} alt="thumb" className='w-20 h-20 object-cover' />
                    <div className='flex flex-col items-start justify-center gap-1'>
                        <span className='text-sm text-main'>{el.title}</span>
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
            <span className='col-span-2 w-full text-center text-sm flex items-center justify-center font-semibold'>{`${formatMoney(formatPrice((el.price)))} VNĐ`}</span>
            <span
                onClick={() => removeCart(el.product?._id, el.color)}
                className='col-span-1 rounded-full flex items-center justify-center hover:text-main cursor-pointer'
            >
                <IoTrashBinOutline size={24} />
            </span>
        </div >
    )
}

export default memo(OrderItem)
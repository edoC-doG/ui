import React, { memo, useState } from 'react'
import { checkLogin, formatMoney, formatPrice, renderStarFromNumber } from 'utils/helper'
import label from 'assets/new.png'
import labelBlue from 'assets/trending.png'
import { SelectOption } from 'components'
import icons from 'utils/icons';
import withBase from 'hocs/withBase'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'
import { apiUpdateCart, apiUpdateWishList } from 'apis'
import { toast } from 'react-toastify'
import { getCurrentUser } from 'store/user/asyncAction'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const { AiFillEye, BsCartPlusFill, BsFillSuitHeartFill, BsFillCartCheckFill } = icons

const ProductItem = ({ productData, isNew, normal, navigate, dispatch, location, pid, classname }) => {
    const [isShowOption, setIsShowOption] = useState(false)
    const { current } = useSelector(state => state.user)
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'Cart') {
            await checkLogin({ current, navigate, location })
            const res = await apiUpdateCart({
                pid: productData?._id,
                color: productData?.color,
                title: productData?.title,
                price: productData?.price,
                quantity: 1,
                thumbNail: productData?.thumb,
            })
            if (res.success) {
                toast.success(res.mes)
                dispatch(getCurrentUser())
            }
            else toast.error(res.mes)
        }
        if (flag === 'QuickView') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView /> }))
        }
        if (flag === 'WishList') {
            await checkLogin({ current, navigate, location })
            const res = await apiUpdateWishList(pid)
            if (res.success) {
                dispatch(getCurrentUser())
                toast.success(res.mes)
            }
            else toast.error(res.mes)
        }
    }
    return (
        <div className={clsx("w-full text-base px-[10px]", classname)}>
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
                        <span title='Quick View' onClick={e => handleClickOptions(e, 'QuickView')}> <SelectOption icon={<AiFillEye />} /></span>
                        {current?.cart?.some(el => el.product._id === productData._id.toString())
                            ? <span title='Added to cart' ><SelectOption icon={<BsFillCartCheckFill color='green' />} /></span>
                            : <span title='Add to cart' onClick={e => handleClickOptions(e, 'Cart')} ><SelectOption icon={<BsCartPlusFill />} /></span>
                        }
                        <span title='Wish List' onClick={e => handleClickOptions(e, 'WishList')}>
                            <SelectOption
                                icon={
                                    <BsFillSuitHeartFill
                                        color={current?.wishList?.some((i) => i === pid) ? "red" : ""}
                                    />}
                            />
                        </span>
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
import React, { memo, useState } from 'react'
import { formatMoney, formatPrice, renderStarFromNumber } from 'utils/helper'
import label from 'assets/new.png'
import labelBlue from 'assets/trending.png'
import { SelectOption } from '../..'
import icons from 'utils/icons';
import withBase from 'hocs/withBase'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'
import { apiUpdateCart } from 'apis'
import { toast } from 'react-toastify'
import { getCurrentUser } from 'store/user/asyncAction'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'utils/path'

const { AiFillEye, BsCartPlusFill, BsFillSuitHeartFill, BsFillCartCheckFill } = icons

const ProductItem = ({ productData, isNew, normal, navigate, dispatch }) => {
    console.log(productData)
    const [isShowOption, setIsShowOption] = useState(false)
    const { current } = useSelector(state => state.user)
    const checkLogin = () => {
        return new Promise((resolve, reject) => {
            if (!current) {
                Swal.fire({
                    text: 'Login to continue action !!!',
                    cancelButtonText: 'Not now',
                    confirmButtonText: 'Go Login',
                    showCancelButton: true,
                    title: 'Opps',
                }).then((rs) => {
                    if (rs.isConfirmed) {
                        navigate(`/${path.LOGIN}`)
                    } else {
                        // navigate(`/${path.HOME}`)
                    }
                })
            } else {
                resolve();
            }
        });
    }
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'Cart') {
            await checkLogin()
            const res = await apiUpdateCart({ pid: productData._id, color: productData.color })
            console.log({ pid: productData._id, color: productData.color })
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
            checkLogin()
            console.log('WishList')
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
                        <span title='Quick View' onClick={e => handleClickOptions(e, 'QuickView')}> <SelectOption icon={<AiFillEye />} /></span>
                        {current?.cart?.some(el => el.product === productData._id.toString())
                            ? <span title='Added to cart' ><SelectOption icon={<BsFillCartCheckFill color='green' />} /></span>
                            : <span title='Add to cart' onClick={e => handleClickOptions(e, 'Cart')} ><SelectOption icon={<BsCartPlusFill />} /></span>
                        }
                        <span title='Wish List' onClick={e => handleClickOptions(e, 'WishList')}> <SelectOption icon={<BsFillSuitHeartFill />} /></span>
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
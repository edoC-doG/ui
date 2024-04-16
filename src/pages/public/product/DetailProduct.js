import React, { memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts, apiUpdateCart } from 'apis'
import { BreadCrumbs, Button, CustomSlider, ProdDesInf, ProdExtraInfItem, SelectQuantityPro } from 'components'
import Slider from "react-slick"
import ReactImageMagnify from 'react-image-magnify';
import { checkLogin, formatMoney, formatPrice, renderStarFromNumber } from 'utils/helper'
import { toast } from 'react-toastify';
import { prodExtraInf } from 'utils/constFiel'
import DOMPurify from 'dompurify'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import withBase from 'hocs/withBase'
import { getCurrentUser } from 'store/user/asyncAction'
const settings = {
    dots: false,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

const DetailProduct = ({ isQuickView, data, navigate, dispatch, location }) => {
    const params = useParams()
    const { current } = useSelector(state => state.user)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [update, setUpdate] = useState(false)
    const [variantsItem, setVariants] = useState(null)
    const [currentImg, setCurrentImg] = useState('https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png')
    const [relatedProd, setRelatedProd] = useState(null)
    const [pid, setPid] = useState(null)
    const [category, setCategory] = useState(null)
    const [currentProd, setCurrentProd] = useState({
        title: '',
        thumb: '',
        images: [],
        price: '',
        color: ''
    })

    const fetchProducts = async () => {
        const res = await apiGetProducts({ category })
        if (res.success) {
            setRelatedProd(res.products)
        }
    }
    const reRender = useCallback(() => {
        setUpdate(prev => !prev)
    }, [])

    const handleAddtoCart = async () => {
        await checkLogin({ current, navigate, location })
        const res = await apiUpdateCart({
            pid,
            title: currentProd.title || product?.title,
            color: currentProd.color || product?.color,
            price: currentProd.price || product?.price,
            quantity,
            thumbNail: currentProd.thumb || product?.thumb,
        })
        if (res.success) {
            toast.success(res.mes)
            dispatch(getCurrentUser())
        }
        else toast.error(res.mes)
    }

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else setQuantity(number)
    }, [quantity])

    const handleSwapImg = (e, el) => {
        e.stopPropagation()
        setCurrentImg(el)
    }
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) {
            toast.warning('Do not buy item has quantity equal than 0')
            return
        }
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    useEffect(() => {
        if (data) {
            setCategory(data.category)
            setPid(data.pid)
        }
        else if (params && params.pid) {
            setCategory(params.category)
            setPid(params.pid)
        }
    }, [data, params])
    const fetchProductData = async () => {
        const res = await apiGetProduct(pid)
        if (res.success) {
            setProduct(res.productData)
            setCurrentImg(res.productData?.thumb)
        }
    }
    useEffect(() => {
        if (variantsItem) {
            setCurrentProd(
                {
                    title: product?.variants?.find(el => el.sku === variantsItem)?.title,
                    thumb: product?.variants?.find(el => el.sku === variantsItem)?.thumb,
                    price: product?.variants?.find(el => el.sku === variantsItem)?.price,
                    images: product?.variants?.find(el => el.sku === variantsItem)?.images,
                    color: product?.variants?.find(el => el.sku === variantsItem)?.color,
                }
            )
        } else {
            setCurrentProd(
                {
                    title: product?.title,
                    thumb: product?.thumb,
                    price: product?.price,
                    images: product?.images,
                    color: product?.color,
                }
            )
        }
    }, [variantsItem])

    useEffect(() => {
        if (pid) fetchProductData()
    }, [update])

    useEffect(() => {
        if (pid) {
            fetchProductData()
            fetchProducts()
        }
        window.scrollTo(0, 0)
    }, [pid])
    return (
        <div className={clsx('w-full')}>
            {!isQuickView && <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold'>{currentProd?.title || product?.title}</h3>
                    <BreadCrumbs title={currentProd?.title || product?.title} category={category} />
                </div>
            </div>}
            <div onClick={e => e.stopPropagation()} className={clsx(' bg-white m-auto mt-4 flex', isQuickView ? 'max-w-[900px] p-8 gap-16 max-h-[100vh] overflow-y-auto' : 'w-main')}>
                <div className={clsx('flex-col flex gap-4 w-2/5', isQuickView && 'w-1/2')}>
                    <div className='h-[458px] w-[458px] flex items-center border object-cover overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: currentProd?.thumb
                            },
                            largeImage: {
                                src: currentProd?.thumb,
                                width: 1800,
                                height: 1500
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        <Slider
                            className='image-slider flex justify-between' {...settings}
                        >
                            {currentProd.images.length < 3 && product?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img
                                        src={el}
                                        alt='sub-product'
                                        onClick={(e) => handleSwapImg(e, el)}
                                        className='h-[143px] border object-cover cursor-pointer'
                                    />
                                </div>
                            ))}
                            {currentProd.images.length > 3 && currentProd.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img
                                        src={el}
                                        alt='sub-product'
                                        onClick={(e) => handleSwapImg(e, el)}
                                        className='h-[143px] border object-cover cursor-pointer'
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className={clsx('w-2/5 pr-6 flex flex-col gap-4', isQuickView && 'w-1/2')}>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(formatPrice(currentProd?.price || product?.price))} VND`}</h2>
                        <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, idx) => (<span key={idx}>
                            {el}
                        </span>))}
                        <span className='text-sm text-main italic'>{`Sold: ${product?.sold} pieces`}</span>
                    </div>
                    <ul className='list-square text-sm text-gray-600 pl-3'>
                        {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-4' key={el}>{el}</li>))}
                        {product?.description?.length === 1 &&
                            <div
                                className='text-sm line-clamp-[10] mb-8'
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}>
                            </div>}
                    </ul>
                    <div className='my-4 flex gap-4'>
                        <span className='font-bold'>Color:</span>
                        <div className='flex flex-wrap gap-4 items-center w-full'>
                            <div
                                onClick={() => setVariants(null)}
                                className={clsx(`flex items-center gap-2 p-2 border cursor-pointer`,
                                    !variantsItem && 'border-red-500')}
                            >
                                <img src={product?.thumb} alt="thumb" className='w-8 h-8 rounded-md object-cover' />
                                <span className='flex flex-col'>
                                    <span>{product?.color}</span>
                                    <span className='text-sm'>{product?.price}</span>
                                </span>
                            </div>
                            {product?.variants?.map((el, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setVariants(el.sku)}
                                    className={clsx(`flex items-center gap-2 p-2 border cursor-pointer`, variantsItem === el?.sku && 'border-red-500',
                                        // el?.quantity !== 0 && 'hidden'
                                    )}
                                >
                                    <img src={el?.thumb} alt="thumb" className='w-8 h-8 rounded-md object-cover' />
                                    <span className='flex flex-col'>
                                        <span>{el?.color}</span>
                                        <span className='text-sm'>{el?.price}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold'>Quantity</span>
                            <SelectQuantityPro
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button handleOnClick={handleAddtoCart} fw>
                            Add to cart
                        </Button>
                    </div>
                </div>
                {!isQuickView && <div className='w-1/5   '>
                    {prodExtraInf?.map(el => (
                        <ProdExtraInfItem
                            key={el.id}
                            title={el.title}
                            sub={el.sub}
                            icons={el.icons}
                        />
                    ))}
                </div>}
            </div>
            {
                !isQuickView && <div className='w-main m-auto mt-8'>
                    <ProdDesInf
                        total={product?.totalRatings}
                        ratings={product?.ratings || []}
                        nameProduct={product?.title}
                        pid={pid}
                        reRender={reRender}
                    />
                </div>
            }
            {
                !isQuickView && <div className='w-main m-auto my-12 '>
                    <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                        Other customer also liked
                    </h3>
                    <CustomSlider products={relatedProd} normal={true} />
                </div>
            }
        </div >
    )
}

export default withBase(memo(DetailProduct))
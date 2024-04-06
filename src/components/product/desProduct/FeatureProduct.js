import React, { useState, useEffect } from 'react'
import { ProductCard } from '../..'
import { apiGetProducts } from 'apis'
import banner1 from 'assets/banner1.webp'
import banner4 from 'assets/banner4.webp'

const FeatureProduct = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const res = await apiGetProducts({
            limit: 9,
            // page: Math.round(Math.random() * 10),
            // totalRatings: 5
        })
        if (res.success) setProducts(res.products)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-2 border-main'>
                Feature products
            </h3>
            <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
                {products?.map((el, idx) => (
                    <ProductCard
                        key={idx}
                        image={el?.thumb}
                        title={el?.title}
                        price={el?.price}
                        totalRatings={el?.totalRatings}
                    />
                ))}
            </div>
            <div className='flex justify-between'>
                <img
                    src={banner1}
                    alt=""
                    className='w-[49.4%] object-contain'
                />
                <div className='flex flex-col justify-between gap-2 w-[23.85%] '>
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                        alt=""
                        className=' object-contain'
                    />
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                        alt=""
                        className=' object-contain'
                    />
                </div>
                <img
                    src={banner4}
                    alt=""
                    className=' w-[23.85%] object-contain'
                />
            </div>
        </div>
    )
}

export default FeatureProduct
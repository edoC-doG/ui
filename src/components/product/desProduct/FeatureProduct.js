import React, { useState, useEffect } from 'react'
import { apiGetProducts } from 'apis'
import banner1 from 'assets/banner1.webp'
import banner4 from 'assets/banner4.webp'
import { ProductCard } from 'components'

const FeatureProduct = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const res = await apiGetProducts({
            limit: 9,
            sort: '-totalRatings'
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
                        pid={el?._id}
                        image={el?.thumb}
                        title={el?.title}
                        price={el?.price}
                        category={el?.category}
                        totalRatings={el?.totalRatings}
                    />
                ))}
            </div>
            <div className='grid grid-cols-4 grid-rows-2 gap-4'>
                <img
                    src={banner1}
                    alt=""
                    className='w-full h-full object-cover col-span-2 row-span-2'
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                    alt=""
                    className='w-full h-full object-cover col-span-1 row-span-1'
                />
                <img
                    src={banner4}
                    alt=""
                    className='w-full h-full object-cover col-span-1 row-span-2'
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                    alt=""
                    className='w-full h-full object-cover col-span-1 row-span-1'
                />
            </div>
        </div>
    )
}

export default FeatureProduct
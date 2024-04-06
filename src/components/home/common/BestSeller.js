import React, { useEffect, useState } from 'react'
import { apiGetProducts } from 'apis/product';
import CustomSlider from '../../Utils/common/CustomSlider';
import { getNewProducts } from 'store/products/asyncAction';
import { useDispatch, useSelector } from 'react-redux';


const tabs = [
    {
        id: 1,
        name: 'Best Seller'
    },
    {
        id: 2,
        name: 'New Arrivals'
    },
]

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null)
    const [activeTab, setActiveTab] = useState(1)
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const { newProducts } = useSelector(state => state.product)
    const fetchProducts = async () => {
        const res = await apiGetProducts({ sort: '-sold' })
        if (res?.success) {
            setBestSeller(res.products)
            setProducts(res.products)
        }
    }
    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
    }, [])
    useEffect(() => {
        if (activeTab === 1) setProducts(bestSeller)
        if (activeTab === 2) setProducts(newProducts)
    }, [activeTab])
    return (
        <div>
            <div className='flex text-[20px] border-main ml-8'>
                {tabs.map(el => (
                    <span
                        key={el.id}
                        className={`${activeTab === el.id ? 'text-gray-950' : ''} font-semibold capitalize border-r px-8 text-gray-400 cursor-pointer`}
                        onClick={() => setActiveTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-t-2 border-main pt-4'>
                <CustomSlider products={products} activeTab={activeTab} />
            </div>
            <div className='w-full flex gap-4 mt-8'>
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className='flex-1 object-contain'
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt=""
                    className='flex-1 object-contain'
                />
            </div>
        </div>
    )
}

export default BestSeller
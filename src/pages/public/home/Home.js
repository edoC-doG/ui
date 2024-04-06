import React from 'react'
import { Banner, Sidebar, BestSeller, DealDaily, FeatureProduct, CustomSlider } from 'components'
import { useSelector } from 'react-redux';
import icons from 'utils/icons';

const { IoIosArrowForward } = icons

const Home = () => {
    const { newProducts } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.app)
    return (
        <>
            <div className='w-main flex mt-6'>
                <div className='w-[25%] flex flex-auto flex-col gap-5 '>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='w-[75%] flex flex-auto flex-col gap-5 pl-5 '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8 w-main'>
                <FeatureProduct />
            </div>
            <div className='my-8 w-main'>
                <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                    New Arrivals
                </h3>
                <div className=' mt-4 mx-[-10px]'>
                    <CustomSlider
                        products={newProducts}
                    />
                </div>
            </div>
            <div className='my-8 w-main'>
                <h3 className='text-[20px] uppercase font-semibold py-[15px] border-b-4 border-main'>
                    Hot collections
                </h3>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {categories?.filter(el => el.brand.length > 0)?.map((el, idx) => (
                        <div
                            key={idx}
                            className='w-[396px] '
                        >
                            <div className='flex border p-4 gap-4  min-h-[190px]' >
                                <img
                                    src={el?.image || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                                    alt=""
                                    className='w-[144px] h-[129px] flex-1 object-cover'
                                />
                                <div className='flex-1 text-gray-700'>
                                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                                    <ul className='text-sm'>
                                        {el?.brand?.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className='flex gap-1 items-center text-gray-500'
                                            >
                                                <IoIosArrowForward />
                                                <li
                                                    key={idx}
                                                >
                                                    {item}
                                                </li>
                                            </span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
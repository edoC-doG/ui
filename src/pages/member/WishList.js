import { ProductItem } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'

const WishList = () => {
    const { current } = useSelector(state => state.user)
    return (
        <div className='w-full p-4 relative'>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[250px]'>
                <h2 className='text-3xl font-bold tracking-tight'>Wish List</h2>
            </div>
            <div className='p-4 w-full flex flex-wrap gap-4'>
                {current?.wishList?.map(el => (
                    <div
                        key={el._id}
                        className='bg-white flex flex-col min-w-[300px] gap-3 py-3 rounded-md drop-shadow'
                    >
                        <ProductItem
                            pid={el._id}
                            productData={el}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WishList 
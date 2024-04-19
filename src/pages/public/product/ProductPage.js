import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { BreadCrumbs, InputSelect, ProductItem, SearchItem, Pagination } from 'components';
import { apiGetProducts } from 'apis';
import Masonry from 'react-masonry-css'
import { toast } from 'react-toastify';
import { sorts } from 'utils/constFiel';
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
}

const ProductPage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)
    const [params] = useSearchParams()
    const { category } = useParams()
    const [sort, setSort] = useState('')
    const fetchProdByCate = async (queries) => {
        const data = { ...queries, limit: process.env.REACT_APP_LIMIT }
        if (category && category !== 'products') data.category = category
        const res = await apiGetProducts(data)
        if (res.success) setProducts(res)
    }
    useEffect(() => {
        // Version1 
        // let param = []
        // for (let i of params.entries()) param.push(i)
        // const queries = {}
        // for (let i of params) queries[i[0]] = i[1]
        const queries = Object.fromEntries([...params])
        let priceQuery = {}
        if (queries.from > queries.to) {
            toast.warning('From price cannot greater than To price')
            return
        }
        if (queries.from & queries.to) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } }
                ]
            }
            delete queries.price
        } else {
            if (queries.from) queries.price = { gte: queries.from }
            if (queries.to) queries.price = { lte: queries.to }
        }
        delete queries.to
        delete queries.from
        const q = { ...priceQuery, ...queries }
        fetchProdByCate(q)
        window.scrollTo(0, 0)
    }, [params])
    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])
    const changeValue = useCallback((value) => {
        setSort(value)
    }, [sort])
    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({ sort }).toString()
            })
        }
    }, [sort])
    return (
        <div className='w-full' >
            <div className='w-full h-[81px] flex items-center justify-center bg-gray-100' >
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{category}</h3>
                    <BreadCrumbs category={category} />
                </div>
            </div>
            <div className='w-main flex justify-between m-auto border mt-8 p-4'>
                <div className='w-4/5 flex-auto flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Filter by</span>
                    <div className='flex items-center gap-4'>
                        <SearchItem
                            name='Price'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='input'
                        />
                        <SearchItem
                            name='Color'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='checkbox'
                        />
                    </div>
                </div>
                <div className='w-1/5 flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Sort By</span>
                    <span className='w-full'><InputSelect value={sort} options={sorts} changeValue={changeValue} /></span>
                </div>
            </div>
            <div className='mt-8 w-main m-auto' >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.products?.map((el, idx) => (
                        <ProductItem
                            key={idx}
                            pid={el.id}
                            productData={el}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>
            {products?.products?.length > 0 && <div className=' w-main m-auto my-4 flex justify-end'>
                <Pagination
                    totalCount={products?.counts}
                    title={'products'}
                />
            </div>}
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default ProductPage
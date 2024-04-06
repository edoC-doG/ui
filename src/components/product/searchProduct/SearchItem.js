import React, { memo, useEffect, useState } from 'react'
import icons from 'utils/icons';
import { colors } from 'utils/constFiel';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from 'apis';
import useDebounce from 'hooks/useDebounce';
import { toast } from 'react-toastify';


const { AiOutlineDown } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter, type = "checkbox" }) => {
    const { category } = useParams()
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [bestPrice, setBestPrice] = useState(35000000)
    const [params] = useSearchParams()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)
    }
    const fetchBestPriceProd = async () => {
        const res = await apiGetProducts({ sort: '-price', limit: 1 })
        if (res.success) setBestPrice(res.products[0]?.price)
    }
    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (selected.length > 0) {
            queries.color = selected.join(',')
            queries.page = 1
        } else delete queries.color
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [selected])

    useEffect(() => {
        if (type === 'input') fetchBestPriceProd()
    }, [type])

    useEffect(() => {
        if (price.from && price.to && price.from > price.to) toast.warning('From price cannot greater than To price')
    }, [])
    const deboucePriceFrom = useDebounce(price.from, 800)
    const deboucePriceTo = useDebounce(price.to, 800)
    useEffect(() => {
        const queries = Object.fromEntries([...params])
        queries.page = 1
        if (Number(price.from) > 0) queries.from = price.from
        else delete queries.from
        if (Number(price.to) > 0) queries.to = price.to
        else delete queries.to
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [deboucePriceFrom, deboucePriceTo])
    return (
        <div
            className='p-2 relative text-xs gap-6 border border-gray-800 text-gray-500 flex justify-between items-center'
        >
            <span className='capitalize' >{name}</span>
            <span className='hover:text-main cursor-pointer'> <AiOutlineDown onClick={() => changeActiveFilter(name)} /></span>
            {activeClick === name && <div className='min-w-[150px] z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white'>
                {type === 'checkbox' && <div>
                    <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setSelected([])
                                changeActiveFilter(null)
                            }}
                            className='underline cursor-pointer hover:text-main'
                        >
                            Reset
                        </span>
                    </div>
                    <div className='flex flex-col gap-3 mt-4'>
                        {colors.map((el, idx) => (
                            <div key={idx} className='flex items-center gap-4' >
                                <input
                                    type="checkbox"
                                    className='form-checkbox rounded text-main'
                                    value={el}
                                    onChange={handleSelect}
                                    id={el}
                                    checked={selected.some(selectedItem => selectedItem === el)}
                                />
                                <label
                                    htmlFor={el}
                                    className='capitalize text-gray-700'
                                >
                                    {el}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>}
                {type === 'input' && <div>
                    <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`The highest price is ${Number(bestPrice).toLocaleString()} VND`}</span>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setPrice({
                                    from: '',
                                    to: ''
                                })
                                changeActiveFilter(null)
                            }}
                            className='underline cursor-pointer hover:text-main'
                        >
                            Reset
                        </span>
                    </div>
                    <div
                        className='flex items-center p-2 gap-2'
                    >
                        <div className='flex items-center gap-2'>
                            <label htmlFor="form">Form</label>
                            <input
                                id='form'
                                type="number"
                                className='form-input'
                                value={price.form}
                                onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="form">To</label>
                            <input
                                id='to'
                                type="number"
                                className='form-input'
                                value={price.to}
                                onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)
import { apiDeleteProd, apiGetProducts } from 'apis'
import clsx from 'clsx'
import { Button, InputForm, Pagination } from 'components'
import useDebounce from 'hooks/useDebounce'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom'
import { formatMoney, formatPrice } from 'utils/helper'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'



const ManagerProduct = () => {
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [updateProd, setUpdateProd] = useState(null)
    const [params] = useSearchParams()
    const { register, formState: { errors }, watch } = useForm()
    const [counts, setCounts] = useState(0)
    const [update, setUpdate] = useState(false)

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const fetchProducts = async (data) => {
        const res = await apiGetProducts({ ...data, limit: process.env.REACT_APP_LIMIT })
        if (res.success) {
            setProduct(res.products)
            setCounts(res.counts)
        }
    }

    const handleDelete = (pid) => {
        Swal.fire({
            title: 'Are you sure',
            text: 'Are you sure remove this product',
            icon: 'error',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const res = await apiDeleteProd(pid)
                if (res.success) toast.success(res.mes)
                else toast.error(res.mes)
                render()
            }
        })
    }

    const queryDebounce = useDebounce(watch('q'), 800)
    useEffect(() => {
        if (queryDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDebounce }).toString()
            })
        } else navigate({
            pathname: location.pathname
        })
    }, [location.pathname, navigate, queryDebounce])
    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchProducts(searchParams)
    }, [params, update])
    return (
        <div className={clsx('w-full flex flex-col gap-4 p-4 relative')}>
            {updateProd && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
                <UpdateProduct
                    updateProd={updateProd}
                    render={render}
                    setUpdateProd={setUpdateProd}
                />
            </div>}
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0'>
                <h2 className='text-3xl font-bold tracking-tight'>Manage products</h2>
            </div>
            <div className='flex w-full justify-end items-center '>
                <form className='w-[45%]' >
                    <InputForm
                        id={'q'}
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search products by title, description,...'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white '>
                        <th className='text-center py-2'>Order</th>
                        <th className='text-center py-2'>Thumb</th>
                        <th className='text-center py-2'>Title</th>
                        <th className='text-center py-2'>Brand</th>
                        <th className='text-center py-2'>Category</th>
                        <th className='text-center py-2'>Price</th>
                        <th className='text-center py-2'>Quantity</th>
                        <th className='text-center py-2'>Sold</th>
                        <th className='text-center py-2'>Color</th>
                        <th className='text-center py-2'>Ratings</th>
                        <th className='text-center py-2'>Updated At</th>
                        <th className='text-center py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((el, idx) => (
                        <tr key={idx} className='border-b'>
                            <td className='text-center py-2'>{idx + 1}</td>
                            <td className='text-center py-2'>
                                <img src={el?.thumb} alt="thumb" className='w-12 h-12 object-cover' />
                            </td>
                            <td className='text-center py-2'>{el?.title}</td>
                            <td className='text-center py-2'>{el?.brand}</td>
                            <td className='text-center py-2'>{el?.category}</td>
                            <td className='text-center py-2'>{`${formatMoney(formatPrice(el?.price))} VND`}</td>
                            <td className='text-center py-2'>{el?.quantity}</td>
                            <td className='text-center py-2'>{el?.sold}</td>
                            <td className='text-center py-2'>{el?.color}</td>
                            <td className='text-center py-2'>{el?.totalRatings}</td>
                            <td className='text-center py-2'>{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
                            <td className='py-2 px-4'>
                                <div className=' flex justify-center items-center gap-2'>
                                    <Button
                                        handleOnClick={() => setUpdateProd(el)}
                                        style={`px-4 py-2 my-2 rounded-md text-white bg-blue-700 font-semibold hover:bg-blue-300`}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        handleOnClick={() => handleDelete(el._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination
                    totalCount={counts}
                    cure
                    title={'products'}
                />
            </div>
        </div>
    )
}

export default ManagerProduct
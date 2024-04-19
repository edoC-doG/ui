import { apiGetOrder } from 'apis'
import { CustomerSelect, InputForm, Pagination } from 'components'
import withBase from 'hocs/withBase'
import useDebounce from 'hooks/useDebounce'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { statusOrders } from 'utils/constFiel'
import { formatMoney, formatPrice } from 'utils/helper'
import icons from 'utils/icons'
const { BiCustomize, BiEdit, RiDeleteBin6Line } = icons

const History = ({ navigate, location }) => {
    const { register, formState: { errors }, watch } = useForm()
    const [fetchOrderList, setFetchOrder] = useState(null)
    const [counts, setCounts] = useState(0)
    const [params] = useSearchParams()
    const status = watch('status')
    const queryDebounce = useDebounce(watch('q'), 800)
    const fetchOrders = async (params) => {
        const res = await apiGetOrder({
            ...params,
            limit: process.env.REACT_APP_LIMIT
        })
        if (res.success) {
            setFetchOrder(res.orders)
            setCounts(res.counts)
        }
    }
    useEffect(() => {
        const pr = Object.fromEntries([...params])
        fetchOrders(pr)
    }, [params])
    const handelSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString()
        })
    }
    return (
        <div className='w-full flex flex-col gap-4 p-4 relative'>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[250px]'>
                <h2 className='text-3xl font-bold tracking-tight'>History</h2>
            </div>
            <div className='flex w-full justify-end items-center '>
                <form className='w-[45%] grid grid-cols-2 gap-4' >
                    <div className='col-span-1'>
                        <InputForm
                            id={'q'}
                            register={register}
                            errors={errors}
                            fullWidth
                            placeholder='Search order by status, description,...'
                        />
                    </div>
                    <div className='col-span-1 flex items-center'>
                        <CustomerSelect
                            options={statusOrders}
                            value={status}
                            onChange={(val) => handelSearchStatus(val)}
                            wrapClassName="w-full"
                        />
                    </div>
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white '>
                        <th className='text-center py-2'>#</th>
                        <th className='text-center py-2'>Products</th>
                        <th className='text-center py-2'>Total</th>
                        <th className='text-center py-2'>Status</th>
                        <th className='text-center py-2'>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchOrderList?.map((el, idx) => (
                        <tr key={idx} className='border-b'>
                            <td className='text-center py-2'>{idx + 1}</td>
                            <td className='text-center py-2 max-w-[500px]'>
                                <span className='grid grid-cols-4 gap-4'>
                                    {el.products?.map((item) => (
                                        <span key={item?._id} className='flex col-span-1 items-center gap-2'>
                                            <img
                                                src={item?.thumbNail}
                                                alt='thumb'
                                                className='w-8 h-8 rounded-md object-cover'
                                            />
                                            <span className='flex flex-col'>
                                                <span className='text-main text-xs'>{item?.title}</span>
                                                <span className='flex items-center text-xs gap-2'>
                                                    <span>Quantity:</span>
                                                    <span className='text-main'>{item?.quantity}</span>
                                                </span>
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </td>
                            <td className='text-center py-2'>{`${+el?.total} USD`}</td>
                            <td className='text-center py-2'>{el?.status}</td>
                            <td className='text-center py-2'>{moment(el?.createdAt)?.format("DD/MM/YYYY")}</td>
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

export default withBase(History)
import React, { useEffect, useState, memo } from 'react'
import icons from 'utils/icons'
import { apiGetProducts } from 'apis/product'
import { formatMoney, formatPrice, renderStarFromNumber, secondsToHms } from 'utils/helper'
import { CountDown } from '../..'
import moment from 'moment'
import { useSelector } from 'react-redux'
import withBase from 'hocs/withBase'
import { getDealDaily } from 'store/products/productSlice'

const { AiFillStar, IoMenu } = icons
let idInterval
const DealDaily = ({ dispatch }) => {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [expireTime, setExpire] = useState(false)
    const { dealDay } = useSelector(state => state.product)

    const fetchDealDaily = async () => {
        const res = await apiGetProducts({
            sort: "-totalRatings",
            limit: 20
        })
        if (res.success) {
            const pr = res.products[Math.round(Math.random() * 20)]
            dispatch(getDealDaily({ data: pr, time: Date.now() + 24 * 60 * 60 * 1000 }))
        }
    }
    useEffect(() => {
        if (dealDay?.time) {
            const deltaTime = dealDay.time - Date.now()
            const number = secondsToHms(deltaTime)
            setHours(number.h)
            setMinutes(number.m)
            setSeconds(number.s)
        }
    }, [dealDay])
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        if (moment(moment(dealDay?.time).format('MM/DD/YYYY')).isBefore(moment())) fetchDealDaily()
    }, [expireTime])
    useEffect(() => {
        idInterval = setInterval(() => {
            if (seconds > 0) setSeconds(prev => prev - 1)
            else {
                if (minutes > 0) {
                    setMinutes(prev => prev - 1)
                    setSeconds(59)
                } else {
                    if (hours > 0) {
                        setHours(prev => prev - 1)
                        setMinutes(59)
                        setSeconds(59)
                    } else {
                        setExpire(!expireTime)
                    }
                }
            }
        }, 1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [seconds, minutes, hours, expireTime])
    return (
        <div className='w-full border flex-auto'>
            <div className='w-full flex items-center justify-between p-4'>
                <span className='flex-1 flex justify-center'><AiFillStar size={20} color='red' /></span>
                <span className='flex-8 flex justify-center font-semibold text-[20px] text-center'>DEAL DAILY</span>
                <span className='flex-1'></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img
                    src={dealDay?.data?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="Images"
                    className='w-full object-contain'
                />
                <span className='line-clamp-1 text-center'>{dealDay?.data?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealDay?.data?.totalRatings, 20)?.map((el, idx) => (
                    <span key={idx}>{el}</span>
                ))}</span>
                <span>{`${formatMoney(formatPrice((dealDay?.data?.price)))} VNĐ`}</span>
            </div>
            <div className='px-4 mt-8'>
                <div className='flex justify-center gap-2 items-center mb-4'>
                    <CountDown unit={'Hours'} number={hours} />
                    <CountDown unit={'Minutes'} number={minutes} />
                    <CountDown unit={'Seconds'} number={seconds} />
                </div>
                <button
                    className='w-full flex gap-2 items-center justify-center bg-main hover:bg-gray-800 text-white font-medium py-2'
                    type='button'
                >
                    <IoMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default withBase(memo(DealDaily))
import React, { useEffect, useState, memo } from 'react'
import icons from 'utils/icons'
import { apiGetProducts } from 'apis/product'
import { formatMoney, formatPrice, renderStarFromNumber, secondsToHms } from 'utils/helper'
import { CountDown } from '../..'
import moment from 'moment'

const { AiFillStar, IoMenu } = icons
let idInterval
const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [expireTime, setExpire] = useState(false)

    const fetchDealDaily = async () => {
        const res = await apiGetProducts({
            limit: 1,
            page: Math.round(Math.random() * 10),
            // totalRatings: 5
        })
        if (res.success) {
            setDealDaily(res.products[0])
            const today = `${moment().format('MM/DD/YYYY')} 7:00:00`
            const second = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            const number = secondsToHms(second)
            setHours(number.h)
            setMinutes(number.m)
            setSeconds(number.s)
        } else {
            setHours(0)
            setMinutes(59)
            setSeconds(59)
        }
    }
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        setTimeout(() => {
            fetchDealDaily()
        }, 5000)
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
                    src={dealDaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="Images"
                    className='w-full object-contain'
                />
                <span className='line-clamp-1 text-center'>{dealDaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealDaily?.totalRatings, 20)?.map((el, idx) => (
                    <span key={idx}>{el}</span>
                ))}</span>
                <span>{`${formatMoney(formatPrice((dealDaily?.price)))} VNĐ`}</span>
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

export default memo(DealDaily)
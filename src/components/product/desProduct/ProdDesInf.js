import React, { memo, useState, useCallback } from 'react'
import { tabsProd } from 'utils/constFiel'
import { Button, Comment, RatingBar, VoteOption } from '../..'
import { renderStarFromNumber, validate } from 'utils/helper'
import { apiRatings } from 'apis'
import { showModal } from 'store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import path from 'utils/path'
import { useNavigate } from 'react-router-dom';


const ProdDesInf = ({ ratings, total, nameProduct, pid, reRender }) => {
    const [activeTab, setActiveTab] = useState(1)
    const { isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmitVoteOption = useCallback(async ({ comment, score }) => {
        if (!score || !pid || !comment) {
            toast.warning('Please check your forms!!!')
            return
        }
        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        reRender()
    }, [])
    const handleVoteNow = useCallback(() => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go Login',
                showCancelButton: true,
                title: 'Opps',
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)

            })
        } else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren:
                    <VoteOption
                        nameProduct={nameProduct}
                        handleSubmitVoteOption={handleSubmitVoteOption}
                    />
            }))
        }
    }, [])
    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {tabsProd.map((el, idx) => (
                    <span
                        className={`py-2 px-4 cursor-pointer ${activeTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        key={idx}
                        onClick={() => setActiveTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full p-4 border'>
                {tabsProd.some(el => el.id === activeTab) && tabsProd.find(el => el.id === activeTab)?.content}
            </div>
            <div className='flex flex-col w-main py-8'>
                <div className='flex border'>
                    <div className='flex-4 flex flex-col items-center justify-center '>
                        <span className='font-semibold text-3xl'>{`${total}/5`}</span>
                        <span className='flex items-center gap-1'>
                            {renderStarFromNumber(total)?.map((el, idx) => (
                                <span key={idx}>{el}</span>
                            ))}
                        </span>
                        <span className=' text-sm'>
                            {`${ratings?.length} reviews and cementers`}
                        </span>
                    </div>
                    <div className='flex-6 flex flex-col p-4 gap-2'>
                        {Array.from(Array(5).keys()).reverse().map(el => (
                            <RatingBar
                                key={el}
                                number={el + 1}
                                ratingCount={ratings?.length}
                                ratingTotal={ratings?.filter(item => item.start === el + 1)?.length}
                            />
                        ))}
                    </div>
                </div>
                <div className='p-2 flex items-center justify-center text-sm flex-col gap-2'>
                    <span>Do you review this product ?</span>
                    <Button
                        handleOnClick={handleVoteNow}
                    >
                        Rate Now
                    </Button>
                </div>
                <div className='flex flex-col gap-4'>
                    {ratings?.map(el => (
                        <Comment
                            key={el._id}
                            total={el.star}
                            updateAt={el.updateAt}
                            comment={el.comment}
                            name={`${el.postedBy?.lastName} ${el.postedBy?.firstName}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(ProdDesInf)
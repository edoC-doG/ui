import React, { memo, useEffect, useRef, useState } from 'react'
import logo from 'assets/logo.png'
import { voteOption } from 'utils/constFiel'
import icons from 'utils/icons'
import { Button } from '../..'

const { AiFillStar } = icons
const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
    const modalRef = useRef()
    const [chosenStart, setChosenStart] = useState(null)
    const [comment, setComment] = useState('')
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div
            ref={modalRef}
            className='bg-white w-[700px] p-4 gap-4 flex flex-col items-center justify-center'
            onClick={e => e.stopPropagation()}
        >
            <img src={logo} alt='logo' className='w-[300px] my-8 object-contain' />
            <h2 className='text-center text-medium text-lg'>{`Voting product ${nameProduct}`}</h2>
            <textarea
                className='form-textarea w-full placeholder:italic placeholder:text-xs text-sm placeholder:text-gray-500'
                placeholder='Type Somethings'
                value={comment}
                onChange={e => setComment(e.target.value)}
            >
            </textarea>
            <div className='w-full flex flex-col gap-4'>
                <p>How do you would like this product ?</p>
                <div className=' flex justify-center items-center gap-4'>
                    {voteOption.map((el, idx) => (
                        <div
                            className='w-[80px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md flex items-center justify-center flex-col gap-2 p-4'
                            key={idx}
                            onClick={() => setChosenStart(el.id)}
                        >
                            {(Number(chosenStart)) && chosenStart >= el.id ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                fw
                handleOnClick={() => handleSubmitVoteOption({ comment, score: chosenStart })}
            >
                Submit
            </Button>
        </div>
    )
}

export default memo(VoteOption)
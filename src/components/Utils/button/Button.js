import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : `${fw ? 'w-full' : 'w-fit'} px-4 py-2 my-2 rounded-md text-white bg-main hover:bg-red-300 font-semibold`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button)
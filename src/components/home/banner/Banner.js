import React, { memo } from 'react'

const Banner = () => {
    return (
        <div>
            <img src="https://file.hstatic.net/200000722513/file/sam_tet_-_slider__1__d8239933b18c4f1dbaff1349b0a291e1.png"
                alt="banner"
                className='h-[400px] w-full object-cover'
            />
        </div>
    )
}

export default memo(Banner)
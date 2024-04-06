import React, { useState } from 'react'
import { Button } from 'components'
import { useParams } from 'react-router-dom';
import { apiResetPwd } from "apis/user";
import { toast } from 'react-toastify';


const ResetPwd = () => {
    const [password, setPassword] = useState(null)
    const { token } = useParams()
    const handleForgotPwd = async () => {
        const res = await apiResetPwd({ password, token })
        if (res.success) {
            toast.success(res.mes)
        } else toast.error(res.mes)
    }
    return (
        <div>
            <div className='absolute top-0 left-0 bottom-0 right-0 animate-slide-right bg-white flex flex-col items-center py-8 z-50'>
                <div className=' flex flex-col gap-4'>
                    <label htmlFor="password">Enter your new Password:</label>
                    <input
                        type="text"
                        id='password'
                        className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                        placeholder='Type here'
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='w-full flex items-center justify-end gap-4'>
                        <Button
                            handleOnClick={handleForgotPwd}
                            style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPwd
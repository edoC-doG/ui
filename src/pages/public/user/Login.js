import React, { useCallback, useEffect, useState } from 'react'
import login from 'assets/login.jpg'
import { Button, InputField, Loading } from 'components'
import { apiLogin, apiForgotPwd, apiFinalRegister, apiRegister } from 'apis/user'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import path from 'utils/path'
import { registerV2 } from 'store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { validate } from 'utils/helper'
import { showModal } from 'store/app/appSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isRegister, setRegister] = useState(false)
    const [isForgotPwD, setIsForgotPwD] = useState(false)
    const [email, setEmail] = useState(null)
    const [token, setToken] = useState('')
    const [isVerifiedEmail, setisVerifiedEmail] = useState(false)
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        mobile: '',
        firstName: '',
        lastName: ''
    })
    const [invalidFields, setInvalidFields] = useState([])
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            mobile: '',
            firstName: '',
            lastName: ''
        })
    }
    useEffect(() => {
        resetPayload()
    }, [isRegister])
    const handleSubmit = useCallback(async () => {
        const { firstName, lastName, mobile, ...data } = payload
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const res = await apiRegister(payload)
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                if (res.success) {
                    setisVerifiedEmail(true)
                } else Swal.fire('Oops!', res.mes, 'error')
            } else {
                const rs = await apiLogin(data)
                if (rs.success) {
                    dispatch(registerV2({ isLoggedIn: true, userData: rs.userData, token: rs.accessToken }))
                    navigate(`/${path.HOME}`)
                } else Swal.fire('Oops!', rs.mes, 'error')
            }
        }
    }, [payload, isRegister])
    const handleForgotPwd = async () => {
        const res = await apiForgotPwd({ email })
        if (res.success) {
            toast.success(res.mes)
        } else toast.error(res.mes)
    }
    const finalRegister = async () => {
        const res = await apiFinalRegister(token)
        if (res.success) {
            Swal.fire('Congratulation !!!', res.mes, 'success').then(() => {
                setRegister(false)
                resetPayload()
            })
        } else Swal.fire('Oops!', res.mes, 'error')
        setisVerifiedEmail(false)
        setToken('')

    }
    return (
        <div className='w-screen h-screen relative'>
            {isVerifiedEmail && <div className='w-full flex flex-col items-center justify-center absolute  top-0 right-0 bottom-0 left-0 animate-slide-top bg-overlay z-50'>
                <div className='bg-white w-[500px] rounded-md p-8'>
                    <h4 className=''>
                        We sent a code to your mail. Please check your mail and enter your code:
                    </h4>
                    <input
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        type="text"
                        className='p-2 border rounded-md outline-none'
                    />
                    <Button
                        handleOnClick={() => finalRegister()}
                        style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 ml-4'
                    >
                        Submit
                    </Button>
                </div>
            </div>}
            {isForgotPwD && <div className='absolute top-0 left-0 bottom-0 right-0 animate-slide-right bg-white flex flex-col items-center py-8 z-50'>
                <div className=' flex flex-col gap-4'>
                    <label htmlFor="email">Enter your email:</label>
                    <input
                        type="text"
                        id='email'
                        className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                        placeholder='Exp: email@gmail.com'
                        value={email || ""}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='w-full flex items-center justify-end gap-4'>
                        <Button
                            handleOnClick={handleForgotPwd}
                            style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                        >
                            Sumbit
                        </Button>
                        <Button
                            handleOnClick={() => setIsForgotPwD(false)}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>}
            <img
                src={login}
                alt="Login Page"
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center'>
                <div className='min-w-[500px] flex flex-col items-center p-8 bg-white rounded-md  '>
                    <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div>
                        <div className='flex items-center gap-2'>
                            <InputField
                                fw
                                value={payload.lastName}
                                setValue={setPayload}
                                nameKey='lastName'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                fw
                                value={payload.firstName}
                                setValue={setPayload}
                                nameKey='firstName'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                        <InputField
                            fw
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                    }
                    <InputField
                        fw
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputField
                        fw
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button
                        fw
                        handleOnClick={handleSubmit}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                    <div className='flex items-center justify-between mt-2 w-full text-sm'>
                        {!isRegister && <span
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setIsForgotPwD(true)}
                        >
                            Forgot your account ?
                        </span>}
                        {!isRegister && <span
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setRegister(true)}
                        >
                            Create account ?
                        </span>}
                        {isRegister && <span
                            className='w-full text-center text-blue-500 hover:underline cursor-pointer '
                            onClick={() => setRegister(false)}
                        >
                            Go login
                        </span>}
                    </div>
                    <Link
                        className='w-full text-center text-blue-500 text-sm hover:underline cursor-pointer '
                        to={`/${path.HOME}`}
                    >
                        Go Home ?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
import { Button, InputForm, Loading } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import avatar from 'assets/userDefault.png';
import { apiUpdateCurrent } from 'apis'
import { getCurrentUser } from 'store/user/asyncAction'
import Swal from 'sweetalert2'
import { showModal } from 'store/app/appSlice'
import { useSearchParams } from 'react-router-dom'
import withBase from 'hocs/withBase'

const Member = ({ navigate, dispatch }) => {
    const { register, formState: { errors, isDirty }, reset, handleSubmit, watch } = useForm()
    const { current } = useSelector(state => state.user)
    const [searchParams] = useSearchParams()
    useEffect(() => {
        reset({
            firstName: current?.firstName,
            lastName: current?.lastName,
            email: current?.email,
            mobile: current?.mobile,
            avatar: current?.avatar,
            address: current?.address,
        })
    }, [])
    const handleUpdateInf = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const res = await apiUpdateCurrent(formData)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        if (res.success) {
            dispatch(getCurrentUser())
            Swal.fire('Congratulation !!!', res.mes, 'success')
            if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
        } else Swal.fire('Some thing went wrong !!!', res.mes, 'error')
    }
    return (
        <div className='w-full flex flex-col gap-4 p-4 relative'>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[250px]'>
                <h2 className='text-3xl font-bold tracking-tight'>Personal</h2>
            </div>
            <form
                onSubmit={handleSubmit(handleUpdateInf)}
                className='w-3/5 mx-auto py-8 flex flex-col gap-4'
            >
                <InputForm
                    label='First Name'
                    register={register}
                    errors={errors}
                    id='firstName'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Last Name'
                    register={register}
                    errors={errors}
                    id='lastName'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Email Address'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email Invalid"
                        }
                    }}
                />
                <InputForm
                    label='Mobile'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: "Phone Invalid"
                        }
                    }}
                /><InputForm
                    label='Address'
                    register={register}
                    errors={errors}
                    id='address'
                    validate={{
                        required: 'Need fill this field',
                    }}
                />
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Account status: </span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Role: </span>
                    <span>{+current?.role === 2000 ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Create At: </span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Profile image:</span>
                    <label htmlFor="file">
                        <img src={current?.avatar || avatar} alt="avatar" className='cursor-pointer w-20 h-20 ml-8 object-cover rounded-full' />
                    </label>
                    <input type="file" id='file' {...register('avatar')} hidden />
                </div>
                {isDirty && <div className='w-full flex justify-end'>
                    <Button
                        type='submit'
                    >
                        Updated Information
                    </Button>
                </div>}
            </form>
        </div>
    )
}

export default withBase(Member)
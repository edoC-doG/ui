import { apiDeleteUser, apiGetUser, apiUpdateUser } from 'apis'
import React, { useCallback, useEffect, useState } from 'react'
import { blockStatus, roleList } from 'utils/constFiel'
import moment from 'moment'
import useDebounce from 'hooks/useDebounce'
import { Button, InputField, InputForm, Pagination, Select } from 'components'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import clsx from 'clsx'

const ManagerUser = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        mobile: '',
        isBlocked: '',
    })
    const [users, setUsers] = useState(null)
    const [editElm, setEditElm] = useState(null)
    const [update, setUpdate] = useState(false)
    const [querySearch, setQuerySearch] = useState({
        q: ""
    })
    const [params] = useSearchParams()
    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])
    const fetchUsers = async (data) => {
        const res = await apiGetUser({ ...data, limit: process.env.REACT_APP_LIMIT })
        if (res.success) setUsers(res)
    }
    const queriesDebounce = useDebounce(querySearch.q, 1000)
    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) queries.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params, update])
    useEffect(() => {
        if (editElm) reset({
            role: editElm.role,
            email: editElm.email,
            firstName: editElm.firstName,
            lastName: editElm.lastName,
            mobile: editElm.mobile,
            isBlocked: editElm.isBlocked,
        })
    }, [editElm])
    const handleUpdate = async (data) => {
        const res = await apiUpdateUser(data, editElm._id)
        if (res.success) {
            render()
            setEditElm(null)
            toast.success(res.mes)
        } else toast.error(res.mes)
    }
    const handleDelete = (uid) => {
        console.log(uid)
        Swal.fire({
            title: 'Are you sure delete this user',
            text: ' Are you ready remove this user ?',
            showCancelButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apiDeleteUser(uid)
                if (res.success) {
                    render()
                    toast.success(res.mes)
                } else toast.error(res.mes)
            }
        })
    }
    return (
        <div className={clsx('w-full', editElm && 'pl-16')}>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Manage users</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={querySearch.q}
                        setValue={setQuerySearch}
                        style={`w-[500px]`}
                        placeholder='Search User'
                        isShowLabel
                    />
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editElm && <Button
                        type='submit'
                        style={`px-4 py-2 my-2 rounded-md text-white bg-blue-700 font-semibold hover:bg-blue-300`}
                    >
                        Update
                    </Button>}
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='font-bold bg-gray-700 text-[13px]  text-white'>
                            <tr className='border border-gray-500'>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email</th>
                                <th className='px-4 py-2'>First Name</th>
                                <th className='px-4 py-2'>Last Name</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Create At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((el, idx) => (
                                <tr key={idx} className='border border-gray-500 text-start'>
                                    <td className='py-2 px-4'>
                                        {idx + 1}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputForm
                                                register={register}
                                                errors={errors}
                                                fullWidth
                                                id={'email'}
                                                validate={{
                                                    required: 'Require fill',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                }}
                                                defaultValue={editElm?.email}
                                            />
                                            : <span>
                                                {el.email}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputForm
                                                register={register}
                                                errors={errors}
                                                fullWidth
                                                id={'firstName'}
                                                validate={{ required: 'Require fill' }}
                                                defaultValue={editElm?.firstName}
                                            />
                                            : <span>
                                                {el.firstName}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputForm
                                                register={register}
                                                errors={errors}
                                                fullWidth
                                                id={'lastName'}
                                                validate={{ required: 'Require fill' }}
                                                defaultValue={editElm?.lastName}
                                            />
                                            : <span>
                                                {el.lastName}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <Select
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={el.role}
                                                id={'role'}
                                                validate={{ required: 'Require fill' }}
                                                options={roleList}
                                            />
                                            : <span>
                                                {roleList.find(item => +item.code === +el.role)?.value}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={editElm?.mobile}
                                                fullWidth
                                                id={'mobile'}
                                                validate={{
                                                    required: 'Require fill',
                                                    pattern: {
                                                        value: /^(?!.*00)0\d{9}$/gi,
                                                        message: "Invalid phone number"
                                                    }
                                                }}
                                            />
                                            : <span>
                                                {el.mobile}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {editElm?._id === el._id
                                            ? <Select
                                                register={register}
                                                fullWidth
                                                errors={errors}
                                                defaultValue={el.isBlocked}
                                                id={'isBlocked'}
                                                validate={{ required: 'Require fill' }}
                                                options={blockStatus}
                                            />
                                            : <span>
                                                {el.isBlocked ? 'Blocked' : 'Active'}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-4 '>
                                        {moment(el.createAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='py-2 px-4'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            {editElm?._id === el._id
                                                ? <Button
                                                    handleOnClick={() => setEditElm(null)}
                                                    style={`px-4 py-2 my-2 rounded-md text-white bg-blue-700 font-semibold hover:bg-blue-300`}
                                                >
                                                    Back
                                                </Button>
                                                : <Button
                                                    handleOnClick={() => setEditElm(el)}
                                                    style={`px-4 py-2 my-2 rounded-md text-white bg-blue-700 font-semibold hover:bg-blue-300`}
                                                >
                                                    Edit
                                                </Button>
                                            }

                                            <Button
                                                handleOnClick={() => handleDelete(el._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='w-full text-right p-4'>
                <Pagination
                    title={'users'}
                    totalCount={users?.counts}
                />
            </div>
        </div >
    )
}

export default ManagerUser
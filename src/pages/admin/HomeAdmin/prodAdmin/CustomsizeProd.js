import { apiAddVarriant } from 'apis'
import clsx from 'clsx'
import { Button, InputForm, Loading } from 'components'
import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import Swal from 'sweetalert2'
import { getBase64 } from 'utils/helper'
import icons from 'utils/icons'

const { IoTrashBinOutline } = icons

const CustomsizeProd = ({ customizeVariants, render, setCustomizeVariants }) => {
    const dispatch = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [hoverElm, setHoverElm] = useState(null)
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const handleBase64 = async (file) => {
        const toBase64 = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
    const handleRemoveImg = (name) => {
        const files = [...watch('images')]
        const imagePath = files?.filter(el => el.name !== name)
        reset({ images: imagePath })
        if (preview?.images.some(el => el.name === name)) setPreview(prev => ({ ...prev, images: prev?.images?.filter(el => el.name !== name) }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Files not supported')
            }
            const base64 = await getBase64(file)
            imagesPreview.push({
                name: file.name, path: base64
            })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }
    const handleCreateVar = async (data) => {
        if (data.color === customizeVariants.color) Swal.fire('Some thing went wrong !!!', "Color not changed", 'info')
        else {
            const formData = new FormData()
            for (let i of Object.entries(data)) formData.append(i[0], i[1])
            if (data.thumb) formData.append('thumb', data.thumb[0])
            if (data.images) {
                for (let image of data.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const res = await apiAddVarriant(formData, customizeVariants._id)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (res.success) {
                Swal.fire('Congratulation !!!', res.mes, 'success').then(() => {
                    reset()
                    setPreview({
                        thumb: '',
                        image: []
                    })
                })
            } else Swal.fire('Some thing went wrong !!!', res.mes, 'error')
        }
    }
    useEffect(() => {
        handleBase64(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')])
    useEffect(() => {
        reset({
            title: customizeVariants?.title,
            color: customizeVariants?.color,
            price: customizeVariants?.price,
        });
    }, [customizeVariants])
    return (
        <div className={clsx('w-full flex flex-col gap-4 p-4 relative')}>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[327px]'>
                <h2 className='text-3xl font-bold tracking-tight'>Variants products</h2>
                <Button
                    handleOnClick={() => setCustomizeVariants(null)}
                >
                    Cancel
                </Button>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateVar)}>
                    <div className='w-full flex gap-4 my-6'>
                        <InputForm
                            label='Original Name'
                            register={register}
                            errors={errors}
                            id="title"
                            style={`flex-1`}
                            fullWidth
                            validate={{
                                required: 'Need fill this field'
                            }}
                            placeholder='Title of new product'
                        />
                    </div>
                    <div className='w-full flex gap-4 my-6'>
                        <InputForm
                            label='Price'
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-auto`}
                            placeholder='Price of new product'
                            type='number'
                        />
                        <InputForm
                            label='Color'
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-auto`}
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div
                            onClick={e => e.stopPropagation()}
                            className='flex flex-col gap-2 mt-8'>
                            <label className='font-semibold' htmlFor="thumb">Upload Thumb</label>
                            <input
                                className='cursor-pointer max-w-[400px]'
                                id='thumb'
                                {...register('thumb', { required: 'Need fill this field' })}
                                type="file"
                            />
                            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                        </div>
                        {preview.thumb && <div className='my-4'>
                            <img src={preview.thumb} alt="thumb" className='w-[200px] object-contain' />
                        </div>}
                        <div className=' flex flex-col gap-2 my-4'>
                            <label className='font-semibold' htmlFor="images">Upload Images</label>
                            <input
                                className='cursor-pointer max-w-[400px]'
                                id='images'
                                multiple
                                {...register('images', { required: 'Need fill this field' })}
                                type="file"
                            />
                            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                        </div>
                        {preview.images.length > 0 && <div className='flex flex-wrap w-full gap-3 my-4 '>
                            {preview.images?.map((el, idx) => (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHoverElm(el.name)}
                                    onMouseLeave={() => setHoverElm(null)}
                                    className='w-fit relative'
                                >
                                    <img src={el.path} alt="products" className='w-[200px] object-contain' />
                                    {hoverElm === el.name &&
                                        <div
                                            className='absolute flex items-center justify-center animate-scale-up-center inset-0 bg-overlay cursor-pointer'
                                            onClick={() => handleRemoveImg(el.name)}
                                        >
                                            <IoTrashBinOutline size={24} color='white' />
                                        </div>}
                                </div>
                            ))}
                        </div>}
                    </div>
                    <Button type='submit'>Create Variants Product</Button>
                </form>
            </div>
        </div>
    )
}

export default memo(CustomsizeProd)
import clsx from 'clsx'
import { Button, InputForm, Loading, MarkDownEditor, Select } from 'components'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import { getBase64, validate } from 'utils/helper';
import { toast } from 'react-toastify';
import { apiUpdateProd } from 'apis';
import { showModal } from 'store/app/appSlice';


const UpdateProduct = ({ updateProd, render, setUpdateProd }) => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    const handleBase64 = async (file) => {
        const toBase64 = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Files not supported')
            }
            const base64 = await getBase64(file)
            imagesPreview.push(
                base64
            )
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }
    useEffect(() => {
        reset({
            title: updateProd?.title || '',
            price: updateProd?.price || '',
            quantity: updateProd?.quantity || '',
            color: updateProd?.color || '',
            category: updateProd?.category || '',
            brand: updateProd?.brand?.toLowerCase() || '',
        })
        setPayload({ description: typeof updateProd?.description === 'object' ? updateProd?.description?.join(', ') : updateProd?.description })
        setPreview({
            thumb: updateProd?.thumb || '',
            images: updateProd?.images || []
        })
    }, [updateProd])

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0)
            handleBase64(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0)
            handlePreviewImages(watch('images'))
    }, [watch('images')])

    const handleUpdateProd = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el.title === data.category)?.title
            const finalPayload = { ...data, ...payload }
            finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            finalPayload.images = data?.image?.length === 0 ? preview.images : data.images
            for (let image of finalPayload.images) formData.append('images', image)

            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))

            const res = await apiUpdateProd(formData, updateProd._id)

            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (res.success) {
                render()
                setUpdateProd(null)
                toast.success(res?.mes)
            } else toast.error(res?.mes)
        }
    }
    return (
        <div className={clsx('w-full flex flex-col gap-4 p-4 relative')}>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center fixed top-0 right-0 left-[327px]'>
                <h2 className='text-3xl font-bold tracking-tight'>Update products</h2>
                <Button
                    handleOnClick={() => setUpdateProd(null)}
                >
                    Cancel
                </Button>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProd)}>
                    <InputForm
                        label='Name Product'
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: 'Need fill this field'
                        }}
                        fullWidth
                        placeholder='Name of new product'
                    />
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
                            style={`flex-1`}
                            placeholder='Price of new product'
                        />
                        <InputForm
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{
                                required: 'Need fill this field'
                            }}
                            fullWidth={true}
                            style={`flex-1`}
                            placeholder='Quantity of new product'
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
                            style={`flex-1`}
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='w-full flex gap-4 my-6'>
                        <Select
                            fullWidth={true}
                            register={register}
                            label='Category'
                            options={categories?.map(el => ({ code: el?.title, value: el?.title }))}
                            id='category'
                            errors={errors}
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style={`flex-auto`}
                        />
                        <Select
                            fullWidth={true}
                            errors={errors}
                            register={register}
                            label='Brand'
                            options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({
                                code: el.toLowerCase(), value: el
                            }))}
                            id='brand'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style={`flex-auto`}
                        />
                    </div>
                    <MarkDownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload?.description}
                    />
                    <div className='flex flex-col'>
                        <div
                            className='flex flex-col gap-2 mt-8'>
                            <label className='font-semibold' htmlFor="thumb">Upload Thumb</label>
                            <input
                                className='cursor-pointer max-w-[400px]'
                                id='thumb'
                                {...register('thumb')}
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
                                {...register('images')}
                                type="file"
                            />
                            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                        </div>
                        {preview.images.length > 0 && <div className='flex flex-wrap w-full gap-3 my-4 '>
                            {preview.images?.map((el, idx) => (
                                <div
                                    key={idx}
                                    className='w-fit relative'
                                >
                                    <img src={el} alt="products" className='w-[200px] object-contain' />
                                </div>
                            ))}
                        </div>}
                    </div>
                    <Button type='submit'>Update New Product</Button>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)
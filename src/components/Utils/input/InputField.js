import React, { memo } from 'react'
import clsx from 'clsx'

const InputField = ({
    value,
    setValue,
    nameKey,
    type,
    invalidFields,
    setInvalidFields,
    style,
    fw,
    placeholder,
    isShowLabel
}) => {
    return (
        <div className={clsx('flex-col flex relative mb-2', fw && 'w-full', style)}>

            {isShowLabel && value?.trim() !== '' && <label
                htmlFor={nameKey}
                className='text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm'
            >
                {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>}
            <input
                type={type || 'text'}
                className={clsx('w-full px-4 py-2 mt-2 rounded-sm border placeholder:text-sm  placeholder:italic outline-none', style)}
                placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(el => el.name === nameKey) && <small className='text-main italic '>{invalidFields?.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

export default memo(InputField)
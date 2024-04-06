import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            setDebounceValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeoutId)
        }
    }, [value, ms])
    return debounceValue
}

export default useDebounce

// muốn:khi mà nhập thay đổi giá thì sẽ gọi API
// vấn đề: gọi API liên tục theo mỗi lần nhập
//resolve: chỉ call api khi mà người dùng nhập xong
// thời gian onchange


// tách price thành 2 biến
//1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó =>  UI RENDER
//2. biến thứ dùng qđ call api => settimeout => biến sẽ gán sau 1 khoảng thời gian
import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true
})
export const apiFinalRegister = (token) => axios({
    url: '/user/final-register/' + token,
    method: 'post',
})
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiForgotPwd = (data) => axios({
    url: '/user/forgotPassword',
    method: 'post',
    data
})

export const apiResetPwd = (data) => axios({
    url: '/user/resetPassword',
    method: 'put',
    data
})

export const apiGetCurrent = (data) => axios({
    url: '/user/current',
    method: 'get',
    data
})

export const apiGetUser = (params) => axios({
    url: '/user',
    method: 'get',
    params
})

export const apiUpdateUser = (data, uid) => axios({
    url: '/user/' + uid,
    method: 'put',
    data
})

export const apiDeleteUser = (uid) => axios({
    url: '/user/' + uid,
    method: 'delete',
})

export const apiUpdateCurrent = (data) => axios({
    url: '/user/current',
    method: 'put',
    data
})
export const apiUpdateCart = (data) => axios({
    url: '/user/cart',
    method: 'put',
    data
})
export const apiRemoveCart = (pid, color) => axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: 'delete',
})
export const apiUpdateWishList = (pid) => axios({
    url: "user/wish-list/" + pid,
    method: 'put',
})
export const apiCreateOrder = (data) => axios({
    url: "/order/",
    method: 'post',
    data
})
export const apiGetOrderAdmin = (params) => axios({
    url: "/order/admin",
    method: 'get',
    params
})
export const apiGetOrder = (params) => axios({
    url: "/order/",
    method: 'get',
    params
})
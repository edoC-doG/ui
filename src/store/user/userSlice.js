import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: '',
        currentCart: [],
    },
    reducers: {
        registerV2: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.current = null;
        },
        clearMessage: (state) => {
            state.mes = ''
        },
        updateCart: (state, action) => {
            const { pid, color, quantity } = action.payload
            const updateCartProxy = JSON.parse(JSON.stringify(state.currentCart))
            const updatedItem = updateCartProxy.map(el => {
                if (el.color === color && el.product?._id === pid) {
                    return { ...el, quantity }
                } else return el
            })
            state.currentCart = updatedItem
        }
    },
    extraReducers: (builder) => {
        builder.addCase(action.getCurrentUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(action.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.currentCart = action.payload.cart;
        })
        builder.addCase(action.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null
            state.mes = 'Login session has expired. Please Login Again !!!'
        })
    }
});

export const { registerV2, logout, clearMessage, updateCart } = userSlice.actions;

export default userSlice.reducer;
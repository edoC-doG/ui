import { createSlice } from '@reduxjs/toolkit'
import * as action from './asyncAction'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
        isLoading: false,
        dealDay: null,
    },
    reducers: {
        getDealDaily: (state, action) => {
            state.dealDay = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(action.getNewProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(action.getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        })
        builder.addCase(action.getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        })
    }
})

export const { getDealDaily } = productSlice.actions

export default productSlice.reducer

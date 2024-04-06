import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from 'apis'

export const getCategories = createAsyncThunk(
    'app/categories',
    async (data, { rejectWithValue }) => {
        const res = await apis.apiGetCategories()
        if (!res.success) return rejectWithValue(res)
        return res.getProductCategory
    }
)
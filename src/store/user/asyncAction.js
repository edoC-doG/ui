import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from 'apis'

export const getCurrentUser = createAsyncThunk(
    'user/current',
    async (data, { rejectWithValue }) => {
        const res = await apis.apiGetCurrent()
        if (!res.success) return rejectWithValue(res)
        return res.rs

    }
)
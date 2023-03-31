import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
})
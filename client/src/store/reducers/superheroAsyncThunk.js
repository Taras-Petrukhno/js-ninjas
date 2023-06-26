import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPage = createAsyncThunk(
    'superhero/fetchSuperheroes',
    async ({ pageNumber = 1, countPerPage = 5 }, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3001/superhero/list/${countPerPage}/${pageNumber}`);
            const data = await response.json();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Text of error: ', e.message)
        }
    })

export const deleteHeroById = createAsyncThunk(
    'superhero/deleteHeroById',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3001/superhero/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Text of error: ', e.message)
        }
    })


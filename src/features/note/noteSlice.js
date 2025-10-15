import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadNote } from "./noteAPI";

export const saveNoteThunk = createAsyncThunk("/note/upload", async (payload, { rejectWithValue }) => {
    try {
        const response = await uploadNote(payload)
        return response
    } catch (error) {
        console.error("SAVE NOTE THUNK ERROR:", error.message);
        return rejectWithValue(error.message);
    }
})

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        content: "",
        option: false,
        loading: {
            upload: false
        }
    },
    reducers: {
        setContent: (state, aciton) => { state.content = aciton.payload },
        setOption: state => { state.option = !state.option }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveNoteThunk.pending, (state) => {
                state.loading.upload = true;
            })
            .addCase(saveNoteThunk.rejected, (state) => {
                state.loading.upload = false;
            })
            .addCase(saveNoteThunk.fulfilled, (state) => {
                state.loading.upload = false;
            })
    }
})

export const { setOption, setContent } = noteSlice.actions

export default noteSlice.reducer
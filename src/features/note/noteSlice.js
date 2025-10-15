import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotes, uploadNote } from "./noteAPI";

export const saveNoteThunk = createAsyncThunk("/note/upload", async (payload, { rejectWithValue }) => {
    try {
        const response = await uploadNote(payload)
        return response
    } catch (error) {
        console.error("SAVE NOTE THUNK ERROR:", error.message);
        return rejectWithValue(error.message);
    }
})

export const getNotesThunk = createAsyncThunk("/note/notes", async (_, { rejectWithValue }) => {
    try {
        const response = await getNotes()
        return response
    } catch (error) {
        console.error("SAVE NOTE THUNK ERROR:", error.message);
        return rejectWithValue(error.message);
    }
})

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [],
        content: "",
        option: false,
        loading: {
            upload: false,
            notes: false
        }
    },
    reducers: {
        setContent: (state, action) => { state.content = action.payload },
        setNotes: (state, action) => { state.notes = action.payload }
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
            .addCase(getNotesThunk.pending, (state) => {
                state.loading.notes = true;
            })
            .addCase(getNotesThunk.rejected, (state) => {
                state.loading.notes = false;
            })
            .addCase(getNotesThunk.fulfilled, (state, action) => {
                state.notes = action.payload
                state.loading.notes = false;
            })
    }
})

export const { setOption, setContent, } = noteSlice.actions

export default noteSlice.reducer
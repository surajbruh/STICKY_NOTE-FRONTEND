import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletNote, getNotes, uploadNote } from "./noteAPI";

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

export const deleteNoteThunk = createAsyncThunk("/note/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await deletNote(id)
        return response
    } catch (error) {
        console.error("DELETE NOTE THUNK ERROR:", error.message);
        return rejectWithValue(error.message);
    }
})

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [],
        searchedNotes: [],
        content: "",
        option: false,
        loading: {
            upload: false,
            delete: false,
            notes: false
        }
    },
    reducers: {
        setContent: (state, action) => { state.content = action.payload },
        setNotes: (state, action) => { state.notes = action.payload },
        setSearchedNotes: (state, action) => { state.searchedNotes = action.payload }
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
            .addCase(deleteNoteThunk.pending, (state) => {
                state.loading.delete = true;
            })
            .addCase(deleteNoteThunk.rejected, (state) => {
                state.loading.delete = false;
            })
            .addCase(deleteNoteThunk.fulfilled, (state, action) => {
                state.loading.delete = false;
            })
    }
})

export const { setOption, setContent, setNotes, setSearchedNotes } = noteSlice.actions

export default noteSlice.reducer
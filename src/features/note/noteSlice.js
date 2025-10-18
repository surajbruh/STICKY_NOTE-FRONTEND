import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletNote, getNotes, updateNote, uploadNote } from "./noteAPI";

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

export const updateNoteThunk = createAsyncThunk("note/update", async ({ id, content }, { rejectWithValue }) => {
    try {
        const response = await updateNote(id, content)
        return response
    } catch (error) {
        console.error("UPDATE NOTE THUNK ERROR:", error.message);
        return rejectWithValue(error.message);
    }
})

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [],
        searchedNotes: [],
        selectedNote: null,
        content: "",
        searchQuery: "",
        option: false,
        loading: {
            upload: false,
            delete: false,
            update: false,
            search: false,
            notes: false
        }
    },
    reducers: {
        setContent: (state, action) => { state.content = action.payload },
        setSearchQuery: (state, action) => { state.searchQuery = action.payload },
        setNotes: (state, action) => { state.notes = action.payload },
        setSelectedNote: (state, action) => { state.selectedNote = action.payload },
        setLoadingSearch: (state, action) => { state.loading.search = action.payload },
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
                const sortedNotes = [...action.payload].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                state.notes = sortedNotes;
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
            .addCase(updateNoteThunk.pending, (state) => {
                state.loading.update = true;
            })
            .addCase(updateNoteThunk.rejected, (state) => {
                state.loading.update = false;
            })
            .addCase(updateNoteThunk.fulfilled, (state, action) => {
                state.loading.update = false;
            })
    }
})

export const { setOption, setContent, setNotes, setSearchedNotes, setSelectedNote, setSearchQuery, setLoadingSearch } = noteSlice.actions

export default noteSlice.reducer
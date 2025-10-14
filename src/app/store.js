import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "../features/note/noteSlice"

export default configureStore({
    reducer: {
        note: noteReducer
    }
})
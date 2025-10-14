import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        content: "",
        option: false
    },
    reducers: {
        setContent: (state, aciton) => { state.content = aciton.payload },
        setOption: state => { state.option = !state.option }
    }
})

export const { setOption, setContent } = noteSlice.actions

export default noteSlice.reducer
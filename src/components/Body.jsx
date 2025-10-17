import { useDispatch, useSelector } from "react-redux"
import { setContent } from "../features/note/noteSlice"
import Option from "./Option"
import { useEffect } from "react"

const Body = () => {

    const { selectedNote, content, option } = useSelector(state => state.note)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setContent(selectedNote ? selectedNote.content : ""))
    }, [selectedNote, dispatch])

    return (
        <div className="relative text-black">
            {
                option &&
                <Option />
            }
            <textarea
                value={content}
                onChange={(e) => dispatch(setContent(e.target.value))}
                className="outline-none resize-none bg-[var(--color-3)] text-white p-2 w-full"
                rows="10"></textarea>
        </div>
    )
}

export default Body
import { useDispatch, useSelector } from "react-redux"
import { setContent } from "../features/note/noteSlice"
import Option from "./Option"
import { useEffect, useRef } from "react"

const Body = () => {

    const textRef = useRef(null)
    const { selectedNote, option } = useSelector(state => state.note)
    const dispatch = useDispatch()

    useEffect(() => {
        selectedNote ? textRef.current.innerHTML = selectedNote?.content : textRef.current.innerHTML = null
    }, [selectedNote])

    return (
        <div className="relative text-black">
            {
                option &&
                <Option />
            }
            <textarea
                ref={textRef}
                onChange={(e) => dispatch(setContent(e.target.value))}
                className="outline-none resize-none bg-[var(--color-3)] text-white p-2 w-full"
                rows="10"></textarea>
        </div>
    )
}

export default Body
import { useDispatch, useSelector } from "react-redux"
import { setContent } from "../features/note/noteSlice"
import Option from "./Option"

const Body = () => {

    const option = useSelector(state => state.note.option)
    const dispatch = useDispatch()

    return (
        <div className="relative">
            {
                option &&
                <Option />
            }
            <textarea
                onChange={(e) => dispatch(setContent(e.target.value))}
                className="outline-none resize-none bg-[var(--color-3)] text-white p-2 w-full"
                rows="10"></textarea>
        </div>
    )
}

export default Body
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../features/note/noteSlice";
import Option from "./Option";
import { useEffect } from "react";

const Body = () => {
    const { selectedNote, content, option } = useSelector((state) => state.note);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setContent(selectedNote ? selectedNote.content : ""));
    }, [selectedNote, dispatch]);

    return (
        <div className="relative mt-2 sm:mt-4">
            {option && <Option />}
            <textarea
                value={content}
                onChange={(e) => dispatch(setContent(e.target.value))}
                className="
                        w-full
                        min-h-[200px] sm:min-h-[300px] max-h-[60vh]
                        outline-none
                        resize-y
                        bg-[var(--color-3)]
                        text-white
                        p-2 sm:p-3
                        rounded-md
                        text-sm sm:text-base
                        "
                placeholder="Write your note here..."
            ></textarea>
        </div>
    );
};

export default Body;
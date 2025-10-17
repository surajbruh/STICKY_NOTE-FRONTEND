import { useRef } from "react"
import { Trash2, Expand, Shrink, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteThunk, setNotes, setSelectedNote } from "../features/note/noteSlice"
import { errorToast, successToast } from "../utils/reactToast"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const NoteMenu = ({ note, show, setShow, onExit }) => {
    const containerRef = useRef(null)

    const { notes, selectedNote, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const isOpen = selectedNote?._id === note?._id

    const handleClick = () => {
        if (isOpen) {
            dispatch(setSelectedNote(null))
        } else {
            dispatch(setSelectedNote(note))
        }
        setShow(false)
    }

    const deleteNote = async () => {
        const id = note._id

        const resultAction = await dispatch(deleteNoteThunk(id))
        if (deleteNoteThunk.fulfilled.match(resultAction)) {
            const { _id } = resultAction.payload?.note

            const filteredNotes = notes.filter((note) => note._id !== _id)
            dispatch(setNotes(filteredNotes))

            successToast("Note deleted successfully")
        } else {
            errorToast(`Failed to delete: ${resultAction.payload}`)
        }
    }

    useGSAP(() => {
        const fullHeight = containerRef.current.scrollHeight
        if (show) {
            gsap.fromTo(containerRef.current,
                {
                    opacity: 0,
                    duration: 0.25,
                    height: "0%"
                },
                {
                    opacity: 1,
                    duration: 0.25,
                    height: fullHeight,
                    onComplete: () => { containerRef.current.style.height = "auto" }
                })
        } else {
            gsap.to(containerRef.current,
                {
                    opacity: 0,
                    height: "0%",
                    onComplete: onExit
                })
        }
    }, { dependencies: [show] })

    return (
        <div
            ref={containerRef}
            className="absolute overflow-hidden top-[150%] bg-[var(--color-4)] text-white py-2 px-1">
            {
                <button
                    onClick={handleClick}
                    className="w-full p-2 hover:bg-[var(--hover-4)] flex gap-2 items-center">
                    {
                        (isOpen) ?
                            <>
                                <Shrink />
                                <span>
                                    Close note
                                </span>
                            </>
                            :
                            <>
                                <Expand />
                                <span>
                                    Open note
                                </span>
                            </>
                    }
                </button>
            }
            <button
                disabled={loading.delete}
                onClick={deleteNote}
                className="w-full p-2 hover:bg-[var(--hover-4)] flex gap-2 items-center">
                {
                    loading.delete ?
                        <Loader2 className="animate-spin" />
                        :
                        <Trash2 />
                }
                <span>
                    Delete note
                </span>
            </button>
        </div>
    )
}

export default NoteMenu

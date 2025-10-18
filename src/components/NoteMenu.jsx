import { useState, useRef } from "react"
import { Trash2, Expand, Shrink, Loader2, Pin, PinOff } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteThunk, pinNoteThunk, setNotes, setSelectedNote } from "../features/note/noteSlice"
import { errorToast, successToast } from "../utils/reactToast"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { sortNotes } from "../utils/utilityFunction"

const NoteMenu = ({ note, show, setShow, onExit }) => {
    const containerRef = useRef(null)

    const { notes, selectedNote, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const id = note?._id
    const isOpen = selectedNote?._id === id

    const [pinLoading, setPinLoading] = useState(false)

    const handleClick = () => {
        if (isOpen) {
            dispatch(setSelectedNote(null))
        } else {
            dispatch(setSelectedNote(note))
        }
        setShow(false)
    }

    const handlePin = async () => {
        setPinLoading(true)
        const resultAction = await dispatch(pinNoteThunk(id))
        setPinLoading(false)

        if (pinNoteThunk.fulfilled.match(resultAction)) {
            const { updatedNote } = resultAction.payload

            //updating the redux state
            const updatedNotes = notes.map((note) => (note._id === updatedNote._id) ? updatedNote : note)
            const sortedNotes = sortNotes(updatedNotes) //sorts the updatedNotes
            dispatch(setNotes(sortedNotes));

            const message = updatedNote.isPinned ? "Note pinned successfully" : "Note unpinned successfully"
            successToast(message)
        } else {
            errorToast("Failed to pin note")
        }
    }

    const deleteNote = async () => {
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
        const element = containerRef.current
        if (show) {
            gsap.fromTo(element,
                {
                    opacity: 0,
                    duration: 0.25,
                    height: "0%"
                },
                {
                    opacity: 1,
                    duration: 0.25,
                    height: "auto",
                    onComplete: () => gsap.set(element, { height: "auto" })
                })
        } else {
            gsap.to(element,
                {
                    opacity: 0,
                    height: "0%",
                    duration: 0.25,
                    onComplete: onExit
                })
        }
    }, { dependencies: [show] })

    return (
        <div
            ref={containerRef}
            className="absolute z-50 overflow-hidden top-[150%] bg-[var(--color-4)] text-white py-2 px-1">
            <button
                disabled={pinLoading}
                onClick={handlePin}
                className="w-full p-2 hover:bg-[var(--hover-4)] flex gap-2 items-center">
                {
                    note?.isPinned ?
                        <>
                            {
                                pinLoading ?
                                    <Loader2 className="animate-spin" />
                                    :
                                    <PinOff />
                            }
                            <span>
                                Unpin note
                            </span>
                        </>
                        :
                        <>
                            {
                                pinLoading ?
                                    <Loader2 className="animate-spin" />
                                    :
                                    <Pin />
                            }
                            <span>
                                Pin note
                            </span>
                        </>
                }
            </button>
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

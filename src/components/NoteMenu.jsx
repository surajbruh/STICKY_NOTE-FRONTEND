import { useEffect, useState } from "react"
import { Trash2, Expand, Shrink, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteThunk, setContent, setNotes, setSelectedNote } from "../features/note/noteSlice"
import { errorToast, successToast } from "../utils/reactToast"

const NoteMenu = ({ note }) => {
    const [openNote, setOpenNote] = useState(false)

    const { notes, content, selectedNote, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const handleClick = () => {
        setOpenNote(!openNote)
        if (openNote) {
            dispatch(setSelectedNote(null))
        } else {
            dispatch(setSelectedNote(note))
        }
        // setOpenNote(!openNote)
        // if (!openNote) {
        //     dispatch(setSelectedNote(note))
        //     console.log(selectedNote?.content)
        // } else {
        //     dispatch(setSelectedNote(null))
        //     dispatch(setContent(null))
        // }

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

    return (
        <div className="absolute top-[150%] bg-[var(--color-4)] text-white py-2 px-1">
            {
                <button
                    onClick={handleClick}
                    className="w-full p-2 hover:bg-[var(--hover-4)] flex gap-2 items-center">
                    {
                        openNote ?
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

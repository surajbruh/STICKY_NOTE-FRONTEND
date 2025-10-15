import { useState } from "react"
import { Ellipsis, Loader2 } from "lucide-react"
import { formatDate } from "../utils/formatDate"
import { Trash2, Expand, Shrink } from "lucide-react"
import { deleteNoteThunk, setNotes } from "../features/note/noteSlice"
import { useDispatch, useSelector } from "react-redux"
import { errorToast, successToast } from "../utils/reactToast"

const Note = ({ note }) => {

    const [hover, setHover] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [openNote, setOpenNote] = useState(false)

    const { notes, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

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
        <section
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="">
            {/* header */}
            <div className="bg-[var(--color-1)] w-full h-[0.25vw]" />

            {/* body */}
            <div
                className="relative bg-[var(--color-3)] hover:bg-[var(--hover-3)] w-full h-[200px] p-2 text-white space-y-2">
                <div className="relative text-[var(--color-1)] flex justify-end">
                    {
                        hover || showMenu ?
                            <button onClick={() => setShowMenu(!showMenu)}>
                                <Ellipsis
                                    className={`text-white hover:stroke-2 stroke-1`} />
                            </button>
                            :
                            <p className="">{(formatDate(note.createdAt)).toUpperCase()} </p>
                    }
                    {/* menu option */}
                    {
                        showMenu &&
                        <div className="absolute top-[150%] bg-[var(--color-4)] text-white py-2 px-1">
                            {
                                <button
                                    onClick={() => setOpenNote(!openNote)}
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
                    }
                </div>
                <p className="max-w-full overflow-hidden line-clamp-6 ">{note.content}</p>
            </div>
        </section>
    )
}
export default Note
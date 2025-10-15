import { useCallback, useEffect } from "react"
import Note from "./Note"
import { Plus, X, Settings } from "lucide-react"
import { getNotesThunk } from "../features/note/noteSlice"
import { useDispatch, useSelector } from 'react-redux'
import { errorToast } from "../utils/reactToast"

const NoteList = () => {

    const { notes } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const handleNotes = useCallback(async () => {
        const resultAction = await dispatch(getNotesThunk())

        if (getNotesThunk.rejected.match(resultAction)) {
            return errorToast(resultAction.payload)
        }
    }, [dispatch])

    useEffect(() => {
        handleNotes()
    }, [handleNotes])

    useEffect(() => {
        console.log(notes)
    }, [notes])

    return (
        <>
            <div className="min-w-[250px] w-[20vw] bg-[var(--color-4)] px-2 py-4 space-y-2">
                {/* header */}
                <div className="flex items-center justify-between text-white">
                    <button>
                        <Plus strokeWidth={1} />
                    </button>
                    <div className="flex gap-4">
                        <button>
                            <Settings strokeWidth={1} />
                        </button>
                        <button>
                            <X strokeWidth={1} />
                        </button>

                    </div>
                </div>
                <h1 className="uppercase font-extrabold text-white mb-4">sticky notes</h1>
                <div className="space-y-4 px-2 max-h-[20vw] scrollbar-custom overflow-auto">
                    {
                        notes.length > 0 ?
                            notes?.map(note =>
                                <li key={note._id}>
                                    <Note note={note} />
                                </li>)
                            :
                            <p className="italic text-white text-center ">
                                No notes yet.
                            </p>
                    }
                </div>
            </div>
        </>
    )
}
export default NoteList
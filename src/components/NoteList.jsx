import { useCallback, useEffect, useRef } from "react"
import Note from "./Note"
import { Plus, X, Settings } from "lucide-react"
import { getNotesThunk } from "../features/note/noteSlice"
import { useDispatch, useSelector } from 'react-redux'
import { errorToast } from "../utils/reactToast"
import SearchBar from "./SearchBar"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

const NoteList = ({ show, toggle, onExitComplete }) => {

    const containerRef = useRef(null)

    const { notes, searchedNotes } = useSelector(state => state.note)
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

    useGSAP(() => {
        if (show) {
            // Animate in
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, x: "0%" },
                { opacity: 1, x: "100%", duration: 0.5, ease: "power3.out" }
            );
        } else {
            // Animate out
            gsap.to(containerRef.current, {
                opacity: 0,
                x: "50%",
                duration: 0.5,
                ease: "power3.in",
                onComplete: onExitComplete,
            });
        }
    }, { dependencies: [show] })

    return (
        <>
            <div
                ref={containerRef}
                className="absolute translate-x-[100%] top-0 min-w-[250px] w-[20vw] bg-[var(--color-4)] px-2 py-4 space-y-2">
                {/* header */}
                <div className="flex items-center justify-between text-white">
                    <button>
                        <Plus
                            className="hover:stroke-2 stroke-1" />
                    </button>
                    <div className="flex gap-4">
                        <button>
                            <Settings
                                className="hover:stroke-2 stroke-1" />
                        </button>
                        <button
                            className="hover:bg-red-800"
                            onClick={toggle}>
                            <X
                                className="hover:stroke-2 stroke-1" />
                        </button>

                    </div>
                </div>
                <h1 className="uppercase font-extrabold text-white">sticky notes</h1>
                {/* searchbar */}
                <SearchBar />
                <div className="space-y-4 px-2 max-h-[20vw] scrollbar-custom overflow-auto">
                    {
                        searchedNotes.length > 0 ?
                            searchedNotes?.map(note =>
                                <li key={note._id}>
                                    <Note note={note} />
                                </li>)
                            :
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
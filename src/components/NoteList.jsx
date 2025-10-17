import { useCallback, useState, useEffect, useRef } from "react";
import Note from "./Note";
import { Plus, X, Settings } from "lucide-react";
import { getNotesThunk } from "../features/note/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "../utils/reactToast";
import SearchBar from "./SearchBar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NoteSkeleton from "./skeletons/NoteSkeleton";

gsap.registerPlugin(useGSAP);

const NoteList = ({ show, toggle, onExitComplete }) => {


    const containerRef = useRef(null);
    const { notes, searchedNotes, loading, searchQuery: query } = useSelector((state) => state.note);
    const dispatch = useDispatch();

    const handleNotes = useCallback(async () => {
        const resultAction = await dispatch(getNotesThunk());
        if (getNotesThunk.rejected.match(resultAction)) {
            return errorToast(resultAction.payload);
        }
    }, [dispatch]);

    useEffect(() => {
        handleNotes();
    }, [handleNotes]);

    useGSAP(
        () => {
            if (show) {
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0, x: "100%" },
                    { opacity: 1, x: "0%", duration: 0.5 }
                );
            } else {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    x: "100%",
                    duration: 0.5,
                    onComplete: onExitComplete,
                });
            }
        },
        { dependencies: [show] }
    );

    return (
        <aside
            ref={containerRef}
            className="
                fixed sm:static
                top-0 right-0
                w-[80vw] sm:w-[35vw] lg:w-[25vw]
                h-full sm:h-auto
                bg-[var(--color-4)]
                p-4
                sm:rounded-md
                shadow-lg
                overflow-y-auto
                z-50
                transition-all
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between text-white mb-3">
                <button>
                    <Plus className="hover:stroke-2 stroke-1" />
                </button>
                <div className="flex gap-3">
                    <button>
                        <Settings className="hover:stroke-2 stroke-1" />
                    </button>
                    <button className="hover:bg-red-700 p-1 rounded" onClick={toggle}>
                        <X />
                    </button>
                </div>
            </div>

            <h1 className="uppercase font-extrabold text-white mb-3 text-lg tracking-wide">
                Sticky Notes
            </h1>

            <SearchBar />

            <ul className="space-y-3 mt-4 h-auto sm:max-h-[70vh] overflow-y-auto scrollbar-custom">
                {
                    loading.notes || loading.search ?
                        Array.from({ length: 4 }).map((e, index) => <li key={index}><NoteSkeleton /></li>)
                        :
                        (
                            (query && searchedNotes?.length) === 0 ?
                                <p className="text-white italic text-center" >no notes found...</p >
                                :
                                searchedNotes.length > 0
                                    ? searchedNotes.map((note) => (
                                        <li key={note._id}>
                                            <Note note={note} />
                                        </li>
                                    ))
                                    : notes.length > 0
                                        ? notes.map((note) => (
                                            <li key={note._id}>
                                                <Note note={note} />
                                            </li>
                                        ))
                                        : (
                                            <p className="italic text-white text-center mt-10">
                                                No notes yet.
                                            </p>
                                        )
                        )
                }

            </ul>
        </aside>
    );
};

export default NoteList;

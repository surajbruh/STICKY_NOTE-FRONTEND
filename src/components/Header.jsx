import { Plus, Check, Ellipsis, X, Loader2 } from "lucide-react";
import {
    saveNoteThunk,
    setContent,
    setNotes,
    setSelectedNote,
    updateNoteThunk,
} from "../features/note/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../utils/reactToast";

const Header = ({ toggle, show }) => {
    const { notes, selectedNote, content, loading } = useSelector(
        (state) => state.note
    );
    const dispatch = useDispatch();

    const handleSave = async () => {
        if (!content) return console.log("no changes");

        if (selectedNote) {
            const resultAction = await dispatch(
                updateNoteThunk({ id: selectedNote._id, content })
            );
            if (updateNoteThunk.fulfilled.match(resultAction)) {
                const { updatedNote } = resultAction?.payload;
                const updatedNotes = notes.map((note) =>
                    note._id === updatedNote._id ? updatedNote : note
                );
                dispatch(setNotes(updatedNotes));
                successToast("Note updated successfully");
                dispatch(setSelectedNote(null)) // clears the selected note and text
            } else {
                errorToast(`Failed to update note: ${resultAction.payload}`);
            }
        } else {
            const resultAction = await dispatch(saveNoteThunk(content));
            if (saveNoteThunk.fulfilled.match(resultAction)) {
                const { newNote } = resultAction.payload;
                const updatedNotes = [...notes, newNote];
                dispatch(setNotes(updatedNotes));
                successToast(`Note saved successfully`);
                dispatch(setContent("")) //clears the text
            } else {
                errorToast(`Failed to save note: ${resultAction.payload}`);
            }
        }
    };

    const handleClear = () => {
        selectedNote && dispatch(setSelectedNote(null));
        dispatch(setContent(""));
    };

    return (
        <div className="bg-[var(--color-1)] text-[var(--color-2)] flex justify-between items-center p-2 sm:p-3 rounded-md shadow-md">
            {selectedNote ? (
                <span className="px-2 italic text-sm sm:text-base">Edit mode</span>
            ) : (
                <button className="p-2 sm:p-3">
                    <Plus className="hover:stroke-2 stroke-1" />
                </button>
            )}

            <div className="flex items-center gap-1 sm:gap-2">
                {
                    content &&
                    <button
                        disabled={loading.upload || loading.update}
                        onClick={handleSave}
                        className="p-2 sm:p-3"
                    >
                        {loading.upload || loading.update ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Check className="hover:stroke-2 stroke-1" />
                        )}
                    </button>
                }
                {
                    !show &&
                    <button onClick={toggle} className="p-2 sm:p-3">
                        <Ellipsis className="hover:stroke-2 stroke-1" />
                    </button>
                }
                {(selectedNote || content) && (
                    <button onClick={handleClear} className="p-2 sm:p-3">
                        <X className="hover:stroke-2 stroke-1" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;

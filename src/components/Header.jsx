import { Plus, Check, Ellipsis, X, Loader2 } from 'lucide-react';
import { saveNoteThunk, setNotes, setOption } from '../features/note/noteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '../utils/reactToast';

const Header = () => {
    const { notes, content, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const handleSave = async () => {
        if (!content) return

        const resultAction = await dispatch(saveNoteThunk(content));
        if (saveNoteThunk.fulfilled.match(resultAction)) {
            const { newNote } = resultAction.payload

            const updatedNotes = [...notes, newNote]
            dispatch(setNotes(updatedNotes))

            successToast(`Note saved successfully`)
        } else {
            errorToast(`Failed to save note: ${resultAction.payload}`)
        }
    };

    return (
        <div className='relative bg-[var(--color-1)] text-[var(--color-2)] flex justify-between items-center'>
            <button className='p-2'>
                <Plus
                    className="hover:stroke-2 stroke-1" />
            </button>
            <div className='flex items-center gap-2'>
                <button
                    disabled={loading.upload}
                    onClick={handleSave}
                    className='p-2'>
                    {loading.upload ?
                        <Loader2
                            className="hover:stroke-2 stroke-1 animate-spin" />
                        :
                        <Check
                            className="hover:stroke-2 stroke-1" />}
                </button>
                <button
                    onClick={() => dispatch(setOption())}
                    className='p-2'>
                    <Ellipsis
                        className="hover:stroke-2 stroke-1" />
                </button>
                <button className='p-2'>
                    <X
                        className="hover:stroke-2 stroke-1" />
                </button>
            </div>
        </div >
    )
}
export default Header
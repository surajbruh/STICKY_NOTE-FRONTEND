import { Plus, Check, Ellipsis, X, Loader2 } from 'lucide-react';
import { saveNoteThunk, setOption } from '../features/note/noteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const { content, loading } = useSelector(state => state.note)
    const dispatch = useDispatch()

    const handleSave = async () => {
        if (!content) return

        const resultAction = await dispatch(saveNoteThunk(content));
        // TODO: ADD TOAST NOTIFICATION
        if (saveNoteThunk.fulfilled.match(resultAction)) {
            console.log("Note saved successfully:", resultAction.payload);
        } else {
            console.error("Failed to save note:", resultAction.payload);
        }
    };

    return (
        <div className='relative bg-[var(--color-1)] text-[var(--color-2)] flex justify-between items-center'>
            <button className='p-2'>
                <Plus strokeWidth={1} />
            </button>
            <div className='flex items-center gap-2'>
                <button
                    disabled={loading.upload}
                    onClick={handleSave}
                    className='p-2'>
                    {loading.upload ? <Loader2 strokeWidth={1} className='animate-spin' /> : <Check strokeWidth={1} />}
                </button>
                <button
                    onClick={() => dispatch(setOption())}
                    className='p-2'>
                    <Ellipsis strokeWidth={1} />
                </button>
                <button className='p-2'>
                    <X strokeWidth={1} />
                </button>
            </div>
        </div >
    )
}
export default Header
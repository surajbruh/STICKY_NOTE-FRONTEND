import { Plus, Check, Ellipsis, X } from 'lucide-react';
import { setOption } from '../features/note/noteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const content = useSelector(state => state.note.content)
    const dispatch = useDispatch()

    return (
        <div className='relative bg-[var(--color-1)] text-[var(--color-2)] flex justify-between items-center'>
            <button className='p-2'>
                <Plus strokeWidth={1} />
            </button>
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => console.log(content)}
                    className='p-2'>
                    <Check strokeWidth={1} />
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
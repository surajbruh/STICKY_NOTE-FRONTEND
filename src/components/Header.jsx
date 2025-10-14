import { Plus, Check, Ellipsis, X, Trash, TextAlignStart } from 'lucide-react';
import { useState } from 'react';

const Header = () => {

    const [option, setOption] = useState(false)

    return (
        <div className='relative bg-[var(--color-1)] text-[var(--color-2)] flex justify-between items-center'>
            <button className='p-2'>
                <Plus strokeWidth={1} />
            </button>
            <div className='flex items-center gap-2'>
                <button className='p-2'>
                    <Check strokeWidth={1} />
                </button>
                <button
                    onClick={() => setOption(!option)}
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
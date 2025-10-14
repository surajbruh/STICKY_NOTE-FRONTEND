import { Trash, TextAlignStart } from "lucide-react"

const Option = () => {

    return (
        <div className="absolute shadow-[var(--shadow)] z-20 w-full h-max bg-[var(--color-3)] text-white">
            <button className="p-4 flex gap-2 items-center">
                <Trash strokeWidth={1} />
                <span>Delete Note</span>
            </button>
            <button className="p-4 flex gap-2 items-center">
                <TextAlignStart strokeWidth={1} />
                <span>Note List</span>
            </button>
        </div>
    )
}

export default Option
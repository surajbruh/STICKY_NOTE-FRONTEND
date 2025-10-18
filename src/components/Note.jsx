import { useState } from "react"
import { Ellipsis } from "lucide-react"
import { formatDate } from "../utils/formatDate"
import NoteMenu from "./NoteMenu"
import { useSelector } from "react-redux"

const Note = ({ note }) => {

    const [mount, setMount] = useState(false)

    const [hover, setHover] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const { selectedNote } = useSelector(state => state.note)

    const unMount = () => setMount(false)

    const handleToggle = () => {
        if (showMenu) {
            setShowMenu(false)
        } else {
            setMount(true)
            setShowMenu(true)
        }
    }

    return (
        <section
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative">
            {/* header */}
            <div className="bg-[var(--color-1)] w-full h-[0.25vw]" />

            {/* body */}
            <div
                className={`relative ${selectedNote?._id === note?._id ? "bg-[var(--hover-3)]" : "bg-[var(--color-3)]"} hover:bg-[var(--hover-3)] w-full h-[200px] p-2 text-white space-y-2`}>
                <div className="relative text-[var(--color-1)] flex justify-end">
                    {
                        hover || showMenu ?
                            <button onClick={handleToggle}>
                                <Ellipsis
                                    className={`text-white hover:stroke-2 stroke-1`} />
                            </button>
                            :
                            <p className="text-[12px] lg:text-[14px]">{(formatDate(note.updatedAt)).toUpperCase()} </p>
                    }
                    {/* menu option */}
                    {
                        mount &&
                        <NoteMenu note={note} show={showMenu} setShow={setShowMenu} onExit={unMount} />
                    }
                </div>
                <p className="max-w-full overflow-hidden line-clamp-6 whitespace-pre-wrap">{note.content}</p>
            </div>
            {
                (note?.updatedAt !== note?.createdAt) &&
                <span className="absolute bottom-0 right-0 m-2 italic inline-block p-1 bg-[var(--color-3)] text-[var(--color-1)] text-[12px] lg:text-[14px]">Edited</span>
            }
        </section >
    )
}
export default Note
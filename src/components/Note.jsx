import { useState } from "react"
import { Ellipsis } from "lucide-react"
import { formatDate } from "../utils/utilityFunction"
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

    const latestDate = () => (formatDate(note.updatedAt)).toUpperCase()

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
                            (
                                <p className="text-[12px] lg:text-[14px] italic">
                                    {
                                        (note?.updatedAt !== note?.createdAt)
                                            ? `updatedAt: ${latestDate()}`
                                            : `createdAt: ${latestDate()}`
                                    }
                                </p>
                            )
                    }
                    {/* menu option */}
                    {
                        mount &&
                        <NoteMenu note={note} show={showMenu} setShow={setShowMenu} onExit={unMount} />
                    }
                </div>
                <p className="max-w-full overflow-hidden line-clamp-6 whitespace-pre-wrap">{note.content}</p>
            </div>
        </section >
    )
}
export default Note
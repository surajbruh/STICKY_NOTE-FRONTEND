import { useState } from "react"
import { Ellipsis } from "lucide-react"
import { formatDate } from "../utils/formatDate"

const Note = ({ note }) => {
    const [hover, setHover] = useState(false)

    return (
        <section
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="">
            {/* header */}
            <div className="bg-[var(--color-1)] w-full h-[0.25vw]" />

            {/* body */}
            <div
                className="relative bg-[var(--color-3)] hover:bg-[var(--hover-3)] w-full h-[200px] p-2 text-white space-y-2">
                <div className="text-[var(--color-1)] flex justify-end">
                    {
                        hover ?
                            <Ellipsis
                                strokeWidth={1}
                                className="text-white" />
                            :
                            <p className="">{(formatDate(note.createdAt)).toUpperCase()} </p>
                    }
                </div>
                <p className="max-w-full overflow-hidden line-clamp-6 ">{note.content}</p>
            </div>
        </section>
    )
}
export default Note
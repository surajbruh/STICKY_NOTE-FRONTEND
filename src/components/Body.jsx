import { useState } from "react"

const Body = () => {

    const [content, setContent] = useState("")

    return (
        <>
            <textarea
                onChange={(e) => setContent(e.target.value)}
                className="outline-none resize-none bg-[var(--color-3)] text-white p-2 w-full"
                rows="10"></textarea>
        </>
    )
}

export default Body
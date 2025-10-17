import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedNotes } from "../features/note/noteSlice";

const SearchBar = ({ query, setQuery }) => {

    const { notes, searchedNotes } = useSelector(state => state.note)
    const dispatch = useDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!query.trim()) {
                dispatch(setSearchedNotes([]));
                return;
            }
            const filteredNotes = notes.filter((note) => (note.content).toLowerCase().includes(query.toLowerCase()))
            dispatch(setSearchedNotes(filteredNotes))
        }, 500)

        return () => clearTimeout(timeout)
    }, [query, notes, dispatch])

    useEffect(() => {
        console.log(searchedNotes)
    }, [searchedNotes])

    return (
        <form className="mb-4 bg-[var(--color-3)] " >
            <div className='text-white flex items-center px-3 py-2 space-x-3'>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search..."
                    className="outline-none w-full placeholder:italic "
                    type="text" />
                <Search />
            </div>
        </form>
    )
}

export default SearchBar

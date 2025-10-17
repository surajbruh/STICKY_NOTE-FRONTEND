import { useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingSearch, setSearchedNotes, setSearchQuery } from "../features/note/noteSlice";

const SearchBar = () => {

    const { notes, searchedNotes, searchQuery: query } = useSelector(state => state.note)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!query.trim()) {
            dispatch(setSearchedNotes([]));
            dispatch(setLoadingSearch(false))
            return;
        }

        dispatch(setLoadingSearch(true))
        const timeout = setTimeout(() => {
            const filteredNotes = notes.filter((note) => (note.content).toLowerCase().includes(query.toLowerCase()))
            dispatch(setSearchedNotes(filteredNotes))
            dispatch(setLoadingSearch(false))
        }, 500)

        return () => clearTimeout(timeout)
    }, [query, notes, dispatch])

    useEffect(() => {
        console.log(searchedNotes)
    }, [searchedNotes])

    useEffect(() => {
        console.log(query)
    }, [query])

    return (
        <form className="mb-4 bg-[var(--color-3)] " >
            <div className='text-white flex items-center px-3 py-2 space-x-3'>
                <input
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="search..."
                    className="outline-none w-full placeholder:italic "
                    type="text" />
                <Search />
            </div>
        </form>
    )
}

export default SearchBar

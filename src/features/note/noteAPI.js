import axiosInstance from "../../utils/axiosInstance"

export const uploadNote = async (content) => {
    try {
        const response = await axiosInstance.post("/api/notes/upload", { content })
        return response.data
    } catch (error) {
        console.error("UPLOAD NOTE API ERROR", error.message)
        throw error
    }
}

export const getNotes = async () => {
    try {
        const response = await axiosInstance.get("/api/note/notes")
        return response.data
    } catch (error) {
        console.error("GET NOTES API ERROR", error.message)
        throw error
    }
}

export const deletNote = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/note/delete/${id}`)
        return response.data
    } catch (error) {
        console.error("DELETE NOTE API ERROR", error.message)
        throw error
    }
}

export const updateNote = async (id, content) => {
    try {
        const response = await axiosInstance.patch(`/api/note/update/${id}`, { content })
        return response.data
    } catch (error) {
        console.error("UPDATE NOTE API ERROR", error.message)
        throw error
    }
}

export const pinNote = async (id) => {
    try {
        const response = await axiosInstance.patch(`/api/note/pin/${id}`)
        return response.data
    } catch (error) {
        console.error("PIN NOTE API ERROR", error.message)
        throw error
    }
}
import axiosInstance from "../../utils/axiosInstance"

export const uploadNote = async (content) => {
    try {
        const response = await axiosInstance.post("/api/note/upload", { content })
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
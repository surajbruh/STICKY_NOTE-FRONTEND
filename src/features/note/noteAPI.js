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
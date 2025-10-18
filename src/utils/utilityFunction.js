export function formatDate(timestamp, options = {}) {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    // Default format options
    const defaultOptions = {
        day: "2-digit",
        month: "short", // e.g. "Oct"
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const finalOptions = { ...defaultOptions, ...options };

    // Format using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-IN", finalOptions).format(date);
}


export const sortNotes = (notes) => {
    const sortedNotes = [...notes].sort((a, b) => {
        if (a.isPinned === b.isPinned) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return b.isPinned - a.isPinned;
    });
    return sortedNotes
}
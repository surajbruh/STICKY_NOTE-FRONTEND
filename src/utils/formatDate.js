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

export function printFormat(value, suffix = null) {
    const nothing = "---"
    if (value || value === 0) {
        if (Array.isArray(value)) {
            if (value.length > 0)
                return value.join(", ")
            else
                return nothing
        }
        if (suffix)
            return value + suffix
        else
            return value
    }
    return nothing
}
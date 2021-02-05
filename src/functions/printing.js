const nothing = "---"

export function printFormat(value, suffix = null, isDate = false) {
    if (isDate) {
        let time = value
        if (Array.isArray(value)) {
            time = value[0]
        }
        return parseDaysSince(time)
    }
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

export function parseDaysSince(time) {
    if (time) {
        const seconds = (Date.now() / 1000 ) - time
        if (seconds < 60) {
            return (Math.floor(seconds) + " seconds ago")
        }
        const minutes = seconds / 60
        if (minutes < 2) {
            return (Math.floor(minutes) + " minute ago")
        }
        if (minutes < 60) {
            return (Math.floor(minutes) + " minutes ago")
        }
        const hours = minutes / 60
        if (hours < 2) {
            return (Math.floor(hours) + " hour ago")
        }
        if (hours < 24) {
            return (Math.floor(hours) + " hours ago")
        }
        const days = hours / 24
        if (days < 2) {
            return (Math.floor(days) + " day ago")
        }
        return (Math.floor(days) + " days ago")
    }
    return nothing
}
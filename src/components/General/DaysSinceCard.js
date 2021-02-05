import React, { useEffect, useState } from 'react'

// MUI
import { Card, CardContent, Paper, Typography } from '@material-ui/core'

// Custom
import { ItemTable } from './ItemTable'

const daysMaxDefault = 5
export function DaysSinceCard(props) {
    const [daysMax, setDaysMax] = useState(daysMaxDefault)
    const { type, detailsPath, nameKey, nameLabel, idKey, data, daysSinceMostRecent } = props
    let headCells = [
        { id: 'daysOpen', label: "Time"},
        { id: nameKey, label: nameLabel },
        { id: idKey, label: type + ' ID' },
    ];

    // Initialize daysMax using stored preferences
    useEffect(()=> {
        let preferences = JSON.parse(localStorage.getItem('preferences'))
        let max = daysMaxDefault
        // Check if preferences are stored
        if (preferences) {
            // Check if the max for this type is stored in preferences
            if (preferences.daysMax && preferences.daysMax[detailsPath]){
                // Change max to stored value
                max = preferences.daysMax[detailsPath]
                setDaysMax(max)
            }
            preferences = {...preferences, daysMax: {...preferences.daysMax, [detailsPath]: max}}
        }
        localStorage.setItem('preferences', JSON.stringify(preferences))
    }, [])

    return (
        <>
            {
                data &&
                <>
                    {
                        daysSinceMostRecent <= daysMax ?
                            <Paper>
                                <RecentTable
                                    daysMax={daysMax}
                                    headCells={headCells}
                                    {...props}
                                />
                            </Paper>
                            :
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        No New {type}s in the Last {daysMax} Day{daysMax !== 1 && "s"}
                                    </Typography>
                                </CardContent>
                            </Card>
                    }
                </>
            }
        </>
    )
}

function RecentTable(props) {
    const { daysMax, detailsPath: path, title, data, headCells, handleDelete, idKey, prefKey } = props
    let filtered = data.filter(item => {
        // Get time created (may be an array)
        let time = item.created
        if (Array.isArray(time))
            time = time[0]
        if (daysSince(time) <= daysMax) {
            item['daysOpen'] = parseDaysOpen(time)
            return(item)
        }
    })

    return (
        <>
            <ItemTable
                title={title}
                idString={idKey}
                path={path}
                headCells={headCells}
                data={filtered}
                handleDelete={handleDelete}
                prefKey={prefKey}
                noEdit
            />
        </>
    )
}

const daysSince = (time) => {
    if (time) {
        const secondsSince = (Date.now() / 1000) - time
        return (Math.floor(secondsSince / (60 * 60) /24))
    }
}

const hoursSince = (time) => {
    if (time) {
        const secondsSince = (Date.now() / 1000) - time
        return (Math.floor(secondsSince / (60 * 60)))
    }
}

const minutesSince = (time) => {
    if (time) {
        const secondsSince = (Date.now() / 1000) - time
        return (Math.floor(secondsSince / 60))
    }
}

const parseDaysOpen = (time) => {
    let minutes = minutesSince(time)
    if (minutes <= 60) {
        return minutes + " minutes ago"
    }
    let hours = hoursSince(time)
    if (hours <= 24) {
        return hours + " hours ago"
    }
    if (hours <= 48) {
        return "Yesterday"
    }
    let days = daysSince(time)
    return days + " days ago"
}
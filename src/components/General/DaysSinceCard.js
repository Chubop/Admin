import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// MUI
import { Button, Card, CardContent, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import { Delete, Edit, ZoomIn } from '@material-ui/icons'

// Custom
import { printFormat } from '../../functions'

const daysMaxDefault = 5
export function DaysSinceCard(props) {
    const [daysMax, setDaysMax] = useState(daysMaxDefault)
    const { type, detailsPath, nameKey, idKey, data, daysSinceMostRecent } = props
    let headCells = [
        { id: nameKey, label: 'Title' },
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
    const { daysMax, detailsPath: path, type, data, headCells, handleDelete, idKey } = props

    return (
        <>
            <Toolbar style={{ backgroundColor: '#1769aa', color: 'white' }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6">
                            {"New " + type + "s"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" style={{textAlign: "right"}}>
                            {"Last " + daysMax + " Days"}
                            {/* TODO add editable daysMax
                            <IconButton>
                                <Edit style={{color:"white"}} fontSize="small"/>
                            </IconButton> */}
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell key={'days-open'} >
                                Days Open
                            </TableCell>
                            {
                                headCells.map((headCell) => {
                                    return (
                                        <TableCell key={headCell.id} >
                                            {headCell.label}
                                        </TableCell>
                                    )
                                })
                            }
                            <TableCell key={'details'} >
                                Details
                            </TableCell>
                            {
                                handleDelete !== undefined &&
                                <TableCell key={'delete'} >
                                    Delete
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row) => {
                                // Display items that have been created more recently than daysMax
                                if (daysSince(hoursSince(row.created)) <= daysMax) {
                                    // Get time created (may be an array)
                                    let time = row.created
                                    if (Array.isArray(time))
                                        time = time[0]
                                    // Get details path and props to give 'handleDelete' 
                                    // may include jid as well as aid, if this is applicants
                                    let detailsPath = `/${path}/${row[idKey]}`
                                    let deleteProps = [row[idKey]]
                                    if ('jid' in row && 'aid' in row) {
                                        detailsPath = `/${path}/${row['jid']}/${row[idKey]}`
                                        deleteProps = [row['jid'], row[idKey]]
                                    }

                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Typography>{parseDaysOpen(hoursSince(time))}</Typography>
                                            </TableCell>
                                            {
                                                headCells.map((cell) => {
                                                    return (
                                                        <TableCell key={row[cell.id]} >
                                                            <Typography>
                                                                {printFormat(row[cell.id])}
                                                            </Typography>
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                            <TableCell>
                                                <Link to={detailsPath}>
                                                    <IconButton aria-label="zoomIn" color="primary" >
                                                        <ZoomIn />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                            {
                                                handleDelete !== undefined &&
                                                <TableCell>
                                                    <IconButton aria-label="zoomIn" color="primary" onClick={() => handleDelete(...deleteProps)}>
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    )
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const daysSince = (hours) => {
    return (Math.floor(hours / 24))
}

const hoursSince = (time) => {
    if (time) {
        const secondsSince = (Date.now() / 1000) - time
        return (Math.floor(secondsSince / (60 * 60)))
    }
}

const parseDaysOpen = (hours) => {
    if (hours <= 24) {
        return hours + " hours ago"
    }
    if (hours <= 48) {
        return "Yesterday"
    }
    return (daysSince(hours)) + " days ago"
}
import React from 'react'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

import { ItemTable } from '../General';


const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function UnsupportedJobTable(props) {
    const classes = useStyles();

    const headCells = [
        { id: "jid", numeric: false, disablePadding: false, label: "ID"},
        { id: 'categories', numeric: false, disablePadding: false, label: 'categories' },
        { id: 'location', numeric: false, disablePadding: false, label: 'location' },
        { id: 'titles', numeric: false, disablePadding: false, label: 'titles' },
        { id: 'internal_job_id', numeric: false, disablePadding: false, label: 'internal_job_id' },
        { id: 'requisition_id', numeric: false, disablePadding: false, label: 'requisition_id' },
        { id: 'greenhouse_jid', numeric: false, disablePadding: false, label: 'greenhouse_jid' },
        { id: 'departments', numeric: false, disablePadding: false, label: 'departments' },
    ];

    const idString = 'id'
    // This path is used to get to the details page
    const path = "unsupportedJobs"

    const table = (
        <ItemTable
            title="Unsupported Jobs"
            idString={idString}
            path={path}
            headCells={headCells}
            prefKey={"unsupJobPage"}
            noDelete
            noEdit
            {...props}
        />)
    

    return (
        <Paper className={classes.paper}>
            {table}
        </Paper>
    )
}
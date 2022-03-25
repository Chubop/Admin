import React from 'react'

// MUI
import { makeStyles, Paper, Typography } from '@material-ui/core';

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
        { id: 'titles', numeric: false, disablePadding: false, label: 'Title',
            contentFunction: (title, {jid}) => {
                return (<>
                <Typography>
                    {title}
                </Typography>
                <Typography style={{opacity: 0.3}}>
                    {jid}
                </Typography>
                </>)
            }
        },
        { id: 'categories', numeric: false, disablePadding: false, label: 'Categories'},
        { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
        { id: 'greenhouse_public_id', numeric: false, disablePadding: false, label: 'Greenhouse public id' },
        { id: 'requisition_id', numeric: false, disablePadding: false, label: 'Requisition id' },
        { id: 'greenhouse_jid', numeric: false, disablePadding: false, label: 'Greenhouse jid' },
        { id: 'departments', numeric: false, disablePadding: false, label: 'Department', 
        contentFunction: (departments, job) => {
            if (Array.isArray(departments) && departments.length > 0)
                return departments[0].name
        }
    },

    ];

    const idString = 'id'
    // This path is used to get to the details page
    const path = "unsupportedJobs"

    const table = (
        <ItemTable
            title="Non-Conversational Jobs"
            idString={idString}
            path={path}
            headCells={headCells}
            prefKey={"unsupJobPage"}
            noDelete
            moreKeys={['jid']}
            noEdit
            {...props}
        />)
    

    return (
        <Paper className={classes.paper} >
            {table}
        </Paper>
    )
}
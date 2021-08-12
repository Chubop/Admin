import React, { useState } from 'react'

// MUI
import { makeStyles, MenuItem, Paper, Select } from '@material-ui/core';

// Custom components
import { JobModal } from './'
import { PaginateTable, ItemTable } from '../General';
import { FiberManualRecord } from '@material-ui/icons';
import { jobActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function JobTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const paginate = props.paginate ? true : false

    console.log(paginate)

    // States
    const [editOpen, setEditOpen] = useState(false);
    const [editJID, setEditJID] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Open the edit job modal
    const openEditModal = (id) => {
        setEditJID(id.jid)
        setEditOpen(true)
    }

    // Close the edit job modal
    const handleClose = () => { setEditOpen(false) }

    // When delete button in table is pressed
    const handleDelete = (jobs) => {
        // TODO
        console.log(jobs)
    }

    const handleStatusChange = (event, job) => {
        let status = event.target.value
        let dataIndex = props.data.findIndex((elem) => elem.jid === job.jid)

        job = props.data[dataIndex]
        job.status = status

        dispatch(jobActions.updateJob(job))
    }

    // These id's comes from the database, they must match
    // You can see the possible values to display in redux
    const headCells = [
        { id: "jid", numeric: false, disablePadding: false, label: "JID"},
        { id: 'titles', numeric: false, disablePadding: false, label: 'Title' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status',
            contentFunction: (status, job) => {
                return (
                    <Select
                        value={job['status']}
                        onClick={(event) => handleStatusChange(event, job)}
                    >
                        <MenuItem value={"open"}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecord
                                    style={{ color: "#4caf50" }}
                                    fontSize={"small"}
                                />
                                <div> Open </div>
                            </div>
                        </MenuItem>
                        <MenuItem value={"closed"}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecord
                                    color={"secondary"}
                                    fontSize={"small"}
                                />
                                <div> Closed </div>
                            </div>
                        </MenuItem>
                        <MenuItem value={"draft"}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecord
                                    color={"disabled"}
                                    fontSize={"small"}
                                />
                                <div> Draft </div>
                            </div>
                        </MenuItem>
                    </Select>
                )

            }
        },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
        { id: 'unit', numeric: false, disablePadding: false, label: 'Unit' },
        { id: 'team', numeric: false, disablePadding: false, label: 'Team' },
        { id: 'hm', numeric: false, disablePadding: false, label: 'Hiring Manager' },
        { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    ];

    const idString = 'jid'
    // This path is used to get to the details page
    const path = "job"

    const table = paginate ? 
        (<PaginateTable
                    title="Jobs"
                    idString={idString}
                    path={path}
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDelete}
                    prefKey={"jobsPage"}
                    noDelete
                    {...props}
        />) : 
        (<ItemTable
            title="Jobs"
            idString={idString}
            path={path}
            headCells={headCells}
            handleClickEdit={openEditModal}
            handleDelete={handleDelete}
            prefKey={"jobsPage"}
            noDelete
            {...props}
        />)
    

    return (
        <>
            <Paper className={classes.paper}>
                {table}
            </Paper>
            <JobModal open={editOpen} handleClose={handleClose} jid={editJID}/>
        </>
    )
}
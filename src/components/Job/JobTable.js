import React, { useState } from 'react'

// MUI
import { makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';

// Custom components
import { JobModal } from './'
import { PaginateTable, ItemTable } from '../General';
import { FiberManualRecord } from '@material-ui/icons';
import { jobActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { colors } from '../../theme/colors';

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

    // States
    const [editOpen, setEditOpen] = useState(false);
    const [editJID, setEditJID] = useState();

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
        {
            id: 'status', numeric: false, disablePadding: false, label: 'Status',
            contentFunction: (status, job) => {
                return (
                    <Select
                        value={job['status']}
                        onClick={(event) => handleStatusChange(event, job)}
                    >
                        <MenuItem value={"open"}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecord
                                    style={{ color: colors.status.good }}
                                    fontSize={"small"}
                                />
                                <div> Open </div>
                            </div>
                        </MenuItem>
                        <MenuItem value={"closed"}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FiberManualRecord
                                    style={{ color: colors.status.bad }}
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
        { id: 'requisition_id', numeric: false, disablePadding: false, label: 'Requistion ID' },
        { id: 'team', numeric: false, disablePadding: false, label: 'Team' },
        { id: 'hm', numeric: false, disablePadding: false, label: 'Hiring Manager' },
        { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    ];

    const idString = 'jid'
    // This path is used to get to the details page
    const path = "job"

    const table = paginate ?
        (<PaginateTable
            title="Marlon Jobs"
            idString={idString}
            path={path}
            headCells={headCells}
            handleClickEdit={openEditModal}
            handleDelete={handleDelete}
            prefKey={"jobsPage"}
            moreKeys={['jid']}
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
            moreKeys={['jid']}
            noDelete
            {...props}
        />)


    return (
        <>
            <Paper className={classes.paper} >
                {table}
            </Paper>
            <JobModal open={editOpen} handleClose={handleClose} jid={editJID} />
        </>
    )
}
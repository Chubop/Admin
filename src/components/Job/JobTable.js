import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { hmActions, jobActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom components
import { JobModal } from './'
import { ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function JobTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch()

    // States
    const [open, setOpen] = React.useState(false);

    // Open the edit job modal
    const openEditModal = (id) => {
        dispatch(jobActions.getJob(id.jid))
        dispatch(hmActions.getAllHMs())
        setOpen(true);
    };

    // Close the edit job modal
    const handleClose = () => {
        setOpen(false);
    };

    // When delete button in table is pressed
    const handleDelete = (applicants) => {
        // TODO
        console.log(applicants)
    }

    // These id's comes from the database, they must match
    // You can see the possible values to display in redux
    const headCells = [
        { id: 'titles', numeric: false, disablePadding: false, label: 'Title' },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
        { id: 'unit', numeric: false, disablePadding: false, label: 'Unit' },
        { id: 'team', numeric: false, disablePadding: false, label: 'Team' },
        { id: 'hm', numeric: false, disablePadding: false, label: 'Hiring Manager' },
        { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
        { id: 'jid', numeric: false, disablePadding: false, label: 'JID' },
    ];

    const idString = 'jid'
    // This path is used to get to the details page
    const path = "job"

    return (
        <>
            <Paper className={classes.paper}>
                <ItemTable
                    title="Jobs"
                    idString={idString}
                    path={path}
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDelete}
                    prefKey={"jobsPage"}
                    noDelete
                    {...props}
                />
            </Paper>
            <JobModal open={open} handleClose={handleClose} />
        </>
    )
}
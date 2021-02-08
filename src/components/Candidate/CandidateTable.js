import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { candidateActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { CandidateModal } from './'
import { DeleteConfirmation, ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function CandidateTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch()

    // States
    const [open, setOpen] = React.useState(false); // edit modal

    // Deletion states
    const [deleteEmail, setDeleteEmail] = React.useState()
    // Deletion confirmation modal
    const [deleteOpen, setDeleteOpen] = React.useState(false)


    // Open the edit candidate modal
    const openEditModal = (id) => {
        dispatch(candidateActions.getCandidate(id.email))
        setOpen(true);
    };

    // Close the edit candidate modal
    const handleClose = () => {
        setOpen(false);
    };

    // Open delete confirmation
    const handleDeleteClick = (ids) => {
        let [email] = ids
        setDeleteEmail(email)
        setDeleteOpen(true)
    }

    // Perform delete redux service after confirmation
    const handleDelete = () => {
        dispatch(candidateActions.deleteCandidate(deleteEmail))
    }

    // These id's comes from the database, they must match
    // You can see the possible values to display in redux
    const headCells = [
        { id: 'created', numeric: true, disablePadding: false, label: 'Screened', isDate: true},
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'aid', numeric: false, disablePadding: false, label: 'AID' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'will', numeric: true, disablePadding: false, label: 'Fit', suffix: '%' },
        { id: 'skill', numeric: true, disablePadding: false, label: 'Eligibility', suffix: '%' },
        { id: 'total', numeric: true, disablePadding: false, label: 'Total Score', suffix: '%' },
    ];

    const idString = 'aid'
    // This path is used to get to the details page
    const path = "candidate"

    return (
        <>
            <Paper className={classes.paper}>
                <ItemTable
                    title="Candidates"
                    idString={idString}
                    path={path}
                    includeJID
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDeleteClick}
                    prefKey={'candidatesPage'}
                    {...props}
                />
                <DeleteConfirmation
                    open={deleteOpen}
                    handleDelete={handleDelete}
                    handleClose={() => setDeleteOpen(false)}
                />
            </Paper>
            <CandidateModal open={open} handleClose={handleClose} />
        </>
    )
}
import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { applicantActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { ApplicantModal } from './'
import { DeleteConfirmation, ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function ApplicantTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    // States
    const [editOpen, setEditOpen] = React.useState(false); 
    const [editAID, setEditAID] = React.useState();
    const [editJID, setEditJID] = React.useState();

    // Deletion states
    const [deleteAID, setDeleteAID] = React.useState();
    const [deleteJID, setDeleteJID] = React.useState();

    // Deletion confirmation modal
    const [deleteOpen, setDeleteOpen] = React.useState(false);


    // Open the edit applicant modal
    const openEditModal = (id) => {
        setEditAID(id.aid)
        setEditJID(id.jid)
        setEditOpen(true);
    };

    // Close the edit applicant modal
    const handleClose = () => { setEditOpen(false); };

    // Open delete confirmation
    const handleDeleteClick = (ids) => {
        let [jid, aid] = ids
        setDeleteJID(jid)
        setDeleteAID(aid)
        setDeleteOpen(true)
    }

    // Perform delete redux service after confirmation
    const handleDelete = () => {
        dispatch(applicantActions.deleteApplicant(deleteJID, deleteAID, props.refreshPageAction))
    }

    // These id's comes from the database, they must match
    // You can see the possible values to display in redux
    const headCells = [
        { id: 'created', numeric: true, disablePadding: false, label: 'Screened', isDate: true},
        { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
        { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'aid', numeric: false, disablePadding: false, label: 'AID' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'will', numeric: true, disablePadding: false, label: 'Fit', suffix: '%' },
        { id: 'skill', numeric: true, disablePadding: false, label: 'Eligibility', suffix: '%' },
        { id: 'total', numeric: true, disablePadding: false, label: 'Total Score', suffix: '%' },
    ];

    const idString = 'aid'
    // This path is used to get to the details page
    const path = "applications"

    return (
        <>
            <Paper className={classes.paper}>
                <ItemTable
                    title="Applications"
                    idString={idString}
                    path={path}
                    includeJID
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDeleteClick}
                    prefKey={'applicantsPage'}
                    {...props}
                />
                <DeleteConfirmation
                    open={deleteOpen}
                    handleDelete={handleDelete}
                    handleClose={() => setDeleteOpen(false)}
                />
            </Paper>
            <ApplicantModal open={editOpen} handleClose={handleClose} aid={editAID} jid={editJID} />
        </>
    )
}
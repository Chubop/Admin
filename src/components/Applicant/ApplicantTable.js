import React, {useState} from 'react'

// redux
import { useDispatch } from 'react-redux'
import { applicantActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { ApplicantModal } from './'
import { DeleteConfirmation, PaginateTable, ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function ApplicantTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const paginate = props.paginate ? true : false

    // States
    const [editOpen, setEditOpen] = useState(false); 
    const [editAID, setEditAID] = useState();
    const [editJID, setEditJID] = useState();

    // Deletion states
    const [deleteAID, setDeleteAID] = useState();
    const [deleteJID, setDeleteJID] = useState();

    // Deletion confirmation modal
    const [deleteOpen, setDeleteOpen] = useState(false);

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
        { id: 'aid', numeric: false, disablePadding: false, label: 'AID' },
        { id: 'created', numeric: true, disablePadding: false, label: 'Screened', isDate: true},
        { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
        { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'stage', numeric: false, disablePadding: false, label: 'Stage' },
        { id: 'will', numeric: true, disablePadding: false, label: 'Fit', suffix: '%' },
        { id: 'skill', numeric: true, disablePadding: false, label: 'Eligibility', suffix: '%' },
        { id: 'total', numeric: true, disablePadding: false, label: 'Total Score', suffix: '%' },
    ];

    const idString = 'aid'
    // This path is used to get to the details page
    const path = "applications"

    const table = paginate ? 
        (<PaginateTable
                    title="Applications"
                    idString={idString}
                    path={path}
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDelete}
                    prefKey={"applicantsPage"}
                    noDelete
                    {...props}
        />) : 
        (<ItemTable
            title="Applications"
            idString={idString}
            path={path}
            headCells={headCells}
            handleClickEdit={openEditModal}
            handleDelete={handleDelete}
            prefKey={"applicantsPage"}
            noDelete
            {...props}
        />)

    return (
        <>
            <Paper className={classes.paper}>
                {table}
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
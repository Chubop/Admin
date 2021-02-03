import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { applicantActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { ApplicantModal } from './'
import { ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function ApplicantTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch()

    // States
    const [open, setOpen] = React.useState(false);

    // Open the edit applicant modal
    const openEditModal = (id) => {
        dispatch(applicantActions.getApplicant(id.aid, id.jid))
        setOpen(true);
    };

    // Close the edit applicant modal
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
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'will', numeric: true, disablePadding: false, label: 'Fit', suffix: '%' },
        { id: 'skill', numeric: true, disablePadding: false, label: 'Eligibility', suffix: '%' },
        { id: 'total', numeric: true, disablePadding: false, label: 'Total Score', suffix: '%' },
    ];

    const idString = 'aid'
    // This path is used to get to the details page
    const path = "applicant"

    return (
        <>
            <Paper className={classes.paper}>
                <ItemTable
                    title="Applicants"
                    idString={idString}
                    path={path}
                    includeJID
                    headCells={headCells}
                    handleClickEdit={openEditModal}
                    handleDelete={handleDelete}
                    {...props}
                />
            </Paper>
            <ApplicantModal open={open} handleClose={handleClose} />
        </>
    )
}
import React, {useState} from 'react'

// redux
import { useDispatch } from 'react-redux'
import { candidateActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { CandidateModal } from './'
import { DeleteConfirmation, PaginateTable, ItemTable } from '../General';
import { Link } from 'react-router-dom';
import { printFormat } from '../../functions';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export function CandidateTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch()

    const paginate = props.paginate ? true : false

    // States
    const [editOpen, setEditOpen] = useState(false); // edit modal
    const [editCID, setEditCID] = useState()

    // Deletion states
    const [deleteCID, setDeleteCID] = useState()
    const [deleteOpen, setDeleteOpen] = useState(false)

    // Open the edit candidate modal
    const openEditModal = (id) => {
        setEditCID(id.cid)
        setEditOpen(true);
    };

    // Close the edit candidate modal
    const handleClose = () => { setEditOpen(false); };

    // Open delete confirmation
    const handleDeleteClick = (ids) => {
        let [cid] = ids
        setDeleteCID(cid)
        setDeleteOpen(true)
    }

    // Perform delete redux service after confirmation
    const handleDelete = () => {
        dispatch(candidateActions.deleteCandidate(deleteCID))
    }


    // These id's comes from the database, they must match
    // You can see the possible values to display in redux
    const headCells = [
        { id: "cid", numeric: false, disablePadding: false, label: "CID"},
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'greenhouse_cid', numeric: false, disablePadding: false, label: 'Greenhouse CID' },
        { id: 'applicants', numeric: false, disablePadding: false, label: 'Applications',
            contentFunction: (applicants, candidate) => {
                if (applicants && applicants[0] && applicants[0].aid) {
                    return (
                        applicants.map((applicant) => 
                            <>
                                <Link to={`/applications/${applicant.jid}/${applicant.aid}`}>
                                    {applicant.job_title}
                                </Link>
                                <br />
                            </>
                        )
                    )
                }
                else {
                    return printFormat(applicants)
                }
            }
        },
        { id: 'numApplications', numeric: false, disablePadding: false, label: 'Applications',},
    ];

    const idString = 'cid'
    // This path is used to get to the details page
    const path = "candidate"

    return (
        <>
            <Paper className={classes.paper}>
                <PaginateTable
                    title="Candidates"
                    idString={idString}
                    path={path}
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
            <CandidateModal open={editOpen} handleClose={handleClose} cid={editCID}/>
        </>
    )
}
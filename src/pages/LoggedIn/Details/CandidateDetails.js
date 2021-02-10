import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { candidateActions } from '../../../redux/actions';

// MUI
import { 
    Card,
    CardContent,
    Grid,
    makeStyles,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    CardHeader,
} from '@material-ui/core'
import { 
    Check, 
    Extension, 
    Star 
} from '@material-ui/icons';

// Custom
import { printFormat } from '../../../functions'
import { DeleteConfirmation, Page } from '../../../components/General';
import { DashCard } from '../../../components/Dashboard';
import { CandidateModal } from '../../../components/Candidate';

const tabColor = '#1769aa'
const spacing = 2
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        padding: theme.spacing(10),
    },
    tableBody: {
        padding: theme.spacing(10),
    },
    detailsCardContent: {
        height: '100%'
    },
    detailsHeader: {
        background: tabColor,
        color: 'white'
    },
}));

export function CandidateDetails(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // States
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // for redirecting
    const [editOpen, setEditOpen] = useState(false);

    // Get cid from url
    const cid = props.match.params.cid

    // Load candidate details at start
    useEffect(() => {
        dispatch(candidateActions.getCandidate(cid))
    }, [])
    const candidatesState  = useSelector(state => state.candidate)
    const { candidate, loading, error } = candidatesState

    // When delete is confirmed
    const handleDelete = () => { 
        setDeleted(true) // redirects page to '/candidates'
        dispatch(candidateActions.deleteCandidate(cid)) 
    }

    const pageLoading = !candidate || loading
    return (
        <div className={classes.root}>
            <Page
                title="Candidate Details"
                loading={pageLoading}
                error={error}
                onDeleteClick={() => setDeleteOpen(true)}
                onEditClick={() => setEditOpen(true)}
            >
                {!pageLoading && !error &&
                    <Grid container spacing={spacing}>
                        <Grid item xs={candidate.total ? 9 : 12}>
                            <DetailsCard candidate={candidate} />
                        </Grid>
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{"CID: " + candidate.cid}</Typography>
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/candidate"/>
                        }
                        <CandidateModal
                            open={editOpen}
                            handleClose={() => setEditOpen(false)}
                        />
                    </Grid>
                }
            </Page>
        </div>
    )
}

function DetailsCard(props) {
    const { candidate } = props
    const classes = useStyles()

    return (
        <Card style={{height: '100%'}}>
            <CardHeader
                className={classes.detailsHeader}
                title={printFormat(candidate.email)}
            />
            <CardContent className={classes.detailsCardContent}>
                <Typography variant="body1">{printFormat(candidate.cid)} </Typography>
                <Typography variant="body1">{"Applications: " + printFormat(candidate.applications)} </Typography>
            </CardContent>
            {/* 
                // TODO make this page load in details about each application
                <ApplicantTable data={candidate.applications} />
            */}
        </Card>
    )
}
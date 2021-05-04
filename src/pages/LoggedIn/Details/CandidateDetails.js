import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { candidateActions } from '../../../redux/actions';

// MUI
import { 
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
    CardHeader,
} from '@material-ui/core'

// Custom
import { printFormat } from '../../../functions'
import { DeleteConfirmation, Page } from '../../../components/General';
import { CandidateModal } from '../../../components/Candidate';
import { ApplicantTable } from '../../../components/Applicant';

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
    const { candidate, loading, error } = useSelector(state => state.candidate)
    useEffect(() => {
        if (!candidate || (candidate.cid !== cid))
            dispatch(candidateActions.getCandidate(cid))
    }, [])

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
                        <Grid item xs={12}>
                            <DetailsCard candidate={candidate} />
                        </Grid>
                        {
                            candidate.applicants && candidate.applicants[0] && candidate.applicants[0].aid &&
                            <Grid item xs={12}>
                                <ApplicantTable data={candidate.applicants} refreshPageAction={() => dispatch(candidateActions.getCandidate(cid))}/>
                            </Grid>
                        }
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{"CID: " + cid}</Typography>
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/candidate"/>
                        }
                        <CandidateModal
                            cid={cid}
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
    const { candidate } = props;
    const classes = useStyles();

    if (!candidate.applications)
        return (<div/>)

    return (
        <Card style={{height: '100%'}}>
            <CardHeader
                className={classes.detailsHeader}
                title={printFormat(candidate.email || candidate.cid)}
            />
            <CardContent className={classes.detailsCardContent}>
                <Typography variant="body1">{"Greenhouse CID: " + printFormat(candidate.greenhouse_cid)} </Typography>
            </CardContent>
        </Card>
    )
}
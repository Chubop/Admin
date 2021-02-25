import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hmActions } from '../../../redux/actions';

// MUI
import { 
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Typography, 
} from '@material-ui/core'

// Custom
import { Page } from '../../../components/General/Page';
import { JobTable } from '../../../components/Job';
import { DeleteConfirmation, ScoreChartCard } from '../../../components/General';
import { HMModal } from '../../../components/HiringManager';
import { ApplicantsAnalytics } from '../../../components/Applicant';

const tabColor = '#1769aa'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    detailsHeader: {
        background: tabColor,
        color: 'white'
    },
}));

const spacing = 2

export function HMDetails(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // States
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // for redirecting
    const [editOpen, setEditOpen] = useState(false);

    // Get hmid from url
    const hmid = props.match.params.hmid

    // Load hiring manager details at start if needed
    const { hiringManager, loading, stats, error } = useSelector(state => state.hiringManager)
    useEffect(() => {
        if (!hiringManager || (hiringManager.hmid !== hmid))
            dispatch(hmActions.getHM(hmid))
    }, [])

    // When delete is confirmed
    const handleDelete = () => { 
        setDeleted(true) // redirects page to '/HM'
        dispatch(hmActions.deleteHM(hmid)) 
    }

    const pageLoading = !hiringManager || loading
    return (
        <div className={classes.root}>
            <Page
                title="Hiring Manager Details"
                loading={pageLoading}
                error={error}
                onDeleteClick={() => setDeleteOpen(true)}
                onEditClick={() => setEditOpen(true)}
            >
                {!pageLoading && !error &&
                    <Grid container spacing={spacing}>
                        <Grid item xs={12}>
                            <DetailsContent hiringManager={hiringManager} />
                        </Grid>
                        {hiringManager.jobs && hiringManager.jobs.length > 0 ?
                            <>
                                {stats.numApplicants > 0 ?
                                    <Grid item xs={12}>
                                        <AnalyticsContent stats={stats} hiringManager={hiringManager} />
                                    </Grid>
                                    :
                                    <h1>No candidates have applied to job postings by this Hiring Manager</h1>
                                }
                                <Grid item xs={12}>
                                    <JobTable data={hiringManager.jobs} />
                                </Grid>
                            </>
                            : <h1>This hiring manager has not posted any jobs</h1>
                        }
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{hiringManager.firstName + " " + hiringManager.lastName}</Typography>
                            <Typography>{"Number of Jobs: " + (hiringManager.jobs ? hiringManager.jobs.length : 0)}</Typography>
                            {
                                hiringManager.jobs &&
                                <Typography>{"This will not delete connected jobs."}</Typography>
                            }
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/HM" />
                        }
                        <HMModal
                            hmid={hmid}
                            open={editOpen}
                            handleClose={() => setEditOpen(false)}
                        />
                    </Grid>
                }
            </Page>
        </div >
    )
}

function DetailsContent(props) {
    const { hiringManager } = props
    const classes = useStyles()

    return (
        <div>
            <Card>
                <CardHeader
                    className={classes.detailsHeader}
                    title={hiringManager['firstName'] + ' ' + hiringManager['lastName']}
                />
                <CardContent>
                    <Typography variant="body1">Department: {hiringManager['department']}</Typography>
                    <Typography variant="body1">Team: {hiringManager['team']}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

function AnalyticsContent(props) {
    const { stats, hiringManager } = props

    return (
        <div>
            <Grid container spacing={spacing}>
                {
                    stats.numScored > 0 &&
                    <>
                        <Grid item xs={12}>
                            <ApplicantsAnalytics
                                stats={stats}
                                applicants={stats.applicants}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <ScoreChartCard
                                title={"Scores"}
                                data={stats.scores.total}
                                zoom
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <ScoreChartCard
                                title={"Fit"}
                                data={stats.scores.fit}
                                zoom
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <ScoreChartCard
                                title={"Eligibility"}
                                data={stats.scores.eli}
                                zoom
                            />
                        </Grid>
                    </>
                }
            </Grid>
        </div>
    )
}
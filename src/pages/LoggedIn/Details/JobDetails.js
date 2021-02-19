import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hmActions, jobActions } from '../../../redux/actions';

// MUI
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    makeStyles,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { Assessment, AssignmentTurnedIn, DoneAll, Edit, Extension, FilterList, Star } from '@material-ui/icons'

// Custom
import { printFormat } from '../../../functions'
import { ApplicantTable } from '../../../components/Applicant';
import {
    ScoreChartCard,
    Page,
    DeleteConfirmation
} from '../../../components/General';
import { JobModal } from '../../../components/Job';
import { DashCard } from '../../../components/Dashboard';
import { QuestionsCard } from '../../../components/Questions/QuestionsCard';

const tabColor = '#1769aa'
const spacing = 2
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    tabColor: {
        background: tabColor,
        color: 'white'
    },
}));

export function JobDetails(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // States
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // for redirecting

    // Get jid from url
    const jid = props.match.params.jid

    // Load job details at start
    useEffect(() => {
        dispatch(jobActions.getJob(jid))
    }, [])
    const jobState = useSelector(state => state.job)
    const { job, loading, stats, error } = jobState

    // When delete is confirmed
    const handleDelete = () => { 
        setDeleted(true) // redirects page to '/job'
        dispatch(jobActions.deleteJob(jid)) 
    }

    const pageLoading = !job || loading
    return (
        <div className={classes.root}>
            <Page
                title="Job Details"
                loading={pageLoading}
                error={error}
                onDeleteClick={() => setDeleteOpen(true)}
                deleteTooltip="Delete Job"
                // onEditClick={handleEditClick}
            >
                {!pageLoading && !error &&
                    <Grid container spacing={spacing}>
                        <Grid item xs={4}>
                            <Grid container spacing={spacing}>
                                <Grid item xs={12}>
                                    <DetailsContent job={job} />
                                </Grid>
                                {job.applicants && job.applicants.length > 0 &&
                                    <Grid item xs={12}>
                                        <StatsCards stats={stats} />
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                job.question &&
                                    <QuestionsCard questions={job.question} jid={job.jid} stats={stats}/>
                            }
                        </Grid>
                        {job.applicants && job.applicants.length > 0 ?
                            <>
                                {
                                    stats.numScored > 0 &&
                                    <Grid item xs={12}>
                                        <ScoreCharts job={job} stats={stats} />
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <ApplicantTable data={job.applicants} />
                                </Grid>
                            </>
                            :
                            <h1>No candidates have applied to this job</h1>
                        }
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{job.titles}</Typography>
                            <Typography>{"Number of Applications: " + stats.numApplicants}</Typography>
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/job"/>
                        }
                    </Grid>
                }
            </Page>
        </div>
    )
}

function DetailsContent(props) {
    const { job } = props
    const classes = useStyles()
    const dispatch = useDispatch();

    const [editOpen, setEditOpen] = useState(false);

    // Check hiring managers state, because jobModal needs a list of hiring managers
    const hmsState = useSelector(state => state.hiringManagers)
    const { hiringManagers } = hmsState
    // Open Edit Modal, and load necessary information 
    const handleEditClick = () => {
        // this job is already loaded in
        // load in all hiring managers if needed
        if (!hiringManagers)
            dispatch(hmActions.getAllHMs())
        setEditOpen(true)
    }

    return (
        <Card>
            <CardHeader
                className={classes.tabColor} 
                title={
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item> {job.titles} </Grid>
                        <Grid item>
                            <Tooltip title='Edit Job'>
                                <IconButton onClick={handleEditClick} style={{ color: 'white' }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                }
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {
                        job.hm ?
                            <>
                                {"Hiring Manager: "}
                                <Link to={`/hm/${job.hmid}`}>
                                    {printFormat(job.hm)}
                                </Link>
                            </>
                            :
                            "No hiring manager is in charge of this job."
                    }
                </Typography>
                <Typography variant="body1">ID: {printFormat(job.jid)} </Typography>
                <Typography variant="body1">Bot ID: {printFormat(job.botID)} </Typography>
                <Typography variant="body1">Type: {printFormat(job.type)} </Typography>
                <Typography variant="body1">Teams: {printFormat(job.team)} </Typography>
                <Typography variant="body1">Locations: {printFormat(job.location)} </Typography>
                <Typography variant="body1">Unit: {printFormat(job.unit)} </Typography>
            </CardContent>
            <JobModal
                open={editOpen}
                handleClose={() => setEditOpen(false)}
            />
        </Card>
    )
}

function StatsCards(props) {
    const { stats } = props

    return (
        <Grid container spacing={spacing} justify='space-between'>
            <Grid item xs={6}>
                <Grid container direction='column' spacing={spacing} >
                    <Grid item >
                        <DashCard
                            dashIcon={Star}
                            // TODO change to grade
                            // TODO grade on backend?
                            title={"Avg. Score"}
                            value={stats.avgTotal.toFixed(0) + "%"}
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={AssignmentTurnedIn}
                            title={"Avg. Eligibility"}
                            value={stats.avgEli.toFixed(0) + "%"}
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={Extension}
                            title={"Avg. Fit"}
                            value={stats.avgFit.toFixed(0) + "%"}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={spacing} direction='column'>
                    <Grid item >
                        <DashCard
                            dashIcon={Assessment}
                            title={"Applications"}
                            value={stats.numApplicants}
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={FilterList}
                            title={"Screened"}
                            value={stats.numScored}
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={DoneAll}
                            title={"Accepted"}
                            value={stats.accepted}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function ScoreCharts(props) {
    const { stats } = props

    return (
            <Grid container spacing={spacing}>
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
            </Grid>
    )
}
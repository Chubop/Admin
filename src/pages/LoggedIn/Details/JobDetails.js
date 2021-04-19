import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jobActions } from '../../../redux/actions';

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
    Paper,
} from '@material-ui/core'
import { AccessAlarm, AccessTimeRounded, Assessment, Clear, DoneAll, Edit, FilterList } from '@material-ui/icons'

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
import { JobMilestones } from '../../../components/Job/JobMilestones';
import { waitingColor } from '../../../functions/waitingColor';
import { AutoDecisionBarCard } from '../../../components/General/AutoDecisionBarCard';

const tabColor = '#1769aa'
const spacing = 2
const useStyles = makeStyles((theme) => ({
    tabColor: {
        background: tabColor,
        color: 'white'
    },
}));

export function JobDetails(props) {
    const dispatch = useDispatch();

    // States
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // for redirecting

    // Get jid from url
    const jid = props.match.params.jid

    // Load job details at start
    const { job, loading, stats, error } = useSelector(state => state.job)
    useEffect(() => {
        if (!job || (job.jid !== jid))
            dispatch(jobActions.getJob(jid))
    }, [])

    // When delete is confirmed
    const handleDelete = () => {
        setDeleted(true) // redirects page to '/job'
        dispatch(jobActions.deleteJob(jid))
    }

    const pageLoading = !job || loading
    return (
        <Page
            title={"Job Details" + (job ? " - " + job.titles : "")}
            loading={pageLoading}
            error={error}
            onDeleteClick={() => setDeleteOpen(true)}
            deleteTooltip="Delete Job"
        >
            {!pageLoading && !error &&
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        {job.applicants && job.applicants.length > 0 &&
                            <DashCards stats={stats} job={job} />
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <DetailsContent job={job} />
                    </Grid>
                    <Grid container item xs={9}>
                        <MilestonesCard job={job} stats={stats}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ScoreCharts job={job} stats={stats} />
                    </Grid>
                    <Grid item xs={12}>
                        <QuestionsCard questions={job.question} jid={job.jid} stats={stats} />
                    </Grid>
                    {job.applicants && job.applicants.length > 0 ?
                        <Grid item xs={12}>
                            <ApplicantTable data={job.applicants} />
                        </Grid>
                        :
                        <h1>No candidates have applied to this job</h1>
                    }
                    <DeleteConfirmation
                        open={deleteOpen}
                        handleDelete={handleDelete}
                        handleClose={() => setDeleteOpen(false)}
                    >
                        <Typography variant="h6">{job.titles}</Typography>
                        <Typography>{"Hiring Manager: " + job.hm}</Typography>
                        <Typography>{"Applications: " + stats.numApplicants}</Typography>
                        <Typography>{"Screened Applications: " + stats.numScored}</Typography>
                    </DeleteConfirmation>
                    {
                        deleted &&
                        <Redirect to="/job" />
                    }
                </Grid>
            }
        </Page>
    )
}

function DetailsContent(props) {
    const { job } = props
    const classes = useStyles()

    const [editOpen, setEditOpen] = useState(false);

    // Open Edit Modal
    const handleEditClick = () => { setEditOpen(true) }

    return (
        <Card>
            <CardHeader
                className={classes.tabColor}
                title={
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>{job.titles}</Grid>
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
                <Typography variant="body1">Type: {printFormat(job.type)} </Typography>
                <Typography variant="body1">Teams: {printFormat(job.team)} </Typography>
                <Typography variant="body1">Locations: {printFormat(job.location)} </Typography>
                <Typography variant="body1">Unit: {printFormat(job.unit)} </Typography>
                <Typography variant="body1">Bot ID: {printFormat(job.botID)} </Typography>
            </CardContent>
            <JobModal
                open={editOpen}
                jid={job.jid}
                handleClose={() => setEditOpen(false)}
            />
        </Card>
    )
}

function DashCards(props) {
    const { job, stats } = props
    const classes = useStyles()

    return (
        <Grid container spacing={spacing} >
            <Grid item>
                <DashCard
                    dashIcon={AccessTimeRounded}
                    title={"Last Action"}
                    value={printFormat(stats.lastAction, '', true)}
                />
            </Grid>
            {stats &&
                <>
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
                            dashIcon={AccessAlarm}
                            title={"Waiting"}
                            value={stats.waiting}
                            color={ waitingColor(stats.waiting) }
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={Clear}
                            title={"Rejected"}
                            value={stats.rejected}
                        />
                    </Grid>
                    <Grid item >
                        <DashCard
                            dashIcon={DoneAll}
                            title={"Accepted"}
                            value={stats.status.accepted}
                        />
                    </Grid>
                </>
            }
        </Grid>
    )
}

function ScoreCharts(props) {
    const { stats } = props

    if (stats.numScored === 0)
        return <div/>
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <ScoreChartCard
                    title={"Scores"}
                    data={stats.scores.total}
                    average={stats.avgTotal.toFixed(0) + "%"}
                    zoom
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <ScoreChartCard
                    title={"Eligibility"}
                    data={stats.scores.eli}
                    average={stats.avgEli.toFixed(0) + "%"}
                    zoom
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <ScoreChartCard
                    title={"Fit"}
                    data={stats.scores.fit}
                    average={stats.avgFit.toFixed(0) + "%"}
                    zoom
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <AutoDecisionBarCard
                    title={"Automated Screening"}
                    data={stats && stats.status}
                />
            </Grid>
        </Grid>
    )
}

const useMilestonesStyles = makeStyles((theme) => ({
    milestonesPaper: {
        width: '100%',
        height: '100%',
        padding: '3em 0',
        background: tabColor,
    },
    milestonesCard: {
        height: '100%',
        // Center vertically within card
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }
}));

function MilestonesCard(props) {
    const { job, stats } = props
    const classes = useMilestonesStyles()

    return (
        <Paper className={classes.milestonesPaper} >
            <Card elevation={0} square className={classes.milestonesCard} >
                <JobMilestones
                    jobOpened={job.created}
                    firstScreened={stats.firstScreened}
                    firstRejected={stats.firstRejected}
                    firstApproved={stats.firstApproved}
                />
            </Card>
        </Paper>
    )
}
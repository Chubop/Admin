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
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core'

// Custom
import { printFormat } from '../../../functions'
import { ApplicantTable } from '../../../components/Applicant';
import {
    ScoreChartCard,
    Page,
    DeleteConfirmation
} from '../../../components/General';
import { ApplicantsAnalytics } from '../../../components/Applicant';
import { JobModal } from '../../../components/Job';

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
    detailsHeader: {
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
    const [editOpen, setEditOpen] = useState(false);

    // Get jid from url
    const jid = props.match.params.jid

    // Load job details at start
    useEffect(() => {
        dispatch(jobActions.getJob(jid))
    }, [])
    const jobState = useSelector(state => state.job)
    const { job, loading, stats, error } = jobState

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
                onEditClick={handleEditClick}
            >
                {!pageLoading && !error &&
                    <Grid container spacing={spacing}>
                        <Grid item xs={4}>
                            <DetailsContent job={job} />
                        </Grid>
                        <Grid item xs={8}>
                            <QuestionsContent questions={job.question} />
                        </Grid>
                        {job.applicants && job.applicants.length > 0 ?
                            <>
                                {
                                    stats.numScored > 0 &&
                                    <Grid item xs={12}>
                                        <AnalyticsContent job={job} stats={stats} />
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <ApplicantTable data={job.applicants} />
                                </Grid>
                            </>
                            :
                            <h1>No applicants have applied to this job</h1>
                        }
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{job.titles}</Typography>
                            <Typography>{"Number of Applicants: " + stats.numApplicants}</Typography>
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/job"/>
                        }
                        <JobModal
                            open={editOpen}
                            handleClose={() => setEditOpen(false)}
                        />
                    </Grid>
                }
            </Page>
        </div>
    )
}

function DetailsContent(props) {
    const { job } = props
    const classes = useStyles()

    return (
        <Card>
            <CardHeader
                className={classes.detailsHeader}
                title={job.titles}
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
        </Card>
    )
}

function AnalyticsContent(props) {
    const { stats, job } = props

    return (
        <div>
            <Grid container spacing={spacing}>
                <Grid item xs={12}>
                    <ApplicantsAnalytics
                        stats={stats}
                        applicants={job.applicants}
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
            </Grid>
        </div>

    )
}

function QuestionsContent(props) {
    const { questions } = props
    const classes = useStyles()

    // let questions1 = questions.slice(0, Math.floor(questions.length/2)) 
    // let questions2 = questions.slice(Math.floor(questions.length/2)) 

    return (
        <Card>
            <CardHeader
                className={classes.detailsHeader}
                title={"Chatbot Questions and Scoring Preferences"}
            />
            {/* <CardContent> */}
            {/* <TableContainer> */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                Question
                                </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Preferred Answer
                                </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Weight
                                </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        questions.map((row) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {row.question}
                                    </TableCell>
                                    <TableCell>
                                        {printFormat(row.pref_ans)}
                                    </TableCell>
                                    <TableCell>
                                        {row.imp}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {/* </TableContainer>
            </CardContent> */}
        </Card>
    )
}
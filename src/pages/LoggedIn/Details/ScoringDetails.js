import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { jobActions } from '../../../redux/actions';

// MUI
import {
    makeStyles,
    Paper,
} from '@material-ui/core'

// Custom
import { Page, } from '../../../components/General';
import { QuestionsTable, QuestionsModal } from '../../../components/Questions';

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
        // background: tabColor,
        color: 'white'
    },
}));

export function ScoringDetails(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [editOpen, setEditOpen] = useState(false);
    const [QIDs, setQIDS] = useState([])
    const [questions, setQuestions] = useState({})

    // Get jid from url
    const jid = props.match.params.jid
    // Load job details at start if needed
    const { job, loading, stats, error } = useSelector(state => state.job)
    useEffect(() => {
        if (!job || (job.jid !== jid))
            dispatch(jobActions.getJob(jid))
    }, [])

    // Get list of QIDs for mapping rows
    useEffect(() => {
        if (job && job.questions) {
            let qids = []
            for (const qid in job.questions) {
                qids.push(qid)
            }
            setQIDS(qids)
            setQuestions(job.questions)
        }
    }, [job])

    const handleEditClick = () => { setEditOpen(true) }

    if (!questions || !QIDs)
        return <div />
    const pageLoading = !job || loading
    return (
        <div className={classes.root}>
            <Page
                title="Scoring Details"
                breadCrumbs={[
                    { link: '/job', name: "Job" },
                    { link: `/job/${jid}`, name: "Job Details" },
                    "Scoring Details"
                ]}
                loading={pageLoading}
                error={error}
                onEditClick={handleEditClick}
            >
                {!pageLoading && !error &&
                    <>
                        {
                            job.question &&
                            <Paper className={classes.paper}>
                                <QuestionsTable questions={job.question} jid={jid} stats={stats} zeros distribution common />
                                <QuestionsModal
                                    questions={questions}
                                    jid={jid}
                                    open={editOpen}
                                    handleClose={() => setEditOpen(false)}
                                />
                            </Paper>
                        }
                    </>
                }
            </Page>
        </div>
    )
}
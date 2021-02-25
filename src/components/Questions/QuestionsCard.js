import React, { useState } from 'react'
import { Link, } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { jobActions } from '../../redux/actions';

// MUI
import {
    Card,
    CardHeader,
    Grid,
    IconButton,
    makeStyles,
    Tooltip,
} from '@material-ui/core'
import { Edit, Refresh, ZoomIn } from '@material-ui/icons'

// Custom
import { QuestionsTable, QuestionsModal } from '../Questions';

const tabColor = '#1769aa'
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

export function QuestionsCard(props) {
    const { questions, jid, stats } = props
    const classes = useStyles()
    const dispatch = useDispatch()

    const [editOpen, setEditOpen] = useState(false);

    const handleRescore = () => {
        dispatch(jobActions.rescoreJob(jid))
    }

    const handleEditClick = () => { setEditOpen(true) }

    if (!questions)
        return <div/>
    return (
        <Card>
            <CardHeader
                className={classes.detailsHeader}
                title={
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item> Scoring </Grid>
                        <Grid item>
                            <Tooltip title='More Details'>
                                <Link to={`/job/${jid}/questions`}>
                                <IconButton style={{ color: 'white' }}>
                                    <ZoomIn />
                                </IconButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title='Edit Questions'>
                                <IconButton onClick={handleEditClick} style={{ color: 'white' }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Rescore Applicants'>
                                <IconButton onClick={handleRescore} style={{ color: 'white' }}>
                                    <Refresh />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                }
            />
            <QuestionsTable questions={questions} stats={stats} jid={jid} zeros />
            <QuestionsModal
                questions={questions}
                jid={jid}
                open={editOpen}
                handleClose={() => setEditOpen(false)}
            />
        </Card>
    )
}
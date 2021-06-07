import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

// MUI
import {
    // Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles,
} from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import { ExpandMore } from '@material-ui/icons';

// Custom
import { Page, } from '../../../components/General';
import { BarChartCard } from '../../../components/General/Charts/BarChartCard';
import { jobActions } from '../../../redux/actions';
import { BubbleChartCard, LogTimelineChart } from '../../../components/General/Charts';

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
    cardHeader: {
        background: tabColor,
        color: 'white'
    },
}));

export function BotDetails(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [questionIDs, setQuestionIDs] = useState()

    // Get jid from url
    const jid = props.match.params.jid

    // Load job details at start if needed
    const { botLogs, loading, botStats: stats, error } = useSelector(state => state.job)
    useEffect(() => {
        if (!botLogs || (botLogs.jid !== jid)) {
            dispatch(jobActions.getJobBotLogs(jid))
        }
    }, [])

    useEffect(() => {
        if (botLogs) {
            let newQuestionIDs = []
            for (let question in botLogs) {
                newQuestionIDs.push(question)
            }
            setQuestionIDs(newQuestionIDs)
        }
    }, [botLogs])

    if (!botLogs || !questionIDs)
        return <div/>

    const pageLoading = !botLogs || loading
    return (
        <div className={classes.root}>
            <Page
                title="Bot Details"
                loading={pageLoading}
                error={error}
            >
                {!pageLoading && !error &&
                    <>
                        <Grid container spacing={spacing}>
                            <Grid item style={{ width: '100%' }}>
                                <BubbleChartCard
                                    data={stats.numEachQuestionAsked}
                                    title={"Amount Asked per Question"}
                                />
                            </Grid>
                            <Grid item style={{ width: '100%' }}>
                                <Card>
                                    <CardHeader title={"Bot Overview"} className={classes.cardHeader} />
                                    <CardContent>
                                        <Typography>
                                            Number of applicants that have asked questions: {stats.numApplicantsThatAsked}
                                        </Typography>
                                        <Typography>
                                            Total number of questions asked by applicants: {stats.totalNumberOfQuestionsAsked}
                                        </Typography>
                                        {/* <Typography>
                                            Average number of questions asked by applicants: {stats.averageNumberOfQuestions}
                                        </Typography> */}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item container spacing={spacing} >
                                {
                                    questionIDs.map((questionID) => {
                                        let question = botLogs[questionID]
                                        return (
                                            <Grid item key={`question-timeline-${questionID}`} xs={12} md={6} lg={4} xl={3}>
                                                <BotQuestionDetailsCard question={question} questionID={questionID} jid={jid}/>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    </>
                }
            </Page>
        </div>
    )
}

function BotQuestionDetailsCard(props) {
    const { question, questionID, jid } = props;
    const classes = useStyles();
    const log = question.log;

    return (
        <>
            <Card style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                <CardHeader title={questionID} className={classes.cardHeader} />
                <LogTimelineChart log={question.log}/>
            </Card>
            <QuestionLogAccordion log={log} questionID={questionID} jid={jid} />
        </>
    )
}

const Accordion = withStyles({
    root: {
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

function QuestionLogAccordion(props) {
    const { log, questionID, jid } = props;
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded} onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${questionID}-log-content`}
            >
                {/* <Typography>Event Log</Typography> */}
                <Typography>Asked {log.length} time{log.length > 1 && "s"} </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableHead>
                        <TableCell> Timestamp </TableCell>
                        <TableCell> Applicant </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            log.map((event, index) => {
                                let time = new Date(event.time * 1000)
                                time = time.toLocaleTimeString() + " " + time.toLocaleDateString()

                                return (
                                    <TableRow>
                                        <TableCell> {time} </TableCell>
                                        <TableCell>
                                            <Link to={`/applications/${jid}/${event.aid}`}>
                                                {event.aid}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}

function NumberEachQuestionAskedBarCard(props) {
    const { data } = props
    const [processedData, setProcessedData] = useState()
    const [colorScale, setColorScale] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        if (data) {
            let newData = []
            let newColorScale = []
            let newCategories = []
            for (let questionID in data) {
                newData.push({ x: questionID, y: data[questionID] })
                newColorScale.push('grey')
                newCategories.push(questionID)
            }

            setProcessedData(newData)
            setColorScale(newColorScale)
            setCategories(newCategories)
        }
    }, [data])

    if (!processedData)
        return <> </>
    return (
        <BarChartCard
            data={processedData}
            colorScale={colorScale}
            categories={categories}
            title="Number of Times Each Question Was Asked"
        />
    )
}
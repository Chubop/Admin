import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { applicantActions } from '../../../redux/actions';

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
    Button,
    IconButton,
    Tooltip,
} from '@material-ui/core'
import { 
    Check, 
    Extension, 
    InfoOutlined, 
    Star, 
    ToggleOff, 
    ToggleOn
} from '@material-ui/icons';

// Custom
import { printFormat } from '../../../functions'
import { DeleteConfirmation, Page } from '../../../components/General';
import { DashCard } from '../../../components/Dashboard';
import { ApplicantModal } from '../../../components/Applicant';
import LinkedItems from '../../../components/Applicant/LinkedItems';
import { green, lime, orange, red, yellow } from '@material-ui/core/colors';

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
    actionLogPaper:{
        padding: 4,
        borderRadius:10,
        width: '100%',
    },
    scoreBarCell: {
        width: `calc(5vw + 30px)`
    },
    combinedScoreCell: {
        width: `calc(5vw + 100px)`
    },
}));

export function AppDetails(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // States
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // for redirecting
    const [editOpen, setEditOpen] = useState(false);

    // Get jid and aid from url
    const jid = props.match.params.jid
    const aid = props.match.params.aid

    // Load applicant details at start
    const { applicant, loading, error } = useSelector(state => state.applicant)
    useEffect(() => {
        if (!applicant || (applicant.aid !== aid) || (applicant.jid !== jid))
            dispatch(applicantActions.getApplicant(aid, jid))
    }, [])

    // When delete is confirmed
    const handleDelete = () => { 
        setDeleted(true) // redirects page to '/applicants'
        dispatch(applicantActions.deleteApplicant(jid, aid)) 
    }

    const pageLoading = !applicant || loading
    return (
        <div className={classes.root}>
            {
                deleted &&
                <Redirect to="/applications" />
            }
            <Page
                title="Application Details"
                loading={pageLoading}
                error={error}
                onDeleteClick={() => setDeleteOpen(true)}
                onEditClick={() => setEditOpen(true)}
            >
                {!pageLoading && !error &&
                    <Grid container spacing={spacing}>
                        <Grid item xs={applicant.total ? 9 : 12}>
                            <DetailsCard applicant={applicant} />
                        </Grid>
                        <Grid item xs={3}>
                            {
                                applicant.total &&
                                <Scores applicant={applicant} />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <ScoredAnswersTable questions={applicant.scoredQuestions} />
                        </Grid>
                        {
                            applicant.actionLog &&
                            <ActionLog actionLog={applicant.actionLog} />
                        }
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{applicant.name}</Typography>
                            <Typography>{applicant.first_name + " " + applicant.last_name}</Typography>
                            <Typography>{applicant.email}</Typography>
                        </DeleteConfirmation>
                        <ApplicantModal
                            open={editOpen}
                            handleClose={() => setEditOpen(false)}
                            aid={applicant.aid} jid={applicant.jid}
                        />
                    </Grid>
                }
            </Page>
        </div>
    )
}

function DetailsCard(props) {
    const { applicant } = props
    const classes = useStyles()

    let dateCreated = '---'
    let created = '---'
    if (applicant.created){
        created = applicant.created
        dateCreated = new Date(applicant.created * 1000)
        dateCreated = dateCreated.toLocaleTimeString() + " " + dateCreated.toLocaleDateString()
    }
    if (applicant.created[0]){
        created = applicant.created[0]
        dateCreated = new Date(applicant.created[0] * 1000)
        dateCreated = dateCreated.toLocaleTimeString() + " " + dateCreated.toLocaleDateString()
    }

    return (
        <Card style={{height: '100%'}}>
            <CardHeader
                className={classes.detailsHeader}
                title={printFormat(applicant.name)}
            />
            <CardContent>
                <Grid container justify='space-between'>
                    <Grid item>
                        < Button disabled style={{ backgroundColor: applicant.status === 'Rejected' ? "red" : 'green', color: 'white' }}>{printFormat(applicant.status)} </Button>
                        {
                            applicant.email &&
                            <>
                                <Typography variant="body1">{"Email: " + printFormat(applicant.email)} </Typography>
                                <Link to={`/candidate/${applicant.email}`}>
                                    <Typography variant="body1">
                                        Click to see other applications
                                    </Typography>
                                </Link>
                            </>
                        }
                        <Typography variant="body1">
                            {'Applied to: '}
                                <Link to={`/job/${applicant.jid}`}>
                                    {applicant.job_title}
                                </Link>
                        </Typography>
                        <Typography variant="body1">{"Screened: " + dateCreated + " (" + printFormat(created, "", true) + ")"} </Typography>
                        {
                            applicant.overqualified &&
                            <Typography variant="body1">This applicant might be overqualified</Typography>
                        }
                    </Grid>
                    <Grid item>
                        <LinkedItems applicant={applicant} />
                        {
                            applicant.recruiter &&
                            <Typography variant="body1">
                                {"Recruiter: " + applicant.recruiter.name}
                            </Typography>
                        }
                        {
                            applicant.name &&
                            <Typography variant="body1">
                                {"Chatbot Name: " + applicant.name}
                            </Typography>
                        }
                        {
                            <Typography variant="body1">
                                {"Greenhouse Name: " + ((applicant.first_name && applicant.last_name) ? applicant.first_name + " " + applicant.last_name : 'undefined')}
                            </Typography>
                        }
                        {
                            applicant.greenhouse_aid &&
                            <Typography variant="body1">
                                {"Greenhouse AID: " + applicant.greenhouse_aid}
                            </Typography>
                        }
                        {
                            applicant.greenhouse_cid &&
                            <Typography variant="body1">
                                {"Greenhouse CID: " + applicant.greenhouse_cid}
                            </Typography>
                        }

                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
}

function Scores(props) {
    const { applicant } = props
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12}>
                <DashCard
                    dashIcon={Star}
                    title={"Score"}
                    value={applicant.total + "%"}
                />
            </Grid>
            <Grid item xs={12}>
                <DashCard
                    dashIcon={Check}
                    title={"Eligibility"}
                    value={applicant.skill + "%"}
                />
            </Grid>
            <Grid item xs={12}>
                <DashCard
                    dashIcon={Extension}
                    title={"Job Fit"}
                    value={applicant.will + "%"}
                />
            </Grid>
        </Grid>
    )
}

function ScoredAnswersTable(props) {
    const { questions } = props
    const classes = useStyles()
    const [QIDs, setQIDS] = useState([])
    const [showBars, setShowBars] = useState(true)

    const headCells = [
        { id: 'answer', numeric: false, disablePadding: false, label: 'Answer' },
        { id: 'eli', numeric: !showBars, disablePadding: showBars, scoreCell: showBars, label: 'Eligibility' },
        { id: 'fit', numeric: !showBars, disablePadding: showBars, scoreCell: showBars, label: 'Fit' },
        { id: 'combined', hidden: !showBars, numeric: !showBars, disablePadding: showBars, combinedScore: showBars, label: 'Eligibility + Fit ', tooltip: 'Total score combines eligibility and fit using a custom ratio.' },
        { id: 'total', numeric: true, disablePadding: showBars, label: 'Total' },
        { id: 'imp', numeric: true, disablePadding: true, label: 'Weight' },
        { id: 'question', numeric: false, disablePadding: false, label: 'Question' },
        { id: 'pref_ans', numeric: false, disablePadding: false, label: 'Preferred' },
    ]

    // Get list of QIDs for mapping rows
    useEffect(() => {
        let qids = []
        for (const qid in questions) {
            qids.push(qid)
        }
        qids = qids.sort((a, b) => {
            a = parseInt(a)
            b = parseInt(b)
            if (a > b)
                return 1
            if (a < b)
                return -1
            return 0
        })

        // backwards compatability
        setShowBars(questions[qids[0]].eli_portion != null)

        setQIDS(qids)
    }, [questions])

    if (!questions || QIDs.length === 0 )
        return <></>

    return (
        <Card className={classes.paper}>
            <CardHeader className={classes.detailsHeader} 
            title={
                <Grid container justify='space-between'>
                    <Grid item> Scored Answers</Grid>
                    {
                        questions[QIDs[0]].eli_portion &&
                        <Grid item style={{display: 'flex', align: 'center'}} alignItems='center'>
                            <Typography> Detailed Scores </Typography>
                            <IconButton onClick={() => setShowBars(!showBars)} style={{padding: 0, paddingLeft: 10}} >
                                {showBars ? <ToggleOff /> : <ToggleOn />}
                            </IconButton>
                        </Grid>
                    }
                </Grid>
            }
            />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <ScoredAnswersTableHead questions={questions} toggleView={setShowBars} headCells={headCells}/>
                    <TableBody className={classes.tableBody}>
                        {QIDs.map((qid) => {
                            let question = questions[qid]
                            return (
                                <TableRow>
                                {headCells.map((cell) => {
                                    let cellContent = printFormat(question[cell['id']])
                                    if (cell['hidden']) {
                                        return <></>
                                    }
                                    if (question['eli_portion'] && showBars) {
                                        cellContent = getCellContent(question, cell['id'], cellContent)
                                    }
                                    return (
                                        <TableCell
                                            align={ cell.numeric ? 'right' : 'left' }
                                            padding={cell.disablePadding ? 'none' : 'default'}
                                        >
                                            { cellContent }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

function getCellContent(question, cellID, cellContent) {
    let weight = question['imp'] * 0.25 + 0.25
    let percent = 100
    let eli_portion = question['eli_portion']
    switch (cellID) {
        case 'eli':
            if (question['imp'] > 0)
                percent = question['eli'] / ((weight) * eli_portion) * 100
            cellContent = <ScorePercentBar percent={percent} />
            break;
        case 'fit':
            if (question['imp'] > 0)
                percent = question['fit'] / ((weight) * (10 - eli_portion)) * 100
            cellContent = <ScorePercentBar percent={percent} />
            break;
        case 'combined':
            let eli_percent = 100
            let fit_percent = 100
            if (question['imp'] > 0) {
                percent = question['total'] / ((weight) * 10) * 100
                eli_percent = question['eli'] / ((weight) * eli_portion) * 100
                fit_percent = question['fit'] / ((weight) * (10 - eli_portion)) * 100
            }
            cellContent = <TotalScoreBar percent={percent} eli={eli_portion} fit={10 - eli_portion} saturation={5} eli_percent={eli_percent} fit_percent={fit_percent} />
            break;
        case 'total':
            if (question['imp'] > 0) {
                percent = question['total'] / ((weight) * 10) * 100
            }
            cellContent = `${percent.toFixed(0)}%`
            break;
        default:
            break;
    }
    return cellContent
}

function ScoredAnswersTableHead(props) {
    const { headCells } = props
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    if (headCell['hidden'])
                        return <></>
                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            className={(headCell.scoreCell && classes.scoreBarCell) + ' ' + (headCell.combinedScore && classes.combinedScoreCell)}
                        >

                            {
                                headCell.tooltip ?
                                    <Grid container justify={'space-between'} spacing={0}>
                                        <Grid item>
                                            {headCell.label}
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title={headCell.tooltip} >
                                                <InfoOutlined style={{ verticalAlign: 'middle', marginRight: '1em' }} />
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                    :
                                    <> { headCell.label} </>
                            }
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

function ActionLog(props) {
    const { actionLog } = props
    const classes = useStyles();

    function getEntryAction (entry) {
        let textColor = 'red'
        let actionText = ''

        if (!(entry && entry.action))
            return <div/>
        switch (entry.action) {
            case 'advanced':
                textColor = 'green'
                actionText = 'Advanced'
                break;
            case 'rejected':
                textColor = "red"
                actionText = 'Rejected'
                break;
            case 'unrejected':
                textColor = "orange"
                actionText = 'Unrejected'
                break;
            default:
                break;
        }

        return (
            <Typography style={{ color: textColor }}>
                {actionText}
            </Typography>
        )
    }

    function getEntryDate (entry) {
        if (!(entry && entry.time))
            return null 
        let date = new Date(entry.time * 1000)
        date = date.toLocaleDateString()
        return <Typography> {date + " (" + printFormat(entry.time, '', true) + ")"} </Typography>
    }

    function getEntryUser (entry) {
        if (!(entry && entry.userName))
            return null
        return <Typography> {entry.userName} </Typography>
    }

    if ( actionLog.length === 0)
        return <div/>

    return (
        <Card className={classes.paper}>
            <CardHeader className={classes.detailsHeader} title="Action Log" />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell> Action </TableCell>
                        <TableCell> User </TableCell>
                        <TableCell> Time </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            actionLog.slice(0).reverse().map((entry) =>
                                <TableRow key={entry.action}>
                                    <TableCell>
                                        {getEntryAction(entry)}
                                    </TableCell>
                                    <TableCell>
                                        {getEntryUser(entry)}
                                    </TableCell>
                                    <TableCell>
                                        {getEntryDate(entry)}
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

const usePercentBarStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 50,
        minWidth: 30,
        width: '95%',
        margin: '5%',
        display: 'flex',
        background: 'repeating-linear-gradient( -45deg, #E3E3E3, #E3E3E3 3px, #D6D6D6 3px, #D6D6D6 6px)',
    },
    filler: {
        height: '100%',
        borderRadius: 'inherit',
        textAlign: 'left'
    },
    label: {
        padding: 5,
        color: 'white',
        fontWeight: '500',
        textShadow: "-1px -1px 0 DarkSlateGray,  1px -1px 0 DarkSlateGray, -1px 1px 0 DarkSlateGray, 1px 1px 0 DarkSlateGray"
    },
}));

function percentBarColor(percent, saturation) {
    if (percent < 25) { // 0 to 25
        return red[saturation * 100]
    }
    if (percent < 50) { // 25 to 50
        return orange[saturation * 100]
    }
    if (percent < 75) { // 50 to 75
        return yellow[saturation * 100]
    }
    if (percent < 95) { // 75 to 95
        return lime[saturation * 100]
    }
    // 95 and above
    return green[saturation * 100]
    // return '#1769aa'
}

function ScorePercentBar(props) {
    const { percent } = props
    const classes = usePercentBarStyles()
    return (
        <div className={classes.container}>
            <div className={classes.filler} 
            style={{ 
                width: `${percent}%`,
                backgroundColor: 'SlateGrey' , // light bright blue
            }}
                >
                <span className={classes.label}>
                    {`${percent.toFixed(0)}%`}
                </span>
            </div>
        </div>
    )
}

function TotalScoreBar(props) {
    const { percent, eli, fit, eli_percent, fit_percent } = props
    const classes = usePercentBarStyles()
    // const spaceBetweenEliAndFit = eli * 10 * (1 - (eli_percent / 100))
    // const spaceBetweenFitAndEnd = fit * 10 * (1 - (fit_percent / 100))
    const spaceBetweenFitAndEnd = percent < 100
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
            <div className={classes.container} >
                <div className={classes.filler}
                    style={{
                        width: `${eli * 10 * (eli_percent / 100)}%`,
                        backgroundColor: percentBarColor(eli_percent, 4),

                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                >
                    <span className={classes.label}/>
                </div>
                <div className={classes.filler}
                    style={{
                        width: `${fit * 10 * (fit_percent / 100)}%`,
                        backgroundColor: percentBarColor(fit_percent, 6),

                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: spaceBetweenFitAndEnd > 0 ? 0 : 50,
                        borderBottomRightRadius: spaceBetweenFitAndEnd > 0 ? 0 : 50,
                    }}
                >
                    <span className={classes.label}/>
                </div>
            </div>
        </div>
    )
}
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
import { ApplicantModal } from '../../../components/Applicant';

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
    useEffect(() => {
        dispatch(applicantActions.getApplicant(aid, jid))
    }, [])
    const appState  = useSelector(state => state.applicant)
    const { applicant, loading, error } = appState

    // When delete is confirmed
    const handleDelete = () => { 
        setDeleted(true) // redirects page to '/applicants'
        dispatch(applicantActions.deleteApplicant(jid, aid)) 
    }

    const pageLoading = !applicant || loading
    return (
        <div className={classes.root}>
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
                            <QuestionsTable questions={applicant.scoredQuestions} />
                        </Grid>
                        <DeleteConfirmation
                            open={deleteOpen}
                            handleDelete={handleDelete}
                            handleClose={() => setDeleteOpen(false)}
                        >
                            <Typography>{applicant.name}</Typography>
                            <Typography>{applicant.email}</Typography>
                        </DeleteConfirmation>
                        {
                            deleted &&
                            <Redirect to="/applications"/>
                        }
                        <ApplicantModal
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
    const { applicant } = props
    const classes = useStyles()

    let date = '---'
    if (applicant.created){
        date = new Date(applicant.created[0] * 1000)
    }

    return (
        <Card style={{height: '100%'}}>
            <CardHeader
                className={classes.detailsHeader}
                title={printFormat(applicant.name)}
            />
            <CardContent className={classes.detailsCardContent}>
                <Typography variant="subtitle1">{"Status: " + printFormat(applicant.status)} </Typography>
                <Typography variant="body1">{printFormat(applicant.email)} </Typography>
                <Typography variant="body1">{"Created: " + date} </Typography>
                <Link to={`/job/${applicant.jid}`}> <Typography variant="body1">Click to see job</Typography> </Link>
            </CardContent>
        </Card>
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

const headCells = [
    { id: 'answer', numeric: false, disablePadding: false, label: 'Answer' },
    { id: 'fit', numeric: true, disablePadding: false, label: 'Fit' },
    { id: 'eli', numeric: true, disablePadding: false, label: 'Eligibility' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
    { id: 'question', numeric: false, disablePadding: false, label: 'Question' },
    { id: 'pref_ans', numeric: false, disablePadding: false, label: 'Preferred' },
    { id: 'imp', numeric: false, disablePadding: false, label: 'Weight' },
]
function QuestionsTable(props) {
    const { questions } = props
    const classes = useStyles()
    return (
        <Card className={classes.paper}>
            <CardHeader className={classes.detailsHeader} title="Scored Answers" />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <QuestionsTableHead questions={questions}/>
                    <TableBody className={classes.tableBody}>
                        {questions.map((question) => (
                            // TODO make row change color based on total grade?
                            // <TableRow style={question.total || question.total === 0 ? {background: 'lavender'} : {}}>
                            <TableRow>
                                {headCells.map((cell) => {
                                    return (
                                        <TableCell
                                            align={cell.numeric ? 'right' : 'left'}
                                            padding={cell.disablePadding ? 'none' : 'default'}
                                        >
                                            {printFormat(question[cell['id']])}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

function QuestionsTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
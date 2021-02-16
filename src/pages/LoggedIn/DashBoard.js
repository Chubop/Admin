import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { AssignmentTurnedIn, DoneAll, Face, Grade, People } from '@material-ui/icons'

import { useDispatch, useSelector } from 'react-redux';

import { 
    DashCard, 
} from '../../components/Dashboard'
import { applicantActions } from '../../redux/actions';
import { Page, ScoreChartCard } from '../../components/General';
import { WeekCard } from '../../components/General';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export function DashBoard(){
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    const dispatch = useDispatch()

    useEffect(() => {
        // Used to get analytics about all the applicants
        dispatch(applicantActions.getAllApplicants())
    }, [])

    const applicantState = useSelector(state => state.applicants)
    const { stats: applicantStats, error } = applicantState
    
    function appsToday() {
        return (
            applicantStats ?
                applicantStats.daysSince.filter(days => days <= 1).length
                : '...'
        )
    }

    const loading = !applicantStats

    return (
        <Page
            title="Dashboard - All Jobs"
            loading={loading}
            error={error}
        >
            { !loading &&
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={spacing}>
                            <Grid item >
                                <DashCard dashIcon={People} title={"Screened Today"} value={appsToday()}
                                />
                            </Grid>
                            <Grid item >
                                <DashCard dashIcon={DoneAll} title={"Acceptance Rate"} value={applicantStats.acceptanceRate.toFixed(0) + "%"} />
                            </Grid>
                            {/* <Grid item>
                                <DashCard dashIcon={Face} title={"Active HM"} value={"5"}/>
                            </Grid> */}
                            <Grid item >
                                <DashCard dashIcon={Grade} title={"Average Grade"} value={applicantStats.avgTotal.toFixed(2) + "%"} />
                            </Grid>
                            <Grid item >
                                <DashCard
                                    dashIcon={People}
                                    title={"Applications"}
                                    value={applicantStats.numApplicants}
                                />
                            </Grid>
                            <Grid item >
                                <DashCard
                                    dashIcon={AssignmentTurnedIn}
                                    title={"Screened"}
                                    value={applicantStats.numScored}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={spacing}>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Application Scores"
                                    data={applicantStats && applicantStats.scores.total}
                                />
                            </Grid>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Application Eligibility"
                                    data={applicantStats && applicantStats.scores.eli}
                                />
                            </Grid>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Application Fit"
                                    data={applicantStats && applicantStats.scores.fit}
                                />
                            </Grid>
                            <Grid item>
                                <WeekCard
                                    title="Screened This Week"
                                    data={applicantStats && applicantStats.daysSince}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Page>
    )
}
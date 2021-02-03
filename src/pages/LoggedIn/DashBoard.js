import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { DoneAll, Face, Grade, People } from '@material-ui/icons'

import { useDispatch, useSelector } from 'react-redux';

import { 
    AppCard, 
    DashCard, 
    MultipleStatCard 
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
            title="Dashboard"
            loading={loading}
            error={error}
        >
            { !loading &&
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={spacing}>
                            <Grid item xs={6} sm={6} md={3}>
                                <DashCard dashIcon={People} title={"Applicants Today"} value={appsToday()}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3}>
                                <DashCard dashIcon={DoneAll} title={"Acceptance Rate"} value={applicantStats.acceptanceRate.toFixed(0) + "%"} />
                            </Grid>
                            {/* <Grid item>
                                <DashCard dashIcon={Face} title={"Active HM"} value={"5"}/>
                            </Grid> */}
                            <Grid item xs={6} sm={6} md={3}>
                                <DashCard dashIcon={Grade} title={"Average Grade"} value={applicantStats.avgTotal.toFixed(2) + "%"} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3}>
                                <DashCard
                                    dashIcon={People}
                                    title={"Applicants"}
                                    value={applicantStats.numApplicants}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={spacing}>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Applicant Scores"
                                    data={applicantStats && applicantStats.scores.total}
                                />
                            </Grid>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Applicant Eligibility"
                                    data={applicantStats && applicantStats.scores.eli}
                                />
                            </Grid>
                            <Grid item>
                                <ScoreChartCard
                                    zoom
                                    title="Applicant Fit"
                                    data={applicantStats && applicantStats.scores.fit}
                                />
                            </Grid>
                            <Grid item>
                                <WeekCard
                                    title="Applicants This Week"
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
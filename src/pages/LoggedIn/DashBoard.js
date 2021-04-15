import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Grid, makeStyles } from '@material-ui/core'
import { AssignmentTurnedIn, DoneAll, Grade, People } from '@material-ui/icons'

// Custom Components
import { Alerts, DashCard, } from '../../components/Dashboard'
import { Page, ScoreChartCard } from '../../components/General';
import { WeekCard } from '../../components/General';
import { applicantActions } from '../../redux/actions';

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

    // Get all applicants in the beginning to get applicant analytics
    const { stats: applicantStats, error } = useSelector(state => state.applicants)
    useEffect(() => {
        if (!applicantStats)
            dispatch(applicantActions.getAllApplicants())
    }, [])
    
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
                                <DashCard dashIcon={DoneAll} title={"Accepted"} value={applicantStats.accepted} />
                            </Grid>
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
                    {/* Charts */}
                    <Grid item xs={12} container spacing={spacing} direction='row'>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <ScoreChartCard zoom
                                title="Application Scores"
                                data={applicantStats && applicantStats.scores.total}
                                average={applicantStats && applicantStats.avgTotal.toFixed(2) + "%"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <ScoreChartCard zoom
                                title="Application Eligibility"
                                data={applicantStats && applicantStats.scores.eli}
                                average={applicantStats && applicantStats.avgEli.toFixed(2) + "%"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <ScoreChartCard zoom
                                title="Application Fit"
                                data={applicantStats && applicantStats.scores.fit}
                                average={applicantStats && applicantStats.avgFit.toFixed(2) + "%"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <WeekCard
                                title="Screened This Week"
                                data={applicantStats && applicantStats.daysSince}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        {applicantStats.alerts && <Alerts alerts={applicantStats.alerts} />}
                    </Grid>
                </Grid>
            }
        </Page>
    )
}
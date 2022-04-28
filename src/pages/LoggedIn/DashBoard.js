import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { FormControl, Grid, Input, MenuItem, Select, Typography } from '@material-ui/core'

// Custom Components
import { Alerts, DashCard, } from '../../components/Dashboard'
import { Page, ScoreChartCard, WeekCard, SourceTimelineChart } from '../../components/General';
import { applicantActions } from '../../redux/actions';

import { resumeAIActions } from '../../redux/resumeAIStore/action';
import { botLogActions } from '../../redux/BotLogs/action';
import { ResumeAIConversionChart } from '../../components/General/Charts/ResumeAIConversionChart';
import { AllBotLogsChart } from '../../components/General/Charts/AllBotLogsChart';
import { theme } from '../../theme/muiTheme';

export function DashBoard() {
    const [statsDays, setStatsDays] = useState(5000);
    const dispatch = useDispatch();

    // Get all applicants in the beginning to get applicant analytics
    const { stats: applicantStats, error } = useSelector(state => state.applicants)
    const { stats: resumeAIStats } = useSelector(state => state.resumeAI)
    const { botLogs } = useSelector(state => state.botLogs)
    useEffect(() => {
        if (!applicantStats)
            dispatch(applicantActions.getAllApplicantsStats(statsDays))
        if (!resumeAIStats)
            dispatch(resumeAIActions.getConversionRate(statsDays))
        if (!botLogs)
            dispatch(botLogActions.getAllBotLogs(statsDays))
    }, [])

    const handleDaysChange = (event) => {
        let newDays = event.target.value
        setStatsDays(newDays)
        dispatch(applicantActions.getAllApplicantsStats(newDays))
        dispatch(resumeAIActions.getConversionRate(newDays))
        dispatch(botLogActions.getAllBotLogs(newDays))
    }

    const loading = !applicantStats || !resumeAIStats || !botLogs

    return (
        <Page
            title=""
            loading={loading}
            error={error}
        >
            {!loading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3} style={{backgroundColor: 'white'}}>
                            <Grid container item xs={12}>
                                <Grid item xs={6}>
                                    <Typography variant="h2" style={{paddingTop: theme.spacing(1)}}>
                                        👋 Welcome
                                    </Typography>
                                </Grid>
                                <Grid container item xs={6} justifyContent='flex-end'>
                                    <TimeDropDown days={statsDays} setDays={handleDaysChange}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <DashCard title={"# Smart Apply Bots"}
                                    value={applicantStats.numBots}
                                    change={statsDays !== 5000 && applicantStats.numBotsChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DashCard title={"# Completed Conversations"}
                                    value={applicantStats.numConversationsRecent}
                                    change={statsDays !== 5000 && applicantStats.numConversationsChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DashCard title={"# Auto Advanced"}
                                    value={applicantStats.autoAdvancedRecent}
                                    change={statsDays !== 5000 && applicantStats.autoAdvancedChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DashCard title={"Resume AI Conversions"}
                                    value={resumeAIStats.recentConversionsRate}
                                    change={statsDays !== 5000 && resumeAIStats.conversionsRateChange}
                                    displayValue={(v) => typeof v === 'number' ? v.toFixed(0) + "%" : ""}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <SourceTimelineChart log={applicantStats.bySourceLog} />
                    </Grid>
                    <Grid item xs={8}>
                        <ResumeAIConversionChart
                            data={[
                                { x: "Visited", y: 2000 },
                                { x: "Used AI", y: resumeAIStats.recentResumeAI },
                                { x: "Clicked Match", y: resumeAIStats.recentClicks },
                                { x: "Applied to Match", y: resumeAIStats.recentConversions },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <AllBotLogsChart
                            data={botLogs.allLogs}
                        />
                    </Grid>
                    {/* <Grid >
                        <p style={{ color: 'black' }}>Requested Resume AI {resumeAIStats.recentResumeAIRequests}</p>
                        <p style={{ color: 'black' }}>Used Resume AI {resumeAIStats.recentResumeAI}</p>
                        <p style={{ color: 'black' }}>Clicked matched job {resumeAIStats.recentClicks}</p>
                        <p style={{ color: 'black' }}>Applied to matched {resumeAIStats.recentConversions}</p>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            botLogs.allLogs &&
                            Object.keys(botLogs.allLogs).map((key) => {
                                return (<>
                                    <p>
                                        {botLogs.allLogs[key].length} : {key}
                                    </p>
                                </>
                                )
                            })
                        }
                    </Grid> */}
                </Grid>
            }
        </Page>
    )
}

function TimeDropDown (props) {
    const {days, setDays} = props;
    const times = [
        {
            value: 1,
            name: "Last Day",
        },
        {
            value: 7,
            name: "Last Week",
        },
        {
            value: 30,
            name: "Last Month",
        },
        {
            value: 5000,
            name: "All Time",
        },
    ]

        return (
            <FormControl >
                    <Select
                        input={<Input/>}
                        value={days}
                        onChange={setDays}
                    >
                        {times.map((time) => (
                            <MenuItem value={time.value} >
                                {time.name}
                            </MenuItem>
                        ))}
                    </Select>
            </FormControl>
        )
    }
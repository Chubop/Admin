import React, { useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { jobActions } from '../../redux/actions'

// MUI
import { Grid } from '@material-ui/core'

// Custom Components
import { JobTable, ActionButton } from '../../components/Job'
import { JobsAnalytics } from '../../components/Job'
import { Page } from '../../components/General'

export function Job() {
    const dispatch = useDispatch()

    // Load in all jobs at the beginning
    useEffect(() => {
        dispatch(jobActions.getAllJobs())
    }, [])

    // Get the job states from redux
    const jobsState = useSelector(state => state.jobs)
    const { error, jobs, stats } = jobsState

    return (
        <Page
            title="Job Postings"
            loading={!jobs}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <JobsAnalytics stats={stats} jobs={jobs} />
                </Grid>
                <Grid item xs={12}>
                    <JobTable data={jobs} />
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
import React, { useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { applicantActions } from '../../redux/actions'

// MUI
import { Grid } from '@material-ui/core'

// Custom Components
import { Page } from '../../components/General'
import { ApplicantTable, ActionButton, ApplicantsAnalytics } from '../../components/Applicant'

export function Applicant() {
    const dispatch = useDispatch()

    // Get the applicant states from redux
    const { error, stats, applicants } = useSelector(state => state.applicants)

    // Load in all applicants at the beginning
    useEffect(() => {
        if (!applicants)
            dispatch(applicantActions.getAllApplicants())
    }, [])

    return (
        <Page
            title="Applications"
            loading={!applicants}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ApplicantsAnalytics stats={stats} applicants={applicants} />
                </Grid>
                <Grid item xs={12}>
                    <ApplicantTable data={applicants} />
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
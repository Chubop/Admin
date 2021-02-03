import React from 'react'

// MUI
import { Grid } from '@material-ui/core'

// Custom

export function ApplicantAnalytics(props) {
    const { stats, applicants }  = props

    // If stats are not loaded in, do not render
    if (!stats)
        return(<div/>)
    return(
        <>
            <Grid container spacing = {3}>
            </Grid>
        </>
    )
}
import React, { useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { hmActions } from '../../redux/actions'

// MUI
import { Grid } from '@material-ui/core'

// Custom Imports
import { HMTable, ActionButton } from '../../components/HiringManager'
import { Page } from '../../components/General'
// import { HMsAnalytics } from '../../components/HiringManager'

export function HiringManager() {
    const dispatch = useDispatch()

    // Load in all HM's at the beginning
    const { error, stats, hiringManagers } = useSelector(state => state.hiringManagers)
    useEffect(() => {
        if (!hiringManagers)
            dispatch(hmActions.getAllHMs())
    }, [])

    return (
        <Page
            title="Hiring Managers"
            loading={!hiringManagers}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item>
                    {/* <HMAnalytics stats={stats} hiringManagers={hiringManagers} /> */}
                </Grid>
                <Grid item xs={12}>
                    <HMTable data={hiringManagers} />
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
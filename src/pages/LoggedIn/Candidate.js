import React, { useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { candidateActions } from '../../redux/actions'

// MUI
import { Grid } from '@material-ui/core'

// Custom Components
import { Page } from '../../components/General'
import { CandidateTable, ActionButton } from '../../components/Candidate'

export function Candidate() {
    const dispatch = useDispatch()

    // Load in all candidates at the beginning
    useEffect(() => {
        dispatch(candidateActions.getAllCandidates())
    }, [])

    // Get the candidate states from redux
    const candidatesStates = useSelector(state => state.candidates)
    const { error, candidates } = candidatesStates

    return (
        <Page
            title="Candidates"
            loading={!candidates}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CandidateTable data={candidates} />
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
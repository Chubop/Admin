import React, { useState } from 'react'

// MUI
import { Grid } from '@material-ui/core'
import { Add, Assessment, AssignmentTurnedIn, Extension, Star } from '@material-ui/icons'

// Custom
import { DashCard } from '../Dashboard'
import { DaysSinceCard, DeleteConfirmation } from '../General'
import { useDispatch } from 'react-redux'
import { applicantActions } from '../../redux/actions'

export function ApplicantsAnalytics(props) {
    const dispatch = useDispatch()
    const { stats, applicants }  = props

    // Deletion states
    const [deleteAID, setDeleteAID] = useState()
    const [deleteJID, setDeleteJID] = useState()
    // Deletion confirmation modal
    const [deleteOpen, setDeleteOpen] = useState(false)

    // Open delete confirmation
    const handleDeleteClick = (ids) => {
        let [jid, aid] = ids
        setDeleteJID(jid)
        setDeleteAID(aid)
        setDeleteOpen(true)
    }

    // Perform delete redux service after confirmation
    const handleDelete = () => {
        dispatch(applicantActions.deleteApplicant(deleteJID, deleteAID, props.refreshPageAction))
    }

    // If stats are not loaded in, do not render
    if (!stats)
        return(<div/>)
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <DaysSinceCard
                    // For title
                    title="New Screened Applications"
                    type="Application"
                    detailsPath="applications"
                    data={applicants}
                    // database keys
                    idKey='aid' nameKey='name' nameLabel="Name"
                    prefKey="recentApplicants"
                    daysSinceMostRecent={Math.min(...stats.daysSince)}
                    handleDelete={(ids) => handleDeleteClick(ids)}
                />
                <DeleteConfirmation
                    open={deleteOpen}
                    handleDelete={handleDelete}
                    handleClose={() => setDeleteOpen(false)}
                />
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={Star}
                            // TODO change to grade
                            // TODO grade on backend?
                            title={"Average Score"}
                            value={stats.avgTotal.toFixed(0) + "%"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={AssignmentTurnedIn}
                            title={"Average Eligibility"}
                            value={stats.avgEli.toFixed(0) + "%"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={Extension}
                            title={"Average Fit"}
                            value={stats.avgFit.toFixed(0) + "%"}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={Add}
                            title={"Accepted"}
                            value={stats.status.accepted}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={Assessment}
                            title={"Applications"}
                            value={stats.numApplicants}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DashCard
                            dashIcon={Assessment}
                            title={"Screened"}
                            value={stats.numScored}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
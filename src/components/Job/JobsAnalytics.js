import React, { useState } from 'react'

// MUI
import { Grid } from '@material-ui/core'

// Custom Imports
import { DaysSinceCard } from '../General'
import { useDispatch } from 'react-redux'
import { jobActions } from '../../redux/actions'
import { DeleteConfirmation } from '../General'

export function JobsAnalytics(props) {
    const dispatch = useDispatch()
    const { stats, jobs } = props

    // Deletion states
    const [deleteJID, setDeleteJID] = useState()
    // Deletion confirmation modal
    const [deleteOpen, setDeleteOpen] = useState(false)

    // Open delete confirmation
    const handleDeleteClick = (jid, aid) => {
        setDeleteJID(jid)
        setDeleteOpen(true)
    }

    // Perform delete redux service after confirmation
    const handleDelete = () => {
        dispatch(jobActions.deleteJob(deleteJID))
    }

    if (!stats || !jobs)
        return (<div />)
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <DaysSinceCard
                        // For labels
                        title="New Jobs"
                        type="Job"
                        detailsPath="job"
                        data={jobs}
                        // For keeping the same rows per page
                        prefKey="recentJobs"
                        // database keys
                        idKey='jid' nameKey='titles' nameLabel="Title"
                        daysSinceMostRecent={Math.min(...stats.daysSince)}
                        handleDelete={(jid) => handleDeleteClick(jid)}
                    />
                    <DeleteConfirmation
                        open={deleteOpen}
                        handleDelete={handleDelete}
                        handleClose={() => setDeleteOpen(false)}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
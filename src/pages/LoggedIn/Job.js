import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { jobActions } from '../../redux/actions'
import { unsupportedJobActions } from '../../redux/Job'

// MUI
import { Grid } from '@material-ui/core'

// Custom Components
import { JobTable,  UnsupportedJobTable, ActionButton } from '../../components/Job'
import { JobsAnalytics } from '../../components/Job'
import { Page } from '../../components/General'

export function Job() {
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setPage] = useState(0)
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');

    // Load in all jobs at the beginning
    const { error, jobs, stats, totalCount } = useSelector(state => state.jobs)

    const { unsupJobs } = useSelector( state => state.unsupportedJobs)

    const refreshPage = (page, order, orderBy) => {
        dispatch(jobActions.getAllJobs(page, order, orderBy))
        dispatch(unsupportedJobActions.getAllUnsupJobs())
    }

    const handlePageChange = (page, order, orderBy) => {
        setPage(page)
        refreshPage(page, order, orderBy)
    }


    useEffect(() => {
        if (!jobs)
            refreshPage(currentPage, order, orderBy)
    }, [])


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
                    <JobTable 
                        paginate
                        data={jobs} 
                        totalCount={totalCount}
                        rowsPerPage={rowsPerPage} 
                        setRowsPerPage={setRowsPerPage} 
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        order={order}
                        setOrder={setOrder}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                    />
                    <UnsupportedJobTable
                        data={unsupJobs}                    
                    />

                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
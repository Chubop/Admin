import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { jobActions } from '../../redux/actions'
import { unsupportedJobActions } from '../../redux/Job'

// MUI
import { Button, Grid, Paper } from '@material-ui/core'

// Custom Components
import { JobTable, UnsupportedJobTable, ActionButton } from '../../components/Job'
import { JobsAnalytics } from '../../components/Job'
import { Page } from '../../components/General'
import { colors } from '../../theme/colors'
import { TableTabs } from '../../components/General/TableTabs'

export function Job() {
    const dispatch = useDispatch()
    const [tab, setTab] = useState('marlon')

    // Marlon Jobs table pagination
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setPage] = useState(0)
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');

    // Load in all jobs at the beginning
    const { error, jobs, stats, totalCount } = useSelector(state => state.jobs)

    const { unsupJobs } = useSelector(state => state.unsupportedJobs)

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
        else if (!unsupJobs)
            dispatch(unsupportedJobActions.getAllUnsupJobs())
    }, [])


    return (
        <Page
            breadCrumbs={["Jobs"]}
            loading={!jobs}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <JobTabs tab={tab} setTab={setTab} />
                        <div style={{ display: tab === 'marlon' ? 'block' : 'none' }}>
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
                        </div>

                        <div style={{ display: tab !== 'marlon' ? 'block' : 'none' }}>
                            <UnsupportedJobTable
                                data={unsupJobs}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}

function JobTabs(props) {
    const { tab, setTab } = props;

    return (
        <TableTabs
            currentTab={tab}
            setCurrentTab={setTab}
            tabs={[
                {title: "Marlon Jobs", value: 'marlon'},
                {title: "Other Jobs", value: 'other'},
            ]}
        />
    )
}
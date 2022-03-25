import React, { useEffect, useState } from 'react'

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
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setPage] = useState(0)
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');

    // Get the applicant states from redux
    const { error, stats, applicants, totalCount } = useSelector(state => state.applicants)

    // Refresh page
    const refreshPage = (page, order, orderBy) => {
        dispatch(applicantActions.getAllApplicants(page, order, orderBy))
    }

    const handlePageChange = (page, order, orderBy) => {
        setPage(page)
        refreshPage(page, order, orderBy)
    }

    // Load in all applicants at the beginning
    useEffect(() => {
        if (!applicants)
            refreshPage(currentPage, order, orderBy)
    }, [])

    return (
        <Page
            breadCrumbs={["Applications"]}
            loading={!applicants}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item>
                    {/* <ApplicantsAnalytics 
                        stats={stats} 
                        applicants={applicants} 
                        refreshPageAction={() => applicantActions.getAllApplicants()} 
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <ApplicantTable
                        paginate
                        data={applicants}
                        refreshPageAction={() => dispatch(applicantActions.getAllApplicants())}
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
                </Grid>
            </Grid>
            <ActionButton />
        </Page>
    )
}
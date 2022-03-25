import React, { useEffect, useState } from 'react'

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

    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setPage] = useState(0)
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');

    // Get the candidate states from redux
    const { error, candidates, totalCount } = useSelector(state => state.candidates)

    // Refresh page
    const refreshPage = (page, order, orderBy) => {
        dispatch(candidateActions.getAllCandidates(page, order, orderBy))
    }

    const handlePageChange = (page, order, orderBy) => {
        setPage(page)
        refreshPage(page, order, orderBy)
    }


    // Load in all candidates at the beginning
    useEffect(() => {
        if (!candidates)
            refreshPage(currentPage, order, orderBy)
    }, [])

    return (
        <Page
            breadCrumbs={["Candidates"]}
            loading={!candidates}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CandidateTable
                        paginate 
                        data={candidates}
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
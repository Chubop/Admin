import React, { useEffect, useState } from 'react'

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
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setPage] = useState(0)
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created');

    // Load in all HM's at the beginning
    const { error, stats, hiringManagers, totalCount } = useSelector(state => state.hiringManagers)
    
    // Refresh page
    const refreshPage = (page, order, orderBy) => {
        dispatch(hmActions.getAllHMs(page, order, orderBy))
    }

    const handlePageChange = (page, order, orderBy) => {
        setPage(page)
        refreshPage(page, order, orderBy)
    }

    
    useEffect(() => {
        if (!hiringManagers)
            refreshPage(currentPage, order, orderBy)
    }, [])

    return (
        <Page
            breadCrumbs={["Hiring Managers"]}
            loading={!hiringManagers}
            error={error}
        >
            <Grid container spacing={2}>
                <Grid item>
                    {/* <HMAnalytics stats={stats} hiringManagers={hiringManagers} /> */}
                </Grid>
                <Grid item xs={12}>
                    <HMTable
                        paginate
                        data={hiringManagers} 
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
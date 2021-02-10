import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider, Grid} from '@material-ui/core';


import { CircularStatic } from './'

const useStyles = makeStyles((theme) => ({
    root: { 
        minWidth: '256px',
        // maxWidth: '256px'
    },
    header: {
        color: '#03a9f4',
        textAlign: 'center'
    }
}));

export function MultipleStatCard(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" className={classes.header}>
                    Statistic Today
                </Typography>
                <Divider/>
                <Grid container spacing={5}> 
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            <CircularStatic progress={"25"}/>
                        </Typography>
                        <Typography>
                            Acceptance Rate
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            200
                        </Typography>
                        <Typography>
                            Applicants Today
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            52%
                        </Typography>
                        <Typography>
                            Average Scoring Fit
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            20
                        </Typography>
                        <Typography>
                            Active Hiring Manager
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            2020
                        </Typography>
                        <Typography>
                            Total Applications
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h1" className={classes.header}>
                            B
                        </Typography>
                        <Typography>
                            Average Grade
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
            </CardContent>
        </Card>
    )
}

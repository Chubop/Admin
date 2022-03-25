import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: { 
        minWidth: '256px',
        // maxWidth: '256px'
    },
    header: {
        textAlign: 'center'
    }
}));

export function AppCard(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent >
                <Typography variant="h1" className={classes.header}>
                    {props.value}
                </Typography>
                <Divider/>
                <Typography>
                    Applicants Today
                </Typography>
            </CardContent>
        </Card>
    )
}

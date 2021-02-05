import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const tabColor = '#1769aa'
const contentColor = '#03a9f4'

const useStyles = makeStyles((theme) => ({
    root: { 
        // minWidth: '256px',
        display: 'flex',
        maxWidth: '512px',
        height: '100%'
    },
    iconContainer: {
        display: 'flex',
        background: tabColor,
        flexDirection: 'column',
        verticalAlign: 'middle'
    },
    iconContent: {

        margin: 'auto',
        // background: ,
        verticalAlign: 'middle',
    },
    icon:{
        verticalAlign: 'middle',
        color: theme.palette.getContrastText(tabColor),
    },
    headerContainer: {
        width: '100%',
        textAlign: 'right'
    },
    headerTitle:{

    },
    content: {
        margin: 'auto',
        color: contentColor
        // textAlign: 'center'
    }
}));

export function DashCard(props){
    const classes = useStyles();
    const DashIcon = props.dashIcon
    return (
        <Card className={classes.root}>
            <div className={classes.iconContainer}>
                <CardContent className={classes.iconContent}>
                    <DashIcon fontSize="large" className={classes.icon} />
                </CardContent>
            </div>
            <CardContent className={classes.headerContainer}>
                <Typography className={classes.headerTitle}>
                    {props.title}
                </Typography>
                <Typography variant="h4" className={classes.content}>
                    {props.value}
                </Typography>
            </CardContent>
        </Card>
    )
}
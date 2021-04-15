import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from '@material-ui/icons';
import { printFormat } from '../../functions';

const tabColor = '#1769aa'
const completeColor = '#03a9f4'

const useStyles = makeStyles({
    timeline: {
        listStyleType: 'none',
        display: 'flex',
        // padding: '0'
    },          
    event: {
        transition: "all 200ms ease-in",
        width: '100%',
        "&::after": { content: "''"  },
    },
    timestamp: {
        marginBottom: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: 100,
    },
    eventTitle: {
        width: '100%',
        paddingTop: "1em",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        transition: "all 200ms ease-in",
    },
    eventIcon: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    lineBefore: {
        "&::before": {
            content: "''" ,
            flex: "1 1" ,
            borderBottom: "2px solid #000",
            margin: "auto",
        },
        "&::after": {
            content: "''" ,
            flex: "1 1" ,
        },
    },
    lineAfter: {
        "&::before": {
            content: "''" ,
            flex: "1 1" ,
        },
        "&::after": {
            content: "''" ,
            flex: "1 1" ,
            borderBottom: "2px solid #000",
            margin: "auto",
        },
    },
    complete: {
        "&::before": { borderColor: completeColor },
        "&::after": { borderColor: completeColor },
        color: completeColor,
    }
})


export function JobMilestones(props) {
    const classes = useStyles()
    const { jobOpened, firstScreened, firstRejected, firstApproved } = props;

    return (
        <Box className={classes.timeline} >
            <Box style={{ left: '-50%', width: '100%'}}>
                <MilestoneItem start
                    title="Job Created"
                    time={jobOpened}
                    nextTime={firstScreened}
                />
            </Box>
            <Box style={{ 'width': '100%' }}>
                <MilestoneItem
                    title="First Application"
                    time={firstScreened}
                    nextTime={firstRejected}
                />
            </Box>
            <Box style={{ 'width': '100%' }}>
                <MilestoneItem
                    title="First Rejection"
                    time={firstRejected}
                />
            </Box>
            <Box style={{ 'width': '100%' }}>
                <MilestoneItem end
                    title="First Approval"
                    time={firstApproved}
                />
            </Box>
        </Box>
    )
}

function MilestoneItem(props) {
    const { title, time, start, end } = props
    const classes = useStyles()

    let iconClass = classes.eventIcon
    if (!start)
        iconClass += ' ' + classes.lineBefore
    if (!end)
        iconClass += ' ' + classes.lineAfter
    if (time)
        iconClass += ' ' + classes.complete

    return (
        <div className={classes.event}>
            <Typography className={classes.eventTitle} variant='h6' >
                {title} 
            </Typography>
            <div className={iconClass}>
                { time ? <CheckCircle fontSize='large'/> : <RadioButtonUnchecked fontSize='large'/> }
            </div>
            <Typography className={classes.timestamp}>
                {time && printFormat(time, "", true)} 
            </Typography>
        </div>
    )
}
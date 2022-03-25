import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CheckCircle, FiberManualRecord, RadioButtonUnchecked } from '@material-ui/icons';
import { printFormat } from '../../functions';
import { colors } from '../../theme/colors';

const completeColor = colors.theme.mediumBlue
const incompleteColor = colors.greys.mediumGrey

const useStyles = makeStyles({
    timeline: {
        listStyleType: 'none',
    },
    event: {
        display: 'flex',
        alignItems: 'center',
        transition: "all 200ms ease-in",
        width: '100%',
        "&::after": { content: "''" },
    },
    timestamp: {
        width: '100%',
        fontWeight: 100,
    },
    eventTitle: {
        width: '100%',
        transition: "all 200ms ease-in",
        marginLeft: '8px'
    },
    eventIcon: {
        // display: 'flex',
        // flexDirection: 'column',
    },
    lineBefore: {
        "&::before": {
            content: "''",
            flex: "1 1",
            // borderBottom: "2px solid #000",
            margin: "auto",
        },
        "&::after": {
            content: "''",
            flex: "1 1",
        },
    },
    lineAfter: {
        "&::before": {
            content: "''",
            flex: "1 1",
        },
        "&::after": {
            content: "''",
            flex: "1 1",
            // borderBottom: "2px solid #000",
            margin: "auto",
        },
    },
    complete: {
        "&::before": { borderColor: completeColor },
        "&::after": { borderColor: completeColor },
        color: completeColor,
    },
    incomplete: {
        color: incompleteColor,
    }
})


export function JobMilestones(props) {
    const classes = useStyles()
    const { jobOpened, firstScreened, firstRejected, firstApproved } = props;

    return (
        <Box className={classes.timeline} >
            <Box style={{ left: '-50%', width: '100%' }}>
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
const iconSize = 20

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
    else
        iconClass += ' ' + classes.incomplete

    const Icon = () => {
        if (time)
            return (
                <div className={iconClass}>
                    {!start &&
                        <div style={{ borderLeft: '2px solid ' + colors.theme.lightBlue, height: 10, left: iconSize / 2 + 1, position: 'relative' }} />
                    }
                    {<FiberManualRecord style={{ height: iconSize }} />}
                </div>
            )

        else
            return (
                <div className={iconClass}>
                    {!start &&
                        <div style={{ borderLeft: '2px solid ' + colors.greys.mediumGrey, height: 10, left: iconSize / 2 + 1, position: 'relative' }} />
                    }
                    {<FiberManualRecord style={{ height: iconSize }} />}
                </div>
            )
    }


    return (
        <div className={classes.event}>
            <Icon />
            <Typography className={classes.eventTitle} >
                {title}
            </Typography>
            <Typography className={classes.timestamp}>
                {time && printFormat(time, "", true)}
            </Typography>
        </div>
    )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CircularProgress, Typography } from '@material-ui/core';

import { colors } from '../../theme/colors'
import UpwardTrend from '../../assets/icons/UpwardTrend.svg'
import DownwardTrend from '../../assets/icons/DownwardTrend.svg'

const contentColor = colors.theme.text

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '512px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    headerTitle: {
        fontSize: '16px',
        fontWeight: 500
    },
    content: {
        margin: 0,
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
    }
}));

export function DashCard(props) {
    const classes = useStyles();

    const value = () => {
        if (props.displayValue !== undefined)
            return props.displayValue(props.value)
        else
            return props.value
    }

    const Change = () => {
        let val = props.change
        let color = contentColor

        if (val > 0) {
            val = "+" + val
            color = colors.status.good
        }
        else if (val < 0) {
            color = colors.status.bad
        }
        else if (val === 0)
            return (<></>)
        
        if (props.displayValue !== undefined && val !== undefined) {
            val = props.displayValue(props.change)
            if (props.change > 0)
                val = "+" + val
        }

        return (
            <Typography variant="caption" style={{ color: color, marginBottom: '3px' }}>
                {val}
            </Typography>
        )
    }

    const TrendIcon = () => {
        if (props.change > 0) {
            return <img src={UpwardTrend} />
        }
        if (props.change < 0) {
            return <img src={DownwardTrend} />
        }
        return (<> </>)
    }

    let bgColor = colors.components.card
    if (props.bgColor)
        bgColor = props.bgColor

    return (
        <Card className={classes.root} style={{ backgroundColor: bgColor }}>
            <CardHeader title={
                <Typography className={classes.headerTitle}>
                    {props.title}
                </Typography>
            } />
            <CardContent className={classes.content}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gridGap: 5 }}>
                    <Typography variant="h1" style={{ color: (props.color || contentColor) }} >
                        {props.value === undefined ? <CircularProgress /> : value()}
                    </Typography>
                    <Change />
                </div>
                <TrendIcon />
            </CardContent>
        </Card>
    )
}

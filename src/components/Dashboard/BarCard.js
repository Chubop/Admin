import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';

import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const useStyles = makeStyles((theme) => ({
    root: { 
        maxWidth: '512px',
    },
    header: {
        color: '#03a9f4',
        textAlign: 'center'
    }
}));

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

export function BarCard(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent >
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                    />
                </VictoryChart>
            </CardContent>
        </Card>
    )
}

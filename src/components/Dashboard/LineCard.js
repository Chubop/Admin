import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, } from '@material-ui/core';

import { VictoryLine, VictoryChart } from 'victory';

const useStyles = makeStyles((theme) => ({
    root: { 
        maxWidth: '512px',
    },
    header: {
        color: '#03a9f4',
        textAlign: 'center'
    }
}));

export function LineCard(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent >
                <VictoryChart

                >
                    <VictoryLine
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                        ]}
                    />
                </VictoryChart>
            </CardContent>
        </Card>
    )
}

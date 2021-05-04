import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CircularProgress, makeStyles, } from '@material-ui/core';

import BubbleChart from '@weknow/react-bubble-chart-d3';

const tabColor = '#1769aa'

const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
        textAlign: 'left',
        color: 'white',
    },
    titleContainer: {
        backgroundColor: tabColor,
        color: 'white',
    },
    cardContent: {
        padding: 0,
        textAlign: 'center',
        paddingBottom: 0,
    },
    pieLabel: {
        stroke: 'white',
    },
}));

export function BubbleChartCard(props) {
    const { data } = props;
    const classes = useStyles();

    const [bubbleData, setBubbleData] = useState();

    useEffect(() => {
        if (data) {
            let newBubbleData = []
            for (let label in data) {
                newBubbleData.push({ label: label, value: data[label] })
            }
            setBubbleData(newBubbleData)
        }
    }, [data])

    if (!bubbleData)
        return <> </>

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}
                style={{ parent: { overflow: "visible" } }}>
                    <CardHeader
                    title={props.title}
                    className={classes.titleContainer}
                    />
                {
                    bubbleData === [] ?
                        <CircularProgress />
                        :
                        <svg 
                            height='580px'
                            width='800px'
                        >
                            <BubbleChart
                                data={bubbleData}
                                graph={{
                                    zoom: 0.9,
                                }}
                                padding={1}
                                height={600}
                                width={800}
                                valueFont={{
                                    family: 'Arial',
                                    size: 16,
                                    color: '#fff',
                                    weight: 'bold',
                                }}
                                labelFont={{
                                    family: 'Arial',
                                    size: 16,
                                    color: '#fff',
                                    weight: 'bold',
                                }}
                            />
                        </svg>
                }
            </CardContent>
        </Card>
    )
}
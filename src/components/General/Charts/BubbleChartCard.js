import React, { useEffect, useRef, useState } from 'react'

import { Card, makeStyles, Typography, } from '@material-ui/core';

import { colors } from '../../../theme/colors';
import { VictoryScatter, VictoryLabel } from 'victory';

const tabColor = colors.components.tableHeader

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    title: {
        textAlign: 'left',
    },
    titleContainer: {
        backgroundColor: tabColor,
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
    const { data, title, chartHeight = 300, verticalPadding = 40, horizontalPadding = 100, random } = props;
    const classes = useStyles();

    const ref = useRef(null)
    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }, [ref.current])

    const [width, setWidth] = useState(window.innerWidth)
    const updateWidth = (e) => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
        if (!ref.current)
            setTimeout(() => updateWidth(), 50)
    }
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        updateWidth()
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    const [bubbleData, setBubbleData] = useState();
    const colorScale = [
        colors.theme.darkBlue,
        colors.theme.mediumBlue,
        colors.theme.lightBlue,
        colors.theme.lightPurple,
        colors.theme.purple,
        colors.theme.darkPurple,
    ]

    useEffect(() => {
        if (data) {
            let newBubbleData = []
            let colorIndex = 0
            let dx = 0
            let dy = 0

            for (let label in data) {
                let x = dx + (random ? (Math.random(0,1)) : 0)
                let y = dy + (random ? (Math.random(0,1)) : 0)

                if (random) {
                    dx += 2
                    if (x > 6) {
                        dx = 0
                        dy += 1
                    }
                }
                else {
                    dx += 1
                    dy += 1
                    if (dx > 4){
                        dx = 0
                    }
                }

                newBubbleData.push({
                    label: label + `\n${data[label]}`,
                    value: data[label],
                    y: y, x: x,
                    color: colorScale[colorIndex] || colorScale[colorIndex % colorScale.length]
                })

                colorIndex += 1
            }

            setBubbleData(newBubbleData)
        }
    }, [data])

    if (!bubbleData || bubbleData.length === 0)
        return <> </>

    // Bubble chart no longer works with React 17, so I am making my own
    return (
        <Card className={classes.root} ref={ref}>
            {title && <Typography variant="h6">{title}</Typography> }
            <VictoryScatter
                width={width}
                height={chartHeight}
                bubbleProperty='value'
                data={bubbleData}
                maxBubbleSize={width < 400 ? Math.max(width / 4, 80) : 120}
                minBubbleSize={width < 400 ? Math.max(width / 10, 50) : 60}
                labelComponent={
                    <VictoryLabel
                        dy={25}
                        style={{ fill: 'white', fontSize: 20 }}
                    />
                }
                style={{ data: { fill: ({ datum }) => datum.color } }}
                padding={{ left: horizontalPadding, right: horizontalPadding, top: verticalPadding, bottom: verticalPadding }}
            />
        </Card>
    )
}
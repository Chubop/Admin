import React, { useEffect, useRef, useState } from 'react'

// MUI imports
import { Card, CardActions, CardContent, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

// Victory Charts imports
import { VictoryContainer, VictoryLabel, VictoryLegend, VictoryPie } from 'victory';

const useStyles = makeStyles((theme) => ({
    cardContent: {
        padding: 0,
    },
    pieLabel: {
        stroke: 'white',
    },
}));

export function PieChartCard(props) {
    const { data, colorScale } = props;
    // customization
    const { noLegend, donut, noPadding, centerTitle } = props;
    const classes = useStyles();
    const height = props.height || 300

    const [total, setTotal] = useState()

    const [legendData, setLegendData] = useState()

    const ref = useRef(null)
    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }, [ref.current])

    const [width, setWidth] = useState(window.innerWidth)
    const updateWidth = (e) => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    useEffect(() => {
        if (data) {
            let newLegendData = []
            let newTotal = 0
            for (let i in data) {
                let datum = data[i]
                newLegendData.push({ name: datum.x })
                newTotal += datum.y
            }
            setTotal(newTotal)
            setLegendData(newLegendData)
        }
    }, [data])

    return (
        <Card ref={ref} style={{ height: '100%', padding: noPadding && 0 }}>
            <CardContent className={classes.cardContent} style={{ parent: { overflow: "visible" } }}>
                {
                    data === [] ?
                        <CircularProgress />
                        :
                        <VictoryContainer
                            height={height}
                            width={width}
                        >
                            { !noLegend &&
                                <VictoryLegend
                                    orientation="vertical"
                                    gutter={20}
                                    data={legendData}
                                    centerTitle
                                    colorScale={colorScale}
                                    x={20}
                                    y={20}
                                    standalone={false}
                                />
                            }
                            <VictoryPie
                                colorScale={colorScale}
                                data={data}
                                height={height}
                                width={width}
                                standalone={false}
                                labels={({ datum }) => 
                                datum.x !== 'none' ?
                                datum.y > 0 ? `${(datum.y / total * 100).toFixed(0)}%` : ""
                                : ''
                            }
                                padding={{ left: noLegend ? 5 : 100, bottom: 15, top: 15 }}
                                labelRadius={({ innerRadius }) => 
                                donut ?  0.01 : innerRadius + 90
                            }
                                // labelRadius={({ innerRadius }) => 0 }
                                innerRadius={ donut ? Math.min(width, height) * 0.40 - 15 : 0}
                                labelComponent={
                                    <VictoryLabel
                                        style={[{ 
                                            fill: donut ?  'black' : 'white', 
                                            fontWeight: 'bold',
                                            // If donut, make fontSize large and dependent on size of chart
                                            // otherwise, make font regular size
                                            fontSize: donut ? Math.min(width, height) * 0.2 + 5 : '16',
                                        }]}

                                        // center the label if it is a donut by moving label up by half
                                        // of the fontSize if value >= 75% of total
                                        dy={({datum}) => 
                                        (datum.y >= 0.75 * total && donut) ? 
                                        - (Math.min(width, height) * .125 + 2.5)
                                        : 0 }

                                        // center the label if it is a donut by moving label left by half
                                        // of the fontSize if value < 75% of total
                                        dx={({datum}) => 
                                        (datum.y < 0.75 * total && donut) ? 
                                        - (Math.min(width, height) * .125 + 2.5)
                                        : 0 
                                        }
                                    />
                                }
                            />
                        </VictoryContainer>
                }
            </CardContent>
            <CardActions >
                <Grid container justifyContent={centerTitle? "center" : "flex-end"}>
                    <Grid item>
                        <Typography variant="h6" className={classes.title}>
                            {
                                typeof props.title === "function" ?
                                    props.title({ total: total })
                                    :
                                    props.title
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}
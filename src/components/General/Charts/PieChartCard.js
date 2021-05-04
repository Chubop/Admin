import React, { useEffect, useRef, useState } from 'react'

// MUI imports
import { Card, CardActions, CardContent, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

// Victory Charts imports
import { VictoryContainer, VictoryLabel, VictoryLegend, VictoryPie } from 'victory';


const tabColor = '#1769aa'
const height = 300

const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
        textAlign: 'left',
        color: 'white',
    },
    titleContainer: {
        backgroundColor: tabColor,
    },
    cardContent: {
        padding: 0,
    },
    pieLabel: {
        stroke: 'white',
    },
}));

export function PieChartCard(props) {
    const { data, colorScale } = props;
    const classes = useStyles();

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
            for (let i = 0; i < data.length; i++) {
                newLegendData.push({ name: data[i].x, sybmol: { fill: colorScale[i] } })
                newTotal += data[i].y
            }
            setTotal(newTotal)
            setLegendData(newLegendData)
        }
    }, [data])



    return (
        <Card className={classes.root} ref={ref}>
            <CardContent className={classes.cardContent} style={{ parent: { overflow: "visible" } }}>
                {
                    data === [] ?
                        <CircularProgress />
                        :
                        <VictoryContainer
                            height={height}
                            width={width}
                        >
                            <VictoryLegend
                                orientation="vertical"
                                gutter={20}
                                // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
                                data={legendData}
                                centerTitle
                                colorScale={colorScale}
                                x={20}
                                y={20}
                                standalone={false}
                            />

                            <VictoryPie
                                colorScale={colorScale}
                                data={data}
                                height={height}
                                width={width}
                                standalone={false}
                                labels={({ datum }) => `${(datum.y / total * 100).toFixed(1)}%`}
                                padding={{ left: 100, bottom: 15, top: 15 }}
                                labelRadius={({ innerRadius }) => innerRadius + 90}
                                labelComponent={
                                    <VictoryLabel
                                        style={[{ fill: 'white', fontWeight: 'bold' }]}
                                        className={classes.pieLabel} />
                                }
                            />
                        </VictoryContainer>
                }
            </CardContent>
            <CardActions className={classes.titleContainer}>
                <Grid container>
                    <Grid item>

                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}
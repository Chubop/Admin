import React, { useEffect, useRef, useState } from 'react'

// MUI imports
import { Card, CardActions, CardContent, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

// Victory Charts imports
import { VictoryBar, VictoryContainer, VictoryLabel, VictoryLegend, VictoryPie } from 'victory';


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
}));

export function BarChartCard(props) {
    const { data, colorScale } = props;
    const classes = useStyles();

    const [legendData, setLegendData] = useState()

    const ref = useRef(null)
    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }, [ref.current])

    const [width, setWidth] = useState(window.innerWidth)
    const updateWidth = (e) => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }

    // On component mount, add a listener for the window width
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    // When the data changes/loads, get the legend labels and colors
    useEffect(() => {
        if (data) {
            let newLegendData = []
            for (let i = 0; i < data.length; i++) {
                newLegendData.push({ name: data[i].x, sybmol: { fill: colorScale[i] } })
            }
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

                            <VictoryBar
                                colorScale={colorScale}
                                style={{data: {fill: ({index}) => colorScale[index], stroke: 'black', strokeWidth: 2 }}}
                                data={data}
                                height={height}
                                width={width}
                                standalone={false}
                                labels={({ datum }) => `${datum.y}`}

                                labelComponent={
                                    <VictoryLabel style={[{ fill: 'black', fontWeight: 'bold' }]} />
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
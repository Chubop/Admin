import React, { useEffect, useRef, useState } from 'react'

// MUI imports
import { Card, CardActions, CardContent, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

// Victory Charts imports
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, } from 'victory';


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

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent className={classes.cardContent} style={{ parent: { overflow: "visible" } }}>
                {
                    data === [] ?
                        <CircularProgress />
                        :
                        <VictoryChart
                            height={height}
                            width={width}
                        >
                            <VictoryBar
                                colorScale={colorScale}
                                style={{ data: { fill: ({ index }) => colorScale[index], stroke: 'black', strokeWidth: 2 } }}
                                data={data}
                                height={height}
                                width={width}
                                standalone={false}
                                labels={({ datum }) => `${datum.y}`}

                                labelComponent={
                                    <VictoryLabel style={[{ fill: 'black', fontWeight: 'bold' }]} />
                                }
                            />
                            <VictoryAxis
                                style={{ axis: { stroke: 'transparent' } }}
                            />
                        </VictoryChart>
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
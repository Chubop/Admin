import React, { useEffect, useRef, useState } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    CircularProgress, 
    Grid, 
    Typography, 
} from '@material-ui/core';

// Victory Charts
import { 
    VictoryAxis, 
    VictoryChart, 
    VictoryHistogram,
} from 'victory';

import {colors } from '../../../theme/colors'

const tabColor = colors.components.tableHeader

const binSize = 5 
const fill = colors.theme.mediumBlue
const hoverFill = colors.theme.lightBlue
const stroke = colors.theme.darkBlue
const hoverStroke = colors.theme.mediumBlue

const useStyles = makeStyles((theme) => ({
    root: { },
    title: {
        textAlign: 'left',
    },
    titleContainer: {
        backgroundColor: tabColor,
    },
    cardContent : {
        padding: 0,
    },
}));

const height = 300
const zoomedBinSize = 1

export function HistChartCard(props){
    const classes = useStyles();
    const { data, zoom } = props
    const [bins, setBins] = useState([])
    const [zoomed, setZoomed] = useState(false)
    const [xValues, setXValues] = useState([])
    const [defaultBins, setDefaultBins] = useState([])

    const ref = useRef(null)
    useEffect(() => {
        setWidth(ref.current? ref.current.offsetWidth : 0)
    }, [ref.current])

    const [width, setWidth] = useState(window.innerWidth)
    const updateWidth = (e) => {
        setWidth(ref.current? ref.current.offsetWidth : 0)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    },[])

    // Set up default bins based on lowest score
    // Format x values for histogram
    useEffect(() => {
        let newBins = []
        // Setting up bins
        if (props.bins) {
            newBins = props.bins
        }
        else {
            let lowest = binSize * (Math.floor(Math.min(...data) / binSize))
            for (let i = lowest; i <= 100; i += binSize) {
                newBins.push(i)
            }
        }
        setDefaultBins(newBins)
        setBins(newBins)

        // Converting data to histogram syntax
        let values = []
        for (let i = 0; i < data.length; i++)
            values.push({ 'x': data[i] })
        setXValues(values)
    }, data)

    // When user clicks on a data bar while zoomed out,
    // Or on anywhere on the chart while zoomed in
    const handleZoomClick = (x0) => {
        let newBins = []
        if (zoomed) {
            setZoomed(false)
            newBins = defaultBins
        }
        else {
            for (let i = 0; i <= binSize; i += zoomedBinSize) {
                newBins.push(i + x0)
            }
            setZoomed(true)
        }
        setBins(newBins)
        return handleHover(!zoomed)
    }

    // When the user hovers over a data bar
    const handleHover = (z) => {
        if (z) {
            return [{
                mutation: (props) => {
                    return {
                        style:
                            Object.assign({}, props.style, { fill: fill, stroke: stroke, cursor: "zoom-out" })
                    }
                }
            }]
        }
        return [{
            mutation: (props) => {
                return {
                    style:
                        Object.assign({}, props.style, { fill: hoverFill, stroke: hoverStroke, cursor: "zoom-in" })
                }
            }
        }]
    }

    // When the user stops hovering over a data bar
    const handleUnHover = (z) => {
        return [{
            mutation: (props) => {
                return {
                    style:
                        Object.assign({}, props.style, { stroke: stroke, fill: fill })
                }
            }
        }]
    }

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent className={classes.cardContent}>
                    {
                        props.average ?
                            <Typography variant="h6" className={classes.title}>
                                {`Average ${props.title}: ` + props.average}
                            </Typography>
                        :
                            <Typography variant="h6" className={classes.title}>
                                {props.title}
                            </Typography>
                    }

                {
                    xValues === [] || bins === [] ?
                    <CircularProgress/>
                    :
                        <svg viewBox={"0 0" + " " + width + " " + String(height)} preserveAspectRatio="none" width="100%" >
                            <VictoryChart
                                events={[
                                    {
                                        target: "parent",
                                        eventHandlers: {
                                            onMouseOver: () => {
                                                return handleHover(zoomed)
                                            },
                                            onClick: () => {
                                                if (zoomed) { return handleZoomClick() }
                                            }
                                        }
                                    }
                                ]}
                                standalone={false}
                                width={width} height={height}
                            >
                                <VictoryHistogram
                                    style={{ data: { fill: fill, stroke: stroke } }}
                                    binSpacing={5}
                                    cornerRadius={5}
                                    data={xValues}
                                    bins={bins}
                                    labels={({ datum }) => {
                                        if (datum.y > 0) {
                                            return (`${datum.y}`)
                                        }

                                    }}
                                    events={zoom && [
                                        {
                                            target: "data",
                                            eventHandlers: {
                                                onClick: (e, data) => { return handleZoomClick(data.datum.x0) },
                                                onMouseOver: () => { return handleHover(zoomed) },
                                                onMouseOut: () => { return handleUnHover() }
                                            }
                                        },
                                    ]}
                                />
                                <VictoryAxis
                                    tickValues={bins}
                                />
                            </VictoryChart>
                        </svg>
                }
            </CardContent>
        </Card>
    )
}
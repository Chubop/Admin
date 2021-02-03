import React, { useEffect, useState } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    CircularProgress, 
    Typography, 
} from '@material-ui/core';

// Victory Charts
import { 
    VictoryAxis, 
    VictoryChart, 
    VictoryHistogram, 
} from 'victory';

const tabColor = '#1769aa'

const binSize = 5 
const fill = "DarkCyan"
const hoverFill = "Cyan"
const stroke = "#005252"
const hoverStroke = "#0099C5"

const useStyles = makeStyles((theme) => ({
    root: { 
        maxWidth: '512px',
    },
    title: {
        textAlign: 'left',
        color: 'white',
    },
    titleContainer: {
        backgroundColor: tabColor,
    },
    cardContent : {
        padding: 0,
    },
}));

export function ScoreChartCard(props){
    const classes = useStyles();
    const { data, zoom } = props
    const [bins, setBins] = useState([])
    const [zoomed, setZoomed] = useState(false)
    const [xValues, setXValues] = useState([])
    const [defaultBins, setDefaultBins] = useState([])

    // Set up default bins based on lowest score
    // Format x values for histogram
    useEffect(() => {
        let values = []
        let newBins = []
        let lowest = binSize * (Math.floor(Math.min(...data) / binSize))
        for (let i = lowest; i <= 100; i += binSize) {
            newBins.push(i)
        }
        for (let i = 0; i < data.length; i++) {
            values.push({ 'x': data[i] })
        }
        setDefaultBins(newBins)
        setBins(newBins)
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
            for (let i = 0; i <= binSize; i++) {
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
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                {
                    xValues === [] || bins === [] ?
                    <CircularProgress/>
                    :
                    <VictoryChart 
                        events={[
                            {target: "parent",
                            eventHandlers: {
                                onMouseOver: () => {
                                    return handleHover(zoomed)
                                },
                                onClick: () => {
                                    if (zoomed) { return handleZoomClick() }
                                }
                            }}
                        ]}
                    >
                        <VictoryHistogram
                            style={{
                                data: { fill: fill, stroke: stroke },
                            }}
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
                }
            </CardContent>
            <CardActions className={classes.titleContainer}>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </CardActions>
        </Card>
    )
}

import React, { useEffect, useState } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { 
    CircularProgress, 
} from '@material-ui/core';

// Victory Charts
import { 
    VictoryAxis, 
    VictoryChart, 
    VictoryHistogram, 
} from 'victory';

const tabColor = '#1769aa'

const binSize = 1
const fill = "DarkCyan"
const stroke = "#005252"

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

export function QuestionScoresChart(props){
    const classes = useStyles();
    const { data, } = props
    const [bins, setBins] = useState([])
    const [xValues, setXValues] = useState([])

    // Set up default bins based on lowest score
    // Format x values for histogram
    useEffect(() => {
        let values = []
        let newBins = []
        let lowest = binSize * (Math.floor(Math.min(...data) / binSize))
        let highest = binSize * (Math.floor(Math.max(...data) / binSize))
        for (let i = lowest; i <= highest; i += binSize) {
            newBins.push(i)
        }
        for (let i = 0; i < data.length; i++) {
            values.push({ 'x': data[i] })
        }
        setBins(newBins)
        setXValues(values)
    }, data)

    return (
        <>
            {
                xValues === [] || bins === [] ?
                    <CircularProgress />
                    :
                    <VictoryChart height={150} width={400} >
                        <VictoryHistogram
                            style={{ data: { fill: fill, stroke: stroke }, }}
                            cornerRadius={5}
                            data={xValues}
                            bins={bins}
                            labels={({ datum }) => {
                                if (datum.y > 0) {
                                    return (`${datum.y}`)
                                }
                            }}
                        />
                        <VictoryAxis tickValues={bins} />
                    </VictoryChart>
            }
        </>
    )
}

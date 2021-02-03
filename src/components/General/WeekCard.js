import React from 'react';

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
    cardContent: {
        padding: 0,
    },
}));

export function WeekCard(props){
    const classes = useStyles();
    const { data } = props
    let x_values = []
    for (let i = 0; i < data.length; i++) {
        x_values.push({'x': data[i]})
    }

    const bins = [0,1,2,3,4,5,6,7]

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                {
                    x_values === [] ?
                    <CircularProgress/>
                    :
                    <VictoryChart>
                            <VictoryHistogram
                                style={{
                                    data: { fill: "DarkCyan" },
                                }}
                                cornerRadius={5}
                                data={x_values}
                                bins={bins}
                                labels={({ datum }) => {
                                    if (datum.y > 0) {
                                        return (`${datum.y}`)
                                    }
                                }}
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

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';

import { VictoryArea, VictoryChart, VictoryAxis, VictoryLabel, VictoryContainer } from 'victory';
import { colors } from '../../../theme/colors';
import ConversionBox from './ConversionBox';
import { theme } from '../../../theme/muiTheme';

import axios from 'axios';
import { UseBackendRoot } from '../../../settings/settings';

const chartHeight = 400

const useStyles = makeStyles((theme) => ({
    thirdTitle: {
        border: '1px solid #E5E6EB',
        borderBottom: '1px solid #F2F3F5',
        textAlign: 'left'
      },
}));


// getConversionRate takes a decimal and rounds it to the nearest first decimal point and multiplies it by 100
// i.e. 0.7647 => 76.5%
const getConversionRate = (float) => {
    return ((float) * 100).toFixed(1);
}


// numToK converts a string to "K" format, K as in kilo.
// i.e. 3400 => 3.4K
const numToK = (num) => {
    let x = (num / 1000).toFixed(1);
    if(num < 1000){
        return num.toString()
    }
    else if(num % 10 === 0){
        return Math.round(x).toString() + 'K';
    }
    else{
        return x.toString() + 'K'
    }
};


const getChartTitleSubtitle = (total, sub) => {
    let percentage = parseFloat(((sub/total) * 1000).toFixed(1)).toLocaleString();
    let ofNumber = numToK(total);
    return percentage + '% OF ' + ofNumber;
}


export function ChartTitle(props){
    return(
        <div style={{position: 'absolute', zIndex: 3, marginTop: -theme.spacing(40), paddingLeft: 16, fontSize: 16}}>
           <div style={{fontSize: 36, mixBlendMode: 'difference'}}>
               {props.title}
           </div>
           <div style={{color: colors.greys.mediumGrey}}>
               {props.subtitle}
           </div>
        </div>
    )
}

/*
    This is a chart that shows conversion from site visits, to resume ai use, to
    clicks on recommended jobs, to applications to recommended jobs
    * used in dashboard
*/
export function ResumeAIConversionChart (props) {

    const [allVisitors, setAllVisitors] = useState(0);
    const [loading, setLoading] = useState(true);

    const getVisitors = async(timePeriod) => {
        const API_ROOT = UseBackendRoot();
        var body = {
            "time_period": timePeriod ?? '7daysAgo'
        };

        let url = `${API_ROOT}/get_visitors`;
            
            var config = {
            method: 'POST',
            url: url,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: body
            };
            
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            setAllVisitors(response.data.visitors)
            })
            .catch(function (error) {
            console.log(error);
            });
              
        return data;
    }

    useEffect( () => {
        if(allVisitors === 0){
            getVisitors('14daysAgo');
        }
    }, []);


    const { data } = props

    const classes = useStyles();

    const ref = useRef(null)
    useEffect(() => { updateWidth() }, [ref])

    const [width, setWidth] = useState(window.innerWidth)
    const updateWidth = () => {
        setWidth(ref.current ? ref.current.offsetWidth : window.innerWidth)
        if (!ref.current)
            setTimeout(() => updateWidth(), 50)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    if (!data) {
        return <Card style={{ height: chartHeight, width: '100%' }} ref={ref} />
    }

    let colorScale = [colors.theme.darkBlue, colors.theme.mediumBlue, colors.theme.babyBlue, colors.theme.lightBlue]
    // TODO get site visitors per day from google analytics

    let usedAi = data[1].y;
    let clicked = data[2].y;
    let applied = data[3].y;

    let visitedConversion = getConversionRate(usedAi/allVisitors);
    let usedAiConversion = getConversionRate(clicked/usedAi);
    let clickedConversion = getConversionRate(applied/clicked);
    // not sure about appliedConversion
    let appliedConversion = getConversionRate(1/applied);

    return (
        <Card ref={ref}>
            <CardContent style={{zIndex: 1, position: 'relative'}}>
                <Grid container direction="row" item xs align="center">
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox top
                        title={"Step 1"}
                        subtitle={"Visited the Website"}/>
                    </Grid>
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox top
                        title={"Step 2"}
                        subtitle={"Engaged with Resume AI"}/>
                    </Grid>
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox top
                            title={"Step 3"}
                            subtitle={"Clicked the Jobs"}/>
                    </Grid>
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox top
                            title={"Step 4"}
                            subtitle={"Applied Recommended Roles"}/>
                    </Grid>
                    <VictoryChart
                    disableInlineStyles
                    containerComponent={<VictoryContainer style={{height: 'auto', border: 0}}/>}
                    width={width} domainPadding={{ x: 0 }} padding={{ top: 0, bottom: 0, right: 0, left: 0 }}>
                        <VictoryArea data={[{x: 'Visited', y: allVisitors}, data[1]]}
                        style={{data: {fill: colorScale[0]}}} />
                        <VictoryArea data={[data[1], data[2]]}
                        style={{data: {fill: colorScale[1]}}} />
                        <VictoryArea data={[data[2], data[3]]}
                        style={{data: {fill: colorScale[2]}}} />
                        <VictoryArea data={[data[3], {x:" ", y: data[3].y}]}
                        style={{data: {fill: colorScale[3]}}} />
                        <VictoryAxis
                            style={{
                                grid: { stroke: '#E5E6EB', strokeWidth: 1.5 },
                            }}
                        />
                    </VictoryChart>
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom
                        subtitle={visitedConversion.toString() + '%'}/>
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom
                        subtitle={usedAiConversion.toString() + '%'}/>
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom
                        subtitle={clickedConversion.toString() + '%'}/>
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom
                        subtitle={appliedConversion.toString() + '%'}/>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(allVisitors)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(usedAi)} subtitle={getChartTitleSubtitle(allVisitors, usedAi)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(clicked)} subtitle={getChartTitleSubtitle(usedAi, clicked)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(applied)} subtitle={getChartTitleSubtitle(clicked, applied)}/>
                    </Grid>
                </Grid>
            </CardContent>
            
            {/* <button onClick={()=>getVisitors("30daysAgo")}> click me </button> */}

        </Card>
    )
}
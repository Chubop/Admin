import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core';

import { VictoryArea, VictoryChart, VictoryAxis, VictoryContainer } from 'victory';
import { colors } from '../../../theme/colors';
import ConversionBox from './ConversionBox';
import { theme } from '../../../theme/muiTheme';

import axios from 'axios';
import { UseBackendRoot, current_env } from '../../../settings/settings';

const chartHeight = 400

const useStyles = makeStyles((theme) => ({
    thirdTitle: {
        border: '1px solid #E5E6EB',
        borderBottom: '1px solid #F2F3F5',
        textAlign: 'left'
      },
}));


/*
getConversionRate takes a decimal and rounds it to the nearest first decimal point and multiplies it by 100
i.e. 0.7647 => 76.5%
*/
const getConversionRate = (float) => {
    return ((float) * 100).toFixed(1);
}


/*
numToK converts a string to "K" format, K as in kilo.
i.e. 3400 => 3.4K
*/ 
const numToK = (num) => {
    let x = (num / 1000).toFixed(1);
    if(num < 1000){
        return num.toString()
    }
    else if(num % 10 === 0){
        return Math.round(x).toString() + 'K';
    }
    else if(isNaN(x)){
        return '0'
    }
    else{
        return x.toString() + 'K'
    }
};

/*
getChartTitleSubtitle retrieves the small sub-title inside of the 
ConversionBox by taking the previous number, dividing it by the new number,
and multiplying it by 1000.
*/
const getChartTitleSubtitle = (total, sub) => {
    let percentage = parseFloat(((sub/total) * 1000).toFixed(1)).toLocaleString();
    let ofNumber = numToK(total);
    
    if(isNaN(percentage))
        percentage = 0;
    return percentage + '% OF ' + ofNumber;
}


export function ChartTitle(props){
    if(!props.loading){
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
    else{
        return(
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{ zIndex: 3, marginTop: -theme.spacing(40), textAlign: 'center'}}>
                            <CircularProgress/>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}


/*
    This is a chart that shows conversion from site visits, to resume ai use, to
    clicks on recommended jobs, to applications to recommended jobs
    * used in dashboard
*/
export function ResumeAIConversionChart (props) {

    const [allVisitors, setAllVisitors] = useState(0);

    const { data } = props
    const classes = useStyles();
    const ref = useRef(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [visitStatLoading, setVisitStatLoading] = useState(true);
    const [conversionStatLoading, setConversionStatLoading] = useState(true);
    const [x, setX] = useState(data);


    useEffect( () => {
        if(current_env !== 'production'){
            if(allVisitors === 0){
                getVisitors('14daysAgo');
            }
        }
    }, []);


    useEffect( () => {
       setX(data);            
       if(x[1].y !== undefined){
            setConversionStatLoading(false);
       }
    }, [data]);


    useEffect( () => {
        if(allVisitors !== 0){
            setVisitStatLoading(false);
        }
    }, [allVisitors]);
    

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])


    useEffect(() => { updateWidth() }, [ref])


    const getVisitors = async(timePeriod) => {
        const API_ROOT = UseBackendRoot();
        var body = {
            "time_period": timePeriod ?? '7daysAgo'
        };

        let url = `${API_ROOT}/get_visitors`;

        let accessToken = JSON.parse(localStorage.getItem('accessToken')) // You are missing access token to the api call, otherwise it will fail since I required it to be @jwt_required on the backend
        let response = await axios.post( url, body, {            
            headers: {
            // No need for content type since axios will automatically determine that it's json, though you want you can still specify it here
            "Authorization": `Bearer ${accessToken}`
            },
        })
        setAllVisitors(response.data.visitors);
        return response.data.visitors;
    }

    const updateWidth = () => {
        setWidth(ref.current ? ref.current.offsetWidth : window.innerWidth)
        if (!ref.current)
            setTimeout(() => updateWidth(), 50)
    }


    if (!data) {
        return <Card style={{ height: chartHeight, width: '100%' }} ref={ref} />
    }

    let colorScale = [colors.theme.darkBlue, colors.theme.mediumBlue, colors.theme.babyBlue, colors.theme.lightBlue]
    // TODO get site visitors per day from google analytics

    let usedAi = data[1].y;
    let clicked = data[2].y;
    let applied = data[3].y;

    let visitedConversion = getConversionRate(1/0);
    let usedAiConversion = getConversionRate(1/0);
    let clickedConversion = getConversionRate(1/0);
    // not sure about appliedConversion
    let appliedConversion = getConversionRate(1/0);

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
                            subtitle={"Applied to Recommended Roles"}/>
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
                                axis: { stroke: 'transparent'  }
                            }}
                        />
                    </VictoryChart>
                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom loading={visitStatLoading}
                        subtitle={
                            !isFinite(visitedConversion) ? '...' : 
                            visitedConversion.toString() + '%'
                        }/>
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom loading={conversionStatLoading}
                        subtitle={
                            !isFinite(usedAiConversion) ? '...' : 
                            usedAiConversion.toString() + '%'
                        }/>
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom loading={conversionStatLoading}
                        subtitle={
                            !isFinite(clickedConversion) ? '...' : 
                            clickedConversion.toString() + '%'
                        }/>                    
                    </Grid>

                    <Grid item className={classes.thirdTitle} xs={3}>
                        <ConversionBox bottom loading={conversionStatLoading}
                        subtitle={
                            !isFinite(appliedConversion) ? '...' : 
                            appliedConversion.toString() + '%'
                        }/>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(allVisitors) || 0} loading={visitStatLoading}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(usedAi) || 0} subtitle={getChartTitleSubtitle(allVisitors, usedAi)} loading={conversionStatLoading}/>
                    </Grid>
                    <Grid item xs={3}>
                        {/* <CircularProgress style={{position: 'relative'}}/> */}
                        <ChartTitle title={numToK(clicked)} subtitle={getChartTitleSubtitle(usedAi, clicked)} loading={conversionStatLoading}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ChartTitle title={numToK(applied)} subtitle={getChartTitleSubtitle(clicked, applied)} loading={conversionStatLoading}/>
                    </Grid>
                    {/* <Grid item xs={3}>
                        <ChartTitle title={numToK(applied)} subtitle={getChartTitleSubtitle(clicked, applied)}/>
                    </Grid> */}
                </Grid>
            </CardContent>
        </Card>
    )
}
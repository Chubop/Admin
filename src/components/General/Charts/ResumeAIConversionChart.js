import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@material-ui/core';

import { VictoryArea, VictoryChart } from 'victory';
import { colors } from '../../../theme/colors';

const chartHeight = 400

/*
    This is a chart that shows conversion from site visits, to resume ai use, to
    clicks on recommended jobs, to applications to recommended jobs
    * used in dashboard
*/
export function ResumeAIConversionChart (props) {
    const { data } = props

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

    let colorScale = [colors.theme.darkPurple, colors.theme.darkBlue, colors.theme.mediumBlue, colors.theme.lightBlue]
    // TODO get site visitors per day from google analytics
    return (
        <Card ref={ref}>
            <CardContent >
                <VictoryChart height={chartHeight} width={width} >
                    {/* <VictoryArea data={[data[0], data[1]]}
                    style={{data: {fill: colorScale[0]}}} /> */}
                    <VictoryArea data={[data[1], data[2]]}
                    style={{data: {fill: colorScale[1]}}} />
                    <VictoryArea data={[data[2], data[3]]}
                    style={{data: {fill: colorScale[2]}}} />
                    <VictoryArea data={[data[3], {x:" ", y: data[3].y}]}
                    style={{data: {fill: colorScale[3]}}} />
                </VictoryChart>
            </CardContent>
        </Card>
    )
}
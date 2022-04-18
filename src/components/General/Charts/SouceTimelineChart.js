import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, makeStyles } from '@material-ui/core';

// Victory Imports
import { VictoryAxis, VictoryChart, VictoryStack, VictoryBar, VictoryLabel, VictoryTooltip, VictoryLegend, VictoryLine } from 'victory';
import { colors } from '../../../theme/colors';

const chartHeight = 400

/*
    This is a chart that shows applications to Marlon jobs per day, color coded by source
    i.e. Conversational apply, application from linkedin, smart matched, form application on website
    * used in dashboard
    * details are shown on hover
*/
export function SourceTimelineChart(props) {
    const { log } = props;
    const [data, setData] = useState();
    const [datesData, setDatesData] = useState({});
    const [maxDateValue, setMaxDateValue] = useState(0);

    const sources = ['bot', 'form', 'match', 'linkedin']

    const title = "Overall Applications by Source"

    useEffect(() => {
        setData([])
        if (log && log.length > 0) {
            let newData = []
            let dates = {}
            let now = new Date()

            // Initialize all dates between the first date in the log and today's date
            let current = new Date(log[0].time)
            dates[current.toLocaleDateString()] = {
                bot: 0,
                form: 0,
                match: 0,
                linkedin: 0,
            }
            do {
                current = current.addDays(1)
                dates[current.toLocaleDateString()] = {
                    bot: 0,
                    form: 0,
                    match: 0,
                    linkedin: 0,
                }
            } while (current.toLocaleDateString() !== now.toLocaleDateString())

            // Go through log and add to counter for each date and source
            for (let entry of log) {
                let time = new Date(entry.time).toLocaleDateString()
                dates[time][entry.source] += 1
            }

            for (let s of sources) {
                let source = []
                let name = s.name
                for (let date in dates) {
                    let num = dates[date][s]

                    source.push({ x: date, y: num, label: `${s}: ${num}` })
                }
                newData.push(source)
            }
            setData(newData)


            // Go through all dates and add data in correct format
            let newData2 = {}
            let values = []
            for (let date in dates) {
                let day = []
                for (let source in dates[date]) {
                    let num = dates[date][source]
                    values.push(num);
                    day.push({ x: source, y: num })
                }
                newData2[date] = day
            }
            setDatesData(newData2)
            setMaxDateValue(Math.max(...values))
            updateWidth()
        }
    }, [log])

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

    if (!data || data.length === 0)
        return <Card style={{ height: chartHeight, width: '100%' }} ref={ref} />

    const colorScale = [colors.theme.darkPurple, colors.theme.darkBlue, colors.theme.mediumBlue, colors.theme.lightBlue]
    const colorScaleReverse = colorScale.slice(0).reverse()

    return (
        <Card ref={ref}>
            <CardContent>
                <VictoryChart height={chartHeight} width={width} >
                    <VictoryLabel text={title} y={15} x={10} style={{ fontSize: '20px', fontWeight: 600 }} />
                    {[...Array(maxDateValue + 1).keys()].map( (v) => {
                        if(v % 5 === 0 && v !== 0){
                            return(
                            <VictoryLine y={() => v} style={{data: { stroke: "#F2F3F5" }}}/>
                            )
                        }
                    })}
                    <VictoryStack
                        colorScale={colorScale}
                        domainPadding={10}
                        labelComponent={
                            <VictoryTooltip
                                text={({ datum }) =>
                                    ([parseDate(datum.xName)].concat(
                                        datesData[datum.xName].map(({ x, y }) => `${parseSource(x)}: ${y}`)
                                            .reverse())).join("\n")
                                }
                                center={{ y: chartHeight / 4 }}

                                constrainToVisibleArea

                                flyoutComponent={<CustomFlyout />}

                                labelComponent={<VictoryLabel
                                    textAnchor='start'
                                    style={{ fontSize: 20 }}
                                    textComponent={<CustomText colors={colorScaleReverse} />}
                                />}
                            />
                        }
                    >
                        {/* {data.map((source) => { return <VictoryBar barWidth={10} data={source} /> })} */}
                    </VictoryStack>
                    <VictoryAxis dependentAxis />
                    <VictoryAxis
                        scale={{ x: "time" }}
                        fixLabelOverlap={true}
                        tickFormat={parseDate}
                    />
                    <VictoryLegend orientation="horizontal" colorScale={colorScaleReverse}
                        y={chartHeight - 20}
                        x={width / 2 - 250}
                        gutter={30}
                        symbolSpacer={10}
                        data={[{ name: "LP Site Bots" }, { name: "LP Site Forms" }, { name: "Smart Matched" }, { name: "LinkedIn" }].reverse()}
                    />
                </VictoryChart>
            </CardContent>
        </Card>
    )
}

function parseDate(time) {
    let month = new Date(time).getMonth()
    month = parseMonth(month)
    let date = new Date(time).getDate()
    return (`${month} ${date}`)
}

function parseSource(source) {
    switch (source) {
        case "bot":
            return "LP Site Bots"
        case "form":
            return "LP Site Forms"
        case "match":
            return "Smart Matched"
        case "linkedin":
            return "LinkedIn"
        default:
            return ""
    }
}

function CustomText(props) {
    const { children, colors } = props;

    return (
        <svg y={props.y}>
            {children.map((child, index) => {
                {
                    let y = index * 35 + 5
                    let x = 0.96*props.x - 58
                    let x2 = x - 24

                    return (
                        <>
                            {
                                index === 0 ?
                                    <text {...child.props} y={y + 20} x={x - 20} />
                                    :
                                    <>
                                        <g>
                                            <rect fill="white" width="200" height="26" x={x2} y={y} rx="5" />
                                            <text {...child.props} y={y} x={x} />
                                        </g>
                                        <circle fill={colors[index - 1]} cx={x2 + 12} cy={y + 13} r="8" />
                                    </>
                            }
                        </>
                    )
                }
            })}
        </svg>
    )
}

function CustomFlyout(props) {
    let { width, height, center } = props
    width = width * 2.0
    height = height * 2.1
    let x = .96 * center.x - 90
    let y = center.y - height / 2 + 60

    return (
        <svg height={height} width={width} x={x} y={y} >
            <defs>
                <filter id="blur" x="0" y="0">
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="50" />
                </filter>
            </defs>

            <rect height={height} width={width}
                fill="#EFEFFC"
                // fill="lightgrey"
                fillOpacity={1}
                filter="url(#blur)"
                rx="15"
            />
        </svg>
    )
}

function parseMonth(month) {
    switch (month) {
        case 0:
            return "Jan"
        case 1:
            return "Feb"
        case 2:
            return "Mar"
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Aug"
        case 8:
            return "Sep"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
import React, { useState, useEffect } from 'react'

// Victory Imports
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from 'victory';

export function LogTimelineChart(props) {
    const { log } = props;
    const [data, setData] = useState();

    useEffect(() => {
        setData([])
        if (log) {
            let newData = []
            let dates = {}
            let now = new Date()
            if (log[0]) {

                // Initialize all dates between the first date in the log and today's date
                let current = new Date(log[0].time * 1000)
                dates[current.toLocaleDateString()] = 0
                do {
                    current = current.addDays(1)
                    dates[current.toLocaleDateString()] = 0
                } while (current.toLocaleDateString() !== now.toLocaleDateString())

                // Go through log and add to counter for each date
                for (let i = 0; i < log.length; i++) {
                    let entry = log[i]
                    let time = new Date(entry.time * 1000).toLocaleDateString()

                    dates[time] += 1
                }

                // Go through all dates and add data in correct format
                for (let date in dates) {
                    newData.push({ x: date, y: dates[date] })
                }
            }
            setData(newData)
        }
    }, [log])

    if (!data)
        return <> </>

    return (
        <VictoryChart
            data={data}
            scale={{ x: 'time', y: 'linear' }}
        >
            <VictoryLine
                interpolation="linear"
                minDomain={{ y: -0.5 }}
                scale={{ x: "time", y: 'linear' }}
                data={data}
                style={{ data: { stroke: 'blue', strokeWidth: 2, } }}
            />
            <VictoryScatter // Dots on data points
                data={data}
                style={{ data: { fill: 'blue' } }}
                size={2}
            />
            <VictoryAxis
                dependentAxis
                crossAxis={false}
                tickFormat={(t) => Number.isInteger(t) ? Math.round(t) : ''}
            />
            <VictoryAxis
                scale={{ x: "time" }}
                fixLabelOverlap={true}
                tickFormat={(time) => {
                    let month = new Date(time).getMonth()
                    month = parseMonth(month)
                    let date = new Date(time).getDate()
                    return (`${month} ${date}`)
                }}
            />
        </VictoryChart>
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
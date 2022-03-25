import { useEffect, useState } from "react";
import { PieChartCard } from ".";
import { colors } from "../../../theme/colors";

/*
    This is a chart that shows the ratio of the FAQ questions asked, as recorded in bot logs
    * used in dashboard
    * rendered as a pie chart
*/
export function AllBotLogsChart(props) {
    const { data } = props;
    const [formatted, setFormatted] = useState([])

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            let newFormatted = []
            let benefits = {y: 0, x: "Benefits"}
            for (let key of Object.keys(data)) {
                if (['401K', 'Maternity', 'PTO', 'Medical'].includes(key)) {
                    benefits.y += data[key].length
                }
                else
                    newFormatted.push({ y: data[key].length, x: key })
            }
            newFormatted.push(benefits)
            newFormatted.sort((a, b) => {
                if (a.y > b.y)
                    return -1
                if (b.y < a.y)
                    return 1
                return 0
            })
            setFormatted(newFormatted)
        }
    }, [data])

    return (
        <PieChartCard
            data={formatted}
            colorScale={[colors.theme.darkPurple, colors.theme.darkBlue, colors.theme.mediumBlue, colors.theme.lightBlue, colors.theme.lightPurple]}
            title={({total}) => `Number of questions asked: ${total}`}
        />
    )
}
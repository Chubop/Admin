import React, { useEffect, useState } from "react";

// Custom Imports
import { BarChartCard } from "./BarChartCard";

export function AutoDecisionBarCard(props){
    const [data, setData] = useState()
    const [colorScale, setColorScale] = useState()

    useEffect(() => {
        if (props.data) {
            let newData = []
            let newColorScale = []
            if (props.data.autoAccepted > 0) {
                newData.push({ y: props.data.autoAccepted, x: "Auto Advanced" })
                newColorScale.push("#689F38")
            }

            if (props.data.accepted - props.data.autoAccepted > 0) {
                newData.push( { y: props.data.accepted - props.data.autoAccepted, x: "Manually Accepted"} )
                newColorScale.push("#64cdaa")
            }

            if (props.data.autoRejected > 0){
                newData.push({ y: props.data.autoRejected, x: "Auto Rejected"})
                newColorScale.push("#ff6900")
            }
            
            if (props.data.rejected - props.data.autoRejected > 0) {
                newData.push( { y: props.data.rejected - props.data.autoRejected, x: "Manually Rejected"} )
                newColorScale.push("#ff6347")
            }

            if (props.data.waiting){
                newData.push({ y: props.data.waiting, x: "No Decision"})
                newColorScale.push("LightSlateGray")
            }

            // newData.push({y: props.data.numApplicants - props.data.autoAccepted - props.data.autoRejected, x: "Neither"})
            // newColorScale.push("#8ABDFB")

            setData(newData)
            setColorScale(newColorScale)
        }

    }, [props.data])

    if (!data)
        return <></>

    return (
        <BarChartCard
            data={data}
            colorScale={colorScale}
            title={props.title}
        />
    )
}
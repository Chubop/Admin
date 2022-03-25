import React, { useEffect, useState } from "react";

// Custom Imports
import { BubbleChartCard } from ".";

export function AutoDecisionBarCard(props){
    const [data, setData] = useState()
    const [bubbleData, setBubbleData] = useState()

    useEffect(() => {
        if (props.data) {
            let newData = []
            let newBubbleData = {}
            if (props.data.autoAccepted > 0) {
                newData.push({ y: props.data.autoAccepted, x: "Auto Advanced" })
                newBubbleData['Auto\nAdvanced'] = props.data.autoAccepted
            }

            if (props.data.accepted - props.data.autoAccepted > 0) {
                newData.push( { y: props.data.accepted - props.data.autoAccepted, x: "Manually Advanced"} )
                newBubbleData['Manually\nAdvanced'] = props.data.accepted - props.data.autoAccepted
            }

            if (props.data.autoRejected > 0){
                newData.push({ y: props.data.autoRejected, x: "Auto Rejected"})
                newBubbleData['Auto\nRejected'] = props.data.autoRejected
            }
            
            if (props.data.rejected - props.data.autoRejected > 0) {
                newData.push( { y: props.data.rejected - props.data.autoRejected, x: "Manually Rejected"} )
                newBubbleData['Manually\nRejected'] = props.data.rejected - props.data.autoRejected
            }

            if (props.data.waiting){
                newData.push({ y: props.data.waiting, x: "No Decision"})
                newBubbleData['Waiting'] = props.data.waiting
            }

            // newData.push({y: props.data.numApplicants - props.data.autoAccepted - props.data.autoRejected, x: "Neither"})

            setData(newData)
            setBubbleData(newBubbleData)
        }

    }, [props.data])

    if (!data)
        return <></>

    return (
        <BubbleChartCard title="Automated Screening" data={bubbleData} />
    )
}
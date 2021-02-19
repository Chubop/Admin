import React from 'react';
import { HistChartCard } from './HistChartCard';

export function WeekCard(props){
    return (
        <HistChartCard
            bins={[0,1,2,3,4,5,6,7]}
            {...props}
        />
    )
}

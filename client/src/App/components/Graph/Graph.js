import React from "react";
import { Chart } from 'react-charts';
import "./Graph.css";

const Graph = () => {
    const props = {
        chartData: "",
        chartWidth: 400,
        chartHeight: 300,
        chartType: "bubble"
    }

    const data = React.useMemo(
        () => [
            {
            label: 'Series 1',
            data: [[1, 4], [2,3], [3,2]]
            },
            {
            label: 'Series 2',
            data: [[0, 3], [1, 1], [2, 5]]
            }
        ],[]
    )

    const series = React.useMemo(
        () => ({
            type: props.chartType
        }), [props.chartType]
    )
    
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ], []
    )
    
    const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
        style={{
            width: props.chartWidth + 'px',
            height: props.chartHeight + 'px',
            backgroundColor: "white"
        }}
    >
        <Chart data={data} axes={axes} series={series} grouping="single" tooltip/>
    </div>
    )

    return (
    <div 
        style={{
            width: (props.chartWidth + 100) + 'px',
            height: (props.chartHeight + 100) + 'px',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: "5px"
        }}
        >
        {lineChart}
    </div>
    )
}

export default Graph;
import React from "react";
import { Chart } from 'react-charts';
import "./Graph.css";

const Graph = (props) => {

    const data = React.useMemo(
        () => [
            {
            label: props.label,
            data: props.data
            }
        ],[props.data, props.label]
    )

    const series = React.useMemo(
        () => ({
            type: props.chartType
        }), [props.chartType]
    )
    
    const axes = React.useMemo(
        () => [
            { primary: true, type: props.xAxisType, position: 'bottom' },
            { type: props.yAxisType, position: 'left' }
        ], [props.xAxisType, props.yAxisType]
    )
    
    const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
        style={{
            width: '90%',
            height: '90%',
            backgroundColor: "white"
        }}
    >
        <Chart data={data} axes={axes} series={series} grouping="single" tooltip/>
    </div>
    )

    return (
    <div 
        style={{
            width: '100%',
            height: '300px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: "5px"
        }}
        >
        <h4 style={{marginTop: '8px'}}>{props.label}</h4>
        {lineChart}
    </div>
    )
}

export default Graph;
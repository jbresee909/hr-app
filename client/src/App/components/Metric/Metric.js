import React from "react";
import "./Metric.css";

const Metric = (props) => {

   return (
       <div className="metric" style={{backgroundColor: "var(" + props.bgColor + ")"}}>
            <h1>{props.metric}</h1>
            <h4>{props.title}</h4>
       </div>
   )
}

export default Metric;
import React from "react";
import "./Metric.css";

const Metric = (props) => {
//    const props = {
//        metric: "23%",
//        title: "Title for Metric",
//        bgColor: "--color-blue"
//    }

   return (
       <div className="metric" style={{backgroundColor: "var(" + props.bgColor + ")"}}>
            <h1>{props.metric}</h1>
            <h4>{props.title}</h4>
       </div>
   )
}

export default Metric;
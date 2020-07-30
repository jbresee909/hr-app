import React, {useState, useEffect} from "react";
import Metric from "../components/Metric/Metric";
import Graph from "../components/Graph/Graph";
import axios from "axios";

const Recruiting = () => {
    const [avgHireCost, setAvgHireCost] = useState("");
    const [avgDaysToHire, setAvgDaysToHire] = useState("");
    const [maxHireCost, setMaxHireCost] = useState("");
    const [minHireCost, setMinHireCost] = useState("");
    const [hireExperience, setHireExperience] = useState([]);
    const [hireSources, setHireSources] = useState([]);

    useEffect(() => {
        // GET avg hire cost
        axios.get("api/recruiting-metrics?operation=AVG&field=Hire_Cost&year=2019")
            .then(res => setAvgHireCost(res.data[0].metric))
            .catch(e => console.error(e));

        // GET avg days to hire
        axios.get("api/recruiting-metrics?operation=AVG&field=Days_To_Hire&year=2020")
            .then(res => setAvgDaysToHire(res.data[0].metric))
            .catch(e => console.error(e));

        // GET max hire cost
        axios.get("api/recruiting-metrics?operation=MAX&field=Hire_Cost&year=2019")
            .then(res => setMaxHireCost(res.data[0].metric))
            .catch(e => console.error(e));

        // GET min hire cost
        axios.get("api/recruiting-metrics?operation=MIN&field=Hire_Cost&year=2019")
            .then(res => setMinHireCost(res.data[0].metric))
            .catch(e => console.error(e));

        // GET hire experiences
        axios.get("api/recruiting-metrics/hire-experiences")
            .then(res => setHireExperience(res.data.map((ex => {return [ex.Hire_Experience, ex.count]}))))
            .catch(e => console.error(e));

        // GET hire sources
        axios.get("api/recruiting-metrics/hire-sources")
            .then(res => setHireSources(res.data.map((src => {return [src.Hire_Source, src.count]}))))
            .catch(e => console.error(e));
    }, [])


    return (
        <div className="recruiting-metrics">
            <Metric metric={"$" + avgHireCost} title="Average Hire Cost 2019" bgColor="--color-blue"/>
            <Metric metric={avgDaysToHire} title="Average Days to Hire 2020" bgColor="--color-red"/>
            <Metric metric={"$" + maxHireCost} title="Max Hire Cost 2019" bgColor="--color-maroon"/>
            <Metric metric={"$" + minHireCost} title="Min Hire Cost 2019" bgColor="--color-blue"/>
            <Graph
            data={hireExperience}
            chartType="bar" 
            chartHeight="300" 
            xAxisType="ordinal" 
            yAxisType="linear" 
            label="Hire Experience"/>
            <Graph
            data={hireSources}
            chartType="bar" 
            chartHeight="300" 
            xAxisType="ordinal" 
            yAxisType="linear" 
            label="Hire Sources"/>
        </div>
    )
}

export default Recruiting;
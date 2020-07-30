import React, {useState, useEffect} from "react";
import RetentionMetric from "../components/RetentionMetric/RetentionMetric";
import axios from "axios";

const Retention = () => {
    const colors = [
        "--color-maroon",
        "--color-blue", 
        "--color-red",
        "--color-primary",
        "--color-maroon",
        "--color-blue",
        "--color-red",
        "--color-primary"
        ]
    const[departments, setDepartments] = useState([]);

    useEffect(() => {
        // get all departments
        axios.get("api/departments")
        .then(res => setDepartments(res.data))
        .catch(e => console.error(e));
    }, [])

    return (
        <div className="retention-metrics">
            {departments.map((department, index) => (
                <RetentionMetric 
                bgColor={colors[index]}
                year="2019" 
                department={department.Department}/>
            ))}
        </div>
    )
}

export default Retention;
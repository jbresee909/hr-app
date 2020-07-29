import React, {useState, useEffect, useCallback} from "react";
import "./RetentionMetric.css";
import axios from "axios";

const RetentionMetric = () => {
    const props = {
        bgColor: "--color-red",
        year: "2018",
        department: "Accounting"
    };

    const [filters, setFilters] = useState([])
    const [metric, setMetric] = useState("");
    const [selectedYear, setSelectedYear] = useState(props.year);
    const [selectedDepartment, setSelectedDepartment] = useState(props.department);

    const calculateMetric = useCallback(() => {
        axios.get(`/api/retention-metrics?${selectedYear ? 'year=' + selectedYear : ""}${selectedDepartment ? '&department=' + selectedDepartment: ""}`)
                .then(res => setMetric(res.data[0].retentionRate))
                .catch(e => console.error(e));
    }, [selectedDepartment, selectedYear])

    useEffect(() => {
      const setFilterData =  async () => {
        let departments = await axios("/api/departments");
        departments = departments.data.map((department) => {return department.Department})

        let currentYear = new Date().getFullYear();

        setFilters(
            [
                {
                    name: "year",
                    options: [currentYear - 2, currentYear - 1, currentYear]
                },
                {
                    name: "department",
                    options: departments
                }
            ]
        )
      }

      setFilterData();
      calculateMetric();
    }, [props.type, calculateMetric]);

    const updateSelectedValues = (type, value) => {
      switch(type) {
        case "year":
            setSelectedYear(value);
            break;
        case "department":
            setSelectedDepartment(value);
            break;
        default:
            setSelectedYear(new Date().getFullYear());
            setSelectedDepartment("IT");
            break;
      }
      
      calculateMetric();
    }

    return (
        <div className="RetentionMetric">
          <div className="filters">
            {filters.map((filter, index) => (
                <select 
                    key={index} 
                    style={{backgroundColor: "var(" + props.bgColor + ")"}} 
                    onChange={(e) => {updateSelectedValues(filter.name, e.target.value)}}>
                    {filter.options.map((option, index) => (
                        <option 
                            key={index} 
                            value={option} 
                            selected={option === props.year || option === props.department ? "selected" : ""} >
                            {option}
                        </option>
                    ))}
                </select>
            ))}
          </div>
          <div className="content" style={{backgroundColor: "var(" + props.bgColor + ")"}}>
            <h1>{metric + "%"}</h1>
            <h4>Retention</h4>
          </div>
          <h5 style={{color: "#333"}}>{selectedDepartment + " Retention In " + selectedYear}</h5>
        </div>
    )
}

export default RetentionMetric;
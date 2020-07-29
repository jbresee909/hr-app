import React, {useState, useEffect} from 'react';
import axios from "axios";

import Metric from "../components/Metric/Metric";
import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";

const Home = () => {
  const [weeklyHires, setWeeklyHires] = useState([{total_hires: ""}]);
  const [yearlyTerminations, setYearlyTerminations] = useState([{total_terminated: ""}]);
  const [averageHireCost, setAverageHireCost] = useState([{hire_cost: ""}]);
  const [management, setManagement] = useState([]);
  
  useEffect(() => {
    // get number of people hired in last week
    axios.get("api/recruiting-metrics/past-week-hires")
      .then(res => setWeeklyHires(res.data))
      .catch(e => console.error(e));

    // get total number terminated this year
    axios.get("api/recruiting-metrics/past-year-terminated")
      .then(res => setYearlyTerminations(res.data))
      .catch(e => console.error(e));

    // get average hire cost this year
    axios.get("api/recruiting-metrics/average-hire-cost")
      .then(res => setAverageHireCost(res.data))
      .catch(e => console.error(e));

    axios.get("api/team-members/managers")
      .then(res => setManagement(res.data))
      .catch(e => console.error(e));
  }, [])


  console.log(management);

  return (
    <div className="home">
      <Metric metric={weeklyHires[0].total_hires} title="Weekly Hires" bgColor="--color-blue"/>
      <Metric metric={yearlyTerminations[0].total_terminated} title="Terminated This Year" bgColor="--color-red"/>
      <Metric metric={"$" + averageHireCost[0].hire_cost} title="Average Hire Cost This Year" bgColor="--color-maroon"/>
      <div className="management">
        {management.map(manager => (
          <TeamMemberCard 
            name={manager.Name} 
            department={manager.Department} 
            position={manager.Position} 
            start_date={manager.Start_Date} 
            end_date={"Present"}/>
        ))}
      </div>
    </div>
  )
}

export default Home;
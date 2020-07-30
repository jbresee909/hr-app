import React, {useState, useEffect} from 'react';
import axios from "axios";

import Metric from "../components/Metric/Metric";
import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";
import Graph from "../components/Graph/Graph";

const Home = () => {
  const [weeklyHires, setWeeklyHires] = useState([{total_hires: ""}]);
  const [yearlyTerminations, setYearlyTerminations] = useState([{total_terminated: ""}]);
  const [averageHireCost, setAverageHireCost] = useState([{hire_cost: ""}]);
  const [management, setManagement] = useState([]);
  const [terminatedByYear, setTerminatedByYear] = useState([[2018, 0]]);
  
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

    axios.get("api/recruiting-metrics/terminated_by_year")
      .then(res => setTerminatedByYear(res.data.map(item => {return [item.year, item.total_terminated]})))
      .catch(e => console.error(e));
  }, [])

  return (
    <div className="home">
      <Metric metric={weeklyHires[0].total_hires} title="Weekly Hires" bgColor="--color-blue"/>
      <Metric metric={yearlyTerminations[0].total_terminated} title="Terminated This Year" bgColor="--color-red"/>
      <Metric metric={"$" + averageHireCost[0].hire_cost} title="Average Hire Cost This Year" bgColor="--color-maroon"/>
      <div className="management">
        <h1>Jedi Masters</h1>
        {management.map((manager, index) => (
          <TeamMemberCard 
            key={manager.Member_ID}
            member_ID={manager.Member_ID}
            name={manager.Name}
            address={manager.Address}
            email={manager.Email}
            phone={manager.Preferred_Phone} 
            department={manager.Department}
            employmentStatus={manager.Employment_Status} 
            position={manager.Position}
            shift={manager.Shift}
            manager={manager.Manager}
            photo={manager.Team_Member_Photo}
            favoriteColor={manager.Favorite_Color}
            permissions={manager.Permissions}
            start_date={manager.Start_Date} 
            end_date={"Present"}/>
        ))}
      </div>
      <div className="total-terminated">
        <h4>Total Terminated By Year</h4>
        <Graph 
          data={terminatedByYear} 
          chartType="bar" 
          chartHeight="300" 
          xAxisType="ordinal" 
          yAxisType="linear" 
          label="total terminated"/>
      </div>
    </div>
  )
}

export default Home;
import React, {useState, useEffect} from "react";
import axios from "axios";
import ActivityLogComponent from "../components/ActivityLog/ActivityLog";

const ActivityLog = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // get all activity logs
        axios.get("api/activity-log")
            .then(res => setActivities(res.data))
            .catch(e => console.error(e));
    }, [])

    const handleFilterLogs = (type) => {
        const logs = document.getElementsByClassName("activity-log");
        for(let i = 0; i < logs.length; i++) {
            if(type === "" || logs[i].getAttribute("activitytype") === type) {
                logs[i].style.display = "flex";
            }
            else if(logs[i].getAttribute("activitytype") !== type) {
                logs[i].style.display = "none";
            }
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            <div className="activity-logs">
            {activities.map(activity => (
                <ActivityLogComponent
                activityType={activity.Activity_Type}
                changedFrom={activity.Changed_From}
                changedTo={activity.Changed_To}
                activityDate={activity.Activity_Date}
                name={activity.Name}
                />
            ))}
            </div>
            <div className="activity-log-filters">
                <h4>Activity Type</h4> 
                <select onChange={(e) => handleFilterLogs(e.target.value)}>
                    <option value="">Activity Type</option>
                    <option value="Position">Position</option>
                    <option value="Manager">Manager</option>
                    <option value="Permission">Permission</option>
                </select>
            </div>
        </div>
    )
}

export default ActivityLog;
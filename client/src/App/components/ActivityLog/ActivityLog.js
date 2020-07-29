import React from "react";
import "./ActivityLog.css";

const ActivityLog = () => {
    const props = {
        date: "May 2018",
        activityType: "Position",
        changedFrom: "IT Employee",
        changedTo: "Team Lead",
        member_ID: 5,
        name: "Han Solo"
    }

    return (
        <div className="activity-log">
            <div className="profile">
                <img src="https://res.cloudinary.com/justin-bresee/image/upload/v1595695260/HR-Application/images_klnenp.png" alt="profile-pic"/>
                <p>{props.name}</p>
            </div>
            <div className="info">
                <h2>{props.activityType + " Changed"}</h2>
                <div className="change">
                    <p>{props.changedFrom}</p>
                    <img src="https://img.icons8.com/ios-filled/40/000000/arrow.png" alt="to"/>
                    <p>{props.changedTo}</p>
                </div>
            </div>
            <div className="date-and-edit">
                <p>{props.date}</p>
            </div>
        </div>
    )
}

export default ActivityLog;
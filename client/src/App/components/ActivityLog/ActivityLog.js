import React from "react";
import "./ActivityLog.css";

const ActivityLog = (props) => {
    return (
        <div className="activity-log" activitytype={props.activityType}>
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
                <p>{props.activityDate}</p>
            </div>
        </div>
    )
}

export default ActivityLog;
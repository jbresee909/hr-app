import React from "react";
import "./Permission.css";

const Permission = (props) => {

    return (
        <div className="permission">
            <div className="profile">
                <img src={props.photo} alt="profile-pic"/>
                <p>{props.name}</p>
            </div>
            <div className="info">
                <h2>{props.permission}</h2>
            </div>
        </div>
    )
}

export default Permission;
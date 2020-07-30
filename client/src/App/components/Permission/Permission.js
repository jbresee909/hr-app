import React from "react";
import "./Permission.css";

const Permission = (props) => {

    return (
        <div className="permission">
            <div className="profile">
                <img src="https://res.cloudinary.com/justin-bresee/image/upload/v1595695260/HR-Application/images_klnenp.png" alt="profile-pic"/>
                <p>{props.name}</p>
            </div>
            <div className="info">
                <h2>{props.permission}</h2>
            </div>
        </div>
    )
}

export default Permission;
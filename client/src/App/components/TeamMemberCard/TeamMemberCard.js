import React from "react";
import "./TeamMemberCard.css";

const TeamMemberCard = (props) => {
    return (
      <div className="team-member-card">
        <img src="https://res.cloudinary.com/justin-bresee/image/upload/v1595695260/HR-Application/images_klnenp.png" alt="profile-pic"/>
        <div className="info">
            <h2>{props.name}</h2>
            <p>{props.department}</p>
            <p>{props.position}</p>
        </div>
        <div className="date-and-edit">
            <p>{props.start_date} - {props.end_date}</p>
            <img src="https://img.icons8.com/android/24/000000/edit.png" alt="edit"/>
        </div>
      </div>
    )
};

export default TeamMemberCard;
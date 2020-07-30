import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="NavBar p-3">
            <Link to="/">
                <div>
                    <img src="https://img.icons8.com/dusk/30/000000/dashboard.png" alt="dashboard icon"/>
                    <p>Dashboard</p>
                </div>
            </Link>
            <Link to="/team">
                <div>
                    <img src="https://img.icons8.com/dusk/30/000000/user-group-man-woman.png" alt="team icon"/>
                    <p>Team Members</p>
                </div>
            </Link>
            <Link to="/recruiting">
                <div>
                    <img src="https://img.icons8.com/dusk/30/000000/new-job.png" alt="recruiting icon"/>
                    <p>Recruiting</p>
                </div>
            </Link>
            <Link to="/retention">
                <div>
                    <img src="https://img.icons8.com/dusk/30/000000/presentation.png" alt="retention icon"/>
                    <p>Retention</p>
                </div>
            </Link>
            <Link to="/permissions">
                <div>
                    <img src="https://img.icons8.com/plasticine/30/000000/key.png" alt="permissions icon"/>
                    <p>Permissions</p>
                </div>
            </Link>
            <Link to="/activity">
                <div>
                    <img src="https://img.icons8.com/cute-clipart/40/000000/log.png" alt="acivity log icon"/>
                    <p>Activity Log</p>
                </div>
            </Link>
        </nav>
    )
};

export default NavBar;
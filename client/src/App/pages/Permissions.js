import React, {useState, useEffect} from "react";
import Permission from "../components/Permission/Permission";
import axios from "axios";

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
      // GET permissions
      axios.get("api/team-members/permissions")
        .then(res => setPermissions(res.data))
        .catch(e => console.error(e));
    }, [])

    return (
        <div className="permissions">
            {permissions.map((permission) => (
                <Permission
                name={permission.Name}
                permission={permission.Permissions}
                photo={permission.Team_Member_Photo}
                />
            ))}
        </div>
    )
}

export default Permissions;
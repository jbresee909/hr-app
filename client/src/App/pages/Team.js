import React, {useState,useEffect} from "react";
import TeamMemberCard from "../components/TeamMemberCard/TeamMemberCard";
import axios from "axios";
import {InputGroup, FormControl, Button, Modal} from "react-bootstrap";

const Team = () => {
    const getCurrentDate = () => {
        let newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth() < 10 ? "0" + newDate.getMonth(): newDate.getMonth() ;
        const day = newDate.getDate() < 10 ? "0" + newDate.getDate(): newDate.getDate();

        return year + "-" + month + "-" + day;
    }

    const [teamMembers, setTeamMembers] = useState([]);
    const [show, setShow] = useState(false);

    // new team member form data
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [manager, setManager] = useState("");
    const [photo, setPhoto] = useState("");
    const [favoriteColor, setFavoriteColor] = useState("");
    const [permissions, setPermissions] = useState("");
     
    // handle opening and closing modal for creating a new team member
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // GET team members
        axios.get("/api/team-members")
            .then(res => setTeamMembers(res.data))
            .catch(e => console.error(e));
    }, [])

    const filter = () => {
        // get filter values
        const filters = document.getElementsByClassName("filter");
        const nameValue = filters[0].value;
        const departmentValue = filters[1].options[filters[1].selectedIndex].value;

        // filter team members based on filter values
        const members = document.getElementsByClassName("team-member-card");
        for(let i = 0; i < members.length; i++) {
            if(!members[i].getAttribute("memberName").toLowerCase().includes(nameValue.toLowerCase())) {
                members[i].style.display = "none"
            } else {
                members[i].style.display = "flex";
            }
            if(departmentValue && members[i].getAttribute("department") !== departmentValue) {
                members[i].style.display = "none";
            } 
        }
    }

    const handleCreateTeamMember = () => axios({
        method: 'post',
        url: 'api/team-members/add',
        headers: {}, 
        data: {
            name: name,
            address: address,
            email: email,
            preferredPhone: phone,
            position: position,
            department: department,
            startDate: getCurrentDate(),
            endDate: null, 
            employmentStatus: "employed",
            shift: "All Day",
            manager: manager,
            photo: photo,
            favoriteColor: favoriteColor,
            permissions: permissions
        }
      })
      .then(() => alert("New Member Created"))
      .catch(e => alert("Invalid Entry, Try Again"));

    return (
        <div className="team">
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard 
                    key={member.Member_ID}
                    member_ID={member.Member_ID}
                    name={member.Name}
                    phone={member.Preferred_Phone}
                    address={member.Address}
                    email={member.Email}
                    department={member.Department} 
                    manager={member.Manager}
                    photo={member.Team_Member_Photo}
                    favoriteColor={member.Favorite_Color}
                    position={member.Position} 
                    employmentStatus={member.Employment_Status} 
                    start_date={member.Start_Date} 
                    end_date={!member.End_Date ? "Present" : member.End_Date}
                    permissions={member.Permissions}/>
                ))}
            </div>
            <div className="team-filters">
                <h4>Filters</h4>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl className="filter" onChange={(e) => filter()}/>
                </InputGroup>
                <select className="filter" onChange={(e) => filter()}>
                    <option value="">Department</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                </select>
                <Button className="mt-3" onClick={handleShow} variant="success">Add Team Member</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>New Team Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setName(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setAddress(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setEmail(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setPhone(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Department</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setDepartment(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Position</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setPosition(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Manager</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setManager(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Photo URL</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setPhoto(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Favorite Color</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setFavoriteColor(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Permissions</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setPermissions(e.target.value)}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleCreateTeamMember()
                    handleClose()
                    }}>
                    Create Record
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Team;
import React, {useState} from "react";
import "./TeamMemberCard.css";
import { Modal, Button, InputGroup, Form, FormControl, Badge } from "react-bootstrap";
import axios from "axios";

const TeamMemberCard = (props) => {
  const getCurrentDate = () => {
    let newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() < 10 ? "0" + newDate.getMonth(): newDate.getMonth() ;
    const day = newDate.getDate() < 10 ? "0" + newDate.getDate(): newDate.getDate();

    return year + "-" + month + "-" + day;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // user data
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
  const [terminateEmployee, setTerminateEmployee] = useState(false);

  // handlers
  const handleDeleteTeamMember = (member_ID) => axios({
      method: 'delete',
      url: 'api/team-members/remove',
      headers: {}, 
      data: {
          member_ID: member_ID
      }
  })
  .then(() => alert("Team Member Deleted"))
  .catch((e) => console.error(e));

  const handleCreateActivityLogs = () => {
    if(position !== "") {
      axios({
        method: 'post',
        url: 'api/activity-log/add',
        headers: {}, 
        data: {
            member_ID: props.member_ID,
            name: props.name,
            activityDate: getCurrentDate(),
            activityType: "Position",
            changedFrom: props.position,
            changedTo: position
        }
      })
      .then(() => window.location.reload(false))
      .catch(e => console.error(e));
    }
    if(manager !== "") {
      axios({
        method: 'post',
        url: 'api/activity-log/add',
        headers: {}, 
        data: {
            member_ID: props.member_ID,
            name: props.name,
            activityDate: getCurrentDate(),
            activityType: "Manager",
            changedFrom: props.manager,
            changedTo: manager
        }
      })
      .then(() => window.location.reload(false))
      .catch(e => console.error(e));
    }
    if(permissions !== "") {
      axios({
        method: 'post',
        url: 'api/activity-log/add',
        headers: {}, 
        data: {
            member_ID: props.member_ID,
            name: props.name,
            activityDate: getCurrentDate(),
            activityType: "Permissions",
            changedFrom: props.permissions,
            changedTo: permissions
        }
      })
      .catch(e => console.error(e));
    }
  }

  const handleSaveChanges = () => axios({
    method: 'post',
      url: 'api/team-members/edit',
      headers: {}, 
      data: {
        name: name,
        address: address,
        email: email,
        preferredPhone: phone,
        position: position,
        department: department,
        endDate: terminateEmployee ? getCurrentDate() : null, 
        employmentStatus: terminateEmployee ? "terminated" : "employed",
        manager: manager,
        photo: photo,
        favoriteColor: favoriteColor,
        permissions: permissions,
        member_ID: props.member_ID
      }    
  }).then(() => {
    alert("Changes Saved")
    window.location.reload(false)
  })
  .catch((e) => console.error(e));

    return (
      <div className="team-member-card" memberName={props.name} department={props.department}>
        <img src={props.photo} alt="profile-pic"/>
        <div className="info">
            {props.employmentStatus === "employed" ? <Badge variant="success">Employed</Badge> : <Badge variant="danger">Terminated</Badge>}
            <h2>{props.name}</h2>
            <p>{props.department}</p>
            <p>{props.position}</p>
        </div>
        <div className="date-and-edit">
            <p>{props.start_date} - {props.end_date}</p>
            <img src="https://img.icons8.com/android/24/000000/edit.png" alt="edit" onClick={handleShow}/>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder={props.name}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={props.address}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={props.email}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={props.phone}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Department</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder={props.department}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Position</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder={props.position}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Manager</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setManager(e.target.value)}
                  placeholder={props.manager}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Photo URL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder={props.photo}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Favorite Color</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  onChange={(e) => setFavoriteColor(e.target.value)}
                  placeholder={props.favoriteColor}/>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Permissions</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                onChange={(e) => setPermissions(e.target.value)}
                placeholder={props.permissions}/>
            </InputGroup>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Terminate Employee" onChange={e => setTerminateEmployee(e.target.checked)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => {
              handleDeleteTeamMember(props.member_ID)
              handleClose()
              window.location.reload(false)
              }}>
              Delete Team Member
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              handleSaveChanges()
              handleCreateActivityLogs()
              handleClose()
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
};

export default TeamMemberCard;
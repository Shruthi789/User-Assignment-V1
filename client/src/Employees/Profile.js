import { BackButton } from "./BackButton.js";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import {Loading} from './Loading.js';
import { API } from "../APIInfo.js";

function ProfileCard({employee}) {
  const { name, empProfile } = employee;
  const { DOB, designation, salary, hobbies, empImage,availLeave,leaveTaken } = empProfile;
  return (
    <div className="profile-height">
      <h2 className="heading-style">EMPLOYEE PROFILE OF {name.toUpperCase()}</h2>
      <br />
      <div className="profile-card">
        <Card
          sx={{
            display: "flex",
            backgroundColor: "aliceblue",
            color: "#1976d2",
            width: 498,
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 170,
              marginInline: "auto",
            }}
            image={empImage}
            alt="employee pic"
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              textAlign: {
                sm: "center",
                md: "left",
              },
              marginInline: "auto",
            }}
          >
            <p>
              <span className="profile-card-style">Date of Birth</span>:{" "}
              {DOB}
            </p>
            <p>
              <span className="profile-card-style">Designation</span>:{" "}
              {designation}{" "}
            </p>
            <p>
              <span className="profile-card-style">Salary</span>: {salary}
            </p>
            <p>
              <span className="profile-card-style">Hobbies</span>:{" "}
              {hobbies}
            </p>
            <p>
            <span className="profile-card-style">Available Leave</span>:{" "}
              {availLeave}
            </p>
            <p>
            <span className="profile-card-style">Leave Taken</span>:{" "}
              {leaveTaken}
            </p>
          </CardContent>
        </Card>
      </div>
      <br />
      <div className="profile-padding">
        <BackButton />
      </div>
    </div>
  );
}

function Profile() {
  const { id } = useParams();
  localStorage.setItem('employeeID',id);
  const [employee, setEmployee] = useState(null);
  useEffect(()=>{
    const ID=localStorage.getItem('employeeID');
    const getEmployee = () => {
      fetch(`${API}/employees/${ID}`,{
        method:'GET',
        headers:{
          'x-auth-token': token
        }
      })
        .then((response) => response.json())
        .then((res) => {
          setEmployee(res);
        })
        .catch((error) => console.log(error));
    }
    getEmployee();
},[]);

  return (
    <div className='profile-width'>
    {employee?<ProfileCard employee={employee}/>:<Loading/>}
    </div>
  );
}

export { Profile };

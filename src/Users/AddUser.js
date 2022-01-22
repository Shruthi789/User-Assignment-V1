import { useState,useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import {users} from '../App.js';

function AddUser(){
    const [name,setName]=useState("");
    const [DOB,setDOB]=useState("");
    const [designation,setDesignation]=useState("");
    const [salary,setSalary]=useState("");  
    const [hobbies,setHobbies]=useState(""); 
    const [userImage,setUserImage]=useState(""); 
    const [mainImage,setmainImage]=useState("");
    const {getUsers}=useContext(users);
    const history=useHistory();
    const submitHandler=(event)=>{
    event.preventDefault(); 
    const newUser={
        name: name,
        userProfile:{
                     DOB:DOB,
                     designation:designation,
                     salary:salary,
                     hobbies:hobbies,
                     userImage:userImage
                    },
        mainImage:mainImage
    };
    fetch(`https://61988dae164fa60017c230ed.mockapi.io/users`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(newUser)
    })
    .then(()=>{
        getUsers();
        history.push('/users');
    })
    .catch((error)=>console.log(error));
    }
    return (<div>
            <h2 className="heading-style">ADD USER</h2>
            <div className='adjust-form'>
            <form onSubmit={submitHandler} className="add-form-arrangement">
            <div className="form-style">
            <label className="label-style">Name: </label>
            <TextField
          required
          id="outlined-required"
          label="Name"
          value={name}
          onChange={(event)=>{setName(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
            <label className="label-style">Date of Birth: </label>
            <TextField
          required
          id="outlined-required"
          label="Date of Birth"
          value={DOB}
          onChange={(event)=>{setDOB(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
          <label className="label-style">Designation: </label>
            <TextField
          required
          id="outlined-required"
          label="Designation"
          value={designation}
          onChange={(event)=>{setDesignation(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
        <label className="label-style">Salary: </label>
            <TextField
          required
          id="outlined-required"
          label="Salary"
          value={salary}
          onChange={(event)=>{setSalary(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
         <label className="label-style">Hobbies: </label>
            <TextField
          required
          id="outlined-required"
          label="Hobbies"
          value={hobbies}
          onChange={(event)=>{setHobbies(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
         <label className="label-style"> User Image: </label>
            <TextField
          required
          id="outlined-required"
          label="User Image"
          value={userImage}
          onChange={(event)=>{setUserImage(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
        <div className="form-style">
        <label className="label-style"> Main Image: </label>
            <TextField
          required
          id="outlined-required"
          label="Main Image"
          value={mainImage}
          onChange={(event)=>{setmainImage(event.target.value)}}
          sx={{width:{xs:'90vw',md:331}}}
        />
        </div>
           <Button variant="contained" type="Submit" sx={{color:'beige'}}>+Add User</Button>

    </form>
    </div> 
    </div>);
}

export {AddUser};
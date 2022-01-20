import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import {BackButton} from './BackButton.js'

function EditUser({userList,setUserList}){
    const {id}=useParams();
    const user=userList.find((user)=>user.id===id);
    const editedIndex=userList.findIndex((user)=>user.id===id);
    const [name,setName]=useState(user.name);
    const [DOB,setDOB]=useState(user.userProfile.DOB);
    const [designation,setDesignation]=useState(user.userProfile.designation);
    const [salary,setSalary]=useState(user.userProfile.salary);  
    const [hobbies,setHobbies]=useState(user.userProfile.hobbies); 
    const [userImage,setUserImage]=useState(user.userProfile.userImage); 
    const [mainImage,setmainImage]=useState(user.mainImage);
    const [message,setMessage]=useState("");
    const submitHandler=(event)=>{
    event.preventDefault(); 
    const editedList=[...userList];
    const editedUser={
        id:id,
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
     editedList[editedIndex]=editedUser;
     setUserList(editedList);
     setMessage("User Edited!!!");
    }
    return (<div>
      <h2 className="heading-style">EDIT USER</h2>
      <div className='adjust-form'>
      <form onSubmit={submitHandler} className="add-form-arrangement">
      <div className="form-style">
      <label className="label-style">Name: </label>
      <TextField
    required
    id="outlined-required"
    label="Name"
    defaultValue={name}
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
    defaultValue={DOB}
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
    defaultValue={designation}
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
    defaultValue={salary}
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
    defaultValue={hobbies}
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
    defaultValue={userImage}
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
    defaultValue={mainImage}
    onChange={(event)=>{setmainImage(event.target.value)}}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
     <Button variant="contained" type="Submit" sx={{color:'beige'}}>+Edit User</Button>

</form>
</div>
<p className="message-style">{message}</p>
<div>
<BackButton/>
</div>  
</div>
);
}

export {EditUser};
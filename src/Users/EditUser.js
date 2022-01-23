import { useState,useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import {BackButton} from './BackButton.js';
import {Loading} from './Loading.js';

function EditUser(){
    const {id}=useParams();
    localStorage.setItem('userID',id);
    const [user, setUser] = useState(null);
  useEffect(()=>{
    const ID=localStorage.getItem('userID');
    const getUser = () => {
      fetch(`https://61988dae164fa60017c230ed.mockapi.io/users/${ID}`)
        .then((response) => response.json())
        .then((res) => {
          setUser(res);
        })
        .catch((error) => console.log(error));
    };
    getUser();
  },[]);
  
    return (
      <div>
        {user?<EditForm user={user}/>:<Loading/>}
      </div>
);
}

function EditForm({user}){
  const { id, name, userProfile, mainImage } = user;
  const { DOB, designation, salary, hobbies, userImage } = userProfile;
  const [Name,setName]=useState(name);
    const [dOB,setDOB]=useState(DOB);
    const [Designation,setDesignation]=useState(designation);
    const [Salary,setSalary]=useState(salary);  
    const [Hobbies,setHobbies]=useState(hobbies); 
    const [UserImage,setUserImage]=useState(userImage); 
    const [MainImage,setmainImage]=useState(mainImage);
    const [message,setMessage]=useState("");
    const submitHandler=(event)=>{
      event.preventDefault(); 
      const editedUser={
          name: Name,
          userProfile:{
                       DOB:dOB,
                       designation:Designation,
                       salary:Salary,
                       hobbies:Hobbies,
                       userImage:UserImage
                      },
          mainImage:MainImage
      };
       fetch(`https://61988dae164fa60017c230ed.mockapi.io/users/${id}`,{
         method:'PUT',
         headers:{'content-type':'application/json'},
         body:JSON.stringify(editedUser)
       })
       .then(()=>{
        setName("")
        setDOB("")
        setDesignation("")
        setSalary("")  
        setHobbies("")
        setUserImage("")
        setmainImage("") 
        setMessage("User Edited!!!")
      })
       .catch((error)=>console.log(error))
      
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
  value={Name}
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
  value={dOB}
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
  value={Designation}
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
  value={Salary}
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
  value={Hobbies}
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
  value={UserImage}
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
  value={MainImage}
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
</div>);
}

export {EditUser};
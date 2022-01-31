import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import {BackButton} from './BackButton.js';
import {Loading} from './Loading.js';
import {FormComponent} from './Form.js';
import {users} from '../App.js';

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
  const {getUsers}=useContext(users);
    const [message,setMessage]=useState("");
    const initialValues= {
      name:name,
      DOB:DOB,
      designation:designation,
      salary:salary,
      hobbies:hobbies,
      userImage:userImage,
      mainImage:mainImage
    };
    const submitHandler=(values)=>{
      const editedUser={
          name: values.name,
          userProfile:{
                       DOB:values.DOB,
                       designation:values.designation,
                       salary:values.salary,
                       hobbies:values.hobbies,
                       userImage:values.userImage
                      },
          mainImage:values.mainImage
      };
       fetch(`https://61988dae164fa60017c230ed.mockapi.io/users/${id}`,{
         method:'PUT',
         headers:{'content-type':'application/json'},
         body:JSON.stringify(editedUser)
       })
       .then(()=>{
         values.name=""
         values.DOB=""
         values.salary=""
         values.hobbies=""  
         values.designation=""
         values.userImage=""
         values.mainImage=""
        setMessage("User Edited!!!");
        getUsers();
      })
       .catch((error)=>console.log(error))
      
      }
  return (<div className="profile-height">
<FormComponent initialValues={initialValues} action="EDIT" submitHandler={submitHandler}/>
<p className="message-style">{message}</p>
<div>
 <BackButton/>
</div>  
</div>);
}

export {EditUser};
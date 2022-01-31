import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {users} from '../App.js';
import {FormComponent} from './Form.js';

function AddUser(){
    const {getUsers}=useContext(users);
    const history=useHistory();
    const initialValues={
      name:"",
      DOB:"",
      designation:"",
      salary:"",
      hobbies:"",
      userImage:"",
      mainImage:""
    }
    const submitHandler=(values)=>{ 
    const newUser={
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
   
    
    return (<div className="profile-height"><FormComponent initialValues={initialValues} action="ADD" submitHandler={submitHandler}/></div>);
}

export {AddUser};
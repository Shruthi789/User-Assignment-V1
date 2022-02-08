import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { API,token } from "../APIInfo.js";
import {employees} from '../App.js';
import {FormComponent} from './Form.js';

function AddEmployee(){
    const {getEmployees}=useContext(employees);
    const history=useHistory();
    const initialValues={
      empId:"",
      name:"",
      DOB:"",
      designation:"",
      salary:"",
      hobbies:"",
      availLeave:"",
      leaveTaken:"",
      empImage:"",
      mainImage:""
    }
    const submitHandler=(values)=>{ 
    const newEmployee={
        empId:values.empId,
        name: values.name,
        empProfile:{
                     DOB:values.DOB,
                     designation:values.designation,
                     salary:values.salary,
                     hobbies:values.hobbies,
                     availLeave:values.availLeave,
                     leaveTaken:values.leaveTaken,
                     empImage:values.empImage
                    },
        mainImage:values.mainImage
    };
    fetch(`${API}/employees`,{
      method:'POST',
      headers:{'content-type':'application/json',
                'x-auth-token':token
              },
      body:JSON.stringify([newEmployee])
    })
    .then(()=>{
        getEmployees();
        history.push('/employees');
    })
    .catch((error)=>console.log(error));
    }
   
    
    return (<div className="profile-height"><FormComponent initialValues={initialValues} action="ADD" submitHandler={submitHandler}/></div>);
}

export {AddEmployee};
import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import {BackButton} from './BackButton.js';
import {Loading} from './Loading.js';
import {FormComponent} from './Form.js';
import {employees} from '../App.js';
import { API,token } from "../APIInfo.js";

function EditEmployee(){
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
      <div>
        {employee?<EditForm employee={employee}/>:<Loading/>}
      </div>
);
}

function EditForm({employee}){
  const { _id,empId, name, empProfile, mainImage } = employee;
  const { DOB, designation, salary, hobbies,availLeave,leaveTaken,empImage } = empProfile;
  const {getEmployees}=useContext(employees);
    const [message,setMessage]=useState("");
    const initialValues= {
      empId:empId,
      name:name,
      DOB:DOB,
      designation:designation,
      salary:salary,
      hobbies:hobbies,
      availLeave:availLeave,
      leaveTaken: leaveTaken,
      empImage:empImage,
      mainImage:mainImage
    };
    const submitHandler=(values)=>{
      const editedEmployee={
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
       fetch(`${API}/employees/${_id}`,{
         method:'PUT',
         headers:{'content-type':'application/json',
                  'x-auth-token':token },
         body:JSON.stringify(editedEmployee)
       })
       .then(()=>{
        values.empId=""
         values.name=""
         values.DOB=""
         values.salary=""
         values.hobbies=""  
         values.designation=""
         values.availLeave=""
          values.leaveTaken=""
         values.empImage=""
         values.mainImage=""
        setMessage("Employee Edited!!!");
        getEmployees();
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

export {EditEmployee};
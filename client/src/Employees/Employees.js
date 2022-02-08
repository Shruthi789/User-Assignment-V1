import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import {employees} from '../App.js';
import {Loading} from './Loading.js';
import { API,token } from '../APIInfo.js';

function Employee({id,name,mainImage,deleteButton,editButton,profileButton}){
    return ( <Card sx={{ minWidth:300,backgroundColor:'aliceblue',color:'#1976d2' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            className="main-image-style"
            image={mainImage}
            alt="main pic"
          />
          <CardContent>
            <h1>{name}</h1>
            <h5>Employee ID: {id}</h5>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{justifyContent:'space-between'}}>
          {profileButton}
          <div>
          {editButton}
          {deleteButton}
          </div>
        </CardActions>
      </Card>);
}

function Employees(){
    const history=useHistory();
    const {employeeList,getEmployees}=React.useContext(employees);
    const deleteAction=(id)=>{
        fetch(`${API}/employees/${id}`,{
          method:'DELETE',
          headers:{
            'x-auth-token':token
          }})
        .then(()=>getEmployees())
        .catch((error)=>console.log(error));
    };
    return (
      <div>
      {employeeList.length!==0?
        <div>
         <h2 className="heading-style">EMPLOYEES</h2>
        <div className="employee-arrangement">
        {employeeList.map(({_id,empId,name,mainImage})=><Employee id={empId} name={name} mainImage={mainImage} key={_id} deleteButton={<IconButton aria-label="delete" color="error" onClick={()=>{deleteAction(_id)}}><DeleteIcon/></IconButton>} editButton={<IconButton aria-label="edit" color="primary" onClick={()=>{history.push(`/edit-employee/${_id}`)}}><EditIcon/></IconButton>} profileButton={ <Button variant="outlined" color="primary" onClick={()=>{history.push(`/profile/${_id}`)}}>
            VIEW PROFILE
          </Button>}/>)}
        </div>
        </div>:<Loading/>}
      </div>
        );
}

export {Employees};
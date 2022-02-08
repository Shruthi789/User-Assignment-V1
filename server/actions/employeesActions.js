import { ObjectId } from 'mongodb';
import {client} from '../index.js';

function getEmployees(){
    return client.db('employeesDB').collection('employees').find().toArray();
}

function addEmployees(employees){
    return client.db('employeesDB').collection('employees').insertMany(employees);
}

function getEmployee(id){
    return client.db('employeesDB').collection('employees').findOne({_id:ObjectId(id)});
}
function editEmployee(id,empData){
    return client.db('employeesDB').collection('employees').updateOne({_id:ObjectId(id)},{$set:empData});
}
function deleteEmployee(id){
    return client.db('employeesDB').collection('employees').deleteOne({_id:ObjectId(id)});
}

export {getEmployees,addEmployees,getEmployee,editEmployee,deleteEmployee};
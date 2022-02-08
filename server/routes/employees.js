import express from "express";
import {getEmployees,addEmployees,getEmployee,editEmployee,deleteEmployee} from '../actions/employeesActions.js';
import {adminAuth} from '../middlleware/auth.js';

const router=express.Router();

router.route('/')
               .get(adminAuth,async(request,response)=>{
                 const employees=await getEmployees();
                 response.send(employees);
               })
               .post(adminAuth,async(request,response)=>{
                  const employeeData=request.body;
                  const result=await addEmployees(employeeData);
                  response.send(result);
               });

router.route('/:id')
              .get(adminAuth,async(request,response)=>{
                  const {id}=request.params;
                  const employee=await getEmployee(id);
                  employee?response.send(employee):response.status(404).send("Employee not found");
              })
              .put(adminAuth,async(request,response)=>{
                  const {id}=request.params;
                  const empData=request.body;
                  const result=await editEmployee(id,empData);
                  response.send(result);
              })
              .delete(adminAuth,async(request,response)=>{
                  const {id}=request.params;
                  const result=await deleteEmployee(id);
                  response.send(result);
              });

export const employeesRouter=router;
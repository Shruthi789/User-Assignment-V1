import express, { request } from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
import { employeesRouter } from "./routes/employees.js";
import { usersRouter } from "./routes/users.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(cors());
async function createConnection(){
    const client=new MongoClient(process.env.Mongo_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
}
const client= await createConnection();

app.get('/',(request,response)=>{
    response.send('Welcome to the employees app');
})
app.use('/employees',employeesRouter);
app.use('/users',usersRouter);

app.listen(PORT,()=>{console.log("Server Connected")});

export {client};
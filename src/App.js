import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Switch,Route,useHistory,Redirect} from 'react-router-dom';
import { Home } from './Users/Home';
import { Users } from './Users/Users';
import { EditUser } from './Users/EditUser';
import { Profile } from './Users/Profile';
import { AddUser } from './Users/AddUser';
import {useState} from 'react';
import {WrongURL} from './Users/WrongURL';
import Paper from '@mui/material/Paper';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const colorTheme = createTheme({
  palette: {
    warning: {
      main: "#F5F5DC"
    }
  },
  breakpoints: {
    values: {
      xs:320,
      md:768
  }
}
});

const users= React.createContext({});

function App() {
  const history=useHistory();
  const [userList,setUserList]=useState([]);
  const[userCount,setUserCount]=useState(0);
  const getUsers=()=>{
    fetch('https://61988dae164fa60017c230ed.mockapi.io/users')
    .then((response)=>response.json())
    .then((users)=>{setUserList(users);setUserCount(users.length);})
    .catch((error)=>console.log(error));
  }
  React.useEffect(getUsers,[])
  const obj={userList,userCount,getUsers};
  const paperStyle={borderRadius:'0px',minHeight:'100vh',backgroundColor:'beige'};
  return (
    <ThemeProvider theme={colorTheme}>
    <users.Provider value={obj}>
    <Paper elevation={4} sx={paperStyle}>
    <div className="App">
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="app-bar">
        <Button variant="text" color="warning" onClick={()=>{history.push('/')}}>HOME</Button>
        <Button variant="text" color="warning" onClick={()=>{history.push('/users')}}>USERS</Button>
        <Button variant="text" color="warning" onClick={()=>{history.push('/create-user')}}>ADD USER</Button>
        <Button variant="text" color="warning">
         User Count &nbsp;&nbsp; <Badge badgeContent={userCount} color="warning"/>
      </Button>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/users"><Users/></Route>
      <Route path="/employees">
        <Redirect to="/users"/>
      </Route>
      <Route path="/create-user"><AddUser/></Route>
      <Route path="/create-employee">
           <Redirect to="/create-user"/>
      </Route>
      <Route path="/edit-user/:id"><EditUser/></Route>
      <Route path="/profile/:id"><Profile/></Route>
      <Route path="**"> <WrongURL/></Route>
    </Switch>
    </div>
    </Paper>
    </users.Provider>
    </ThemeProvider>
  );
}

export {App,users};

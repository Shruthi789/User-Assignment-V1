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
import {UserInfo} from './Users/UserInfo';
import {useState} from 'react';
import {WrongURL} from './Users/WrongURL';
import Paper from '@mui/material/Paper';
import { createTheme,ThemeProvider } from '@mui/material/styles'

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
})

function App() {
  const history=useHistory();
  const [userList,setUserList]=useState(UserInfo);
  const paperStyle={borderRadius:'0px',height:{sm:'146vh',md:'130vh'},backgroundColor:'beige'};
  return (
    <ThemeProvider theme={colorTheme}>
    <Paper elevation={4} sx={paperStyle}>
    <div className="App">
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="app-bar">
        <Button variant="text" color="warning" onClick={()=>{history.push('/')}}>HOME</Button>
        <Button variant="text" color="warning" onClick={()=>{history.push('/users')}}>USERS</Button>
        <Button variant="text" color="warning" onClick={()=>{history.push('/create-user')}}>ADD USER</Button>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/users"><Users userList={userList} setUserList={setUserList}/></Route>
      <Route path="/employees">
        <Redirect to="/users"/>
      </Route>
      <Route path="/create-user"><AddUser userList={userList} setUserList={setUserList} /></Route>
      <Route path="/create-employee">
           <Redirect to="/create-user"/>
      </Route>
      <Route path="/edit-user/:id"><EditUser userList={userList} setUserList={setUserList}/></Route>
      <Route path="/profile/:id"><Profile userList={userList}/></Route>
      <Route path="**"> <WrongURL/></Route>
    </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}

export default App;

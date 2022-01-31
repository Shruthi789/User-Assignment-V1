import './App.css';
import * as React from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { MiniDrawer } from './DashboardTemplate';
import {useState} from 'react';

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
  return (
    <ThemeProvider theme={colorTheme}>
    <users.Provider value={obj}>
     <div className="App">
     <MiniDrawer/>
    </div>
    </users.Provider>
    </ThemeProvider>
  );
}

export {App,users};

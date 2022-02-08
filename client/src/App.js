import './App.css';
import * as React from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { MiniDrawer } from './DashboardTemplate';
import {useState} from 'react';
import {API,token} from './APIInfo';

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

const employees= React.createContext({});

function App() {
  const [employeeList,setEmployeeList]=useState([]);
  const[employeeCount,setEmployeeCount]=useState(0);
  const getEmployees=()=>{
    fetch(`${API}/employees`,{
      method:'GET',
      headers:{
        'x-auth-token': token
      }
    })
    .then((response)=>response.json())
    .then((employees)=>{setEmployeeList(employees);setEmployeeCount(employees.length);})
    .catch((error)=>console.log(error));
  }
  React.useEffect(getEmployees,[])
  const obj={employeeList,employeeCount,getEmployees};
  return (
    <ThemeProvider theme={colorTheme}>
    <employees.Provider value={obj}>
     <div className="App">
     <MiniDrawer/>
    </div>
    </employees.Provider>
    </ThemeProvider>
  );
}

export {App,employees};

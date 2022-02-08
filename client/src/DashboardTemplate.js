import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GroupIcon from '@mui/icons-material/Group';
import PrimarySearchAppBar from './NavBar';
import {Switch,Route,Redirect} from 'react-router-dom';
import { Home } from './Employees/Home';
import { Employees } from './Employees/Employees';
import { EditEmployee } from './Employees/EditEmployee';
import { Profile } from './Employees/Profile';
import { AddEmployee } from './Employees/AddEmployee';
import {WrongURL} from './Employees/WrongURL';
import Paper from '@mui/material/Paper';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor:'#1976d2',
  height:'auto'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor:'#1976d2',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  height:'auto'
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    })
  }),
);



function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const paperStyle={borderRadius:'0px',minHeight:'100vh',backgroundColor:'beige'};

  return (
    <Paper elevation={4} style={paperStyle} sx={{width:{xs:'fit-content',md:'100vw'}}}>
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon htmlColor='beige' />
          </IconButton>
           <PrimarySearchAppBar/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
      <List sx={{minHeight:"100vh"}}>
        <DrawerHeader>
        <ListItem>
          <ListItemIcon> 
        <EmojiEmotionsIcon fontSize="large" htmlColor="beige"/>
              </ListItemIcon>
              <ListItemText>
            <h4 className='color-drawer'>ADMIN USER</h4>
            </ListItemText>
            </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon htmlColor="beige"/> : <ChevronLeftIcon htmlColor="beige" />}
          </IconButton>
        </DrawerHeader>
        <Divider color="inherit" />
        <ListItem button key="employees">
          <ListItemIcon>
        <GroupIcon fontSize="medium" htmlColor="beige"/>
              </ListItemIcon>
              <ListItemText className='color-drawer'>
              Employees
            </ListItemText>
            </ListItem>
            <Divider color="inherit" />
            </List>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1,p:3}}>  
       <DrawerHeader />
        <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/employees"><Employees/></Route>
      <Route path="/users">
        <Redirect to="/employees"/>
      </Route>
      <Route path="/create-employee"><AddEmployee/></Route>
      <Route path="/create-user">
           <Redirect to="/create-employee"/>
      </Route>
      <Route path="/edit-employee/:id"><EditEmployee/></Route>
      <Route path="/profile/:id"><Profile/></Route>
      <Route path="**"> <WrongURL/></Route>
    </Switch>
     </Box>
    </Box>
    </div>
    </Paper>
  );
}

export {MiniDrawer};
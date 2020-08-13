import React from 'react';
import './App.css';
import Nav from './component/Header/Nav.js';
import Main from './component/Main/Main.js'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Route} from 'react-router-dom';


const drawerWidth = 240;
const headerhight = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link:{
    textDecoration:'none',
    color:'inherit',
  },
  main:{
    marginTop: headerhight,
  },
  postcard:{
    width: '100%',
  }

}));



function App() {
  let topics=['Home', 'Blog', 'Tools'];
  let paths=['/Home', '/Blog', '/Tools'];
  const classes=useStyles();



  return (

    <div className={classes.root}>
      <CssBaseline />
      
      <Route path="/" render={(props)=><Nav topics={topics} paths={paths} classes={classes} route={props} />}/>
      
      {/* <Drawer classes={classes} drawerWidth={drawerWidth}/> */}

    {/* <Nav topics={topics} paths={paths}/>
      <div>
      <Sidebar topics={topics} className={classes.sidebar}/>
      <Main className={classes.Main}/>
      </div> */}
    <Main classes={classes}/>
    </div>
  );
}

export default App;

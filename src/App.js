import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './component/Header/Nav.js';
import Main from './component/Main/Main.js'
import Sidebar from './component/Sidebar.js'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FullscreenExit } from '@material-ui/icons';


const useStyles=makeStyles((theme)=>({
  root:{
    display:'flex',
  },
  sidebar:{
    display:'box',
  },
  Main: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function App() {
  let topics=['Home', 'Blog', 'Tools'];
  let paths=['Home', 'Blog', 'Tools'];
  const classes=useStyles();
  return (
    <div className="App">
      <Nav topics={topics} paths={paths}/>
      <div>
      <Sidebar topics={topics} className={classes.sidebar}/>
      <Main className={classes.Main}/>
      </div>
      
    </div>
  );
}

export default App;

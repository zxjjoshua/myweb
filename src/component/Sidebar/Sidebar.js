import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

// import Drawer from '@material-ui/core/Drawer';
import Drawer from './Drawer.js'
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 240;

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
}));





export default function Sidebar(props){
    const topics=props.topics
    const classes = useStyles();
    const theme = useTheme();
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const drawer = (
    //     <div>
    //       <div className={classes.toolbar} />
    //       <Divider />
    //       <List>
    //         {topics.map((text, index) => (
    //           <ListItem button key={text}>
    //             <ChevronRightIcon></ChevronRightIcon>
    //             <ListItemText primary={text} to={'Home'}/>
    //           </ListItem>
    //         ))}
    //       </List>
    //       <Divider />
    //     </div>
    //   );
    const container = props.window !== undefined ? () => props.window().document.body : undefined;
    return(
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
                topics={topics} classes={classes}
            >
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            {/* <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer> */}
            <Drawer topics={topics} classes={classes}/>
            </Hidden>
        </nav>
    )
    
}
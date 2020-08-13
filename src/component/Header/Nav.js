import React from 'react';
import {Link} from 'react-router-dom';
import { AppBar} from '@material-ui/core';
import './Nav.css'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import BuildIcon from '@material-ui/icons/Build';

function GetIcon(i){
    if (i===0){
      return <HomeIcon/>;
    }
    else if (i===1){
      return <DescriptionIcon/>;
    }
    else if (i===2){
      return <BuildIcon/>;
    }
    else{
      return <HomeIcon/>;
    }
}



export default class Nav extends React.Component{
    
    // const classes = useStyles(0);
    constructor(props){
        super(props);
        this.state={
            topics:props.topics,
            paths:props.paths,
            current:"Joshua",
            classes:props.classes,
            mobileOpen: false,
        }
    }

    
    
    render(){
        let window=undefined;
        let topics=this.state.topics;
        let paths=this.state.paths;
        const classes=this.state.classes;
        // const theme = useTheme();
        const container = window !== undefined ? () => window().document.body : undefined;
    
        const changeValue=(value)=>{
          console.log(value);
            this.setState({
                current:this.state.topics[value],
            });
            if (this.state.mobileOpen){
              handleDrawerToggle();
            }
            
        }

        const handleDrawerToggle = () => {
            this.setState({
                mobileOpen:!this.state.mobileOpen,
            })
        };

    
        const drawer = (
            <div>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {topics.map((text, index) => (
                  <Link to={paths[index]} className={classes.link} key={index} >
                  <ListItem button key={index} value={index} onClick={()=> changeValue(index)}>
                    <ListItemIcon>{GetIcon(index)}</ListItemIcon>
                    <ListItemText >{text}</ListItemText>
                  </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
            </div>
          );

        return (
            <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {this.state.current}
                </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          </div>
            
        )
    }
    
}
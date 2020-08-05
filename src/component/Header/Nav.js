import React from 'react';
import propTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom';
import {Button, AppBar, Icon} from '@material-ui/core';
import {Tabs,Tab,TabPanel} from '@material-ui/core';
import './Nav.css'

function HomeIcon(){
    return(
        <h3>Joshua</h3>
    )
}

export default function Nav(props){
    
    // const classes = useStyles(0);

    
        let topics=props.topics;
        let paths=props.paths;
        let root='';
        const [value,setValue]=React.useState(1);
    
        const changeValue=(event,value)=>{
            setValue(value);
        }
    

        return (
            <div >
            <AppBar position='static'>
            <Tabs variant="fullWidth" value={value} onChange={changeValue} centered>
                <Tab icon={HomeIcon()} to={'/'} disabled />
                {topics.map((topic,i)=>{
                return(
                    <Tab key={i} label={topic} component={Link} to={paths[i]}/>
                )
            })}
            </Tabs>
            </AppBar>
            </div>
            
        )
    
    
}
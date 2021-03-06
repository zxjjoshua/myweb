import React from 'react';
import Blog from './Blog.js';
import Tools from './Tools.js';
import Home from './Home.js';
import {Route, Switch} from 'react-router-dom';
import NotFound404 from '../DefaultPage/NotFound404.js'

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            classes: props.classes,
        }
    }


    render(){
        const classes=this.state.classes;
        return(
            <div className={classes.main}>
                <Switch>
                    <Route path='/Home' component={Home}></Route>
                    <Route path='/Blog' component={Blog}></Route>
                    <Route path='/Tools' component={Tools}></Route>
                    <Route path='*' component={NotFound404}></Route>
                </Switch>
                
            </div>
            
        )
        
        
    }
}
import React from 'react';
import Blog from './Blog.js';
import Tools from './Tools.js';
import Home from './Home.js';
import {Route, Switch} from 'react-router-dom';

export default class Main extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div>
                <Switch>
                    <Route path='/Home' component={Home}></Route>
                    <Route path='/Blog' component={Blog}></Route>
                    <Route path='/Tools' component={Tools}></Route>
                </Switch>
            </div>
        )
        
        
    }
}
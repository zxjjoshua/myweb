import React from 'react'
import propTypes from 'prop-types'


export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mycontext:"I'm context of Header",
        }
    }
    static types={
    }
    // static context=this.state.mycontext;
    render(){
        return (

            <div>
                <div>Header context is {this.state.mycontext}</div>
                <button onClick={this.props.changefun.bind(this,this.state.mycontext)}>click me to change context</button>
                
            </div>
            
        )
    }
}
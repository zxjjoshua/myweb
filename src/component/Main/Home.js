import React from 'react';


export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mycontext:'hello, the Home',
            mypost:"unable to load",
        }
    }
    changeContext=(text)=>{
        this.setState(
            {
                mycontext:text,
            }
        )
    }
    componentDidMount(){

    }

    render(){
        return (
            <div>
                Home Page
            </div>
           
        )
    }
}
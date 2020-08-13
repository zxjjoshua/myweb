import React from 'react';
import post1 from "./Blog/blog-post.1.md"

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
        fetch(post1)
        .then((response)=>{return response.text()})
        .then((text)=>{
            this.setState({
                mypost:text,
            })
        });
    }

    render(){
        return (
            <div>
                Home Page
            </div>
           
        )
    }
}
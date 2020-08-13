import React from 'react';
import Markdown from "react-markdown"



export default class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.id,
            post:"",
            classes:props.classes,
        }
    }

    componentDidMount(){
        const url="/"+this.state.id;
        fetch(url)
        .then((response)=>{
            console.log(response)
            if (response===undefined){
                return "unable to locate resource";
            }
            return response.text()
        })
        .then((text)=>{
            this.setState({
                post:text
            })
        })
    }
    render()
    {    
        const classes=this.state.classes;
        return (
            <div className={classes.blogFrame}>
                <Markdown children={this.state.post} />
            </div>
            
        )
    }
}

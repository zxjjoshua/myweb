import React from 'react';
import Markdown from "react-markdown"
import ReactMarkdown from 'react-markdown';



export default class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.id,
            post:"",
            loadSucc:false,
            classes:props.classes,
            error:null,
            altertext:"sorry, we can't find the resource you request",
        }
    }

    componentDidMount(){
        const myHeaders = new Headers({
            "Content-Type": "text/markdown",
            Accept: "text/markdown"
          });
        const url="/"+this.state.id;
        console.log(url)

        fetch(url,myHeaders)
        .then((response)=>{
            console.log(response)
            if (response===undefined){
                return "unable to locate resource";
            }
            return response.text()
        })
        .then(
            (text)=>{
                console.log(text)
                this.setState({
                    loadSucc:true,
                    post:text
                })  
            },
            (error)=>{
                this.setState({
                    error
                })
                console.log(error)
            }
        )

    }
    render()
    {    
        const classes=this.state.classes;
        return (
            <div className={classes.blogFrame}>
                <Markdown children={this.state.loadSucc?this.state.post:this.state.altertext} />
            </div>
            
        )
    }
}

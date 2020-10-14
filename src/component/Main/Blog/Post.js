import React from 'react';
import Markdown from "react-markdown"



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
        const url="http://localhost:3333/api/blogs/blogarticle/"+this.state.id+"/";
        fetch(url,{
            method:"GET",
            'Access-Control-Allow-Origin':'*',
            headers:{
                'Accept': 'application/json',
            },
        })
        .then((response)=>{
            if (response===undefined){
                return "unable to locate resource";
            }
            return response.json()
        })
        .then(
            (data)=>{
                this.setState({
                    loadSucc:true,
                    post:data["article"]["content"]
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

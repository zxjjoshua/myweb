import React from 'react';
import propTypes from 'prop-types'
import post1 from "./Blog/blog-post.1.md"
import Markdown from "react-markdown"
import Postcard from './Blog/Postcard.js'

export default class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mycontext:'hello, the Home',
            mypost:"unable to load",
        }
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
        let posts=[
            {
                title:'first passage',
                brief:"this is brief",
            },
            {
                title:'second passage',
                brief:"this is brief",
            }
        ]
        const postbody=posts.map((post,i)=>{
            return (<Postcard key={i} post={post}/>)
        })
        return (
            <div>
                {/* <Markdown children={this.state.mypost} /> */}
                {postbody}
            </div>
            
           
        )
    }
}
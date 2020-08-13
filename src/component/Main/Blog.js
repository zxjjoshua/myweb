import React from 'react';
import Postcard from './Blog/Postcard.js'
import { Route,Switch } from 'react-router-dom';
import Post from './Blog/Post.js';
import { withStyles} from "@material-ui/core/styles";

const style = theme =>({
    root:{
        color:"Dark",
        width:"100%",
    },
    blogFrame:{
        padding:"40px",
    }
})

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount(){
    }
    

    render(){
        const classes=this.props.classes;
        let posts=[
            {
                title:'first passage',
                brief:"this is brief this is brief this is brief this is brief this is brief this is brief this is brief this is brief",
                link:'/Post/blog-post.1.md'
            },
            {
                title:'second passage',
                brief:"this is brief",
                link:'/Post/blog-post.2.md'
            }
        ]
        let images=["../../../../public/logo192.png","../../../../public/logo192.png"];
        const postbody=posts.map((post,i)=>{
            return (<Postcard key={i} post={post} image={images[i]}/>)
        })
        return (
            <div className={classes.root}>
                <Switch>
                    <Route path="/Blog" exact>{postbody}</Route>
                    <Route path="/Blog/Post/:id" render={(params)=><Post id={params.match.params.id} classes={classes}/>}></Route>
                </Switch>
            </div>
            
           
        )
    }
}


export default withStyles(style, {withTheme:false})(Blog);
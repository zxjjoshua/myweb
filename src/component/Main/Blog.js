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
        padding:"50px",
        backgroundColor:"white",
    },

})

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:null,
        }
    }
    componentWillMount(){
        const url="/BlogConfig.json";
        const Header=new Headers({
            "Content-Type": "text/json",
            Accept: "text/json"
          });
        fetch(url)
        .then((response)=>{return response.json()})
        .then((posts)=>{
            console.log(posts);
            this.setState({
            posts:posts["Blog"]
        })},
        (error)=>{
            console.log(error);
        }
        );
    }
    

    render(){
        const classes=this.props.classes;
        let images=["../../../../public/logo192.png","../../../../public/logo192.png"];
        let postbody=null;
        if (this.state.posts!=null){
            console.log(this.state.posts);
            postbody=this.state.posts.map((post,i)=>{
                return (<Postcard key={i} post={post} image={images[i]}/>)
            })
        }
        
        
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
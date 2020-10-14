import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Post from './Blog/Post.js';
import { withStyles} from "@material-ui/core/styles";
import BlogList from "./Blog/BlogList.js";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PostEdit from './Blog/PostEdit.js';

const style = theme =>({
    root:{
        margin: '0 20px',
    },
    blogFrame:{
        padding:"50px",
        backgroundColor:"white",
    },
    addIcon:{
        position:"fixed",
        bottom: "8%",
        right: "5%",
        zIndex:100,
    }

})

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            EditOpen:false,
        })
    }

    getBlogList(offset,count){
        // const reqQuery=new URLSearchParams(this.props.location.search);
        // let offset=reqQuery.get("offset")?Number(reqQuery.get("offset")):0;
        let url="http://localhost:3333/api/blogs/";
        const querystring = require('querystring');
        const data={
            "offset":offset,
            "count":count
        }
        const query = querystring.stringify(data);
        if (query.length>0){
            url+="?"+query;
        }
        fetch(url,{
            method:"GET",
            'Access-Control-Allow-Origin':'*',
            headers:{
                'Accept': 'application/json',
            },
        })
        .then((response)=>{ return response.json()})
        .then((data)=>{
            this.setState({
            posts:data["blogs"]
        })},
        (error)=>{
            console.log(error);

        }
        );
    }

    getBlogInfo(){

        let url="http://localhost:3333/api/blogs/bloglistinfo/";
        fetch(url,{
            method:"GET",
            'Access-Control-Allow-Origin':'*',
            headers:{
                'Accept': 'application/json',
            },
        })
        .then((response)=>{ return response.json()})
        .then((data)=>{
            this.setState({
            totalPost:data["TotalCount"],
            itemPerPage:data["DisplaySetting"]["countPerPage"],
            posts:data["BlogList"]
        })},
        (error)=>{
            console.log(error);

        }
        );
    }


    handleEditOpen(){
        this.setState({
            EditOpen:true,
        })
    }

    handleEditClose(){
        this.setState({
            EditOpen:false,
        })
    }




    render(){
        const classes=this.props.classes;
        console.log(this.state)
        let postEdit=<PostEdit EditOpen={this.state.EditOpen} handleClose={this.handleEditClose.bind(this)}/>;
        return (
            <div className={classes.root}>
                <Switch>
                    {/* <Route  path="/Blog" exact><Redirect to="/Blog/?offset=0" /></Route> */}
                    {/* <Route path="/Blog/bloglist/">{this.state.posts==null?NotFound404:postbody}</Route> */}
                    <Route path="/Blog/bloglist/" component={BlogList}/>
                    <Route path="/Blog/Post/:id" render={(params)=><Post id={params.match.params.id} classes={classes}/>}></Route>
                </Switch>
                {postEdit}
                {/* <PostEdit EditOpen={this.state.EditOpen} handleClose={this.handleEditClose.bind(this)}/> */}
                <Fab color="primary" aria-label="add" className={classes.addIcon} onClick={this.handleEditOpen.bind(this)}>
                    <AddIcon />
                </Fab>
            </div>
        
           
        )
    }
}


export default withStyles(style, {withTheme:false})(Blog);
// export default Blog;
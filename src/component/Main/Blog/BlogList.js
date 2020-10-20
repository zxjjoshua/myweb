import React, { Component } from 'react';
import NotFound404 from "../../DefaultPage/NotFound404.js"
import PageNav from "../../common/PageNav";
import Postcard from "./Postcard";
import WaitLoading from '../../common/WaitLoading.js';


export default class BlogList extends Component{
    constructor(props){
        super(props)
        const query=new URLSearchParams(props.location.search);
        let offset=query.get("offset")?Number(query.get("offset")):0;
        this.state={
            totalPost:0,
            itemPerPage:5,
            posts:null,
            offset:offset,
            count:5,
            pageNav:null,
        }
    }

    getBlogList(offset,count){
        // console.log("call back here")
        // const reqQuery=new URLSearchParams(this.props.location.search);
        // let offset=reqQuery.get("offset")?Number(reqQuery.get("offset")):0;
        // let count=5;
        let url="http://localhost:3333/api/blogs/bloglistinfo/";
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
                totalPost:data["TotalCount"],
                itemPerPage:data["DisplaySetting"]["countPerPage"],
                posts:data["BlogList"],
                pageNav: this.getPageNav(data["TotalCount"],
                data["DisplaySetting"]["countPerPage"],
                this.state.offset)
            });
        },
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
            posts:data["BlogList"],
            pageNav: this.getPageNav(data["TotalCount"],
            data["DisplaySetting"]["countPerPage"],
            this.state.offset)
        });
        this.render();
    },
        (error)=>{
            console.log(error);

        }
        );
    }

    componentDidMount(){
        this.getBlogList(this.state.offset, this.state.count);
    }

    PostCardList(){
        return this.state.posts===null?NotFound404:(
            this.state.posts.map((post,i)=>{
                return (<Postcard key={i} post={post} image={post['images']}/>)
            })
        )
    }

    getPostBody(){
        let postbody=null;
        if (this.state.posts!=null){
            postbody=this.state.posts.map((post,i)=>{
                return (<Postcard key={i} post={post} image={post['images']}/>)
            })
        }
        return postbody===null?NotFound404:postbody;
    }

    getPageNav(totalPost, itemPerPage, offset){
        return <PageNav totalPage={Math.ceil(totalPost/itemPerPage)} 
        curActive={Math.floor(offset/itemPerPage)+1} 
        callBack={this.getBlogList.bind(this)}/>;
    }

    render(){
        let postbody=<WaitLoading msg="resource loading"/>;
        if (this.state.posts!=null){
            postbody=this.state.posts.map((post,i)=>{
                return (<Postcard key={i} post={post} image={post['images']}/>)
            })
        }
        return(
            <div>
                <div>{postbody}</div>
                {this.state.pageNav}
            </div>
        )
    }
}
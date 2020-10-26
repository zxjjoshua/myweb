import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InfoDialog from '../../common/InfoDialog';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: "500",
    margin:20
  },
  media: {
    height: 140,
  },
  content:{
    height: 140,
  },
  link:{
    textDecoration:'none',
    color:'inherit',
  },
  blogOps:{
    float:"right",
  },
  hidden:{
    visibility:"hidden",
  }
});

export default function Postcard(props) {
  const [hovered, setHovered]=useState(false);
  const classes = useStyles();
  const post = props.post;

  function handleMouseHover(e){
    setHovered(true);
  }

  function handleMouseLeave(e){
    setHovered(false);
  }

  function handleCloseInfoModal(){
    setMakesure(false);
  }

  async function handleOnDeletePost(e){
    console.log(e,"------onDelete");
    console.log(post, "-------post");
    setMakesure(true);

  }

  async function deleteArticleRequest(){
    const data = new FormData();
    data.append("userid", post.author);
    data.append("id", post.id);
    data.append("title", post.title);

    let url="http://localhost:3333/api/blogs/deleteblog/";

    const resp=await fetch(url, {
      method:"POST",
      'Access-Control-Allow-Origin':'*',
      headers:{
        'Accept': 'application/json',
      },
      body:data,
    })
    .then(resp=>{return resp.json()});
    console.log(resp);
    if(resp.isSucc){
      handleCloseInfoModal()
      window.location.reload(false)
    }else{
      window.location.reload(false)
    }
  }

  const [MakesureDialog, setMakesure]=useState(false);

  return (
    <div>
   <Redirect to="/Blog/bloglist/?offset=0"/>
    <InfoDialog 
      isOpen={MakesureDialog} 
      InfoTitle={"You Are Trying To Delete Your Post"+post.title}
      clickYesCallback={deleteArticleRequest} 
      clickNoCallback={handleCloseInfoModal}
      />
    <Card className={classes.root} onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave}>
    <Link to={post.url} className={classes.link}>
        <CardActionArea>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.brief}
              </Typography>
            </CardContent>
        </CardActionArea>
      </Link>
      <div className={hovered?classes.blogOps:classes.hidden}>
          <IconButton aria-label="edit">
            <EditIcon className={classes.edit}/>
          </IconButton>
          <IconButton aria-label="delete" onClick={handleOnDeletePost}>
            <DeleteIcon className={classes.delete} />
          </IconButton>
        </div>
      
    </Card>
    </div>
  );
}

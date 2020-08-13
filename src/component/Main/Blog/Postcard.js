import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

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
});

export default function Postcard(props) {
  const classes = useStyles();
  const post = props.post;
  console.log(post);
  const curPath="/Blog";
  return (
    
    <div>
    <Card className={classes.root}>
      <Link to={curPath+post.link} className={classes.link}>
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
    </Card>
    </div>
  );
}

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';


// import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// const style=theme=>({
//     root:{
        
//     }
// })

// const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundColor: theme.palette.background.paper,
//       width: 500,
//     },
//   }));


export default class PostEdit extends Component {
    constructor(props){
        super(props);
        this.state=({
            EditOpen:props.EditOpen,
            handleClose: props.handleClose,
            blogTitle:"",
            blogBrief:"",
            blog:{
                id:-1,
                title:"",
                brief:"",
                date:Date.now(),
                tags:"",
                content:"",
            },
            selectedFile:null,
            UploadFile:{
                id:-1,
                title:"",
                brief:"",
                date:Date.now(),
                tags:"",
                content:"",
            },
            tabIndex:0,
        })
    }

    passByFormData(userid){
        const data = new FormData();
        data.append("userid", userid);
        data.append("id", -1);
        data.append("title", this.state.blogTitle);
        data.append("brief", this.state.blogBrief);
        data.append("date", Date.now());
        data.append("tags", "");
        this.state.tabIndex===0?data.append("content",this.state.blog.content):data.append("file",this.state.selectedFile);
        

        return data;
    }

    passByJsonData(userid){
        let data;
        
        let blog;
        if (this.state.tabIndex===0){
            blog={
                id:-1,
                title:this.state.blogTitle,
                brief:this.state.blogBrief,
                date:Date.now(),
                tags:"",
                content:this.state.blog.content,
                file:null,
            }
        }else{
            blog={
                id:-1,
                title:this.state.blogTitle,
                brief:this.state.blogBrief,
                date:Date.now(),
                tags:"",
                content:"",
                file:this.state.selectedFile,
            }
        }

        data={
            userId:userid,
            blog:blog,
        }

        return JSON.stringify(data);
    }

    publishOnlcik(event){
        console.log(event);
        let url="http://localhost:3333/api/blogs/blogarticle/";

        console.log(this.state+"----this.state");
        const formData=this.passByFormData(1);
        const jsonData=this.passByJsonData(1);
        
        fetch(url,{
            method:"POST",
            'Access-Control-Allow-Origin':'*',
            headers:{
                'Accept': 'application/json',
            },
            body:formData,
        })
        .then((response)=>{return response.json()})
        .then(data=>{
            console.log(data)
        })
        this.state.handleClose();

    }

    titleOnChange(event){
        this.setState({
            blogTitle:event.target.value,
        });
    }

    briefOnChange(event){
        this.setState({
            blogBrief:event.target.value,
        });
    }

    contentOnChange(event){
        this.setState({
            blog:{
                ...this.state.blog,
                content:event.target.value,
            }
        });
    }

    handleChangeIndex = (tabIndex) => {
        this.setState({
            tabIndex,
        });
    };

    handleChange = (event, tabIndex) => {
        this.setState({
            tabIndex,
        });
      };


    handleFileuploadChange = (event)=>{
        this.setState({
            blogTitle:this.state.blogTitle===""?event.target.files[0].name:this.state.blogTitle,
            selectedFile:event.target.files[0],
        });
    }
    

    getEditWindow(){
        return(
            <div>
                <DialogContentText>
                    You may create your post here.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="title"
                    type="string"
                    variant="outlined"
                    placeholder="title"
                    value={this.state.blogTitle}
                    fullWidth
                    onChange={this.titleOnChange.bind(this)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="brief"
                    label="brief"
                    type="string"
                    variant="outlined"
                    placeholder="brief"
                    fullWidth
                    onChange={this.briefOnChange.bind(this)}
                  />
                  <div hidden={this.state.tabIndex===0?false:true}>
                  <TextField
                    id="outlined-textarea"
                    placeholder="Content"
                    label="Content"
                    fullWidth={true}
                    multiline
                    rows={10}
                    onChange={this.contentOnChange.bind(this)}
                    />
                  </div>

                  <div hidden={this.state.tabIndex===1?false:true}>
                  <Input 
                    type="txt" 
                    lable="you may modify the name"
                    name="UploadFile"/>
                    <Input 
                    type="file" 
                    lable="Upload Here"
                    name="UploadFile"
                    onChange={this.handleFileuploadChange}
                    />
                  </div>
                  
            </div>
            
        )
    }

    getUploadWindow(){
        return (
            <div hidden={this.state.tabIndex===1?false:true}>
                <DialogContentText>
                    You may upload your post here.
                  </DialogContentText>
                  <Input 
                type="txt" 
                lable="you may modify the name"
                name="UploadFile"/>
                <Input 
                type="file" 
                lable="Upload Here"
                name="UploadFile"
                onChange={this.handleFileuploadChange}
                />
            </div>
        );
    }


    render(){
        // const classes=style;
        // const theme = {
        //     direction:"horizontal",
        // }
        console.log(this.state);

        const EditWindow=this.getEditWindow();

        // const UploadWindow=this.getUploadWindow(this.state.tabIndex,1);


        return (
            <div>
              <Dialog open={this.props.EditOpen} 
              onClose={this.state.handleClose} 
              aria-labelledby="form-dialog-title"
              maxWidth="md"
              fullWidth={true}>
                <DialogTitle id="form-dialog-title">Create Your Post</DialogTitle>
                <DialogContent>


                <AppBar position="static" color="default">
                    <Tabs
                    value={this.state.tabIndex}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="Create Online" {...a11yProps(0)} />
                    <Tab label="Upload File" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                {/* <TabPanel value={this.state.tabIndex} index={0} dir={theme.direction}>
                Item One
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={1} dir={theme.direction}>
                Item Two
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={2} dir={theme.direction}>
                Item Three
                </TabPanel> */}

                {EditWindow}
                  
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.state.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.publishOnlcik.bind(this)} color="primary">
                    Publish
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
  
}





function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button"

export default class PageButton extends Component{

    constructor(props){
        super(props)
        this.state={
            index: props.index,
            curActive:props.curActive,
            content:props.content,
            callBack:props.callBack,
            disabled:props.disabled,
        }
    }

    ButtonClick(event){
        // this.setState({
        //     active:true,
        // })
        if (this.props.disabled){
            return;
        }
        if(this.state.callBack){
            this.state.callBack(this.state.index);
        }
        
    }

    render(){
        let curActive=this.props.curActive;
        let baseUrlForBloglist="/Blog/bloglist/";
        let button=
        <div className="PageButton">
            <Link to={baseUrlForBloglist+"?offset="+(this.state.index-1)*5} >
                <Button
                disabled={this.props.disabled}
                variant="contained" color={curActive===this.state.index&&(!this.props.disabled)?"primary":"default"}
                 onClick={this.ButtonClick.bind(this)}>
                    {this.state.content}
                </Button>
            </Link>
        </div>;
        return (button);
    }
}
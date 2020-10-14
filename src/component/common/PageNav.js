import React,{Component} from 'react';
import '../../css/common/PageNav.scss';
import './PageButton.js';
import PageButton from './PageButton.js';

export default class PageNav extends Component{
    constructor(props){
        super(props)
        this.state={
            curActive:props.curActive,
            totalPage: props.totalPage,
            callBack:props.callBack
        }
    }

    PageButtonOnClick(index) {
        this.setState({
            curActive:index,
        })
        this.state.callBack((index-1)*5,5);
    }

    PreButtonOnClick(){
        this.setState({
            curActive:this.state.curActive-1,
        })
        this.state.callBack((this.state.curActive-1)*5,5);
    }

    NextButtonOnClick(){
        this.setState({
            curActive:this.state.curActive+1,
        })
        this.state.callBack((this.state.curActive-1)*5,5);
    }

    render(){
        let buttonsIndex=Array.from({length:this.state.totalPage}, (v,k) => k+1);
        let buttons=buttonsIndex.map(index => {
            return (
            <PageButton 
            key={index} 
            content={index} 
            curActive={this.state.curActive} 
            index={index}
            callBack={this.PageButtonOnClick.bind(this)}/>
            )
        })
        return(
            <div className="main">
                {/* <Button variant="contained" color="primary">pre</Button> */}
                <PageButton 
                content="PRE"
                curActive={this.state.curActive} 
                index={Math.max(this.state.curActive-1,1)}
                disabled={this.state.curActive<=1?true:false}
                callBack={this.PreButtonOnClick.bind(this)}/>
                <ul className="page">
                    {buttons}
                </ul>
                <PageButton 
                content="NEXT"
                curActive={this.state.curActive} 
                index={Math.min(this.state.curActive+1,this.state.totalPage)}
                disabled={this.state.curActive>=this.state.totalPage?true:false}
                callBack={this.NextButtonOnClick.bind(this)}/>
            </div>
        )
        
    }

}


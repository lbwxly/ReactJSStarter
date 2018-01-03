import React from "react";
import ReactDOM from "react-dom";
import {Input,Button,Modal,message} from "antd";
import {Redirect} from "react-router-dom";
import {setLoginUser} from "../actions/action";
import {connect} from "react-redux";

export class LoginComponent extends React.Component {
    constructor(props){
        super(props)
        // set the initial state
        this.state = {
            loginInfo:{userName:"Jensen",pass:"abc"},
            showRegister:false,
            registerInfo:{userName:"",password:""},
            registerHintColor:"red",
            logined:false
        };
    }

    // use lamda expression to skip the bind this operation, the this will bind automatically.
    handleLogin = () =>{
        var loginInfo = this.state.loginInfo;
        if(loginInfo.userName.length == 0){
            message.error("User name can't be empty");
            return;
        }

        if(loginInfo.pass.length == 0){
            message.error("Password name can't be empty");
            return;
        }

        this.props.dispatch(setLoginUser(this.state.loginInfo));
        this.setState({logined:true});
    };

    handleRegisterOk = ()=>{
        this.setState({showRegister:false});
    };

    handleRegisterCancel = ()=>{
        this.setState({showRegister:false});
    };

    handleRegister = ()=>{
        this.setState({showRegister:true});
    };

    setLoginInfo(value,isPassword){
        var userInfo = this.state.loginInfo;
        if(isPassword){
            userInfo.pass = value;
        } else {
            userInfo.userName = value;
        }

        this.setState({loginInfo:userInfo});
    }

    render(){
            if(!this.state.logined) {
                return(
                <div>
                    {/* style is same as the html style, support css attribute*/}
                    <div style={{height:100}} />
                    <div className="loginContainer">
                        <div style={{width:300}}>
                            <h1 style={{marginBottom:16}}>Sign In</h1>
                            <Input className="loginInput" 
                                   onChange={(e)=>{this.setLoginInfo(e.target.value,false)}} // using onChange event to get the new value, then use setState to refresh the value of the control(single way binding)
                                   placeholder="User Name" 
                                   value={this.state.loginInfo.userName}/>
                            <Input className="element loginInput" type="password" placeholder="Password" onChange={(e)=>{this.setLoginInfo(e.target.value,true)}} value={this.state.loginInfo.pass}/> 
                            <Button className="element" type="primary" size="large" style={{width:300,height:40}}
                                    onClick={this.handleLogin}>
                                    Login
                            </Button>
                            <span className="element"
                                color="red"
                                onClick={this.handleRegister}
                                onMouseOver={()=>{this.setState({registerHintColor:"red"})}}
                                onMouseLeave={()=>{this.setState({registerHintColor:"black"})}}>
                                I don't have an account
                            </span>
                            <Modal visible={this.state.showRegister}                    
                                title="NEW ACCOUNT"
                                footer={null}
                                onOk={this.handleRegisterOk}
                                onCancel={this.handleRegisterCancel}>
                                <div className="registerContainer" style={{width:300}}>
                                        <Input className="loginInput" placeholder="User Name"/>
                                        <Input className="element loginInput" placeholder="Password"/> 
                                        <Button className="element" type="primary" style={{width:300,height:40,marginTop:32}}
                                                onClick={this.handleRegisterOk}>
                                            Submit
                                        </Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>);
        } else {
            return(
                <Redirect to="/main/currentProject"/>
            );
        }
    }
}

// if the mapDispatchToProps is not provided here,the dispatch function will be passed to the wrapped component directly.
export default connect()(LoginComponent)
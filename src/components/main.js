import React from "react"
import ReactDOM from "react-dom"
import {Menu,Button} from "antd";
import {Route,Link,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import CurrentProject from "./currentProject"
import ModifyProject from "./modifyProject"
import ProjectList from "./projectList"
import {logout,setModifyProjectState} from "../actions/action";

const SubMenu = Menu.SubMenu;
export class MainComponent extends React.Component {
    constructor(props){
        super(props);
    }

    handleLogout = (e)=>{
        this.props.logoutHandler();
    };

    render() {
        if(this.props.logined){
            return (
                <div>
                    <div id="navMenu">
                        <Menu theme="dark" style={{width:240}} mode="inline" onClick={(item,key,keypath)=>{
                            if(item.key == 3){
                                this.props.createProjectHandler();
                            }
                        }}
                        defaultOpenKeys={["project"]} 
                        defaultSelectedKeys={["2"]}>
                        <SubMenu key="project" title="Project Management">
                            <Menu.Item key="2"><Link to="/main/currentProject">Current Project</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/main/addProject">Add Project</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/main/projects">Manage Project</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="language" title="Language Management">
                            <Menu.Item key="1">Manage Language</Menu.Item>
                        </SubMenu>
                        <SubMenu key="platform" title="Platform Management">
                            <Menu.Item key="5">Manage Platform</Menu.Item>
                        </SubMenu>
                        </Menu>
                    </div>
                    <div id="topMenu">
                        <Menu theme="light" mode="horizontal">
                            <SubMenu key="exit" title={this.props.loginedUser.userName} style={{float:"right"}}>
                                <Menu.Item key="1">
                                    <a onClick={this.props.logoutHandler}>Logout</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>  
                    </div>
                    <div id="content">
                    {/**
                     * the route element will be used to conditional render, when the current path matched the route path, the corresponding component will be rendered.
                     */}
                        <Route path="/main/currentProject" component={CurrentProject}/>
                        <Route path="/main/addProject" component={ModifyProject}/>
                        <Route path="/main/modifyProject" component={ModifyProject}/>
                        <Route path="/main/projects" component={ProjectList}/>
                    </div>
                </div>
            );
        } else {
            return(<Redirect to="/"/>);
        }
    }
}

// the followings two function is used to build the redux container component. 
// the mapStateToProps is used to map the state tree(passed as parameter here) to the props of the wrapped component.
// when the instance is created, the props defined here will be presented in the wrapped component.
function mapStateToProps(state){
    return {
        logined:state.user.logined,
        loginedUser:state.user.loginedUser
    };
}

// mapDispatchToProps is used to map the dispatch action to the props of the wrapped component.
// each property in the return json object will be presented in the wrapped component as call back props.
// note: each dispatch call will cause the calling to the reducer and result in the rerender of the component tree.
function mapDispatchToProps(dispatch){
    return {
        logoutHandler:()=>{
            // call the dispatch function in the redux framework which will result in calling to reducer and rerender of the component.
            dispatch(logout());
        },
        createProjectHandler:()=>{
            dispatch(setModifyProjectState(true,null));
        }
    };
}

// the connect function provided by redux framework will generate the redux container component which wrap the actual component.
// see detail above for the function mapStateToProps and mapDispatchToProps
// the container component provided following feature:
// 1. subscribe the store for the state change
// 2. rerender the component when the state change.
// 3. pass the mapped state props and dispatch props to the wrapped component.
export default connect(mapStateToProps,mapDispatchToProps)(MainComponent);
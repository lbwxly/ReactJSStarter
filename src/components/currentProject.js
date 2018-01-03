import React from "react";
import ReactDOM from "react-dom";
import {Input,Button,Row,Col,Table,Select,Modal} from "antd";
import {Route,Link} from "react-router-dom";
import {connect} from "react-redux";
import {setModifyProjectState,setModifyResourceState} from "../actions/action"
import {ResourcesListComponent} from "./resourcesList"
import ModifyResource from "./modifyResource"

const SelectOption = Select.Option;
export class CurrentProjectComponent extends React.Component {
    constructor(props){
        super(props);
        this.refreshFilter(this.props.project);
        this.resetState();
    }

    handleSelect = (e,field) => {
        let {selectedLanguages,selectedPlatforms,selectedModules} = this.state;
        let statePropMap = {"language":selectedLanguages,"platform":selectedPlatforms,"module":selectedModules};
        let stateNamesMap = {"language":"selectedLanguages","platform":"selectedPlatforms","module":"selectedModules"};
        let selectedValues = statePropMap[field];
        if(e == "0"){
            selectedValues = [];
            selectedValues.push("0");
        } else {
            let index = selectedValues.findIndex((value,index,array)=>{
                return value == "0";
            })

            if(index != -1){
                selectedValues.splice(index,1);
            }

            selectedValues.push(e);
        }

        let newState = {};
        newState[stateNamesMap[field]] = selectedValues;
        this.setState(newState);
    }

    handleFilter = (e)=>{
        console.log(this.state)
    }

    handleAddResource = (e)=>{
        this.props.createResourceHandler();
        this.setState({showModifier:true});
    }

    handleModifyResource = (resource)=>{
        this.props.modifyResourceHandler(resource)
        this.setState({showModifier:true});
    }

    resetState=()=>{
        this.state = {
            selectedLanguages:["0"],
            selectedPlatforms:["0"],
            selectedModules:["0"],
            keyword:"",
            selectedResources:[],
            showModifier:false
        };
    }

    refreshFilter=(project)=>{
        this.languageOptions = [<SelectOption key="0">All</SelectOption>];
        this.platformOptions = [<SelectOption key="0">All</SelectOption>];
        this.moduleOptions = [<SelectOption key="0">All</SelectOption>];
        if(this.props.project != null){
            this.props.project.languages.map(x=>{
                this.languageOptions.push(<SelectOption key={x.id}>{x.name}</SelectOption>)
            });

            this.props.project.platforms.map(x=>{
                this.platformOptions.push(<SelectOption key={x.id}>{x.name}</SelectOption>)
            });

            this.props.project.modules.map(x=>{
                this.moduleOptions.push(<SelectOption key={x}>{x}</SelectOption>)
            });
        }
    }

    render() {
        // if(this.props.option.resetState){
        //     this.resetState();
        //     this.props.option.resetState = false;
        // }
        //this.refreshFilter(this.props.project);
        let dropdownWidth = 180;
        if(this.props.project == null) {
            return(
                <div className="centerContainer">
                    <h3>You don't have any project.</h3> <Link to="/main/addProject"><h3 onClick={this.props.createProjectHandler}>Create one?</h3></Link>
                </div>
            );
        } else {
            return(
                <div>
                    <h1>{this.props.project.name}</h1>
                    
                    <div id="filter">
                        <Row type="flex" justify="start" align="middle">
                            <Col span="14">
                                <div style={{height:40}}>
                                    <Row type="flex" justify="start" align="middle">
                                        <Col span="3">
                                            <span>Keyword</span>
                                        </Col>
                                        <Col span="8">
                                            <Input value={this.state.keyword} onChange={x=>this.setState({keyword:x.target.value})}/>
                                        </Col>
                                        <Col span="3" offset="1">
                                            <span>Module</span>
                                        </Col>
                                        <Col span="8">
                                            <Select mode="multiple" placeholder="Please select module" className="widthStrech" value={this.state.selectedModules}
                                            onSelect={e=>{this.handleSelect(e,"module")}}>
                                                {this.moduleOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{height:40}}>
                                    <Row type="flex" justify="start" align="middle">
                                        <Col span="3">
                                            <span>Platform</span>
                                        </Col>
                                        <Col span="8">
                                            <Select className="widthStrech" mode="multiple" placeholder="Please select platform" value={this.state.selectedPlatforms}
                                            onSelect={e=>{this.handleSelect(e,"platform")}}>
                                                {this.platformOptions}
                                            </Select>
                                        </Col>
                                        <Col span="3" offset="1">
                                            <span>Language</span>
                                        </Col>
                                        <Col span="8">
                                            <Select className="widthStrech" mode="multiple" placeholder="Please select language" value={this.state.selectedLanguages}
                                            onSelect={e=>{this.handleSelect(e,"language")}}>
                                                {this.languageOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span="4">
                                <Button style={{height:54}} onClick={this.handleFilter}>Apply</Button>
                            </Col>
                        </Row>
                    </div>
                    <div id="result">
                        <ResourcesListComponent project={this.props.project} resources={this.props.resources} onSelectedChanged={records=>{this.setState({selectedResources:records})}}
                        editRecordHandler={this.handleModifyResource}/>
                        <div>
                            <Button className="horizontalElement" style={{float:'right'}}>Delete Selected</Button>
                            <Button className="horizontalElement" style={{float:'right'}}>Export Selected</Button>
                            <Button className="horizontalElement" style={{float:'right'}}>Export All</Button>
                            <Button className="horizontalElement" style={{float:'right'}} onClick={this.handleAddResource}>Add Resource</Button>
                        </div>
                    </div>
                    <Modal visible={this.state.showModifier} 
                           onCancel={e=>{this.setState({showModifier:false})}}
                           footer={null}>
                        <ModifyResource/>
                    </Modal>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    let resources = [];
    if(state.project.current != null){
        resources = state.resource.get(state.project.current.id);
    }
    return {
        project:state.project.current,
        resources:resources,
        option:{resetState:true}
    };
}

function mapDispatchToProps(dispatch){
    return {
        createProjectHandler(){
            dispatch(setModifyProjectState(true,null));
        },
        createResourceHandler(){
            dispatch(setModifyResourceState(true,null));
        },
        modifyResourceHandler(resource){
            dispatch(setModifyResourceState(false,resource));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentProjectComponent);
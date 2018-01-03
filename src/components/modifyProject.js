import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux"
import {Form,Input,Button,Select,Table,Row,Col,message} from "antd"
import {project,user} from "../models/model.js"
import {saveProject,setCurrentProject} from "../actions/action"
import {notEmpty} from "../helper.js"

const FormItem = Form.Item;
const SelectOption = Select.Option;

export class ModifyProjectFormComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addingModule:"",
            addingUser:""
        }
    }

    handlSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((error,values)=>{
            if(error == null){

                this.saveIntoModifyingProject(values);
                //TODO: submit to server
                if(this.props.addingMode){
                    //set id on client for now.remove these line when submit to server
                    this.props.modifyingProject.id = new Date().getTime();
                }
                //save to store
                this.props.saveProject(this.props.modifyingProject);
                if(this.props.addingMode && this.props.currentProject == null) {
                    this.props.setAsCurrentProject(this.props.modifyingProject);
                }
                
                message.success("Create Successfully");

                this.props.history.goBack();
            }
        });
    };

    handleAddModule = (e)=>{
        e.preventDefault();
        let selectedModules = this.props.form.getFieldValue("modules");
        selectedModules = selectedModules.concat({name:this.state.addingModule});
        this.props.form.setFieldsValue({modules:selectedModules})
        this.setState({addingModule:""});
    }

    handleAddUser = (e)=>{
        e.preventDefault();
        let selectedUsers = this.props.form.getFieldValue("users");
        //TODO: get user from server
        let addUser = user();
        addUser.id = addUser.clientId;//set to clientid for now.
        addUser.name = this.state.addingUser;
        selectedUsers = selectedUsers.concat(addUser);
        this.props.form.setFieldsValue({users:selectedUsers});
        this.setState({addingUser:""});
    }

    handleDeleteUser = (record)=>{
        let selectedValues = this.props.form.getFieldValue("users");
        let targetIndex = selectedValues.findIndex(x=> notEmpty(x.id) && x.id == record.id);
        selectedValues.splice(targetIndex,1);

        this.props.form.setFieldsValue({users:selectedValues});
    }

    handleDeleteModule = (record)=>{
        let selectedValues = this.props.form.getFieldValue("modules");
        let targetIndex = selectedValues.findIndex(x=> x.name == record.name);
        selectedValues.splice(targetIndex,1);

        this.props.form.setFieldsValue({modules:selectedValues});
    };

    saveIntoModifyingProject = (values)=>{
        this.props.modifyingProject.name = values.name;
        let selectedLanguages = [];
        let selectedPlatforms = [];
        values.languages.map(x=>{
            selectedLanguages = selectedLanguages.concat(
                this.props.languages.filter((item)=>{
                    return item.id == x;
                }));
        });
        values.platforms.map(x=>{
            selectedPlatforms = selectedPlatforms.concat(
                this.props.platforms.filter((item)=>{
                    return item.id == x;
                }));
        });
        this.props.modifyingProject.languages = selectedLanguages;
        this.props.modifyingProject.platforms = selectedPlatforms;
        let modules = [];
        values.modules.map(x=>{
            modules.push(x.name);
        });
        this.props.modifyingProject.modules = modules;
        this.props.modifyingProject.users = values.users;
        if(this.props.modifyingProject.createTime == null)
        {
            this.props.modifyingProject.createTime = new Date();
        }
    }

    render(){
        var component = this;
        const {getFieldDecorator} = this.props.form;
        const addButtonLayout = {
            marginLeft:10,
            width:65
        };

        const tableLayout ={
            marginTop:10
        }

        const nameColumnWidth = 200;
        const actionColumnWidth = 80;

        const itemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:8}
        };

        const trailItemLayout = {
            wrapperCol:{span:8,offset:4}
        };

        let moduleColumns = [
            {
            dataIndex:"name",
            width:nameColumnWidth
        },{
            dataIndex:"",
            width:actionColumnWidth,
            render(text,record){
                return(
                <a onClick={(e)=>{component.handleDeleteModule(record)}}>Delete</a>);
            }
        }
        ];

        let userColumns = [{
            dataIndex:"name",
            width:nameColumnWidth
        },{
            dataIndex:"",
            width:actionColumnWidth,
            render(text,record){
                return(
                <a onClick={(e)=>{component.handleDeleteUser(record)}}>Delete</a>);
            }
        }];

        let languageOptions = [];
        this.props.languages.map(x=>{
            languageOptions.push(<SelectOption key={x.id}>{x.name}</SelectOption>);
        });

        let platformOptions = [];
        this.props.platforms.map(x=>{
            platformOptions.push(<SelectOption key={x.id}>{x.name}</SelectOption>);
        });

        let title = this.props.addingMode?"Add Project":"Modify Project";

        return(
            <div>
                <h1 className="header">{title}</h1>
                <Form layout="horizontal" onSubmit={this.handlSubmit} style={tableLayout}>
                    <FormItem {...itemLayout} label="Name">
                        {
                            getFieldDecorator("name",{rules:[
                                {required:true,message:"Project name is required"}
                            ]})(
                            <Input placeholder="Please input project name"/>
                            )
                        }
                    </FormItem>
                    <FormItem {...itemLayout} label="Language">
                        {
                            getFieldDecorator("languages",{rules:[
                                {required:true,message:"Language is required",type:"array"}
                            ]})(
                                <Select mode="multiple" placeholder="Please Select">
                                    {languageOptions}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...itemLayout} label="Platform">
                        {
                            getFieldDecorator("platforms",{rules:[
                                {required:true,message:"Platform is required",type:"array"}
                            ]})(
                                <Select mode="multiple" placeholder="Please Select">
                                    {platformOptions}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...itemLayout} label="Module">
                        <Row>
                            <Col span="18">
                                <Input value={this.state.addingModule} onChange={e=>{this.setState({addingModule:e.target.value})}} />
                            </Col>
                            <Col span="4">
                                <Button onClick={this.handleAddModule} style={addButtonLayout}>Add</Button>
                            </Col>
                        </Row>
                        {
                            getFieldDecorator("modules",{valuePropName:"dataSource"})(
                                <Table columns={moduleColumns} pagination={false} size="small" style={tableLayout} showHeader={false}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...itemLayout} label="User">
                        <Row>
                            <Col span="18">
                                <Input value={this.state.addingUser} onChange={e=>this.setState({addingUser:e.target.value})}/>
                            </Col>
                            <Col span="4">
                                <Button onClick={this.handleAddUser} style={addButtonLayout}>Add</Button>
                            </Col>
                        </Row>
                        {
                            getFieldDecorator("users",{valuePropName:"dataSource"})(
                                <Table columns={userColumns} pagination={false} size="small" showHeader={false} style={tableLayout}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...trailItemLayout}>
                        {
                            getFieldDecorator("submit",{})(
                            <Button type="primary" htmlType="submit">Save</Button>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const ModifyProjectFormWrapper = Form.create(
    {
        mapPropsToFields(props){
            var modifyingProject = props.modifyingProject;

            let modules = [];
            modifyingProject.modules.map(x=>{
                modules.push({name:x});
            })

            let languages = [];
            modifyingProject.languages.forEach(item =>{
                languages.push(item.id);
            });

            let platforms = [];
            modifyingProject.platforms.forEach(item => {
                platforms.push(item.id);
            })
            return {
                name:{
                    value:modifyingProject.name
                },
                languages:{
                    value:languages
                },
                platforms:{
                    value:platforms
                },
                modules:{
                    value:modules
                },
                users:{
                    value:modifyingProject.users
                }
            }
        }
    }
)(ModifyProjectFormComponent);

function mapStateToProps(state){

    let modifyingProject = state.modifyProjectUIState.modifyingProject;
    if(modifyingProject==null) {
        modifyingProject = project();
    }

    return {
        projects:state.project.collection,
        currentProject:state.project.currentProject,
        addingMode:state.modifyProjectUIState.addingMode,
        modifyingProject:modifyingProject,
        languages:state.language,
        platforms:state.platform
    };
}

function mapDispatchToProps(dispatch){
    return {
        saveProject(project){
            dispatch(saveProject(project));
        },
        setAsCurrentProject(project){
            dispatch(setCurrentProject(project));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModifyProjectFormWrapper);
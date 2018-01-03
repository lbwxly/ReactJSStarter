import React from "react"
import ReactDOM from "react-dom"
import {Form,Button,Select,Table,Input} from "antd"
import {connect} from "react-redux"
import {resource} from "../models/model"
import {saveResource} from "../actions/action"

const FormItem = Form.Item;
const SelectOption = Select.Option;
export class ModifyResourceComponent extends React.Component {
    constructor(props){
        super(props);
        
        this.formItemLayout={
            labelCol:{span:6},
            wrapperCol:{span:14}
        };

        this.trailItemLayout = {
            wrapperCol:{span:8,offset:4}
        };
        this.moduleOptions = [];
        props.project.modules.forEach(item=>{
            this.moduleOptions.push(<SelectOption key={item}>{item}</SelectOption>);
        });

        this.platformOptions = [];
        props.project.platforms.forEach(item =>{
            this.platformOptions.push(<SelectOption key={item.id}>{item.name}</SelectOption>)
        });

        let component = this;

        this.textTableColumns = [
            {
                dataIndex:"language",
                render(text,record){
                    console.log(text);
                    let language = component.props.project.languages.filter(x=>{return x.id == record.language}).shift();
                    return (<span>{language.name}</span>);
                }
            },
            {
                dataIndex:"text",
                render(text,record){
                    return(<Input value={record.text} onChange={e =>{
                        component.handleTextChange(e,record);
                    }}/>);
                }
            }
        ];

    }

    handleTextChange = (e,record) => {
        let texts = this.props.form.getFieldValue("texts");
        let changedItems = texts.filter(x=>{return x.language == record.language});
        let changedItem = changedItems.shift();
        changedItem.text = e.target.value;

        this.props.form.setFieldsValue({"texts":texts});
    }

    handleSave = (e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((error,values)=>{
            if(error != null){
                console.log(error);
                return;
            }

            this.saveValuesToModifyResource(values);

            //TODO:save to server
            if(this.props.addingMode){
                //set the id on client before the code of calling server is done.
                this.props.modifyingResource.id = new Date().getTime();
            }
            this.props.saveResourceHandler(this.props.project.id,this.props.modifyingResource);
        });
    }

    saveValuesToModifyResource = (formValues)=> {
        this.props.modifyingResource.resourceKey = formValues.resourceKey;
        let selectedPlatform = this.props.project.platforms.filter(item=>{return item.id == formValues.platform;}).shift();
        this.props.modifyingResource.platform = selectedPlatform;
        this.props.modifyingResource.module = formValues.module;
        this.props.modifyingResource.note = formValues.note;
        formValues.texts.forEach((item)=>{
            this.props.modifyingResource.text[item.language] = item.text;
        })
    }

    render(){
        let title = this.props.addingMode?"Add Resource":"Modify Resource";
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <h1>{title}</h1>
                <Form onSubmit={this.handleSave} layout="horizontal" className="element">
                    <FormItem label="Resource Key" {...this.formItemLayout}>
                        {
                            getFieldDecorator("resourceKey",{rules:[{
                                required:true,
                                message:"Resource key is required"
                            }]})(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem label="Module" {...this.formItemLayout} required>
                        {
                            getFieldDecorator("module",{rules:[{
                                required:true,
                                message:"Module key is required"
                            }]})(
                                <Select placeholder="Please Select">
                                    {this.moduleOptions}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="Platform" {...this.formItemLayout} required>
                        {
                            getFieldDecorator("platform",{rules:[{
                                required:true,
                                message:"Platform key is required"
                            }]})(
                                <Select placeholder="Please Select">
                                    {this.platformOptions}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="Text" {...this.formItemLayout}>
                        {
                            getFieldDecorator("texts",{valuePropName:"dataSource"})(
                                <Table columns={this.textTableColumns} pagination={false} showHeader={false}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="Note" {...this.formItemLayout}>
                        {
                            getFieldDecorator("note",{})(
                                <Input/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.trailItemLayout}>
                        <Button type="primary" size="large" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

function mapPropsToFields(props){
    let modifyingResource = props.modifyingResource;
    let fields = {
        resourceKey:{
            value:modifyingResource.resourceKey
        },
        module:{
            value:modifyingResource.module
        },
        platform:{
            value:modifyingResource.platform == null ? "":modifyingResource.platform.id
        },
        note:{
            value:modifyingResource.note
        },
        texts:{
            value:[]
        }
    };

    let texts = modifyingResource.text;
    for (var key in texts) {
        if (texts.hasOwnProperty(key)) {
            var value = texts[key];
            fields.texts.value.push({language:key,text:value})
        }
    }

    return fields;
}

const ModifyResourceForm = Form.create({mapPropsToFields})(ModifyResourceComponent);

function mapStateToProps(state){
    let modifyingResource = state.modifyResourceUIState.modifyingResource;
    let project = state.project.current;
    if(modifyingResource == null){
        modifyingResource = resource();

        // setup text for each language.
        project.languages.forEach(function(element) {
            modifyingResource.text[element.id] = "";
        });
    }

    return {
        project:project,
        addingMode:state.modifyResourceUIState.addingMode,
        modifyingResource:modifyingResource
    };
}

function mapDispatchToProps(dispatch){
    return {
        saveResourceHandler(projectId,resource){
            dispatch(saveResource(projectId,resource));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModifyResourceForm);
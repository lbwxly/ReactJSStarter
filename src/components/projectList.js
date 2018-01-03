import React from "react";
import ReactDOM from "react-dom";
import {Table} from "antd"
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import {setModifyProjectState} from "../actions/action"
import {toDateTimeString} from "../helper"

export class ProjectListComponent extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        let component = this;
        const tableStyle = {
            marginTop:20,
            marginRight:20
        };
        const columns = [
            {
                title:"Name",
                dataIndex:"name"
            },
            {
                title:"Create Time",
                dataIndex:"createTime",
                render(text,record){
                    let createTime = record.createTime;
                    return(
                        <a>{toDateTimeString(createTime)}</a>
                    );
                }
            },
            {
                title:"Action",
                dataIndex:"",
                render(text,record){
                    return (
                        <Link to="/main/modifyProject"><a onClick={(e)=>{component.props.modifyProjectHandler(record)}}>Modify</a></Link>
                    );
                }
            }
        ];
        return(
            <div>
                <span>
                    <h1>Project List</h1>
                </span>
                <Table dataSource={this.props.projects}
                       columns={columns}
                       size="small" style={tableStyle}
                       pagination={false}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects:state.project.collection
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyProjectHandler(project){
            dispatch(setModifyProjectState(false,project));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectListComponent);


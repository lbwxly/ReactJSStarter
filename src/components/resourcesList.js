import React from "react";
import ReactDOM from "react-dom";
import {Table,Checkbox,Button} from "antd"

export class ResourcesListComponent extends React.Component {
    constructor(props){
        super(props);
        this.selectedRecords = new Map();
    }

    notifyChange(){
        if(this.props.onSelectedChanged != undefined && this.props.onSelectedChanged != null) {
                this.props.onSelectedChanged(this.selectedRecords);
        }
    }

    render() {
        let component = this;
        let columns = [
            {
                dataIndex:"",
                width:40,
                render(text,record){
                    return (
                        <Checkbox onChange={e=>{
                            if(e.target.checked){
                                component.selectedRecords.set(record.id,record);
                            } else {
                                component.selectedRecords.delete(record.id);
                            }

                            console.log(component.selectedRecords);
                            component.notifyChange();
                        }}/>
                    );
                }
            },
            {
                dataIndex:"",
                width:40,
                render(text,record){
                    return (
                        <Button onClick={e=>{
                            if(component.props.editRecordHandler != undefined && component.props.editRecordHandler != null) {
                                component.props.editRecordHandler(record);
                            }
                        }}>Edit</Button>
                    );
                }
            },
            {
                dataIndex:"resourceKey",
                title:"Key",
                width:120,
            },
            {
                dataIndex:"platform.name",
                title:"Platform",
                width:100
            },
            {
                dataIndex:"module",
                title:"Module",
                width:100
            }
        ];

        this.props.project.languages.forEach(function(element) {
            columns.push({
                dataIndex:"text."+element.id,
                title:element.name
            });
        });

        columns.push(
            {
                width:160,
                dataIndex:"note",
                title:"Note"
            }
        );
        
        return (
            <Table dataSource={this.props.resources} columns={columns}/>
        );
    }
}
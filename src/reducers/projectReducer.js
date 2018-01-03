import {SET_CURRENT_PROJECT,SET_PROJECT_LIST,SAVE_PROJECT,LOG_OUT} from "../actions/action"

//const initialState = {current:{id:"1",name:"Test Project",languages:[{id:1,name:"eng"},{id:2,name:"中文"}],platforms:[{id:1,name:"iOS"}],modules:["chat"]},collection:[]};
const initialState = {current:null,collection:[]};
export function project(state=initialState,action){
    switch(action.type){
        case SET_CURRENT_PROJECT:
            return {current:action.project,collection:state.collection};
        case SET_PROJECT_LIST:
            return {current:state.project, collection:action.collection};
        case SAVE_PROJECT:
            return {current:state.project, collection:saveProjectIntoCollection(action.project,state.collection)};
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

function saveProjectIntoCollection(project,collection) {
    if(collection==null||collection.length == 0){
        return [project];
    }

    var newCollection = [];
    collection.map((item)=>{
        if(item.id == project.id){
            newCollection.push(project);
        } else {
            newCollection.push(item);
        }
    })

    return newCollection;
}
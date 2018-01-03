import {SAVE_RESOURCE,LOG_OUT} from "../actions/action"
import {notEmpty} from "../helper"

const initialState = new Map();

export function resource(state = initialState,action){
    switch(action.type){
        case SAVE_RESOURCE:
            return saveResourceForProject(action.projectId,state,action.resource);
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

function saveResourceForProject(projectId,resourceCollection,resource){
    let newCollection = new Map();
    let projectResources = [];
    resourceCollection.forEach(function(value,key,map) {
        if(key != projectId){
            newCollection.set(projectId,value);
        } else {
            projectResources = value;
        }
    });
    
    let newProjectResources = [];
    if(projectResources.length == 0){
        newProjectResources.push(resource);
    } else {
        projectResources.forEach(item=>{
            if((notEmpty(item.id) && item.id == resource.id) || (!notEmpty(item.id)&&item.clientId == resource.clientId)) {
                newProjectResources.push(resource);
            } else {
                newProjectResources.push(item);
            }
        });
    }

    newCollection.set(projectId,newProjectResources);

    return newCollection;
}
import {SET_MODIFY_RESOURCE_STATE,LOG_OUT} from "../actions/action"

const initialState = {addingMode:true,modifyingResource:null};
export function modifyResourceUIState(state,action) {
    switch(action.type){
        case SET_MODIFY_RESOURCE_STATE:
            return {addingMode:action.addingMode,modifyingResource:action.modifyingResource};
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
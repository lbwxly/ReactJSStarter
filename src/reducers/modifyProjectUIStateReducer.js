import {SET_MODIFY_PROJECT_STATE,LOG_OUT} from "../actions/action"

const initialState = {addingMode:true,modifyingProject:null};

export function modifyProjectUIState(state={addingMode:true,modifyingProject:null},action) {
    switch(action.type){
        case SET_MODIFY_PROJECT_STATE:
            return {addingMode:action.addingMode,modifyingProject:action.modifyingProject};
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
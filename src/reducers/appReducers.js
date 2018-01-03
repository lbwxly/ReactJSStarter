import {combineReducers} from "redux"
import {user} from "./user"
import {project} from "./projectReducer.js"
import {resource} from "./resourceReducer.js"
import {modifyProjectUIState} from "./modifyProjectUIStateReducer.js"
import {modifyResourceUIState} from "./modifyResourceUIStateReducer.js"
import {language} from "./languageReducer.js"
import {platform} from "./platformReducer.js"
import {LOG_OUT} from "../actions/action"

//  state structure
//  state
//  {
//    user   :{ logined,loginedUser:{userName} },
//    project:{ current:{id:1,name:xxx},collection:[{id:1,name:xxx},{id:2,name:xxx}]},
//    resource:["1":[{id:1,resourceKey:"chat_title",text:{1:"chat",2:"聊天"},note:"module name"}]]
//    modifyProjectUIState:{addingMode:true,modifyingProject:{id:1,name:xxx}}
//    modifyResourceUIState:{addingMode:true,modifyingResource:{id}}
//    language:[{id:xxx,name:xxx}]
//    platform:[{id:xxx,name:xxx}]
//  }

//const appReducers = combineReducers({user,project,modifyProjectUIState});
const initialState = {};

export default function appReducers(state=initialState,action) {
    // if(action.type == LOG_OUT){
    //     return {
    //         user:user(state.user,action)
    //     };
    // }

    // this function will be called
    // 1. with initialize action when createStore is called to initialized the whole data model tree.(state parameter is initialState)
    // 2. when the dispatch function of redux is called(the state parameter is current state tree, and the action is the one passed to dispatch method)
    //    in this case, the reducers need to construct new state object according to current state object and the action.
    return {
        user:user(state.user,action),
        project:project(state.project,action),
        resource:resource(state.resource,action),
        modifyProjectUIState:modifyProjectUIState(state.modifyProjectUIState,action),
        modifyResourceUIState:modifyResourceUIState(state.modifyResourceUIState,action),
        language:language(state.language,action),
        platform:platform(state.platform,action),
    };
}
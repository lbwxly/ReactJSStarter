import {INIT_LANGUAGE} from "../actions/action"
const initLanguages = [{id:1,name:"English"},{id:2,name:"Chinese"}]

export function language(state=initLanguages,action){
    switch(action.type){
        case INIT_LANGUAGE:
            return action.languages;
        default:
            return state;
    }
}
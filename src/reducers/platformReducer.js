import {INIT_PLATFORM} from "../actions/action"
const initPlatform = [{id:1,name:"iOS"},{id:2,name:"Android"},{id:3,name:"Web"}]

export function platform(state=initPlatform,action){
    switch(action.type){
        case INIT_PLATFORM:
            return action.platforms;
        default:
            return state;
    }
}
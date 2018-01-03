import {SET_LOGIN_USER,LOG_OUT} from "../actions/action";

const initialState = {logined:false,loginedUser:null};
export function user(state=initialState,action){
    switch(action.type){
        case SET_LOGIN_USER:
             {
                 return {logined:true,loginedUser:action.user};
             }
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}
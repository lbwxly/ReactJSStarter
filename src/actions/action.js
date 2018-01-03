export const SET_LOGIN_USER = 'Login';
export const LOG_OUT = 'Logout';

// User

export function setLoginUser(user){
    return {type:SET_LOGIN_USER, user:user};
}

export function logout(){
    return {type:LOG_OUT}
}

// Project

export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const SET_PROJECT_LIST = "SET_PROJECT_LIST";
export const SAVE_PROJECT = "SAVE_PROJECT";

export function setCurrentProject(project){
    return {type:SET_CURRENT_PROJECT,project:project};
}

export function setProjectList(projects){
    return {type:SET_PROJECT_LIST,collection:projects};
}

export function saveProject(project){
    return {type:SAVE_PROJECT,project:project};
}

// Platform
export const INIT_PLATFORM = "INIT_PLATFORM";
export function initPlatform(platforms){
    return {type:INIT_PLATFORM,platforms:platforms};
}

// Language
export const INIT_LANGUAGE = "INIT_LANGUAGE";
export function initLanguage(languages){
    return {type:INIT_LANGUAGE,languages:languages};
}

// Language

// Modify Project UI State
export const SET_MODIFY_PROJECT_STATE = "SET_MODIFY_PROJECT_STATE";

export function setModifyProjectState(addingMode,modifyingProject){
    return {type:SET_MODIFY_PROJECT_STATE,addingMode:addingMode,modifyingProject:modifyingProject};
}

// Modify Resource UI State
export const SET_MODIFY_RESOURCE_STATE = "SET_MODIFY_PROJECT_STATE";

export function setModifyResourceState(addingMode,modifyResource){
    return {type:SET_MODIFY_RESOURCE_STATE,addingMode:addingMode,modifyingResource:modifyResource};
}

// Resources
export const SAVE_RESOURCE = "SAVE_RESOURCE";
export function saveResource(projectId,resource){
    return {type:SAVE_RESOURCE,projectId:projectId,resource:resource};
}
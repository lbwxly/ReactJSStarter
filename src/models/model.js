
//language
export function language(_id="",_name="",_clientId=new Date().getTime())
{
    let language = {
        id:_id,
        name : _name,
        clientId : _clientId
    };

    return language;
}

//platform
export function platform(id="",name="",clientId=new Date().getTime())
{
    return {
        id:id,
        name:name,
        clientId:clientId
    };    
}

//user
export function user(id="",name="",clientId=new Date().getTime())
{
    return {
        id:id,
        name:name,
        clientId:clientId
    };
}

//project
export function project(){
    return {
        id  :"",
        name:"",
        platforms:[],
        languages:[],
        modules:[],
        users:[],
        createTime:null
    };
}

//resource
export function resource(){
    return {
        id:"",
        resourceKey:"",
        module:"",
        platform:null,
        note:"",
        text:{
            
        }
    };
}
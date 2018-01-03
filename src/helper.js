export function notEmpty(value)
{
    return value !== 'undefine' && value != null && value != "";
}

export function toDateTimeString(date){
    return date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
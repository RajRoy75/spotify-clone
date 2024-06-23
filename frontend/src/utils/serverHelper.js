import { backendUrl } from "./config";
export const makeUnAuthenticatePOSTrequest = async (route, body) =>{
    const response = await fetch(backendUrl + route, {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(body),
    })
    const formatedResponse = await response.json();
    return formatedResponse;
}

export const makeAuthenticatePOSTrequest = async (route, body) =>{
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    const formatedResponse = await response.json();
    return formatedResponse;
}
export const makeAuthenticateGETrequest = async (route) =>{
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method:'GET',
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    const formatedResponse = await response.json();
    return formatedResponse;
}
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
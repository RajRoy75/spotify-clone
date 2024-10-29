import { backendUrl } from "./config";
import { auth } from "./firebase";
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
            "Content-Type" : "application/json"
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
export const getToken = async() => {
    const user = auth.currentUser; // Get the current authenticated user

  if (user) {
    try {
      const token = await user.getIdToken(); // Fetch the user's ID token
      return token;
    } catch (error) {
    //   console.error("Error getting token:", error);
      throw error;
    }
  } else {
    // throw new Error("No user is authenticated");
    return false;
  }
};
// const accessToken = document.cookie.replace(
//     /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
//     "$1"
// );
// return accessToken;
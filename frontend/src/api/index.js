import { auth } from "../utils/firebase";
import { makeAuthenticateGETrequest } from "../utils/serverHelper";

export const getUserDetail = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
            if (userCred) {
                try {
                    // const userData = userCred.providerData[0];
                    const currentUser = auth.currentUser;
                    const id = currentUser.uid;
                    const url = `http://localhost:8000/auth/user/${id}`;
                    // console.log(currentUser);
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const user = await response.json();
                    resolve(user)
                } catch (error) {
                    reject(error);
                }

            } else {
                reject(new Error("User is not authenticated"));
            }
            unsubscribe();
        })
    })
}

export const getUserPlaylist = async() => {
    try {
        const currentUser = auth.currentUser;
        const id = currentUser?.uid;

        if (!id) {
            throw new Error("User is not authenticated");
        }

        const response = await makeAuthenticateGETrequest(`/playlist/get/artist/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching user playlist:", error);
        throw error; // Propagate the error for React Query to handle
    }
}


export const fetchSearchResults = async ({ queryKey }) => {
  const [_, query] = queryKey;
  const response = await fetch(`http://localhost:8000/song/search?query=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};


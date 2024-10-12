import { auth } from "../utils/firebase";

export const getUserDetail = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
            if (userCred) {
                try {
                    const userData = userCred.providerData[0];
                    const currentUser = auth.currentUser;
                    const id = currentUser.uid;
                    const url = `http://localhost:8000/auth/user/${id}`;
                    console.log(id);
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
import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { FaSpotify } from "react-icons/fa";
import InputField from '../components/shared/InputField';
import PasswordField from '../components/shared/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { makeUnAuthenticatePOSTrequest } from '../utils/serverHelper';
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, getAuth} from "firebase/auth";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookie, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const signin = async ()=>{

        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        auth.currentUser.getIdToken().then((token) => {
            fetch('http://localhost:8000/auth/protected', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
          });
        navigate('/');
        console.log("Logged in: ", userCredential.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
        // const data = {email, password};
    
        // const response = await makeUnAuthenticatePOSTrequest('/auth/login', data);
        // if(response && !response.error){
        //     console.log(response);
        //     const token = response.token;
        //     const date = new Date();
        //     date.setDate(date.getDate() + 30)
        //     setCookie('token', token, {path:'/',expires:date})
        //     navigate('/')
        // }else{
        //     alert('failure');
        // }
    }

    return (
        <div className="login w-full h-full flex flex-col items-center font-poppins">
            <IconContext.Provider value={{ color: "#1db954" }}>
                <div className="logo w-full py-8 flex justify-center border-b-2">
                    <Link to={'/'}>
                        <FaSpotify size={60} />
                    </Link>
                    <Link to={'/'}>
                        <h2 className='text-5xl font-semibold pt-1 font-sans ml-2 text-[#1db954]'>Spotify</h2>
                    </Link>
                </div>
            </IconContext.Provider>
            <div className="inputArea w-1/3 mt-6">
                <div className='font-bold mb-7 '>
                    To continue, Login to Spotify
                </div>
                <InputField
                    label="Email Id or Username"
                    placeholder="Email Id or Username"  
                    value={email}
                    setValue={setEmail}
                />

                <PasswordField
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
                <div className=' w-full flex justify-end mt-6 items-center'>
                    <button className='bg-[#1db954] p-4 px-8 font-semibold rounded-full' onClick={(e)=>{e.preventDefault();signin()}}>LOG IN</button>
                </div>
                <div className='border-2 mt-8 rounded'></div>
                <div className='my-8 font-bold text-lg'>Don't have an account</div>
                <Link to={'/signup'}>
                    <div className='w-full flex items-center justify-center py-4 border-2 border-grey-500 rounded-full text-lg font-semibold text-gray-500'>SIGN UP FOR SPOTIFY</div>
                </Link>
            </div>

        </div>
    )
}

export default Login
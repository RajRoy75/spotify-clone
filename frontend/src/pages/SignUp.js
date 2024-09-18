import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { FaSpotify } from "react-icons/fa";
import InputField from '../components/shared/InputField';
import PasswordField from '../components/shared/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnAuthenticatePOSTrequest } from '../utils/serverHelper';
import {useCookies} from 'react-cookie';
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cookie, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    
    
    const register = async ()=>{

        const data = {email, confirmEmail, userName, password, firstName, lastName};
        if(confirmEmail !== email){
            alert('email does not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const response = await makeUnAuthenticatePOSTrequest('/auth/register', data);
        if(response && !response.error){
            console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie('token', token, {path:'/',expires:date});
        }else{
            alert('failure');
        }
        navigate('/');
        console.log("Signed up: ", userCredential.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
        
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
                <div className='font-bold mb-10 text-2xl'>
                    Sign up for free to start listening.
                </div>
                <InputField
                    label="Email address"
                    placeholder="Enter your email"
                    value={email}
                    setValue={setEmail}
                />
                <InputField
                    label="Confirm Email address"
                    placeholder="Enter your email again"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                />
                <InputField
                    label="User Name"
                    placeholder="Enter an Username"
                    value={userName}
                    setValue={setUserName}
                />

                <PasswordField
                    label="Create password"
                    placeholder="Enter a strong password"
                    value={password}
                    setValue={setPassword}
                />
                <div className='w-full flex justify-between items-center space-x-8'>
                <InputField
                    label="First Name"
                    placeholder="Enter your first name"
                    value={firstName}
                    setValue={setFirstName}
                />
                <InputField
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={lastName}
                    setValue={setLastName}
                />
                </div>
                
                <div className=' w-full flex justify-center mt-6 items-center'>
                    <button className='bg-[#1db954] p-4 px-8 font-semibold rounded-full' onClick={(e)=>{e.preventDefault();register();}}>SIGN UP</button>
                </div>
                <div className='border-2 mt-8 rounded'></div>
                <div className='my-8 font-bold text-lg'>Already have an account</div>
                <Link to={'/login'}>
                    <div className='w-full flex items-center justify-center py-4 border-2 border-grey-500 rounded-full text-lg font-semibold text-gray-500'>Login instead</div>
                </Link>
            </div>

        </div>
    )
}

export default SignUp
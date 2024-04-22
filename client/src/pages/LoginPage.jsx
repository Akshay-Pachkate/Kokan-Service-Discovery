/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import {  UserContext } from "../context/UserContext";
import {enqueueSnackbar} from "notistack"



const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {setUser} = useContext(UserContext);

  const handleOnLogin = async (event) => {

    try{
      event.preventDefault();
      const {data} = await axios.post("/login", {email, password});
      // console.log(response);
      setUser(data);
      setIsLoggedIn(true);
      enqueueSnackbar("Logged In", {variant: 'success'})
    }catch(error){
      enqueueSnackbar("Login Failed", {variant: 'error'})
    }

  }

  if(isLoggedIn){
    return <Navigate to="/" />
  }

  return (
    
    <div className="max-w-md text-center flex flex-col mx-auto items-center justify-center grow">
        <div className="mb-56 ">
        <h1 className="text-4xl my-4">Login</h1>
        <form className="mx-auto my-0 px-3 pt-3" onSubmit={handleOnLogin}>
            <input type="email" placeholder="your@email.com" onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
            <button className="primary mb-0">Login</button>
        </form>
        <div className="text-gray-500  text-sm">
            <p>Don't have a account yet? <Link to={"/register"} className="underline text-black">Register now</Link></p>
        </div>
        </div>
    </div>
    
  )
}

export default LoginPage
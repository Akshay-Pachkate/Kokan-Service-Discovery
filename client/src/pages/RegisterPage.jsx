/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";


const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  if(redirect){
    return <Navigate to={"/login"}/>;
  }

  const registerUser = async (event) => {
    try{
        event.preventDefault();
        await axios.post("/register", {name, email, password});
        setRedirect(true);
        alert("Registration complete");
    }catch(error){
        console.log(error);
        alert("Registration Failed")
    }
  }


  return (
    <div className="max-w-md text-center flex flex-col mx-auto items-center justify-center grow">
      <div className="mb-56 ">
        <h1 className="text-4xl my-4">Register</h1>
        <form className="mx-auto my-0 px-3 pt-3" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input 
            type="email" 
            placeholder="your@email.com" 
            onChange={(event) => setEmail(event.target.value)}
            />
          <input 
            type="password" 
            placeholder="password" 
            onChange={(event) => setPassword(event.target.value)}
            />
          <button className="primary mb-0">Register</button>
        </form>
        <div className="text-gray-500  text-sm">
          <p>
            Already member?{" "}
            <Link to={"/login"} className="underline text-black">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

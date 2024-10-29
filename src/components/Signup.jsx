import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth, db} from "../firebase";
import {setDoc, doc} from "firebase/firestore";

const Signup = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
           await createUserWithEmailAndPassword(auth, email, password)
           const user = auth.currentUser;
           console.log(user);
           if(user){
            await setDoc(doc(db, "Users", user.uid), {
            email : user.email,
            username : username,
           });
        }
           console.log("User registered successfully");
        } catch (error) {
            console.log(error.message);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-black to-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Create an account</h2>
        <p className="text-gray-600 mb-6">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Log in</Link>
        </p>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">User name</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your user name"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Use 8 or more characters with a mix of letters, numbers & symbols</p>
          </div>
          
          <div className="mb-6">
            <Link to="/login"><button 
              type="submit" 
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create an account
            </button></Link>
          </div>
          
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our <a href="#" className="text-blue-600">Terms of use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

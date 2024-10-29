import React from 'react'
import {auth} from "../firebase";

const Navbar = () => {

    async function handleLogout(){
        try{
            await auth.signOut();
            window.location.href = "/login";
            console.log("User logged out successfully");
        } catch(error){
            console.log(error.message);
        }
    };

  return (
    <div className='min-w-screen flex justify-between items-center p-4 bg-black text-white'>
        <div className='text-2xl font-bold'>ChatRoom</div>
        <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Navbar
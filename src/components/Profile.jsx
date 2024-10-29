import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Navbar from './Navbar';
import Chat from './Chat';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [room, setRoom] = useState("");
  const [isInChat, setIsInChat] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.error("User data not found in Firestore");
        }
      } else {
        console.log("User not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full mx-auto">
      <Navbar />

      {userDetails ? (
        <>
          <h3 className="text-2xl font-bold my-4 px-5">
            Welcome {userDetails.username}!!
          </h3>

          {!isInChat ? (
            <div className="room-form px-5">
              <label className="block text-lg font-medium mb-2">
                Type room name:
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full mb-4"
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
              />
              <button
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (room.trim()) setIsInChat(true);
                }}
              >
                Enter Chat
              </button>
            </div>
          ) : (
            <Chat room={room} />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

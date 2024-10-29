import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("Anonymous");

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "Users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || "Anonymous");
        }
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage.trim() === "") return;

    await addDoc(messagesRef, {
      text: newMessage.trim(),
      createdAt: serverTimestamp(),
      user: username,
      room,
    });

    setNewMessage(""); 
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="w-full max-w-2xl">
        <div className="bg-white text-black border-2 border-blue-900 text-center py-3 rounded-md mb-4">
          <h1 className="text-xl font-semibold">You are in the {room} chatroom</h1>
        </div>
        <div className="bg-blue-900 p-4 rounded-md shadow-md overflow-y-auto h-[400px] mb-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.user === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.user === username
                      ? "bg-blue-700 text-white rounded-br-none"
                      : "bg-white text-black rounded-bl-none shadow"
                  }`}
                >
                  <span className="mb-1 font-medium">
                    {message.user === username ? "You" : message.user} : 
                  </span> {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="flex-1 p-2 border-2 border-blue-900 rounded-l-md focus:outline-none"
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

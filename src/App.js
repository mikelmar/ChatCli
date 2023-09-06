import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [user] = useAuthState(auth);
  const [userBanned, setUserBanned] = useState(false);

  useEffect(() => {
    const checkUserBannedStatus = async () => {
      if (user) {
        const userRef = doc(db, "users", user.displayName);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const { banned } = userDoc.data();
          setUserBanned(banned);
        }
      }
    };

    checkUserBannedStatus();
  }, [user]);

  const onChatItemClick = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Navbar currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {user && !userBanned && (
          <div style={{ flex: 1 }}>
            <ChatList currentChatId={currentChatId} onChatItemClick={onChatItemClick} />
          </div>
        )}
        {currentChatId && (
          <div style={{ flex: 3, height: "90%", overflow: "auto" }}>
            <Chat currentChatId={currentChatId} />
          </div>
        )}
      </div>
      {user && userBanned && (
        <div>
          <h1>¡Estás baneado! No puedes acceder a la lista de chats ni enviar mensajes.</h1>
        </div>
      )}
    </div>
  );
};

export default App;


/*
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [user] = useAuthState(auth); // Obtén el estado del usuario logueado
  const [userBanned, setUserBanned] = useState(false); // Nuevo estado para comprobar si el usuario está baneado

  useEffect(() => {
    const checkUserBannedStatus = async () => {
      if (user) {
        const userRef = doc(db, "users", user.displayName);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const { banned } = userDoc.data();
          setUserBanned(banned);
        }
      }
    };

    checkUserBannedStatus();
  }, [user]);

  const onChatItemClick = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div style={{ maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}>
      <Navbar currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
      {user && !userBanned && ( // Renderiza ChatPage solo si hay un usuario logueado y no está baneado
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ flex: 1 }}>
            <ChatList
              currentChatId={currentChatId}
              onChatItemClick={onChatItemClick}
            />
          </div>
          <div style={{ flex: 3, height: "90%", overflow: "auto" }}>
            {currentChatId && <Chat currentChatId={currentChatId} />}
          </div>
        </div>
      )}
      {user && userBanned && ( // Mostrar mensaje si el usuario está baneado
        <div>
          <h1>¡Estás baneado! No puedes acceder a la lista de chats ni enviar mensajes.</h1>
          </div>
          )}
        </div>
      );
    };
    
    export default App;
    */
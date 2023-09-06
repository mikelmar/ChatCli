import React, { useState } from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";

const ChatPage = ({ chats }) => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const onChatItemClick = (chatId, chatName) => {
    setCurrentChatId(chatId);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ChatList chats={chats} currentChatId={currentChatId} onChatItemClick={onChatItemClick} />
      </div>
      <div style={{ flex: 3, height: '80%', overflow: 'auto' }}>
        {currentChatId && <Chat currentChatId={currentChatId} />}
      </div>
    </div>
  );
};

export default ChatPage;

/*
import React, { useState } from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";

const ChatPage = ({ chats }) => {
  const [currentChatId, setCurrentChatId] = useState(null);

  const onChatItemClick = (chatId, chatName) => {
    setCurrentChatId(chatId);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ChatList chats={chats} currentChatId={currentChatId} onChatItemClick={onChatItemClick} />
      </div>
      <div style={{ flex: 3, height: '80%', overflow: 'auto' }}>
        {currentChatId && <Chat currentChatId={currentChatId} />}
      </div>
    </div>
  );
};

export default ChatPage;
*/
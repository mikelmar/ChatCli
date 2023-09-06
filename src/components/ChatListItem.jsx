import React from "react";

const style = {
  chatItem: {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
  selected: {
    backgroundColor: "lightblue",
  },
};

const ChatListItem = ({ name, onClick, isSelected }) => {
  const backgroundColor = isSelected ? style.selected.backgroundColor : "white";

  return (
    <div
      onClick={onClick}
      style={{ ...style.chatItem, backgroundColor }}
    >
      {name}
    </div>
  );
};

export default ChatListItem;


/*
import React from "react";

const ChatListItem = ({ name, onClick, isSelected }) => {
  const backgroundColor = isSelected ? "lightblue" : "white";
  return <div onClick={onClick} style={{ backgroundColor }}>{name}</div>;
};

export default ChatListItem;
*/


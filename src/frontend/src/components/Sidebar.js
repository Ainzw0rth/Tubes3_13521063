import React from "react";
import "./Sidebar.css";

export const Sidebar = ({
  setCurrentMessage,
  setMessages,
  setCurrentChatTitle,
  previousChat,
}) => {
  const newChat = () => {
    setCurrentMessage("");
    setMessages([]);
    setCurrentChatTitle(null);
  };

  const uniqueTitles = Array.from(
    new Set(previousChat.map((prevChat) => prevChat.title))
  );

  const handleClick = (uniqueTitle) => {
    setCurrentChatTitle(uniqueTitle);
    setMessages(null);
    setCurrentMessage("");
  };

  return (
    <section className="sidebar">
      <button className="newchat" onClick={newChat}>
        + New Chat
      </button>
      <ul className="historylist">
        {uniqueTitles?.map((uniqueTitle, index) => (
          <li key={index} onClick={() => handleClick(uniqueTitle)}>
            <div>
              {uniqueTitle}
            </div>
          </li>
        ))}
      </ul>
      <button className="kmpbutton">KMP</button>
      <button className="bmbutton">BM</button>
    </section>
  );
};

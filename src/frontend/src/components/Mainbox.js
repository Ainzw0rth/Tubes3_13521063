import React, { useEffect, useRef } from "react";
import "./Mainbox.css";
import axios from "axios";

export const Mainbox = ({
  messages,
  setMessages,
  currentMessage,
  setCurrentMessage,
  previousChat,
  currentChatTitle,
  emptyForm,
  setResponse,
}) => {
  function handleInputChange(event) {
    setCurrentMessage(event.target.value);
  }

  function userInput(){
    return (
      <li>
        <div>
          <p>{currentMessage}</p>
        </div>
      </li>
    )
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    userInput();
    // if (currentMessage !== "") {
    //   setMessages([...messages, currentMessage]);
    // }
    console.log(currentMessage);
    axios
      .post("http://localhost:4000/chats/answer", { message: currentMessage })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
        // Lakukan sesuatu dengan data response
      })
      .catch((error) => {
        console.error(error);
        // Lakukan sesuatu dengan error
      });
  }

  const currentChat = previousChat.filter(
    (previousChat) => previousChat.title === currentChatTitle
  );

  const ref = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages is added
    const element = ref.current;
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 0);
    // element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <section className="main">
      <ul className="chat" ref={ref}>

        {currentChat.map((message, index) => (
          <li key={index} className={message.role}>
            <div className="chat-container">
              <p>{message.value}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="input">
        <div className="input-container">
          <form className="prompt" onSubmit={handleFormSubmit}>
            <input
              ref={emptyForm}
              type="text"
              onChange={handleInputChange}
              placeholder="Type your message"
            ></input>
          </form>
        </div>
      </div>
    </section>
  );
};

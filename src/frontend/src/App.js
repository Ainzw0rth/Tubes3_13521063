import "./App.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import gpt from "./resources/ChatGPT.png";
import saul from "./resources/saul.jpg";

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [previousChat, setPreviousChat] = useState([]);
  const [currentChatTitle, setCurrentChatTitle] = useState(null);
  const [algoButton, setAlgoButton] = useState(null);

  const emptyForm = useRef(null);

  useEffect(() => {
    // Empty the form input
    const empty = emptyForm.current;
    empty.value = "";
  }, [messages]);

  useEffect(() => {
    if (!currentChatTitle && currentMessage && messages) {
      setCurrentChatTitle(currentMessage);
    }
    if (currentChatTitle && currentMessage && messages) {
      setPreviousChat((prevChat) => [
        ...prevChat,
        {
          title: currentChatTitle,
          role: "user",
          value: currentMessage,
        },
        {
          title: currentChatTitle,
          role: messages.role,
          value: messages,
        },
      ]);
    }
  }, [messages, currentChatTitle]);

  // SideBar
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

  // MainBox
  function handleInputChange(event) {
    setCurrentMessage(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // if (currentMessage !== "") {
    //   setMessages([...messages, currentMessage]);
    // }
    console.log(currentMessage);
    console.log("BUTTON:", algoButton);
    axios
      .post("http://localhost:4000/chats/answer", {
        message: currentMessage,
        useKMP: algoButton,
      })
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

  function kmpClick() {
    setAlgoButton(true);
  }

  function bmClick() {
    setAlgoButton(false);
  }

  return (
    <div className="App">
      <section className="sidebar">
        <button className="newchat" onClick={newChat}>
          + New Chat
        </button>
        <ul className="historylist">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              <div>{uniqueTitle}</div>
            </li>
          ))}
        </ul>
        <div className="algorithm-button">
          <button className="kmpbutton" onClick={kmpClick}>
            KMP
          </button>
          <button className="bmbutton" onClick={bmClick}>
            BM
          </button>
        </div>
      </section>
      <section className="main">
        <ul className="chat" ref={ref}>
          {currentChat.map((message, index) => (
            <li key={index} className={message.role}>
              <div className="img-container">
                <img
                  src={message.role === "user" ? saul : gpt}
                  className="imagelogo"
                />
              </div>
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
    </div>
  );
}

export default App;

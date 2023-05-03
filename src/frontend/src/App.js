import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { Mainbox } from "./components/Mainbox";

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [previousChat, setPreviousChat] = useState([]);
  const [currentChatTitle, setCurrentChatTitle] = useState(null);

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
          value: messages.content,
        },
      ]);
    }
  }, [messages, currentChatTitle]);

  return (
    <div className="App">
      <Sidebar
        setCurrentMessage={setCurrentMessage}
        setMessages={setMessages}
        setCurrentChatTitle={setCurrentChatTitle}
        previousChat={previousChat}
      />
      <Mainbox
        messages={messages}
        setMessages={setMessages}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        previousChat={previousChat}
        currentChatTitle={currentChatTitle}
        emptyForm={emptyForm}
      />
    </div>
  );
}

export default App;

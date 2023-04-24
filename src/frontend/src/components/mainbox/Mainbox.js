import { useState, useEffect, useRef } from 'react';
import './mainbox.css'
import React from 'react'

const Mainbox = () => {
    const [messages, setMessages] = useState([""]);
    const [currentMessage, setCurrentMessage] = useState('');
    const ref = useRef(null);

    function handleInputChange (event) {
        setCurrentMessage(event.target.value);
    };
    
    function handleFormSubmit(event) {
        console.log(event.target.value);
        event.preventDefault();
        if(currentMessage !== ''){
          setMessages([...messages, currentMessage]);
        }
        console.log(messages);
        setCurrentMessage('');
    };

    function MessageBubble(props) {
        if(props.message !== "" ){
          return (
              props.isCurrentUser ?
              <div key={props.key} className='chats-column' style={{justifyContent: 'left'}}>
              <div className='bubblechat'>
                  {props.message}
              </div>
              </div>
              :
              <div className='chats-column'>
              <div className='bubblechat'>
                  {props.message}
              </div>
              </div>
          );
        }
    }

    const messageBubbles = messages.map((message, index) => (
        <MessageBubble
        key={index}
        message={message}
        isCurrentUser={index % 2 === 0}
        />
    ));

    useEffect(() => { // Scroll to bottom when messages is added
        const element = ref.current;
        element.scrollTop = element.scrollHeight;
      }, [messages]);

  return (
    <div className='mainbox'>
        <div className='chatheader'>
          ChatGPT KW
        </div>
        <div className='chatbox' ref={ref} id="cbox">
          {
            messageBubbles
          }
        </div>
        <div className='inputchat'>
          <form className='prompt' onSubmit={handleFormSubmit}>
            <input type='text' value={currentMessage}  onChange={handleInputChange} placeholder='Type your message'>
            </input>
          </form>
        </div>
      </div>
  )
}
export default Mainbox;
import React, { useEffect, useState } from 'react';
import './Chats.scss';
import ChatHeader from './Components/ChatHeader/ChatHeader';
import ChatFooter from './Components/ChatFooter/ChatFooter';
import ChatWidget from './Components/ChatWidget/ChatWidget';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const meResp = "Open-licensed SVG Vector and Icons ?";
const youResp = "Search, explore and edit the best-fitting free icons or vectors for your projects using a wide variety vector library. Download free SVG vectors and icons for commercial use."

export default function Chats(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      console.log("data-----", data)
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect(); // Cleanup on component unmount
    };
  }, []);

  const sendMessage = () => {
    console.log("input", input)
    if (input.trim()) {
      socket.emit('message', input); // Send message to the server
      setInput(''); // Clear input
    }
  };

  return (
    <>
      <div className='chatWrapper'>
        <section>
          <ChatHeader/>
        </section>
        <section className='chatBody'>
        {
          messages ? <ChatWidget chatFor="ME" data={messages} /> : null
        }
         
          <ChatWidget data={youResp}/>
        </section>
        <section>
          <ChatFooter input={input} setInput={setInput} sendMessage={sendMessage} isRightSectionCollapsed={props.isRightSectionCollapsed}/>
        </section>
      </div>
    </>
  )
}

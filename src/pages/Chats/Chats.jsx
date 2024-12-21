import React, { useEffect, useRef, useState } from 'react';
import './Chats.scss';
import ChatHeader from './Components/ChatHeader/ChatHeader';
import ChatFooter from './Components/ChatFooter/ChatFooter';
import ChatWidget from './Components/ChatWidget/ChatWidget';
import { io } from 'socket.io-client';
import LineChart from '../../Components/Charts/LineChart.js/LineChart';
import ChecklistCard from '../../Components/Cards/ChecklistCard';
import CodeCard from '../../Components/Cards/CodeCard';
import BasicCard from '../../Components/Cards/BasicCard';
import HashLoaderComponent from '../../Common/Loader/HashLoaderComponent';

const socket = io('http://localhost:5000'); // Replace with your server URL

const meResp = "Open-licensed SVG Vector and Icons ?";
const youResp = "Search, explore and edit the best-fitting free icons or vectors for your projects using a wide variety vector library. Download free SVG vectors and icons for commercial use."



const ChatWidgetRenderer = (props) => {
  const { data } = props;
  switch (data?.answer_type) {
    case 'checklist':
      return <ChatWidget data={youResp}>
        <ChecklistCard data={data.answer.data} widgetType='chat' />
      </ChatWidget>
    case 'summary':
      return <ChatWidget data={youResp}>
        <BasicCard data={data.answer.data}/>
      </ChatWidget>
    case 'code':
      return <ChatWidget data={youResp}>
        <CodeCard data={data.answer.data} />
      </ChatWidget>
    case 'graph':
      return <ChatWidget data={youResp}>
        <LineChart data={data.answer.data} widgetType='chat' />
      </ChatWidget>
    default:
      break;
  } 
}


export default function Chats(props) {
  const [messages, setMessages] = useState([]);
  const [chatWidgets, setChatWidgets] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const renderOneByOneWidgets = (respData) =>{
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= respData.data.length-1) {
        clearInterval(intervalId);
      }
      setChatWidgets((prevState) => [...prevState, respData.data[count-1] ])
      count++;
    }, 2000);
  }


  const sendMessage = () => {
    console.log("input", input)
    if (input.trim()) {
      socket.emit('message', input);
      setLoading(true);
    }
    setInput('');
    setChatWidgets([])
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [data.msg]);
      renderOneByOneWidgets(data.widgets)
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (loading && chatWidgets.length==1){
      setLoading(false)
    }
  }, [chatWidgets.length])
  
 

  return (
    <>
      <div className='chatWrapper'>
        <section>
          <ChatHeader/>
        </section>
        <section className='chatBody' ref={chatContainerRef}>
        
        {
          messages ? <ChatWidget chatFor="ME" data={messages} /> : null
        }
        {
          loading ? <HashLoaderComponent size={60} loading={loading}/> : null
        }
          {
            chatWidgets.map((_chat, index) => {
              return <React.Fragment key={index}>
                <ChatWidgetRenderer data={_chat} />
              </React.Fragment>
            })
          }
        </section>
        <section>
          <ChatFooter
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isRightSectionCollapsed={props.isRightSectionCollapsed}
            loading={loading}
          />
        </section>
      </div>
    </>
  )
}

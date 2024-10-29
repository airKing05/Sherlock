import React from 'react';
import './Chats.scss';
import ChatHeader from './Components/ChatHeader/ChatHeader';
import ChatFooter from './Components/ChatFooter/ChatFooter';
import ChatWidget from './Components/ChatWidget/ChatWidget';

const meResp = "Open-licensed SVG Vector and Icons ?";
const youResp = "Search, explore and edit the best-fitting free icons or vectors for your projects using a wide variety vector library. Download free SVG vectors and icons for commercial use."

export default function Chats() {

  return (
    <>
      <div className='chatWrapper'>
        <section>
          <ChatHeader/>
        </section>
        <section className='chatBody'>
          <ChatWidget chatFor="ME" data={meResp}/>
          <ChatWidget data={youResp}/>
        </section>
        <section>
          <ChatFooter/>
        </section>
      </div>
    </>
  )
}

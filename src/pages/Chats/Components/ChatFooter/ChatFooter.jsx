import React from 'react';
import './ChatFooter.scss';
import SendIcon from '../../../../assets/svg/sendIcon.svg'

export default function ChatFooter(props) {
  const { isRightSectionCollapsed, sendMessage, input, setInput } = props;
  return (
    <div className={`chatFooter ${!isRightSectionCollapsed ? 'chatFooter--collapsed' : ''}`}>
    <div className='row'>
        <input 
          value={input}
          placeholder='Type something...'
          onChange={(e) => setInput(e.target.value)}
         />
        <button
          onClick={sendMessage}
        > 
          <img src={SendIcon} alt='SendIcon' />
        </button>
       
    </div>
     
    </div>
  )
}

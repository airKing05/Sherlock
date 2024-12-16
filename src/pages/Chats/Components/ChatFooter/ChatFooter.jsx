import React from 'react';
import './ChatFooter.scss';
import SendIcon from '../../../../assets/svg/sendIcon.svg'

export default function ChatFooter(props) {
  const { isRightSectionCollapsed, sendMessage, input, setInput, loading } = props;
  return (
    <div className={`chatFooter ${!isRightSectionCollapsed ? 'chatFooter--collapsed' : ''}`}>
    <div className='row'>
        <input 
          value={input}
          placeholder='Type something...'
          onChange={(e) => setInput(e.target.value)}
          disabled={loading ? true : false}
         />
        <button
          onClick={sendMessage}
          disabled={!input ? true : false}
        > 
          <img src={SendIcon} alt='SendIcon' />
        </button>
       
    </div>
     
    </div>
  )
}

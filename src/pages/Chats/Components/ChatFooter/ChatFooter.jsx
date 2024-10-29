import React from 'react';
import './ChatFooter.scss';
import SendIcon from '../../../../assets/svg/sendIcon.svg'

export default function ChatFooter() {
  return (
    <div className='chatFooter'>
    <div className='row'>
        <input placeholder='Type something...' />
        <button>
          <img src={SendIcon} alt='SendIcon' />
        </button>
       
    </div>
     
    </div>
  )
}

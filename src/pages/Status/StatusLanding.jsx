import React, { useState } from 'react';
import './StatusLanding.scss';
import Portal from '../../Layouts/Portal/Portal';
import AddSubscriberPopup from '../../Components/Popups/AddSubscriberPopup/AddSubscriberPopup';


export default function StatusLanding() {
        const [showAddServicePopup, setShowAddServicePopup] = useState(false);
     
        
    
  return (
    <>
      <div className='status-landing-page__wrapper'>
          <div className='status-landing-page__content'>
              <h2>A GIANT LEAP FOR STATUS PAGE</h2>
              <p>Get a beautiful status page in 10 seconds, without paying thousands of dollars</p>
              <div className='status-landing-page__button'>
                  <button 
                     onClick={() => setShowAddServicePopup(true)}
                    >
                          REGISTER FOR STATUS
                  </button>
              </div>
          </div>
      </div>
       <Portal
                      isOpen={showAddServicePopup}
                      onClose={() => setShowAddServicePopup(false)}
                  >
                      <AddSubscriberPopup setShowAddServicePopup={setShowAddServicePopup}/>
                  </Portal>
      </>
  )
}

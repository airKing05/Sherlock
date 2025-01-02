import React, { useState } from 'react'
import LinearStatusView from './LinearStatusView';
import './Status.scss';
import StatusCard from './StutusCard';
import StatusPopup from './StatusPopup';
import Portal from '../../Layouts/Portal/Portal';
import StatusDetailsPopup from '../../Components/Popups/StatusDetailsPopup/StatusDetailsPopup';

const majorOutage = Array.from({ length: 90 }, (_, index) => ({
    day: `Day ${index + 1}`,
    status: Math.random() > 0.8 ? "red" : Math.random() > 0.6 ? "yellow" : "green",
}));

const normal = Array.from({ length: 90 }, (_, index) => ({
    day: `Day ${index + 1}`,
    status: index === 50 ? "yellow" : "green",
}));


export default function Status() {
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [showStatusDetailsPopup, setShowStatusDetailsPopup] = useState(false);
    return (
        <>
        <div className='status__wrapper'>
            <section className='status__header'>
                <StatusCard />
            </section>
            <main className='status__main'>
                <div className='status__left-section'>
                    <LinearStatusView 
                    data={normal} 
                    status="Normal" 
                    title="User Portal" 
                    openStatusPopup = {() => setShowStatusPopup(true)}
                    openStatusDetailsPopup={() => setShowStatusDetailsPopup(true)}

                    />
                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />
                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                    <LinearStatusView data={majorOutage} status="Major Outage" title="Admin Portal" />

                </div>
                {
                    showStatusPopup && <div className='status__right-section'>
                        <StatusPopup 
                            closeStatusPopup={() => setShowStatusPopup(false)}
                        />
                    </div>
                }
               
            </main>
        </div>
           

            <Portal
                isOpen={showStatusDetailsPopup}
                onClose={() => setShowStatusDetailsPopup(false)}
            >
               <StatusDetailsPopup/>
            </Portal>

        </>
    )
}

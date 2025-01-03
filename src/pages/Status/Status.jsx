import React, { useEffect, useState } from 'react'
import LinearStatusView from './LinearStatusView';
import './Status.scss';
import StatusCard from './StutusCard';
import StatusPopup from './StatusPopup';
import Portal from '../../Layouts/Portal/Portal';
import StatusDetailsPopup from '../../Components/Popups/StatusDetailsPopup/StatusDetailsPopup';
import { useLocation } from 'react-router-dom';

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
    const [subscribedServices, setSubscribedServices] = useState([]);

    const location = useLocation();


    useEffect(() => {
        setSubscribedServices((prevState) => [...prevState, ...location.state.components])
    }, [location.state])
    
    return (
        <>
        <div className='status__wrapper'>
            {/* <header className='status__header'>
                <button
                    onClick={() => setShowAddServicePopup(true)}
                >
                    subscribe to updates
                </button>
            </header> */}
            <section>
                <StatusCard />
            </section>
            <main className='status__main'>
                    <div className='status__left-section'>
                        {
                            subscribedServices.length ? subscribedServices.map((_service, index) => {
                                return <React.Fragment key={index}>
                                    <LinearStatusView
                                        data={_service.dataType === 'normal' ? normal : majorOutage}
                                        status={_service.dataType === 'normal' ? "Normal" : "Major Outage"}
                                        title={_service.title}
                                        openStatusPopup={() => setShowStatusPopup(true)}
                                        openStatusDetailsPopup={() => setShowStatusDetailsPopup(true)}
                                    />
                                </React.Fragment>
                            }) : null
                        }

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

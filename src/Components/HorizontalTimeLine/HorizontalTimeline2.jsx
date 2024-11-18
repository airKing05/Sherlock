import React, { useState } from 'react';
import './HorizontalTimeLine.scss'
import Portal from '../../Layouts/Portal/Portal';
import DetailsCard from './DetailsCard/DetailsCard';

const Icon = ({ type }) => {
    switch (type) {
        case 'location':
            return <span className="icon">📍</span>;
        case 'photo':
            return <span className="icon">📷</span>;
        case 'checkin':
            return <span className="icon">🏨</span>;
        case 'warning':
            return <span className="icon">📅</span>;
        case 'clock':
            return <span className="icon">⏰</span>;
        case 'speed':
            return <span className="icon">🚗</span>;
        default:
            return null;
    }
};



export default function HorizontalTimeline2({data}) {
    const events = data?.answer?.data
    const [eventData, setEventData] = useState({});
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState(null)

    const handleOpenPopup = () => setPopupVisible(true);
    const handleClosePopup = () => setPopupVisible(false);


    const handleClick = (key, value, visible = true) => {
        setEventData((preState) => ({
            ...preState,
            [key]: {
                description: value,
                visible: !preState[key]?.visible
            }
        }))
    }

    const handleMoreInfo = (data) => {
        handleOpenPopup();
        setAdditionalInfo(data)
    }

  
    return (
        <>
        <div className="timeline">
            <div 
            className="timeline__line"
            style={{
                minWidth: (250 * events.length)+'px'
            }}
            ></div>
            <div className="timeline__content">
                {events.map((event, index) => (
                    <div className={`timeline__event timeline__event--${event.position}`} key={index}>
                       
                        {
                            event.eventTime ? <div className='timeline__eventTime'>
                            {
                                    event.position === 'top' ?<>
                                        <div className='timeline__eventTime__time'>{event.eventTime}</div>
                                        <div className='timeline__eventTime__symbol'></div>
                                    </> : <>
                                            <div className='timeline__eventTime__symbol'></div>
                                            <div className='timeline__eventTime__time'>{event.eventTime}</div>
                                    </>
                            }
                            </div> : null
                        }
                        <div 
                        className="timeline__marker"
                        onClick={() => {
                            event.moreInfo && handleMoreInfo(event.moreInfo)
                        }}
                        >
                            <div className="timeline__time">
                                <span className="timeline__icon">
                                    <Icon type={event.iconType} />
                                </span>
                                <span>
                                    {event.time}
                                </span>
                           </div>
                            {/* <div className={`timeline__point ${event.highlight ? 'timeline__point--highlight' : ''}`}></div> */}
                        </div>
                        <div 
                        className="timeline__description"
                        onClick={() => event.moreDetails && handleClick(index, event.moreDetails)}
                        >
                            <p>{event.description}</p>
                        </div>
                        {
                            eventData[index]?.visible && <div className="timeline__description__more">{eventData[index].description}</div>
                        }
                        
                    </div>
                ))}
            </div>
        </div>

            <Portal isOpen={isPopupVisible} onClose={handleClosePopup}>
                <DetailsCard data={additionalInfo}/>
            </Portal>
        </>
    );
}

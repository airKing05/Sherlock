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

const events = [
    {
        time: "4 pm",
        description: "Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin",
        iconType: "location",
        highlight: false,
        position: "top",
        eventTime: '4:30',
        moreInfo : {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
    {
        time: "6:05 pm",
        description: "Smyth and Porton take cell phone picture at Pickering Dairy Queen, 200 miles from Graslin",
        iconType: "photo",
        highlight: false,
        position: "top",
        eventTime: '6:15',
        moreInfo: {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
    {
        time: "7:29 pm",
        description: "Emanuel Spizer checks into Desert Motel in Graslin",
        iconType: "checkin",
        highlight: true,
        position: "bottom",
        eventTime: '8:15',
        moreDetails: "Smyth and Porton take cell phone picture at Pickering Dairy Queen, 200 miles from Graslin",
    },
    {
        time: "8:22 pm",
        description: "Guest in next door room reports shouting",
        iconType: "warning",
        highlight: false,
        position: "bottom",
        eventTime: '8:30',
        moreInfo: {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
    {
        time: "9:30 pm - 10:30 pm",
        description: "Time of assault",
        iconType: "clock",
        highlight: true,
        position: "top",
        eventTime: '10:00',
        moreInfo: {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
    {
        time: "12:20 am",
        description: "Smyth receives a speeding ticket 20 miles south of Pickering",
        iconType: "speed",
        highlight: false,
        position: "top",
        eventTime: '12:30',
        moreInfo: {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
    {
        time: "01:30 am - 4:00 am",
        description: "Motel guest in neighboring room hears no disturbances the rest of the night",
        iconType: "clock",
        highlight: false,
        position: "bottom",
        eventTime: '02:07',
        moreInfo: {
            title: 'more details',
            details: 'Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin'
        }
    },
];


export default function HorizontalTimeline2() {
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

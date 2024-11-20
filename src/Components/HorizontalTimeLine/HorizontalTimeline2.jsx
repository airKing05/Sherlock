import React, { useState } from 'react';
import './HorizontalTimeLine.scss'
import Portal from '../../Layouts/Portal/Portal';
import DetailsCard from './DetailsPopup/DetailsPopup';
import ReactIcon from '../../assets/icons/react.svg';
import ScssIcon from '../../assets/icons/scss.svg';
import NodeIcon from '../../assets/icons/node.svg';
import ExpressIcon from '../../assets/icons/express.svg';
import GitIcon from '../../assets/icons/git.svg';
import KubernetesIcon from '../../assets/icons/kubernetes.svg';
import DatabaseIcon from '../../assets/icons/database.svg';


const ImageIcon = ({icon}) => {
    return <img width={25} height={25} src={icon} alt='icon' />;
}


const Icon = ({ type }) => {
    switch (type) {
        case 'react':
            return <ImageIcon icon={ReactIcon}/>;
        case 'scss':
            return <ImageIcon icon={ScssIcon} />; 
        case 'node':
            return <ImageIcon icon={NodeIcon} />;
        case 'express':
            return <ImageIcon icon={ExpressIcon} />;
        case 'database':
            return <ImageIcon icon={DatabaseIcon} />; 
        case 'kubernetes':
            return <ImageIcon icon={KubernetesIcon} />; 
        case 'git':
            return <ImageIcon icon={GitIcon} />; 
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
        const icon = <Icon type={data.iconType}/>
        console.log("icon", icon)
        setAdditionalInfo({ ...data.details, icon})
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
                            event.details && handleMoreInfo(event)
                        }}
                        >
                            <div className="timeline__time">
                                {/* <span className="timeline__icon">
                                    
                                </span> */}
                                <Icon type={event.iconType} />
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

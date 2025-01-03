import React, { useEffect, useState } from 'react';
import './AddSubscriberPopup.scss';
import { useNavigate } from 'react-router-dom';

const availableComponents = {
    fronted: true,
    backend: true,
    db: false,
    sockets: false,
    aws: false,
}
const subscribedServicesList = [
    { title: 'User Portal', url: 'user-portal', dataType: 'normal' },
    { title: 'Admin Portal', url: 'admin-portal', dataType: 'critical' }
]
export default function AddSubscriberPopup({setShowAddServicePopup }) {
    const [isEmailVerified, setIsEmailVerified] = useState(false); 
    const [email, setEmail] = useState('');
    const [serviceToSubscribe, setServiceToSubscribe] = useState({
        title: '',
        url: '',
        dataType: 'normal'
    })
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState(availableComponents);

    const navigate = useNavigate();
    const emailFromStorage = localStorage.getItem('email');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if(!isEmailVerified){
            setEmail(value);
        }else{
            console.log("change called", name, value)
            setServiceToSubscribe(() => ({
                ...serviceToSubscribe,
                [name]: value
            }))
        }
        
    }

    const handelVerifyEmail = () => {
        localStorage.setItem('email', JSON.stringify(email))

        setTimeout(() => {
            setIsEmailSubmitted(true)
        }, 500);
    };

    const handleAddServiceToSubscribe = () => {
        console.log("serviceToSubscribe", serviceToSubscribe, selectedComponents)
        setShowAddServicePopup(false);
       
        for (const component in selectedComponents) {
            if (selectedComponents[component]){
                subscribedServicesList.push(
                    { title: component, url: 'user-portal', dataType: 'normal' }
                )
            }
        }

        navigate('/status', {
            state: {
                components: subscribedServicesList
            }
        }
        );
    }

    const handelSelectedChange = (component) => {
        setSelectedComponents((prev) => ({ ...prev, [component]: !prev[component] }));
    }

    useEffect(() => {
        if (isEmailSubmitted){
          setIsEmailVerified(true)
      }
    }, [emailFromStorage, isEmailSubmitted])
    

    return (
        <div className="add-subscriber__container">
            <div className="add-subscriber__header">
                <h3 className="add-subscriber__title">Add Subscriber</h3>
            </div>
            <div className="add-subscriber__body">
                
                {
                    isEmailVerified ? <>
                        <div className="add-subscriber__field">
                            <label className="add-subscriber__label">
                                Your status page components
                            </label>
                            <ul className="add-subscriber__components-list">
                                {
                                    Object.keys(selectedComponents).map((_component, index) => {
                                        return <li 
                                        key={index}
                                            onClick={() => handelSelectedChange(_component)}
                                        >
                                            <input
                                                type="checkbox"
                                                className="add-subscriber__input add-subscriber__input--checkbox"
                                                placeholder={_component}
                                                name='url'
                                                checked={selectedComponents[_component]}
                                            />
                                            &nbsp;
                                            <label className="add-subscriber__label add-subscriber__label--checkbox">{_component}</label>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </> : 
                        <>
                            <div className="add-subscriber__field">
                                <label className="add-subscriber__label">
                                    Email address
                                    <input
                                        type="email"
                                        className="add-subscriber__input"
                                        placeholder="example@email.com"
                                        name='email'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </label>
                            </div>
                            <div className="add-subscriber__field">
                                <label className="add-subscriber__label">
                                    Company name
                                    <input
                                        type="text"
                                        className="add-subscriber__input"
                                        placeholder="sherlock"
                                        name='company'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </label>
                            </div>
                            <div className="add-subscriber__field">
                                <label className="add-subscriber__label">
                                    Sub domain
                                    <input
                                        type="text"
                                        className="add-subscriber__input"
                                        placeholder="sherlock"
                                        name='sub-domain'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </label>
                            </div>
                        </>
                        
                }
            </div>
            <div className="add-subscriber__footer">
                <button className="add-subscriber__add-btn"
                    onClick={isEmailVerified ? handleAddServiceToSubscribe : handelVerifyEmail}
                >
                    {
                        !isEmailVerified ? 'Next for status page' : 'save components'
                    }
                </button>
            </div>
        </div>
    );
};

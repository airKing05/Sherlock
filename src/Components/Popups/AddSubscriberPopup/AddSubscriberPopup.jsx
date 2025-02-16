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
    const [inputs, setInputs] = useState({
        email: '',
        company: '',
        subDomain: '',
    });
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState(availableComponents);
    const [errors, setErrors] = useState({
        email: '',
        company: '',
        subDomain: '',
        // components: ''
    })
    // const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const emailFromStorage = localStorage.getItem('email');


    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value){
            setErrors((preErrors) => ({ ...preErrors, email: 'Email is empty' }));
            // setIsError(true);
        }
        if (emailRegex.test(value)){
            setErrors((preErrors) => ({ ...preErrors, email : ''}))
            // setIsError(false);
        }else{
            setErrors((preErrors) => ({ ...preErrors, email: 'Invalid email' }));
            // setIsError(true);
        }
    }

    const validateInputFields = (objectToValidate) => {
        const {email, company, subDomain } = objectToValidate;

         validateEmail(email);

        if (!company){
            setErrors((preErrors) => ({ ...preErrors, company: 'Company name is empty' }));
            // setIsError(true);
        }else if (company.length>5) {
            setErrors((preErrors) => ({ ...preErrors, company: '' }));
            // setIsError(false);
        } else {
            setErrors((preErrors) => ({ ...preErrors, company: 'Company name is invalid' }));
            // setIsError(true);
        }
        
        if (!subDomain) {
            setErrors((preErrors) => ({ ...preErrors, subDomain: 'Sub-domain name is empty' }));
            // setIsError(true);
        }else if (subDomain.length > 5){
            // check if domain already exist
            setErrors((preErrors) => ({ ...preErrors, subDomain: '' }));
            // setIsError(false);
        } else {
            setErrors((preErrors) => ({ ...preErrors, subDomain: 'Sub-domain is invalid' }));
            // setIsError(true);
        }

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs(() => ({
            ...inputs,
            [name]: value
        }))
    }

    const checkIsErrorExist = (errors) => {
        let isErrorExist = false;
        for (const error in errors) {
            console.log(error, errors, errors[error])

            if (error && errors[error]) {
                isErrorExist = true;
            }
        }

        console.log("isErrorExist", isErrorExist)
        if (!isErrorExist){
            setIsEmailVerified(true)
        }
        return isErrorExist;
    }
    const handelNextForm = () => {
        const {email, company, subDomain} = inputs;
        localStorage.setItem('email', JSON.stringify(email))
        validateInputFields(inputs)
     
        setTimeout(() => {
            checkIsErrorExist(errors)
        }, 500);
        // setTimeout(() => {
        //     isErrorExist = checkIsErrorExist(errors)
        // }, 500);

        // if (isErrorExist && !isErrorExist) {
        //     setIsEmailSubmitted(true)
        //     isErrorExist
        // }
      
        // if (!checkIsErrorExist(errors)) {
        //     setTimeout(() => {
        //         setIsEmailSubmitted(true)
        //         setIsEmailVerified(true)
        //     }, 500);
        // }

    };

    const handleAddServiceToSubscribe = () => {
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

    // useEffect(() => {
    //     if (isEmailSubmitted){
    //       setIsEmailVerified(true)
    //   }
    // }, [emailFromStorage, isEmailSubmitted])
    
    console.log("sdfsad", emailFromStorage, isEmailSubmitted, isEmailVerified)

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
                                    <div className="add-subscriber__label-titles">
                                        <span>Email address</span>
                                        {
                                            errors['email'] && <span className='text-error'>{errors['email']}</span>
                                        }
                                    </div>
                                    <input
                                        type="email"
                                        className="add-subscriber__input"
                                        placeholder="example@email.comasas"
                                        name='email'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </label>
                            </div>
                            <div className="add-subscriber__field">
                                <label className="add-subscriber__label">
                                    <div className="add-subscriber__label-titles">
                                        <span> Company name</span>
                                        {
                                            errors['company'] && <span className='text-error'>{errors['company']}</span>
                                        }
                                    </div>
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
                                    <div className="add-subscriber__label-titles">
                                        <span> Sub domain</span>
                                        {
                                            errors['subDomain'] && <span className='text-error'>{errors['subDomain']}</span>
                                        }
                                    </div>
                                    <input
                                        type="text"
                                        className="add-subscriber__input"
                                        placeholder="sherlock"
                                        name='subDomain'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </label>
                            </div>
                        </>
                        
                }
            </div>
            <div className="add-subscriber__footer">
                <button className="add-subscriber__add-btn"
                    onClick={isEmailVerified ? handleAddServiceToSubscribe : handelNextForm}
                >
                    {
                        !isEmailVerified ? 'Next for status page' : 'save components'
                    }
                </button>
            </div>
        </div>
    );
};

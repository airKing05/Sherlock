import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.scss';
import SunIcon from '../../assets/svg/sunLogo.svg';
import GoogleIcon from '../../assets/svg/googleIcon.svg';


export default function Signin({ setAuth }) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(userData ? userData : null);

    const navigate = useNavigate();

    console.log(user, profile)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    setAuth(true);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        localStorage.removeItem('user');
        setProfile(null);
        setAuth(false);
        console.log("logout clicked")
    };

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div className='signin__wrapper'>
            <div className='signin__container'>
                <div className='row'>
                    <div className='col-5'>
                        <header className='signin__header'>
                            <div className='signin__header__container'>
                                <img src={SunIcon} alt='icon'/>
                            </div>
                        </header>
                        <section className='signin__content'>
                            <div className='signin__content__box'>
                            <h2>Sign in</h2>
                            <p>To enjoy the information of us</p>
                            <button className='signin__button' onClick={login}>
                            <img width={25} height={25} src={GoogleIcon} alt='icon'/>
                             Sign in with Google 🚀 </button>
                        </div>
                        </section>

                        <footer className='signin__footer'>
                            © Copyright November 2024
                        </footer>
                    </div>
                    <div className='col-7'>
                        <div className='signin__img__container'>
                            <h1 className='Signin__msg'>Hey, Hello! To Sherlock</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* <h2>React Google Login</h2>
          <br />
          <br />
          {profile?.name ? (
              <div>
                  <img src={profile.picture} alt="user image" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <button onClick={logOut}>Log out</button>
              </div>
          ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>   
          )} */}
        </div>
    )
}



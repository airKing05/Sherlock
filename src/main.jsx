import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLINT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID 
const CLINT_SECRET = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_SECRET  

console.log("CLINT_ID ----", import.meta.env)
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLINT_ID}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,
)

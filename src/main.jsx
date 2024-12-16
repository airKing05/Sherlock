import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLINT_ID = '974934989937-mcek41o0atqjent2m7ijddo0m9dof0rf.apps.googleusercontent.com'
const CLINT_SECRET = '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'


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLINT_ID}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,
)

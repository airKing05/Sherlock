import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Chats from './pages/Chats/Chats'

function App() {

  return (
    <>
      <BrowserRouter basename="/sherlock">
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/chat" element={<Chats />} ></Route>
        </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Chats from './pages/Chats/Chats'
import PageLayout from './Layouts/PageLayout/PageLayout'

function App() {

  return (
    <>
      <BrowserRouter basename="/sherlock">
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            }
          />
          {/* <Route path="/" element={<Home />} exact></Route> */}
          {/* <Route path="/chat" element={<Chats />} ></Route> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

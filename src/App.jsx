import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home';
import History  from './pages/History/History';
import Chats from './pages/Chats/Chats'
import PageLayout from './Layouts/PageLayout/PageLayout'
import Signin from './pages/Signin/Signin';
import ProtectedRoute from './authentication/ProtectedRoute';
import { useState } from 'react';
import TreeNetworkDiagram from './pages/Home/components/TreeDiagram/TreeNetworkDiagram';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  return (
    <>
      <BrowserRouter basename="">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="chat">
                  <Home />
                </PageLayout>
            </ProtectedRoute>
             
            }
          />
          <Route
            path="/history"
            element={
               <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="history">
                  <History />
                </PageLayout>
            </ProtectedRoute>
            }
          />
          <Route
            path="/tree-network"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="treeNetwork">
                  <TreeNetworkDiagram />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Signin setAuth={setIsAuthenticated} />
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

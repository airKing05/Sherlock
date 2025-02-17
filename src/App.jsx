import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home';
import History  from './pages/History/History';
import Chats from './pages/Chats/Chats'
import PageLayout from './Layouts/PageLayout/PageLayout'
import Signin from './pages/Signin/Signin';
import ProtectedRoute from './authentication/ProtectedRoute';
import { useState } from 'react';
import TreeNetworkDiagram from './pages/Home/components/TreeDiagram/TreeNetworkDiagram';
import Dashboard from './pages/Dashboard/Dashboard';
import Status from './pages/Status/Status';
import StatusLanding from './pages/Status/StatusLanding';
import Investigation from './pages/Investigation/Investigation';
import InvestigationDetails from './pages/InvestigationDetails/InvestigationDetails';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  return (
    <>
      <BrowserRouter basename="">
        <Routes>
          {/* <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="chat">
                  <Home />
                </PageLayout>
            </ProtectedRoute>
             
            }
          /> */}
          <Route path="/" element={<Navigate to="/investigation" replace />} />
          <Route
            path="/investigation"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="investigation">
                  <Investigation />
                </PageLayout>
              </ProtectedRoute>

            }
          />
          <Route
            path="/investigation/:investigationId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageLayout route="investigationDetails">
                  <InvestigationDetails/>
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
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Status />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status-landing"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StatusLanding />
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

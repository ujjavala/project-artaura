import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SubmitArtwork from './components/SubmitArtwork/SubmitArtwork';
import Projects from './components/Projects/Projects';
import Gallery from './components/Gallery/Gallery';
import SocialImpact from './components/SocialImpact/SocialImpact';
import Profile from './components/Profile/Profile';
import MySubmissions from './components/MySubmissions/MySubmissions';
import MyFavorites from './components/MyFavorites/MyFavorites';
import ArtistNetwork from './components/ArtistNetwork/ArtistNetwork';
import MyImpact from './components/MyImpact/MyImpact';
import Settings from './components/Settings/Settings';
import AIArtAnalyzer from './components/AIArtAnalyzer/AIArtAnalyzer';
import AICommunityMatcher from './components/AICommunityMatcher/AICommunityMatcher';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  return (
    <Router basename="/art-beyond-barriers">
      <div className="App">
        {isAuthenticated && <Header user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/submit-artwork" 
            element={
              isAuthenticated ? (
                <SubmitArtwork user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/projects" 
            element={
              isAuthenticated ? (
                <Projects user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/gallery" 
            element={
              isAuthenticated ? (
                <Gallery user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/social-impact" 
            element={
              isAuthenticated ? (
                <SocialImpact user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? (
                <Profile user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/my-submissions" 
            element={
              isAuthenticated ? (
                <MySubmissions user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/my-favorites" 
            element={
              isAuthenticated ? (
                <MyFavorites user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/artist-network" 
            element={
              isAuthenticated ? (
                <ArtistNetwork user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/my-impact" 
            element={
              isAuthenticated ? (
                <MyImpact user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? (
                <Settings user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/ai-art-analyzer" 
            element={
              isAuthenticated ? (
                <AIArtAnalyzer user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/ai-community-matcher" 
            element={
              isAuthenticated ? (
                <AICommunityMatcher user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
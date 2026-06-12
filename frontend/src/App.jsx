import React, { useState } from 'react';
import Login from './components/Login';
import TypingEngine from './components/TypingEngine';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    setUser('');
  };

  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") !== "light"
  );

  const toggleTheme = () => {
   const newTheme = !darkMode;
   setDarkMode(newTheme);
    localStorage.setItem(
      "theme",
    newTheme ? "dark" : "light"
    );
  };

  return (
    <div className={`app-wrapper ${darkMode ? "dark-theme" : "light-theme"}`}>
      <header className="navbar">
        <h1>WordPulse 📊</h1>

        <button
        className="theme-btn"
        onClick={toggleTheme}
        >
       {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
       </button>

        {token && (
          <button onClick={handleLogout}>
            Logout ({user})
          </button>
        )}
      </header>

      {!token ? (
        <Login
          setToken={setToken}
          setUser={setUser}
        />
      ) : (
        <div className="workspace-grid">
          <TypingEngine
            token={token}
            triggerHistoryRefresh={() =>
              setRefreshTrigger(prev => prev + 1)
            }
          />

          <Dashboard
            token={token}
            refreshTrigger={refreshTrigger}
          />
        </div>
      )}
    </div>
  );
}

export default App;
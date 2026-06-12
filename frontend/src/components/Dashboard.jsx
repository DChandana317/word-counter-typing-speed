import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ token, refreshTrigger }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/scores/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Failed fetching telemetry history profiles', err);
    }
  };

  useEffect(() => { fetchHistory(); }, [token, refreshTrigger]);

  return (
    <div className="dashboard-pane">
      <h3>📈 Your Analytics History</h3>
      {history.length === 0 ? <p>No logs registered yet. Complete a test above.</p> : (
        <ul className="history-list">
          {history.map((run, i) => (
            <li key={i} className="history-item">
              <span>⚡ {run.wpm} WPM</span>
              <span>🎯 {run.accuracy}% Acc</span>
              <span className="timestamp">{new Date(run.createdAt).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

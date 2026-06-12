import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const endpoint = isLogin ? 'login' : 'register';
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.username);
      setToken(res.data.token);
      setUser(res.data.username);
    } catch (err) {
      setError(err.response?.data?.msg || 'Authentication Error Connection Failure');
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">
        {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
      </h2>

      <p className="auth-subtitle">
        {isLogin
          ? "Login to continue your typing journey"
          : "Join WordPulse today"}
      </p>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
       <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
         setForm({ ...form, username: e.target.value })
        }
        required
      />

  <input
    type="password"
    placeholder="Password"
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
    required
  />

  <button type="submit" className="auth-btn">
    {isLogin ? "Login" : "Sign Up"}
  </button>
</form>
      <p
        className="toggle-auth"
        onClick={() => {
          setError("");
          setIsLogin(!isLogin);
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </p>
    </div>
  </div>
);
};

export default Login;

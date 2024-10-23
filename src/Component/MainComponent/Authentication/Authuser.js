import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Authuser = () => {
  const navigate = useNavigate();

  // Helper functions for session management
  const getToken = () => {
    try {
      const tokenString = sessionStorage.getItem('token');
      return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  };

  const getUser = () => {
    try {
      const userString = sessionStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Failed to parse user:', error);
      return null;
    }
  };

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  // Create Axios instance with dynamic headers
  const http = axios.create({
    baseURL: 'http://localhost:5001/userAPI',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Update axios headers whenever the token changes
  useEffect(() => {
    http.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
  }, [token]);

  // Handle logout and navigate to home
  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return {
    setToken: saveToken,
    token,
    user,
    http,
    logout,
  };
};

export default Authuser;

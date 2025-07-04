// src/contexts/UserContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Stores user information (name, email, role, etc.)
  const [loading, setLoading] = useState(true); // Tracks loading state during initial load

  useEffect(() => {
    // Load user from localStorage on app initialization
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Save user data in state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Optional: in case token is stored separately
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);

// src/contexts/BloodComponentContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const BloodComponentContext = createContext();

export const BloodComponentProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBloodComponents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bloodcomponents');
      setComponents(res.data);
    } catch (err) {
      console.error('Error fetching blood components:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodComponents();
  }, []);

  return (
    <BloodComponentContext.Provider value={{ components, loading, fetchBloodComponents }}>
      {children}
    </BloodComponentContext.Provider>
  );
};

// ✅ Prop validation
BloodComponentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Custom hook
export const useBloodComponents = () => useContext(BloodComponentContext);

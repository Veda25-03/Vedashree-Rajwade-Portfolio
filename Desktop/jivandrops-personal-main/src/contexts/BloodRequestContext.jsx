// src/contexts/BloodRequestContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const BloodRequestContext = createContext();

export const BloodRequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBloodRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bloodrequests');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching blood requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodRequests();
  }, []);

  return (
    <BloodRequestContext.Provider value={{ requests, loading, fetchBloodRequests }}>
      {children}
    </BloodRequestContext.Provider>
  );
};

// ✅ Prop validation
BloodRequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Custom hook
export const useBloodRequests = () => useContext(BloodRequestContext);

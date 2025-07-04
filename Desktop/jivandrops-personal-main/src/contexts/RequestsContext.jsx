// src/contexts/RequestsContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        setRequests(response.data);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const addRequest = async (newRequest, resetForm, closeModal) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/requests',
        {
          HospitalName: newRequest.hospital,
          DocName: newRequest.requester,
          PatientName: newRequest.patientName,
          age: newRequest.patientAge,
          BloodGroup: newRequest.bloodGroup,
          Quantity: parseInt(newRequest.units),
          Priority: newRequest.urgency,
          Phone: newRequest.contactNumber,
          description: newRequest.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        setRequests([response.data, ...requests]);
        resetForm();
        closeModal();
      }
    } catch (err) {
      console.error('Error adding request:', err);
      alert('Failed to add request. Please try again.');
    }
  };

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(prev =>
      prev.map(req => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
    // You can also send a PATCH to server here to persist
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <RequestsContext.Provider
      value={{
        requests,
        loading,
        fetchRequests,
        addRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);

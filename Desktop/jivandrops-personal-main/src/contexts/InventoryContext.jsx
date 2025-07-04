// src/contexts/InventoryContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MOCK_DATA } from '../utils/constants';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory on load
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/inventory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setInventory(response.data);
      } else {
        setInventory(MOCK_DATA);
      }
    } catch (err) {
      console.error('Inventory fetch error:', err);
      setInventory(MOCK_DATA); // fallback
    } finally {
      setLoading(false);
    }
  };

  // Call on mount
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, fetchInventory, loading }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook
export const useInventory = () => useContext(InventoryContext);

import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    
                    console.log(response.data.user._id);
                } else {
                    navigate("/login");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData()
    }, [token])

    if(isLoading){
        return (
            <h1>Loading</h1>
        )
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper
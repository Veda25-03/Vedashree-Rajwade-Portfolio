import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    department: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        Name: formData.name,
        Email: formData.email,
        Password: formData.password,
        Contact: formData.contact,
        Department: formData.department,
        Role: formData.role,
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess('Registered successfully!');
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <FaHeartbeat className="w-10 h-10 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">JIVAN BBMS</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-600 text-sm">Register to get started</p>
        </div>

        {/* Error/Success */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="department"
            placeholder="Department (optional)"
            value={formData.department}
            onChange={handleChange}
            className="input-field"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="hospital_staff">Hospital Staff</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 hover:underline font-medium">
            Login
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Secure registration powered by JIVAN BBMS
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

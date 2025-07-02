import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { IoMdTrendingUp } from "react-icons/io";
import { FaDownload } from 'react-icons/fa';
import { MdTrendingDown } from 'react-icons/md';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [chartType, setChartType] = useState('overview');

  const donationTrends = [
    { month: 'Jan', donations: 145, requests: 120, fulfilled: 115 },
    { month: 'Feb', donations: 167, requests: 140, fulfilled: 135 },
    { month: 'Mar', donations: 189, requests: 165, fulfilled: 158 },
    { month: 'Apr', donations: 156, requests: 180, fulfilled: 145 },
    { month: 'May', donations: 203, requests: 195, fulfilled: 190 },
    { month: 'Jun', donations: 178, requests: 170, fulfilled: 165 }
  ];

  const bloodGroupDistribution = [
    { name: 'O+', value: 145, color: '#ef4444' },
    { name: 'A+', value: 120, color: '#f97316' },
    { name: 'B+', value: 98, color: '#eab308' },
    { name: 'AB+', value: 67, color: '#22c55e' },
    { name: 'O-', value: 78, color: '#3b82f6' },
    { name: 'A-', value: 45, color: '#8b5cf6' },
    { name: 'B-', value: 32, color: '#ec4899' },
    { name: 'AB-', value: 23, color: '#06b6d4' }
  ];

  const barChartData = [
    { hospital: 'Apollo', donors: 80 },
    { hospital: 'Fortis', donors: 65 },
    { hospital: 'Nanavati', donors: 75 },
    { hospital: 'AIIMS', donors: 90 },
    { hospital: 'Jivann', donors: 50 }
  ];

  const chartSwitcher = (
    <div className="flex space-x-2 my-4">
      {['overview', 'donations', 'hospitals'].map(type => (
        <button
          key={type}
          onClick={() => setChartType(type)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            chartType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {chartSwitcher}

      {/* Line Chart */}
      {chartType === 'overview' && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={donationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="donations" stroke="#dc2626" name="Donations" />
            <Line type="monotone" dataKey="requests" stroke="#2563eb" name="Requests" />
            <Line type="monotone" dataKey="fulfilled" stroke="#16a34a" name="Fulfilled" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Pie Chart */}
      {chartType === 'donations' && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bloodGroupDistribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {bloodGroupDistribution.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* Bar Chart */}
      {chartType === 'hospitals' && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hospital" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donors" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Trending Icons */}
      <div className="flex justify-around mt-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <IoMdTrendingUp className="text-green-500" />
          <span>Donations increased by 15%</span>
        </div>
        <div className="flex items-center space-x-2">
          <MdTrendingDown className="text-red-500" />
          <span>Requests dropped by 8%</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

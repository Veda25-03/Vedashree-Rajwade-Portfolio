import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { FaPlus, FaExclamationTriangle, FaUsers, FaCalendarAlt, FaTint, FaClock } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA } from '../../utils/constants';
import Modal from '../common/Modal';

const DashboardOverview = () => {
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showAddDonorModal, setShowAddDonorModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Chart data
  const inventoryTrend = [
    { month: 'Jan', units: 650 },
    { month: 'Feb', units: 720 },
    { month: 'Mar', units: 680 },
    { month: 'Apr', units: 800 },
    { month: 'May', units: 823 },
  ];

  const bloodGroupDistribution = [
    { name: 'O+', value: 145, color: '#ef4444' },
    { name: 'A+', value: 120, color: '#f97316' },
    { name: 'B+', value: 98, color: '#eab308' },
    { name: 'AB+', value: 67, color: '#22c55e' },
    { name: 'O-', value: 78, color: '#3b82f6' },
    { name: 'A-', value: 45, color: '#8b5cf6' },
    { name: 'B-', value: 32, color: '#ec4899' },
    { name: 'AB-', value: 23, color: '#06b6d4' },
  ];

  const donationTiming = [
    { time: '9-11 AM', donations: 45 },
    { time: '11-1 PM', donations: 65 },
    { time: '1-3 PM', donations: 35 },
    { time: '3-5 PM', donations: 58 },
    { time: '5-7 PM', donations: 42 },
  ];

  const alerts = [
    { id: 1, message: '12 units of A+ expiring in 2 days', type: 'warning', time: '2 hours ago' },
    { id: 2, message: 'Critical O- request from Apollo Hospital', type: 'critical', time: '30 min ago' },
    { id: 3, message: 'B- inventory below minimum threshold', type: 'warning', time: '1 hour ago' },
    { id: 4, message: 'New donor registration pending approval', type: 'info', time: '45 min ago' },
  ];

  const recentActivity = [
    { id: 1, activity: 'Rajesh Patil requested 2 units of A+ from Mumbai Hospital', time: '10 min ago', type: 'request' },
    { id: 2, activity: 'Priya Mehta completed blood donation - O+ added to inventory', time: '25 min ago', type: 'donation' },
    { id: 3, activity: 'Dr. Anjali approved critical request REQ001', time: '1 hour ago', type: 'approval' },
    { id: 4, activity: 'System flagged 5 units as expired', time: '2 hours ago', type: 'system' },
    { id: 5, activity: 'Manish Kulkarni scheduled for donation tomorrow', time: '3 hours ago', type: 'appointment' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your blood bank operations in real-time</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddRequestModal(true)}
            className="btn-primary flex items-center"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            New Request
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blood Units</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.totalBloodUnits}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Donors Today</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.activeDonors}</p>
              <p className="text-sm text-blue-600 mt-1">8 donations scheduled</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <FaUsers className="w-8 h-8 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments Scheduled</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.scheduledAppointments}</p>
              <p className="text-sm text-green-600 mt-1">5 for today</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaCalendarAlt className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Stock Alerts</p>
              <p className="text-3xl font-bold text-red-600">{MOCK_DATA.stats.criticalAlerts}</p>
              <p className="text-sm text-red-600 mt-1">Requires attention</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Blood Inventory Trends */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Inventory Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="units" stroke="#dc2626" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Group Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bloodGroupDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {bloodGroupDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donation Timing Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Donation Timing Pattern</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationTiming}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donations" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions and Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddRequestModal(true)}
              className="w-full btn-primary flex items-center justify-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              New Blood Request
            </button>
            <button
              onClick={() => setShowAddDonorModal(true)}
              className="w-full btn-secondary flex items-center justify-center"
            >
              <FaUsers className="w-4 h-4 mr-2" />
              Add Donor
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full btn-outline flex items-center justify-center"
            >
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              Schedule Appointment
            </button>
          </div>
        </div>

        {/* Live Alerts */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Alerts</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'request' ? 'bg-orange-500' :
                  activity.type === 'donation' ? 'bg-green-500' :
                  activity.type === 'approval' ? 'bg-blue-500' :
                  activity.type === 'system' ? 'bg-red-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={showAddRequestModal} 
        onClose={() => setShowAddRequestModal(false)}
        title="Add New Blood Request"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
            <input type="text" className="input-field" placeholder="Enter hospital name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            <select className="input-field">
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed</label>
            <input type="number" className="input-field" placeholder="Number of units" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
            <select className="input-field">
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Submit Request</button>
            <button 
              type="button" 
              onClick={() => setShowAddRequestModal(false)}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showAddDonorModal} 
        onClose={() => setShowAddDonorModal(false)}
        title="Add New Donor"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" className="input-field" placeholder="Enter full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input type="tel" className="input-field" placeholder="+91 12345 67890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            <select className="input-field">
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input type="text" className="input-field" placeholder="Enter city" />
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Donor</button>
            <button 
              type="button" 
              onClick={() => setShowAddDonorModal(false)}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardOverview;
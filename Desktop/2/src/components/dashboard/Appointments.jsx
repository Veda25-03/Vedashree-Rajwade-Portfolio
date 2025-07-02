import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaCalendarAlt, FaUser, FaUserMd } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA, APPOINTMENT_STATUS, BLOOD_GROUPS, INDIAN_DOCTORS } from '../../utils/constants';
import Modal from '../common/Modal';

const Appointments = () => {
  const [appointments, setAppointments] = useState(MOCK_DATA.appointments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [newAppointment, setNewAppointment] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    type: 'Blood Donation',
    bloodGroup: '',
    notes: ''
  });

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const appointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      name: newAppointment.name,
      phone: newAppointment.phone,
      date: newAppointment.date,
      time: newAppointment.time,
      doctor: newAppointment.doctor,
      type: newAppointment.type,
      status: 'Scheduled',
      bloodGroup: newAppointment.bloodGroup,
      notes: newAppointment.notes,
      location: 'JIVAN Blood Bank, Main Center'
    };

    setAppointments([appointment, ...appointments]);
    setShowAddModal(false);
    setNewAppointment({
      name: '',
      phone: '',
      date: '',
      time: '',
      doctor: '',
      type: 'Blood Donation',
      bloodGroup: '',
      notes: ''
    });
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm) ||
                         appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || appointment.status === statusFilter;
    const matchesType = typeFilter === '' || appointment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'status-pending';
      case 'Completed': return 'status-approved';
      case 'Missed': return 'status-critical';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'status-pending';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Blood Donation': return 'text-red-600 bg-red-100';
      case 'Health Check': return 'text-blue-600 bg-blue-100';
      case 'Follow-up': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage donor appointments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.scheduledAppointments}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaCalendarAlt className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-primary-600">8</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <FaUser className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{MOCK_DATA.stats.completedAppointments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Missed</p>
              <p className="text-3xl font-bold text-red-600">{MOCK_DATA.stats.missedAppointments}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaCalendarAlt className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            {Object.values(APPOINTMENT_STATUS).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="Health Check">Health Check</option>
            <option value="Follow-up">Follow-up</option>
          </select>

          <button className="btn-outline flex items-center justify-center">
            <FaFilter className="w-4 h-4 mr-2" />
            Date Range
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{appointment.name}</div>
                      <div className="text-gray-500">{appointment.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{appointment.date}</div>
                      <div className="text-gray-500">{appointment.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.bloodGroup ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {appointment.bloodGroup}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(appointment.status)}`}
                    >
                      {Object.values(APPOINTMENT_STATUS).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit">
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Cancel">
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Schedule New Appointment"
        size="lg"
      >
        <form onSubmit={handleAddAppointment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
              <input
                type="text"
                value={newAppointment.name}
                onChange={(e) => setNewAppointment({...newAppointment, name: e.target.value})}
                className="input-field"
                placeholder="Enter patient name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={newAppointment.phone}
                onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                className="input-field"
                placeholder="+91 12345 67890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
              <select
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
              <select
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select doctor</option>
                {INDIAN_DOCTORS.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
              <select
                value={newAppointment.type}
                onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                className="input-field"
                required
              >
                <option value="Blood Donation">Blood Donation</option>
                <option value="Health Check">Health Check</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>

            {newAppointment.type === 'Blood Donation' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  value={newAppointment.bloodGroup}
                  onChange={(e) => setNewAppointment({...newAppointment, bloodGroup: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={newAppointment.notes}
              onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              className="input-field"
              rows="3"
              placeholder="Additional notes or instructions"
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Schedule Appointment</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Appointment Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Appointment Details"
        size="lg"
      >
        {selectedAppointment && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Appointment ID:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Date & Time:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.date} at {selectedAppointment.time}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Doctor:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-sm text-gray-900">{selectedAppointment.phone}</p>
                  </div>
                  {selectedAppointment.bloodGroup && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Blood Group:</span>
                      <p className="text-sm text-gray-900">{selectedAppointment.bloodGroup}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <p className={`text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {selectedAppointment.notes && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Notes</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900">{selectedAppointment.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;
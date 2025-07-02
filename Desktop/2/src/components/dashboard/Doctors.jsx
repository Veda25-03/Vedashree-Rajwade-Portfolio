import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaUserMd, FaPhone, FaEnvelope, FaHospital } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA, INDIAN_HOSPITALS } from '../../utils/constants';
import Modal from '../common/Modal';

const Doctors = () => {
  const [doctors, setDoctors] = useState(MOCK_DATA.doctors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    hospital: '',
    phone: '',
    email: '',
    experience: '',
    licenseNumber: '',
    qualifications: '',
    address: ''
  });

  const specializations = [
    'Hematology',
    'Transfusion Medicine',
    'Blood Banking',
    'Internal Medicine',
    'Emergency Medicine',
    'Pathology',
    'Oncology'
  ];

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const doctor = {
      id: `DOC${String(doctors.length + 1).padStart(3, '0')}`,
      name: newDoctor.name,
      specialization: newDoctor.specialization,
      hospital: newDoctor.hospital,
      phone: newDoctor.phone,
      email: newDoctor.email,
      experience: newDoctor.experience,
      licenseNumber: newDoctor.licenseNumber,
      qualifications: newDoctor.qualifications,
      address: newDoctor.address,
      totalDonationsSupervised: 0,
      status: 'Active',
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setDoctors([doctor, ...doctors]);
    setShowAddModal(false);
    setNewDoctor({
      name: '',
      specialization: '',
      hospital: '',
      phone: '',
      email: '',
      experience: '',
      licenseNumber: '',
      qualifications: '',
      address: ''
    });
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || doctor.status === statusFilter;
    const matchesSpecialization = specializationFilter === '' || doctor.specialization === specializationFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-approved';
      case 'Inactive': return 'status-pending';
      case 'Suspended': return 'status-critical';
      default: return 'status-pending';
    }
  };

  const totalDoctors = doctors.length;
  const activeDoctors = doctors.filter(d => d.status === 'Active').length;
  const totalSupervised = doctors.reduce((sum, d) => sum + d.totalDonationsSupervised, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600 mt-1">Manage medical professionals and their credentials</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-900">{totalDoctors}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaUserMd className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Doctors</p>
              <p className="text-3xl font-bold text-green-600">{activeDoctors}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaUserMd className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Donations Supervised</p>
              <p className="text-3xl font-bold text-primary-600">{totalSupervised}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Specializations</p>
              <p className="text-3xl font-bold text-secondary-600">{specializations.length}</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <FaHospital className="w-8 h-8 text-secondary-600" />
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
              placeholder="Search doctors..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <button className="btn-outline flex items-center justify-center">
            <FaFilter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervised</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-gray-500">{doctor.licenseNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.hospital.split(',')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="flex items-center">
                        <FaPhone className="w-3 h-3 mr-1 text-gray-400" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaEnvelope className="w-3 h-3 mr-1 text-gray-400" />
                        {doctor.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.totalDonationsSupervised}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor);
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
                      <button className="text-red-600 hover:text-red-900" title="Suspend">
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

      {/* Add Doctor Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Doctor"
        size="lg"
      >
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
              <input
                type="text"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                className="input-field"
                placeholder="Dr. Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
              <select
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Specialization</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital *</label>
              <select
                value={newDoctor.hospital}
                onChange={(e) => setNewDoctor({...newDoctor, hospital: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Hospital</option>
                {INDIAN_HOSPITALS.map((hospital, index) => (
                  <option key={index} value={hospital}>{hospital}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
              <input
                type="text"
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                className="input-field"
                placeholder="e.g., 10 years"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                className="input-field"
                placeholder="+91 12345 67890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                className="input-field"
                placeholder="doctor@hospital.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
              <input
                type="text"
                value={newDoctor.licenseNumber}
                onChange={(e) => setNewDoctor({...newDoctor, licenseNumber: e.target.value})}
                className="input-field"
                placeholder="Medical license number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              <input
                type="text"
                value={newDoctor.qualifications}
                onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
                className="input-field"
                placeholder="MBBS, MD, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={newDoctor.address}
                onChange={(e) => setNewDoctor({...newDoctor, address: e.target.value})}
                className="input-field"
                rows="3"
                placeholder="Complete address"
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Doctor</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Doctor Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Doctor Details"
        size="lg"
      >
        {selectedDoctor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Doctor ID:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Specialization:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.specialization}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Hospital:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.hospital}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Experience:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.experience}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">License Number:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.licenseNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Qualifications:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.qualifications || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <p className="text-sm text-gray-900">{selectedDoctor.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Donations Supervised:</span>
                  <p className="text-sm text-gray-900">{selectedDoctor.totalDonationsSupervised}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <p className={`text-sm font-medium ${getStatusColor(selectedDoctor.status)}`}>
                    {selectedDoctor.status}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Registration Date:</span>
                  <p className="text-sm text-gray-900">{selectedDoctor.registrationDate || 'Not available'}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">Professional Status:</h5>
              <p className="text-sm text-blue-700">
                Licensed medical professional authorized to supervise blood donations and medical procedures.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Doctors;
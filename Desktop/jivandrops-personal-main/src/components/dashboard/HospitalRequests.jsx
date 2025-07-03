import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaHospital, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA } from '../../utils/constants';
import Modal from '../common/Modal';

const HospitalRequests = () => {
  const [hospitals, setHospitals] = useState(MOCK_DATA.hospitals);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    licenseNumber: '',
    hospitalType: 'Government'
  });

  const handleAddHospital = (e) => {
    e.preventDefault();
    const hospital = {
      id: `HSP${String(hospitals.length + 1).padStart(3, '0')}`,
      name: newHospital.name,
      location: newHospital.location,
      contactPerson: newHospital.contactPerson,
      phone: newHospital.phone,
      email: newHospital.email,
      address: newHospital.address,
      licenseNumber: newHospital.licenseNumber,
      hospitalType: newHospital.hospitalType,
      totalRequests: 0,
      pendingRequests: 0,
      lastRequest: null,
      status: 'Active',
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setHospitals([hospital, ...hospitals]);
    setShowAddModal(false);
    setNewHospital({
      name: '',
      location: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      licenseNumber: '',
      hospitalType: 'Government'
    });
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || hospital.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-approved';
      case 'Inactive': return 'status-pending';
      case 'Suspended': return 'status-critical';
      default: return 'status-pending';
    }
  };

  const totalHospitals = hospitals.length;
  const activeHospitals = hospitals.filter(h => h.status === 'Active').length;
  const totalRequests = hospitals.reduce((sum, h) => sum + h.totalRequests, 0);
  const pendingRequests = hospitals.reduce((sum, h) => sum + h.pendingRequests, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Requests</h1>
          <p className="text-gray-600 mt-1">Manage hospital partnerships and blood requests</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Hospital
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hospitals</p>
              <p className="text-3xl font-bold text-gray-900">{totalHospitals}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaHospital className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Partners</p>
              <p className="text-3xl font-bold text-green-600">{activeHospitals}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaHospital className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-primary-600">{totalRequests}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingRequests}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaPhone className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search hospitals..."
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

          <button className="btn-outline flex items-center justify-center">
            <FaFilter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Hospitals Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Requests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Request</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {hospital.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{hospital.name}</div>
                      <div className="text-gray-500">{hospital.hospitalType || 'Government'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{hospital.contactPerson}</div>
                      <div className="text-gray-500 flex items-center">
                        <FaPhone className="w-3 h-3 mr-1" />
                        {hospital.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hospital.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hospital.totalRequests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                    {hospital.pendingRequests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hospital.lastRequest || 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedHospital(hospital);
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

      {/* Add Hospital Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Hospital"
        size="lg"
      >
        <form onSubmit={handleAddHospital} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name *</label>
              <input
                type="text"
                value={newHospital.name}
                onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                className="input-field"
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type *</label>
              <select
                value={newHospital.hospitalType}
                onChange={(e) => setNewHospital({...newHospital, hospitalType: e.target.value})}
                className="input-field"
                required
              >
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Trust">Trust</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={newHospital.location}
                onChange={(e) => setNewHospital({...newHospital, location: e.target.value})}
                className="input-field"
                placeholder="City, State"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
              <input
                type="text"
                value={newHospital.licenseNumber}
                onChange={(e) => setNewHospital({...newHospital, licenseNumber: e.target.value})}
                className="input-field"
                placeholder="Hospital license number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input
                type="text"
                value={newHospital.contactPerson}
                onChange={(e) => setNewHospital({...newHospital, contactPerson: e.target.value})}
                className="input-field"
                placeholder="Dr. Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={newHospital.phone}
                onChange={(e) => setNewHospital({...newHospital, phone: e.target.value})}
                className="input-field"
                placeholder="+91 12345 67890"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={newHospital.email}
                onChange={(e) => setNewHospital({...newHospital, email: e.target.value})}
                className="input-field"
                placeholder="hospital@example.com"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                value={newHospital.address}
                onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                className="input-field"
                rows="3"
                placeholder="Complete hospital address"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Hospital</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Hospital Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Hospital Details"
        size="lg"
      >
        {selectedHospital && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Hospital Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Hospital ID:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.hospitalType || 'Government'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">License Number:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.licenseNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Contact Person:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <p className="text-sm text-gray-900">{selectedHospital.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Request Statistics</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Total Requests:</span>
                  <p className="text-sm text-gray-900">{selectedHospital.totalRequests}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Pending Requests:</span>
                  <p className="text-sm text-yellow-600">{selectedHospital.pendingRequests}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Request:</span>
                  <p className="text-sm text-gray-900">{selectedHospital.lastRequest || 'Never'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Registration Date:</span>
                  <p className="text-sm text-gray-900">{selectedHospital.registrationDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">Partnership Status:</h5>
              <p className={`text-sm font-medium ${getStatusColor(selectedHospital.status)}`}>
                {selectedHospital.status} Partner
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HospitalRequests;
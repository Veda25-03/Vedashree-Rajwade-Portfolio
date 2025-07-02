import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPhone, FaHospital } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA, REQUEST_STATUS, BLOOD_GROUPS, INDIAN_HOSPITALS } from '../../utils/constants';
import Modal from '../common/Modal';

const BloodRequests = () => {
  const [requests, setRequests] = useState(MOCK_DATA.requests);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');

  const [newRequest, setNewRequest] = useState({
    hospital: '',
    bloodGroup: '',
    units: '',
    urgency: 'Normal',
    patientName: '',
    patientAge: '',
    reason: '',
    contactNumber: '',
    requester: '',
    expectedDate: ''
  });

  const handleAddRequest = (e) => {
    e.preventDefault();
    const request = {
      id: `REQ${String(requests.length + 1).padStart(3, '0')}`,
      hospital: newRequest.hospital,
      bloodGroup: newRequest.bloodGroup,
      units: parseInt(newRequest.units),
      urgency: newRequest.urgency,
      status: newRequest.urgency === 'Critical' ? 'Critical' : 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      patientName: newRequest.patientName,
      patientAge: parseInt(newRequest.patientAge),
      reason: newRequest.reason,
      contactNumber: newRequest.contactNumber,
      requester: newRequest.requester,
      expectedDate: newRequest.expectedDate
    };

    setRequests([request, ...requests]);
    setShowAddModal(false);
    setNewRequest({
      hospital: '',
      bloodGroup: '',
      units: '',
      urgency: 'Normal',
      patientName: '',
      patientAge: '',
      reason: '',
      contactNumber: '',
      requester: '',
      expectedDate: ''
    });
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || request.status === statusFilter;
    const matchesBloodGroup = bloodGroupFilter === '' || request.bloodGroup === bloodGroupFilter;
    
    return matchesSearch && matchesStatus && matchesBloodGroup;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'status-critical';
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Fulfilled': return 'status-completed';
      default: return 'status-pending';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blood Requests</h1>
          <p className="text-gray-600 mt-1">Manage and track blood requests from hospitals</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.totalRequests}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-yellow-600">{MOCK_DATA.stats.pendingRequests}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaHospital className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Requests</p>
              <p className="text-3xl font-bold text-red-600">{MOCK_DATA.stats.criticalRequests}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaPhone className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fulfilled Today</p>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-green-600" />
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
              placeholder="Search requests..."
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
            {Object.values(REQUEST_STATUS).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={bloodGroupFilter}
            onChange={(e) => setBloodGroupFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <button className="btn-outline flex items-center justify-center">
            <FaFilter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{request.hospital.split(',')[0]}</div>
                      <div className="text-gray-500">{request.requester}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{request.patientName}</div>
                      <div className="text-gray-500">Age: {request.patientAge}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {request.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(request.status)}`}
                    >
                      {Object.values(REQUEST_STATUS).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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

      {/* Add Request Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Blood Request"
        size="lg"
      >
        <form onSubmit={handleAddRequest} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name *</label>
              <select
                value={newRequest.hospital}
                onChange={(e) => setNewRequest({...newRequest, hospital: e.target.value})}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Requesting Doctor *</label>
              <input
                type="text"
                value={newRequest.requester}
                onChange={(e) => setNewRequest({...newRequest, requester: e.target.value})}
                className="input-field"
                placeholder="Dr. Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
              <input
                type="text"
                value={newRequest.patientName}
                onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                className="input-field"
                placeholder="Patient name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age *</label>
              <input
                type="number"
                value={newRequest.patientAge}
                onChange={(e) => setNewRequest({...newRequest, patientAge: e.target.value})}
                className="input-field"
                placeholder="Age"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
              <select
                value={newRequest.bloodGroup}
                onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed *</label>
              <input
                type="number"
                value={newRequest.units}
                onChange={(e) => setNewRequest({...newRequest, units: e.target.value})}
                className="input-field"
                placeholder="Number of units"
                min="1"
                max="10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency *</label>
              <select
                value={newRequest.urgency}
                onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                className="input-field"
                required
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
              <input
                type="tel"
                value={newRequest.contactNumber}
                onChange={(e) => setNewRequest({...newRequest, contactNumber: e.target.value})}
                className="input-field"
                placeholder="+91 12345 67890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Date *</label>
              <input
                type="date"
                value={newRequest.expectedDate}
                onChange={(e) => setNewRequest({...newRequest, expectedDate: e.target.value})}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Request *</label>
            <textarea
              value={newRequest.reason}
              onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
              className="input-field"
              rows="3"
              placeholder="Medical condition or reason for blood requirement"
              required
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Request</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Request Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Request Details"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Request ID:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Hospital:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.hospital}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Requesting Doctor:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.requester}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Contact:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.contactNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Patient Name:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.patientName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Age:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.patientAge} years</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Blood Group:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.bloodGroup}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Units Needed:</span>
                    <p className="text-sm text-gray-900">{selectedRequest.units}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Details</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">{selectedRequest.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <p className={`text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Urgency:</span>
                <p className={`text-sm font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                  {selectedRequest.urgency}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Expected Date:</span>
                <p className="text-sm text-gray-900">{selectedRequest.expectedDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BloodRequests;
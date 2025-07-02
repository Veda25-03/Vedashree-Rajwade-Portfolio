import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPhone, FaEnvelope, FaHistory, FaUser } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA, DONOR_STATUS, BLOOD_GROUPS, INDIAN_CITIES } from '../../utils/constants';
import Modal from '../common/Modal';

const DonorManagement = () => {
  const [donors, setDonors] = useState(MOCK_DATA.donors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');

  const [newDonor, setNewDonor] = useState({
    name: '',
    phone: '',
    email: '',
    bloodGroup: '',
    age: '',
    gender: '',
    address: '',
    city: '',
    weight: '',
    lastDonation: '',
    medicalHistory: '',
    emergencyContact: ''
  });

  const handleAddDonor = (e) => {
    e.preventDefault();
    const donor = {
      id: `DN${String(donors.length + 1).padStart(3, '0')}`,
      name: newDonor.name,
      phone: newDonor.phone,
      email: newDonor.email,
      bloodGroup: newDonor.bloodGroup,
      age: parseInt(newDonor.age),
      gender: newDonor.gender,
      address: newDonor.address,
      city: newDonor.city,
      weight: parseInt(newDonor.weight),
      lastDonation: newDonor.lastDonation || null,
      totalDonations: newDonor.lastDonation ? 1 : 0,
      status: 'Active',
      nextEligible: newDonor.lastDonation ? 
        new Date(new Date(newDonor.lastDonation).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
        new Date().toISOString().split('T')[0],
      registrationDate: new Date().toISOString().split('T')[0],
      medicalHistory: newDonor.medicalHistory,
      emergencyContact: newDonor.emergencyContact,
      donationHistory: newDonor.lastDonation ? [{
        date: newDonor.lastDonation,
        location: 'JIVAN Blood Bank',
        units: 1,
        doctor: 'Dr. Anjali Deshmukh'
      }] : []
    };

    setDonors([donor, ...donors]);
    setShowAddModal(false);
    setNewDonor({
      name: '',
      phone: '',
      email: '',
      bloodGroup: '',
      age: '',
      gender: '',
      address: '',
      city: '',
      weight: '',
      lastDonation: '',
      medicalHistory: '',
      emergencyContact: ''
    });
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.phone.includes(searchTerm) ||
                         donor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || donor.status === statusFilter;
    const matchesBloodGroup = bloodGroupFilter === '' || donor.bloodGroup === bloodGroupFilter;
    
    return matchesSearch && matchesStatus && matchesBloodGroup;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-approved';
      case 'Eligible': return 'status-completed';
      case 'Inactive': return 'status-pending';
      case 'Suspended': return 'status-critical';
      default: return 'status-pending';
    }
  };

  const isEligibleForDonation = (lastDonation) => {
    if (!lastDonation) return true;
    const lastDate = new Date(lastDonation);
    const today = new Date();
    const daysDiff = (today - lastDate) / (1000 * 60 * 60 * 24);
    return daysDiff >= 90;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
          <p className="text-gray-600 mt-1">Manage blood donors and track donation history</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Donor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-3xl font-bold text-gray-900">{MOCK_DATA.stats.totalDonors}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaUser className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eligible Donors</p>
              <p className="text-3xl font-bold text-green-600">{MOCK_DATA.stats.eligibleDonors}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-3xl font-bold text-primary-600">{MOCK_DATA.stats.activeDonorsToday}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <FaPhone className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-3xl font-bold text-secondary-600">47</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <FaPlus className="w-8 h-8 text-secondary-600" />
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
              placeholder="Search donors..."
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
            {Object.values(DONOR_STATUS).map(status => (
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

      {/* Donors Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Donations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligibility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donor.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{donor.name}</div>
                      <div className="text-gray-500">{donor.age} years, {donor.gender}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="flex items-center">
                        <FaPhone className="w-3 h-3 mr-1 text-gray-400" />
                        {donor.phone}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaEnvelope className="w-3 h-3 mr-1 text-gray-400" />
                        {donor.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.lastDonation || 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.totalDonations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donor.status)}`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEligibleForDonation(donor.lastDonation) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {donor.nextEligible}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDonor(donor);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDonor(donor);
                          setShowHistoryModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="View History"
                      >
                        <FaHistory className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900" title="Edit">
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
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

      {/* Add Donor Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Donor"
        size="xl"
      >
        <form onSubmit={handleAddDonor} className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                  className="input-field"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  value={newDonor.age}
                  onChange={(e) => setNewDonor({...newDonor, age: e.target.value})}
                  className="input-field"
                  placeholder="Age"
                  min="18"
                  max="65"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  value={newDonor.gender}
                  onChange={(e) => setNewDonor({...newDonor, gender: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
                <select
                  value={newDonor.bloodGroup}
                  onChange={(e) => setNewDonor({...newDonor, bloodGroup: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  value={newDonor.weight}
                  onChange={(e) => setNewDonor({...newDonor, weight: e.target.value})}
                  className="input-field"
                  placeholder="Weight in kg"
                  min="45"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <select
                  value={newDonor.city}
                  onChange={(e) => setNewDonor({...newDonor, city: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select City</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})}
                  className="input-field"
                  placeholder="+91 12345 67890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({...newDonor, email: e.target.value})}
                  className="input-field"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea
                  value={newDonor.address}
                  onChange={(e) => setNewDonor({...newDonor, address: e.target.value})}
                  className="input-field"
                  rows="2"
                  placeholder="Complete address"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  value={newDonor.emergencyContact}
                  onChange={(e) => setNewDonor({...newDonor, emergencyContact: e.target.value})}
                  className="input-field"
                  placeholder="+91 12345 67890"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Donation Date</label>
                <input
                  type="date"
                  value={newDonor.lastDonation}
                  onChange={(e) => setNewDonor({...newDonor, lastDonation: e.target.value})}
                  className="input-field"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                <textarea
                  value={newDonor.medicalHistory}
                  onChange={(e) => setNewDonor({...newDonor, medicalHistory: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Any medical conditions, allergies, or medications"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Donor</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Donor Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Donor Details"
        size="lg"
      >
        {selectedDonor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Donor ID:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Age & Gender:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.age} years, {selectedDonor.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Blood Group:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.bloodGroup}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Weight:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.weight} kg</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.address}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Emergency Contact:</span>
                    <p className="text-sm text-gray-900">{selectedDonor.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Donation Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Total Donations:</span>
                  <p className="text-sm text-gray-900">{selectedDonor.totalDonations}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Donation:</span>
                  <p className="text-sm text-gray-900">{selectedDonor.lastDonation || 'Never'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Next Eligible:</span>
                  <p className="text-sm text-gray-900">{selectedDonor.nextEligible}</p>
                </div>
              </div>
            </div>

            {selectedDonor.medicalHistory && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900">{selectedDonor.medicalHistory}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Donation History Modal */}
      <Modal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="Donation History"
        size="lg"
      >
        {selectedDonor && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                {selectedDonor.name} - Donation History
              </h4>
              <span className="text-sm text-gray-500">
                Total Donations: {selectedDonor.totalDonations}
              </span>
            </div>

            {selectedDonor.donationHistory && selectedDonor.donationHistory.length > 0 ? (
              <div className="space-y-4">
                {selectedDonor.donationHistory.map((donation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Date:</span>
                        <p className="text-sm text-gray-900">{donation.date}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Location:</span>
                        <p className="text-sm text-gray-900">{donation.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Units:</span>
                        <p className="text-sm text-gray-900">{donation.units}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Doctor:</span>
                        <p className="text-sm text-gray-900">{donation.doctor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaHistory className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No donation history available</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">Eligibility Status:</h5>
              <p className="text-sm text-blue-700">
                {isEligibleForDonation(selectedDonor.lastDonation) 
                  ? "✅ Eligible for donation" 
                  : `❌ Next eligible date: ${selectedDonor.nextEligible}`
                }
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonorManagement;
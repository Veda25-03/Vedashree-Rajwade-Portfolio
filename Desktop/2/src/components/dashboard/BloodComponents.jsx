import { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA, BLOOD_GROUPS } from '../../utils/constants';
import Modal from '../common/Modal';

const BloodComponents = () => {
  const [inventory, setInventory] = useState(MOCK_DATA.bloodInventory);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const [newComponent, setNewComponent] = useState({
    bloodGroup: '',
    units: '',
    location: 'Main Bank',
    donorId: '',
    collectionDate: '',
    expiryDate: '',
    notes: ''
  });

  const handleAddComponent = (e) => {
    e.preventDefault();
    const component = {
      group: newComponent.bloodGroup,
      units: parseInt(newComponent.units),
      location: newComponent.location,
      donorId: newComponent.donorId,
      collectionDate: newComponent.collectionDate,
      expiryDate: newComponent.expiryDate,
      lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' '),
      notes: newComponent.notes,
      expiringSoon: 0
    };

    // Update existing inventory or add new
    const existingIndex = inventory.findIndex(item => 
      item.group === component.group && item.location === component.location
    );

    if (existingIndex >= 0) {
      const updatedInventory = [...inventory];
      updatedInventory[existingIndex].units += component.units;
      updatedInventory[existingIndex].lastUpdated = component.lastUpdated;
      setInventory(updatedInventory);
    } else {
      setInventory([component, ...inventory]);
    }

    setShowAddModal(false);
    setNewComponent({
      bloodGroup: '',
      units: '',
      location: 'Main Bank',
      donorId: '',
      collectionDate: '',
      expiryDate: '',
      notes: ''
    });
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = bloodGroupFilter === '' || item.group === bloodGroupFilter;
    const matchesLocation = locationFilter === '' || item.location === locationFilter;
    
    return matchesSearch && matchesBloodGroup && matchesLocation;
  });

  const getStockLevel = (units) => {
    if (units < 20) return { level: 'Critical', color: 'text-red-600 bg-red-100' };
    if (units < 50) return { level: 'Low', color: 'text-yellow-600 bg-yellow-100' };
    if (units < 100) return { level: 'Normal', color: 'text-green-600 bg-green-100' };
    return { level: 'High', color: 'text-blue-600 bg-blue-100' };
  };

  const locations = ['Main Bank', 'Emergency Ward', 'ICU Reserve', 'Critical Care', 'Surgery Unit'];

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const criticalStock = inventory.filter(item => item.units < 20).length;
  const expiringUnits = inventory.reduce((sum, item) => sum + item.expiringSoon, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blood Components</h1>
          <p className="text-gray-600 mt-1">Manage blood inventory and track components</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Blood Units
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Units</p>
              <p className="text-3xl font-bold text-gray-900">{totalUnits}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blood Groups</p>
              <p className="text-3xl font-bold text-primary-600">{BLOOD_GROUPS.length}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <MdBloodtype className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Stock</p>
              <p className="text-3xl font-bold text-red-600">{criticalStock}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-3xl font-bold text-yellow-600">{expiringUnits}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaExclamationTriangle className="w-8 h-8 text-yellow-600" />
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
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

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

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <button className="btn-outline flex items-center justify-center">
            <FaFilter className="w-4 h-4 mr-2" />
            Expiry Filter
          </button>
        </div>
      </div>

      {/* Blood Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredInventory.map((item, index) => {
          const stockLevel = getStockLevel(item.units);
          return (
            <div key={index} className="card p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-3">
                    <MdBloodtype className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.group}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockLevel.color}`}>
                  {stockLevel.level}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Units:</span>
                  <span className="text-sm font-semibold text-gray-900">{item.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expiring Soon:</span>
                  <span className="text-sm font-semibold text-yellow-600">{item.expiringSoon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm text-gray-500">{item.lastUpdated}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedComponent(item);
                    setShowViewModal(true);
                  }}
                  className="flex-1 btn-outline text-xs py-2"
                >
                  <FaEye className="w-3 h-3 mr-1" />
                  View
                </button>
                <button className="flex-1 btn-primary text-xs py-2">
                  <FaEdit className="w-3 h-3 mr-1" />
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiring Soon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item, index) => {
                const stockLevel = getStockLevel(item.units);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-2" />
                        {item.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {item.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                      {item.expiringSoon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockLevel.color}`}>
                        {stockLevel.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedComponent(item);
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Component Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Blood Units"
        size="lg"
      >
        <form onSubmit={handleAddComponent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
              <select
                value={newComponent.bloodGroup}
                onChange={(e) => setNewComponent({...newComponent, bloodGroup: e.target.value})}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Units *</label>
              <input
                type="number"
                value={newComponent.units}
                onChange={(e) => setNewComponent({...newComponent, units: e.target.value})}
                className="input-field"
                placeholder="Number of units"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location *</label>
              <select
                value={newComponent.location}
                onChange={(e) => setNewComponent({...newComponent, location: e.target.value})}
                className="input-field"
                required
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Donor ID</label>
              <input
                type="text"
                value={newComponent.donorId}
                onChange={(e) => setNewComponent({...newComponent, donorId: e.target.value})}
                className="input-field"
                placeholder="DN001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Collection Date *</label>
              <input
                type="date"
                value={newComponent.collectionDate}
                onChange={(e) => setNewComponent({...newComponent, collectionDate: e.target.value})}
                className="input-field"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
              <input
                type="date"
                value={newComponent.expiryDate}
                onChange={(e) => setNewComponent({...newComponent, expiryDate: e.target.value})}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={newComponent.notes}
              onChange={(e) => setNewComponent({...newComponent, notes: e.target.value})}
              className="input-field"
              rows="3"
              placeholder="Additional notes about the blood units"
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">Add Units</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* View Component Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Blood Component Details"
        size="lg"
      >
        {selectedComponent && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Component Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Blood Group:</span>
                    <p className="text-sm text-gray-900">{selectedComponent.group}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Available Units:</span>
                    <p className="text-sm text-gray-900">{selectedComponent.units}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Storage Location:</span>
                    <p className="text-sm text-gray-900">{selectedComponent.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Stock Level:</span>
                    <p className={`text-sm font-medium ${getStockLevel(selectedComponent.units).color}`}>
                      {getStockLevel(selectedComponent.units).level}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Expiring Soon:</span>
                    <p className="text-sm text-yellow-600">{selectedComponent.expiringSoon} units</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                    <p className="text-sm text-gray-900">{selectedComponent.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">Storage Guidelines:</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Store at 2-6°C for whole blood and red blood cells</li>
                <li>• Plasma should be stored at -18°C or below</li>
                <li>• Platelets should be stored at 20-24°C with agitation</li>
                <li>• Regular temperature monitoring is essential</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BloodComponents;
import { useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaEye, FaUser, FaCog, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { MOCK_DATA } from '../../utils/constants';
import Modal from '../common/Modal';

const ActivityLogs = () => {
  const [logs, setLogs] = useState(MOCK_DATA.activityLogs);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === '' || log.severity === severityFilter;
    const matchesType = typeFilter === '' || log.type === typeFilter;
    const matchesDate = dateFilter === '' || log.timestamp.startsWith(dateFilter);
    
    return matchesSearch && matchesSeverity && matchesType && matchesDate;
  });

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <FaExclamationTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <FaInfoCircle className="w-4 h-4 text-blue-600" />;
      default: return <FaCheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'approval': return <FaCheckCircle className="w-4 h-4 text-green-600" />;
      case 'alert': return <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />;
      case 'donation': return <MdBloodtype className="w-4 h-4 text-red-600" />;
      case 'registration': return <FaUser className="w-4 h-4 text-blue-600" />;
      case 'inventory': return <FaCog className="w-4 h-4 text-gray-600" />;
      default: return <FaInfoCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const logTypes = ['approval', 'alert', 'donation', 'registration', 'inventory'];
  const severityLevels = ['high', 'warning', 'info'];

  const totalLogs = logs.length;
  const highSeverityLogs = logs.filter(log => log.severity === 'high').length;
  const todayLogs = logs.filter(log => log.timestamp.startsWith(new Date().toISOString().split('T')[0])).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">Monitor system activities and user actions</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline flex items-center">
            <FaFilter className="w-4 h-4 mr-2" />
            Advanced Filter
          </button>
          <button className="btn-primary flex items-center">
            <FaDownload className="w-4 h-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-3xl font-bold text-gray-900">{totalLogs}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaInfoCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-red-600">{highSeverityLogs}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Activities</p>
              <p className="text-3xl font-bold text-primary-600">{todayLogs}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <FaCog className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-3xl font-bold text-green-600">Online</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Severity</option>
            {severityLevels.map(level => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            {logTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input-field"
          />

          <button
            onClick={() => {
              setSearchTerm('');
              setSeverityFilter('');
              setTypeFilter('');
              setDateFilter('');
            }}
            className="btn-outline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {filteredLogs.map((log) => {
            const timestamp = formatTimestamp(log.timestamp);
            return (
              <div key={log.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  <div className="bg-white border-2 border-gray-200 rounded-full p-2">
                    {getTypeIcon(log.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {getSeverityIcon(log.severity)}
                        <span className="ml-1">{log.severity}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLog(log);
                        setShowViewModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <FaUser className="w-3 h-3 mr-1" />
                        {log.user}
                      </span>
                      <span>{timestamp.date}</span>
                      <span>{timestamp.time}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      log.type === 'approval' ? 'bg-green-100 text-green-800' :
                      log.type === 'alert' ? 'bg-yellow-100 text-yellow-800' :
                      log.type === 'donation' ? 'bg-red-100 text-red-800' :
                      log.type === 'registration' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Logs Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Activity Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const timestamp = formatTimestamp(log.timestamp);
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{timestamp.date}</div>
                        <div className="text-gray-500">{timestamp.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(log.type)}
                        <span className="ml-2 text-sm text-gray-900">{log.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {getSeverityIcon(log.severity)}
                        <span className="ml-1">{log.severity}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Log Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Activity Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Log Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Log ID:</span>
                    <p className="text-sm text-gray-900">{selectedLog.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Timestamp:</span>
                    <p className="text-sm text-gray-900">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">User:</span>
                    <p className="text-sm text-gray-900">{selectedLog.user}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Action:</span>
                    <p className="text-sm text-gray-900">{selectedLog.action}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Classification</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <div className="flex items-center mt-1">
                      {getTypeIcon(selectedLog.type)}
                      <span className="ml-2 text-sm text-gray-900">{selectedLog.type}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Severity:</span>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(selectedLog.severity)}`}>
                        {getSeverityIcon(selectedLog.severity)}
                        <span className="ml-1">{selectedLog.severity}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Details</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">{selectedLog.details}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">System Information:</h5>
              <p className="text-sm text-blue-700">
                This activity was logged automatically by the JIVAN BBMS system for audit and compliance purposes.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivityLogs;
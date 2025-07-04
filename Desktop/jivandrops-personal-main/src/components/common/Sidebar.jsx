import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaHome, FaChartLine, FaHistory,
  FaChevronLeft, FaChevronRight,
  FaHeartbeat
} from 'react-icons/fa';
import { MdBloodtype, MdRequestPage } from 'react-icons/md';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
    { icon: MdRequestPage, label: 'Blood Requests', path: '/dashboard/requests' },
    { icon: MdBloodtype, label: 'Blood Components', path: '/dashboard/components' },
    { icon: FaChartLine, label: 'Trends & Analytics', path: '/dashboard/analytics' },
    { icon: FaHistory, label: 'Activity Logs', path: '/dashboard/logs' }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen relative`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <FaHeartbeat className="w-8 h-8 text-primary-600 flex-shrink-0" />
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">JIVAN-DROPS</h1>
              <p className="text-sm text-gray-500">Blood Bank System</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200"
      >
        {isCollapsed ? (
          <FaChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <FaChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="mt-8 px-2">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-600'}`} />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="mt-8 mx-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Total Units</span>
              <span className="text-xs font-semibold text-primary-600">823</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Active Donors</span>
              <span className="text-xs font-semibold text-secondary-600">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Pending Requests</span>
              <span className="text-xs font-semibold text-yellow-600">12</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ PropTypes validation
Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;

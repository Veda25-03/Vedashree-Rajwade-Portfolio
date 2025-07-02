import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import BloodRequests from './components/dashboard/BloodRequests';
import DonorManagement from './components/dashboard/DonorManagement';
import Appointments from './components/dashboard/Appointments';
import BloodComponents from './components/dashboard/BloodComponents';
import HospitalRequests from './components/dashboard/HospitalRequests';
import Doctors from './components/dashboard/Doctors';
import Analytics from './components/dashboard/Analytics';
import ActivityLogs from './components/dashboard/ActivityLogs';
import LoadingSpinner from './components/common/LoadingSpinner';
import PropTypes from 'prop-types';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="requests" element={<BloodRequests />} />
              <Route path="donors" element={<DonorManagement />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="components" element={<BloodComponents />} />
              <Route path="hospitals" element={<HospitalRequests />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="logs" element={<ActivityLogs />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App;
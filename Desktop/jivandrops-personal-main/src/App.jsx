import RegisterationPage from './components/auth/RegistrationPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { RequestsProvider } from './contexts/RequestsContext';
import LoginPage from './components/auth/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import BloodRequests from './components/dashboard/BloodRequests';
// import Appointments from './components/dashboard/Appointments';
import BloodComponents from './components/dashboard/BloodComponents';
// import HospitalRequests from './components/dashboard/HospitalRequests';
import Analytics from './components/dashboard/Analytics';
import ActivityLogs from './components/dashboard/ActivityLogs';
import LoadingSpinner from './components/common/LoadingSpinner';
import PropTypes from 'prop-types';
import { SocketContextProvider } from './contexts/SocketContext';
import { useContext, useEffect } from 'react';

// Message shown if not logged in
const NotLoggedInMessage = () => (
  <div className="flex items-center justify-center h-full text-center p-8">
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        You must be logged in to view this section.
      </h2>
      <p className="text-gray-600">Please log in to continue.</p>
    </div>
  </div>
);

// Protected Route that shows message if not logged in
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return isAuthenticated ? children : <NotLoggedInMessage />;
};

// Public Route: prevents access to login/register if already logged in
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
  const { socket } = useContext(SocketContextProvider);

  useEffect(() => {
    socket.emit('join', '8eb60f55-d107-4d2c-88ba-7b9020ccd952');
  }, [socket]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterationPage />
                </PublicRoute>
              }
            />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route
                path="requests"
                element={
                  <ProtectedRoute>
                    <BloodRequests />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="appointments" element={<Appointments />} /> */}
              <Route
                path="components"
                element={
                  <ProtectedRoute>
                    <BloodComponents />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="hospitals" element={<HospitalRequests />} /> */}
              <Route
                path="analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="logs"
                element={
                  <ProtectedRoute>
                    <ActivityLogs />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
{/*he appendOffsetOfLegend.jsx code below is the orignal code brfore adding the protected routes if this creates a conflict in integration of you can copy the code given below and paste it or use it and re work with it */}
// import RegisterationPage from './components/auth/RegistrationPage';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import { RequestsProvider } from './contexts/RequestsContext'; 
// // import LandingPage from './components/landing/LandingPage';
// import LoginPage from './components/auth/LoginPage';
// import DashboardLayout from './components/dashboard/DashboardLayout';
// import DashboardOverview from './components/dashboard/DashboardOverview';
// import BloodRequests from './components/dashboard/BloodRequests';
// // import Appointments from './components/dashboard/Appointments';
// import BloodComponents from './components/dashboard/BloodComponents';
// // import HospitalRequests from './components/dashboard/HospitalRequests';
// import Analytics from './components/dashboard/Analytics';
// import ActivityLogs from './components/dashboard/ActivityLogs';
// import LoadingSpinner from './components/common/LoadingSpinner';
// import PropTypes from 'prop-types';
// // import UserProtectedWrapper from './components/UserProtectedWrapper';
// import {SocketContextProvider} from './contexts/SocketContext';
// import { useContext, useEffect } from 'react';

// // 🔐 Protected Route
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="xl" />
//       </div>
//     );
//   }

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// // 🔓 Public Route
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="xl" />
//       </div>
//     );
//   }

//   return !isAuthenticated ? children : <Navigate to="/dashboard" />;
// };

// function App() {
//   const { socket } = useContext(SocketContextProvider);

//   useEffect(() => {
//     socket.emit('join', ("8eb60f55-d107-4d2c-88ba-7b9020ccd952"))
//   }, [socket]);

//   return (
//     <AuthProvider>
//       {/* <RequestsProvider> */}
//         <Router>
//           <div className="App">
//             <Routes>
//               {/*  Public Routes */}
//               {/* Redirect "/" to "/dashboard" */}
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route
//                 path="/login"
//                 element={
//                   <PublicRoute>
//                     <LoginPage />
//                   </PublicRoute>
//                 }
//               />
//               <Route
//                 path="/register"
//                 element={
//                   <PublicRoute>
//                     <RegisterationPage />
//                   </PublicRoute>
//                 }
//               />

//               {/*  Protected Dashboard Routes */}
//               <Route
//                 path="/dashboard"
//                 element={
                  
//                   <DashboardLayout />
//                 }
//               >
                
//                   <Route index element={<DashboardOverview />} />
//                   <Route path="requests" element={<BloodRequests />} />
//                   {/* <Route path="appointments" element={<Appointments />} /> */}
//                   <Route path="components" element={<BloodComponents />} />
//                   {/* <Route path="hospitals" element={<HospitalRequests />} /> */}
//                   <Route path="analytics" element={<Analytics />} />
//                   <Route path="logs" element={<ActivityLogs />} />
                
//               </Route>

//               {/* 🔁 Fallback */}
//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </div>
//         </Router>
//       {/* </RequestsProvider> */}
//     </AuthProvider>
//   );
// }

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// PublicRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default App; 
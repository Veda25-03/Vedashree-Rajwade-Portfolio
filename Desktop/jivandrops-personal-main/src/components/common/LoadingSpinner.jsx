import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FaSpinner className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
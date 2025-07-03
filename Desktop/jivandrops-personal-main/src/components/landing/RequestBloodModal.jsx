import { useState } from 'react';
import { FaTimes, FaHospital, FaPhone, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { BLOOD_GROUPS, INDIAN_HOSPITALS } from '../../utils/constants';

const RequestBloodModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    patientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    urgency: 'Normal',
    contactNumber: '',
    requiredDate: '',
    reason: '',
    doctorName: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        hospitalName: '',
        patientName: '',
        bloodGroup: '',
        unitsNeeded: '',
        urgency: 'Normal',
        contactNumber: '',
        requiredDate: '',
        reason: '',
        doctorName: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-2xl">
          {!isSubmitted ? (
            <>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <MdBloodtype className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Request Blood</h3>
                      <p className="text-sm text-gray-600">Submit your blood requirement request</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaHospital className="inline w-4 h-4 mr-2" />
                        Hospital Name *
                      </label>
                      <select
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="inline w-4 h-4 mr-2" />
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter patient name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MdBloodtype className="inline w-4 h-4 mr-2" />
                        Blood Group *
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {BLOOD_GROUPS.map((group) => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Units Needed *
                      </label>
                      <input
                        type="number"
                        name="unitsNeeded"
                        value={formData.unitsNeeded}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Number of units"
                        min="1"
                        max="10"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level *
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline w-4 h-4 mr-2" />
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+91 12345 67890"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="inline w-4 h-4 mr-2" />
                        Required Date *
                      </label>
                      <input
                        type="date"
                        name="requiredDate"
                        value={formData.requiredDate}
                        onChange={handleChange}
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doctor Name *
                      </label>
                      <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Dr. Name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Request *
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="input-field"
                      rows="3"
                      placeholder="Brief description of medical condition or reason"
                      required
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Important Information:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• All requests are subject to blood availability</li>
                      <li>• Critical requests are processed within 2 hours</li>
                      <li>• You will receive confirmation via SMS/Email</li>
                      <li>• Contact our 24/7 helpline: +91 90281 12345</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      Submit Request
                    </button>
                    <button type="button" onClick={onClose} className="btn-outline flex-1">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 text-center">
              <div className="bg-green-100 p-6 rounded-lg">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Request Submitted Successfully!</h3>
                <p className="text-green-700 mb-4">
                  Your blood request has been submitted with ID: <strong>REQ{Date.now().toString().slice(-6)}</strong>
                </p>
                <div className="text-sm text-green-600">
                  <p>• You will receive confirmation within 30 minutes</p>
                  <p>• Our team will contact you at {formData.contactNumber}</p>
                  <p>• Track your request status via SMS updates</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestBloodModal;
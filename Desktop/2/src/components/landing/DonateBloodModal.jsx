import { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaWeight } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { BLOOD_GROUPS, INDIAN_CITIES } from '../../utils/constants';

const DonateBloodModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    lastDonation: '',
    medicalHistory: '',
    emergencyContact: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        fullName: '',
        age: '',
        gender: '',
        bloodGroup: '',
        weight: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        lastDonation: '',
        medicalHistory: '',
        emergencyContact: '',
        preferredDate: '',
        preferredTime: ''
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

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-4xl">
          {!isSubmitted ? (
            <>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <MdBloodtype className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Donate Blood</h3>
                      <p className="text-sm text-gray-600">Register as a blood donor and save lives</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaUser className="inline w-4 h-4 mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Age"
                          min="18"
                          max="65"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
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
                          <FaWeight className="inline w-4 h-4 mr-2" />
                          Weight (kg) *
                        </label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Weight in kg"
                          min="45"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
                          City *
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="input-field"
                          required
                        >
                          <option value="">Select City</option>
                          {INDIAN_CITIES.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaPhone className="inline w-4 h-4 mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="+91 12345 67890"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaEnvelope className="inline w-4 h-4 mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="input-field"
                          rows="2"
                          placeholder="Complete address"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="+91 12345 67890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaCalendarAlt className="inline w-4 h-4 mr-2" />
                          Last Donation Date
                        </label>
                        <input
                          type="date"
                          name="lastDonation"
                          value={formData.lastDonation}
                          onChange={handleChange}
                          className="input-field"
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medical History
                        </label>
                        <textarea
                          name="medicalHistory"
                          value={formData.medicalHistory}
                          onChange={handleChange}
                          className="input-field"
                          rows="3"
                          placeholder="Any medical conditions, allergies, or medications (optional)"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Appointment */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Preferred Appointment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="input-field"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option value="">Select Time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Donation Eligibility Criteria:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Age: 18-65 years</li>
                      <li>• Weight: Minimum 45 kg</li>
                      <li>• Hemoglobin: Minimum 12.5 g/dL</li>
                      <li>• No donation in last 3 months</li>
                      <li>• No recent illness or medication</li>
                      <li>• Free health checkup before donation</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      Register as Donor
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
                <h3 className="text-xl font-semibold text-green-800 mb-2">Registration Successful!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for registering as a blood donor! Your donor ID is: <strong>DN{Date.now().toString().slice(-6)}</strong>
                </p>
                <div className="text-sm text-green-600">
                  <p>• You will receive a confirmation email shortly</p>
                  <p>• Our team will contact you within 24 hours</p>
                  <p>• Health screening will be scheduled before donation</p>
                  <p>• You're helping save lives - Thank you!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateBloodModal;
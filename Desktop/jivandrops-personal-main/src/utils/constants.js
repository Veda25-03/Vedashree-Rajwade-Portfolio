export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const REQUEST_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  FULFILLED: 'Fulfilled',
  CRITICAL: 'Critical',
  REJECTED: 'Rejected'
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  MISSED: 'Missed',
  CANCELLED: 'Cancelled'
};

export const DONOR_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  ELIGIBLE: 'Eligible'
};

export const INDIAN_HOSPITALS = [
  'All India Institute of Medical Sciences (AIIMS), Delhi',
  'Tata Memorial Hospital, Mumbai',
  'Christian Medical College, Vellore',
  'Apollo Hospital, Chennai',
  'Fortis Healthcare, Gurgaon',
  'Max Healthcare, Delhi',
  'Manipal Hospital, Bangalore',
  'Ruby Hall Clinic, Pune',
  'Kokilaben Dhirubhai Ambani Hospital, Mumbai',
  'Medanta - The Medicity, Gurgaon',
  'Narayana Health, Bangalore',
  'Lilavati Hospital, Mumbai',
  'Sir Ganga Ram Hospital, Delhi',
  'BLK Super Speciality Hospital, Delhi',
  'Global Hospital, Chennai'
];

export const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 
  'Hyderabad', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad'
];

export const INDIAN_DOCTORS = [
  'Dr. Anjali Deshmukh', 'Dr. Vikram Singh', 'Dr. Reena Jadhav', 'Dr. Sunil Kale',
  'Dr. Priya Sharma', 'Dr. Rajesh Gupta', 'Dr. Meera Patel', 'Dr. Arjun Reddy',
  'Dr. Kavita Nair', 'Dr. Rohit Mehta', 'Dr. Sunita Joshi', 'Dr. Anil Kumar'
];

export const MOCK_DATA = {
  stats: {
    totalBloodUnits: 823,
    activeDonors: 156,
    scheduledAppointments: 23,
    criticalAlerts: 7,
    totalDonors: 2847,
    eligibleDonors: 1234,
    activeDonorsToday: 12,
    totalRequests: 145,
    pendingRequests: 23,
    criticalRequests: 7,
    completedAppointments: 89,
    missedAppointments: 12
  },
  
  bloodInventory: [
    { group: 'A+', units: 120, expiringSoon: 8, location: 'Main Bank', lastUpdated: '2024-01-20 14:30' },
    { group: 'A-', units: 45, expiringSoon: 3, location: 'Main Bank', lastUpdated: '2024-01-20 13:15' },
    { group: 'B+', units: 98, expiringSoon: 12, location: 'Emergency Ward', lastUpdated: '2024-01-20 15:45' },
    { group: 'B-', units: 32, expiringSoon: 2, location: 'Main Bank', lastUpdated: '2024-01-20 12:20' },
    { group: 'AB+', units: 67, expiringSoon: 5, location: 'ICU Reserve', lastUpdated: '2024-01-20 16:10' },
    { group: 'AB-', units: 23, expiringSoon: 1, location: 'Main Bank', lastUpdated: '2024-01-20 11:30' },
    { group: 'O+', units: 145, expiringSoon: 15, location: 'Emergency Ward', lastUpdated: '2024-01-20 14:50' },
    { group: 'O-', units: 78, expiringSoon: 6, location: 'Critical Care', lastUpdated: '2024-01-20 13:40' }
  ],

  donors: [
    {
      id: 'DN001',
      name: 'Priya Mehta',
      phone: '+91 98765 43210',
      email: 'priya.mehta@gmail.com',
      bloodGroup: 'O+',
      age: 28,
      gender: 'Female',
      address: '123 Linking Road, Bandra West, Mumbai - 400050',
      lastDonation: '2024-01-15',
      totalDonations: 8,
      status: 'Eligible',
      nextEligible: '2024-04-15',
      city: 'Mumbai',
      registrationDate: '2022-03-10',
      weight: 58,
      medicalHistory: 'No major health issues',
      emergencyContact: '+91 98765 43211',
      donationHistory: [
        { date: '2024-01-15', location: 'JIVAN Blood Bank, Mumbai', units: 1, doctor: 'Dr. Anjali Deshmukh' },
        { date: '2023-10-12', location: 'Apollo Hospital, Mumbai', units: 1, doctor: 'Dr. Vikram Singh' },
        { date: '2023-07-08', location: 'JIVAN Blood Bank, Mumbai', units: 1, doctor: 'Dr. Reena Jadhav' },
        { date: '2023-04-05', location: 'Lilavati Hospital, Mumbai', units: 1, doctor: 'Dr. Sunil Kale' },
        { date: '2023-01-02', location: 'JIVAN Blood Bank, Mumbai', units: 1, doctor: 'Dr. Anjali Deshmukh' }
      ]
    },
    {
      id: 'DN002', 
      name: 'Rajesh Patil',
      phone: '+91 87654 32109',
      email: 'rajesh.patil@yahoo.com',
      bloodGroup: 'A+',
      age: 35,
      gender: 'Male',
      address: '456 FC Road, Shivajinagar, Pune - 411005',
      lastDonation: '2024-02-20',
      totalDonations: 12,
      status: 'Active',
      nextEligible: '2024-05-20',
      city: 'Pune',
      registrationDate: '2021-08-15',
      weight: 72,
      medicalHistory: 'Hypertension (controlled)',
      emergencyContact: '+91 87654 32110',
      donationHistory: [
        { date: '2024-02-20', location: 'Ruby Hall Clinic, Pune', units: 1, doctor: 'Dr. Priya Sharma' },
        { date: '2023-11-18', location: 'JIVAN Blood Bank, Pune', units: 1, doctor: 'Dr. Rajesh Gupta' },
        { date: '2023-08-15', location: 'Sassoon Hospital, Pune', units: 1, doctor: 'Dr. Meera Patel' },
        { date: '2023-05-12', location: 'Ruby Hall Clinic, Pune', units: 1, doctor: 'Dr. Arjun Reddy' }
      ]
    },
    {
      id: 'DN003',
      name: 'Manish Kulkarni',
      phone: '+91 76543 21098',
      email: 'manish.kulkarni@hotmail.com',
      bloodGroup: 'B-',
      age: 42,
      gender: 'Male',
      address: '789 Andheri East, Mumbai - 400069',
      lastDonation: '2023-12-10',
      totalDonations: 15,
      status: 'Eligible',
      nextEligible: '2024-03-10',
      city: 'Mumbai',
      registrationDate: '2020-05-20',
      weight: 68,
      medicalHistory: 'Diabetes (Type 2, controlled)',
      emergencyContact: '+91 76543 21099',
      donationHistory: [
        { date: '2023-12-10', location: 'Kokilaben Hospital, Mumbai', units: 1, doctor: 'Dr. Kavita Nair' },
        { date: '2023-09-08', location: 'JIVAN Blood Bank, Mumbai', units: 1, doctor: 'Dr. Rohit Mehta' },
        { date: '2023-06-05', location: 'Tata Memorial Hospital, Mumbai', units: 1, doctor: 'Dr. Sunita Joshi' }
      ]
    },
    {
      id: 'DN004',
      name: 'Shreya Sharma',
      phone: '+91 90281 12345',
      email: 'shreya.sharma@gmail.com',
      bloodGroup: 'AB+',
      age: 26,
      gender: 'Female',
      address: '321 Koramangala, Bangalore - 560034',
      lastDonation: '2024-01-08',
      totalDonations: 6,
      status: 'Active',
      nextEligible: '2024-04-08',
      city: 'Bangalore',
      registrationDate: '2022-11-12',
      weight: 55,
      medicalHistory: 'No health issues',
      emergencyContact: '+91 90281 12346',
      donationHistory: [
        { date: '2024-01-08', location: 'Manipal Hospital, Bangalore', units: 1, doctor: 'Dr. Anil Kumar' },
        { date: '2023-10-05', location: 'JIVAN Blood Bank, Bangalore', units: 1, doctor: 'Dr. Priya Sharma' },
        { date: '2023-07-02', location: 'Narayana Health, Bangalore', units: 1, doctor: 'Dr. Rajesh Gupta' }
      ]
    },
    {
      id: 'DN005',
      name: 'Amit Joshi',
      phone: '+91 84456 23231',
      email: 'amit.joshi@rediffmail.com',
      bloodGroup: 'O-',
      age: 31,
      gender: 'Male',
      address: '654 Connaught Place, New Delhi - 110001',
      lastDonation: '2024-02-15',
      totalDonations: 9,
      status: 'Eligible',
      nextEligible: '2024-05-15',
      city: 'Delhi',
      registrationDate: '2021-12-05',
      weight: 75,
      medicalHistory: 'Allergic to penicillin',
      emergencyContact: '+91 84456 23232',
      donationHistory: [
        { date: '2024-02-15', location: 'AIIMS, Delhi', units: 1, doctor: 'Dr. Meera Patel' },
        { date: '2023-11-12', location: 'Sir Ganga Ram Hospital, Delhi', units: 1, doctor: 'Dr. Arjun Reddy' },
        { date: '2023-08-09', location: 'JIVAN Blood Bank, Delhi', units: 1, doctor: 'Dr. Kavita Nair' }
      ]
    }
  ],

  requests: [
    {
      id: 'REQ001',
      hospital: 'Ruby Hall Clinic, Pune',
      bloodGroup: 'A+',
      units: 2,
      urgency: 'Critical',
      status: 'Pending',
      requestDate: '2024-01-20',
      requester: 'Dr. Anjali Deshmukh',
      patientName: 'Ravi Kumar',
      patientAge: 45,
      reason: 'Emergency surgery - road accident',
      contactNumber: '+91 98765 11111',
      expectedDate: '2024-01-21'
    },
    {
      id: 'REQ002',
      hospital: 'Apollo Hospital, Chennai', 
      bloodGroup: 'O-',
      units: 4,
      urgency: 'High',
      status: 'Approved',
      requestDate: '2024-01-19',
      requester: 'Dr. Vikram Singh',
      patientName: 'Lakshmi Devi',
      patientAge: 38,
      reason: 'Childbirth complications',
      contactNumber: '+91 87654 22222',
      expectedDate: '2024-01-20'
    },
    {
      id: 'REQ003',
      hospital: 'Tata Memorial Hospital, Mumbai',
      bloodGroup: 'B+',
      units: 3,
      urgency: 'Normal',
      status: 'Fulfilled',
      requestDate: '2024-01-18',
      requester: 'Dr. Reena Jadhav',
      patientName: 'Suresh Patel',
      patientAge: 52,
      reason: 'Cancer treatment',
      contactNumber: '+91 76543 33333',
      expectedDate: '2024-01-19'
    },
    {
      id: 'REQ004',
      hospital: 'AIIMS, Delhi',
      bloodGroup: 'AB-',
      units: 1,
      urgency: 'Critical',
      status: 'Pending',
      requestDate: '2024-01-20',
      requester: 'Dr. Sunil Kale',
      patientName: 'Meera Singh',
      patientAge: 29,
      reason: 'Post-operative bleeding',
      contactNumber: '+91 90281 44444',
      expectedDate: '2024-01-21'
    }
  ],

  appointments: [
    {
      id: 'APT001',
      name: 'Shreya Sharma',
      phone: '+91 90281 12345',
      date: '2024-01-25',
      time: '10:30 AM',
      doctor: 'Dr. Reena Jadhav',
      type: 'Blood Donation',
      status: 'Scheduled',
      bloodGroup: 'AB+',
      notes: 'Regular donor, no health issues',
      location: 'JIVAN Blood Bank, Main Center'
    },
    {
      id: 'APT002',
      name: 'Amit Joshi',
      phone: '+91 84456 23231',
      date: '2024-01-25',
      time: '2:00 PM', 
      doctor: 'Dr. Sunil Kale',
      type: 'Health Check',
      status: 'Completed',
      bloodGroup: 'O-',
      notes: 'Pre-donation health screening completed',
      location: 'JIVAN Blood Bank, Delhi Branch'
    },
    {
      id: 'APT003',
      name: 'Priya Mehta',
      phone: '+91 98765 43210',
      date: '2024-01-26',
      time: '11:00 AM',
      doctor: 'Dr. Anjali Deshmukh',
      type: 'Blood Donation',
      status: 'Scheduled',
      bloodGroup: 'O+',
      notes: 'Eligible for donation',
      location: 'JIVAN Blood Bank, Mumbai Center'
    },
    {
      id: 'APT004',
      name: 'Rajesh Patil',
      phone: '+91 87654 32109',
      date: '2024-01-24',
      time: '3:30 PM',
      doctor: 'Dr. Priya Sharma',
      type: 'Follow-up',
      status: 'Missed',
      bloodGroup: 'A+',
      notes: 'Post-donation follow-up',
      location: 'JIVAN Blood Bank, Pune Center'
    }
  ],

  hospitals: [
    {
      id: 'HSP001',
      name: 'Ruby Hall Clinic',
      location: 'Pune, Maharashtra',
      contactPerson: 'Dr. Anjali Deshmukh',
      phone: '+91 20 2612 1212',
      email: 'bloodbank@rubyhall.com',
      totalRequests: 45,
      pendingRequests: 8,
      lastRequest: '2024-01-20',
      status: 'Active',
      registrationDate: '2020-01-15'
    },
    {
      id: 'HSP002',
      name: 'Apollo Hospital',
      location: 'Chennai, Tamil Nadu',
      contactPerson: 'Dr. Vikram Singh',
      phone: '+91 44 2829 3333',
      email: 'bloodbank@apollochennai.com',
      totalRequests: 67,
      pendingRequests: 12,
      lastRequest: '2024-01-19',
      status: 'Active',
      registrationDate: '2019-08-20'
    },
    {
      id: 'HSP003',
      name: 'Tata Memorial Hospital',
      location: 'Mumbai, Maharashtra',
      contactPerson: 'Dr. Reena Jadhav',
      phone: '+91 22 2417 7000',
      email: 'bloodbank@tmc.gov.in',
      totalRequests: 89,
      pendingRequests: 15,
      lastRequest: '2024-01-18',
      status: 'Active',
      registrationDate: '2018-05-10'
    }
  ],

  doctors: [
    {
      id: 'DOC001',
      name: 'Dr. Anjali Deshmukh',
      specialization: 'Hematology',
      hospital: 'Ruby Hall Clinic, Pune',
      phone: '+91 98765 11111',
      email: 'anjali.deshmukh@rubyhall.com',
      experience: '12 years',
      totalDonationsSupervised: 234,
      status: 'Active',
      licenseNumber: 'MH-12345-2012'
    },
    {
      id: 'DOC002',
      name: 'Dr. Vikram Singh',
      specialization: 'Transfusion Medicine',
      hospital: 'Apollo Hospital, Chennai',
      phone: '+91 87654 22222',
      email: 'vikram.singh@apollochennai.com',
      experience: '15 years',
      totalDonationsSupervised: 456,
      status: 'Active',
      licenseNumber: 'TN-67890-2009'
    },
    {
      id: 'DOC003',
      name: 'Dr. Reena Jadhav',
      specialization: 'Blood Banking',
      hospital: 'Tata Memorial Hospital, Mumbai',
      phone: '+91 76543 33333',
      email: 'reena.jadhav@tmc.gov.in',
      experience: '18 years',
      totalDonationsSupervised: 678,
      status: 'Active',
      licenseNumber: 'MH-54321-2006'
    }
  ],

  activityLogs: [
    {
      id: 'LOG001',
      timestamp: '2024-01-20 16:45:23',
      user: 'Dr. Anjali Deshmukh',
      action: 'Approved critical blood request REQ001',
      details: 'A+ blood request for Ruby Hall Clinic approved',
      type: 'approval',
      severity: 'high'
    },
    {
      id: 'LOG002',
      timestamp: '2024-01-20 15:30:12',
      user: 'System',
      action: 'Blood unit expiry alert',
      details: '5 units of B+ blood expiring in 2 days',
      type: 'alert',
      severity: 'warning'
    },
    {
      id: 'LOG003',
      timestamp: '2024-01-20 14:15:45',
      user: 'Priya Mehta',
      action: 'Completed blood donation',
      details: 'O+ blood donation completed successfully',
      type: 'donation',
      severity: 'info'
    },
    {
      id: 'LOG004',
      timestamp: '2024-01-20 13:22:18',
      user: 'Admin',
      action: 'New donor registration',
      details: 'Shreya Sharma registered as AB+ donor',
      type: 'registration',
      severity: 'info'
    },
    {
      id: 'LOG005',
      timestamp: '2024-01-20 12:10:33',
      user: 'Dr. Vikram Singh',
      action: 'Updated blood inventory',
      details: 'Added 3 units of O- blood to inventory',
      type: 'inventory',
      severity: 'info'
    }
  ]
};
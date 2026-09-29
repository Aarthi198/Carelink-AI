import {
  User,
  PatientProfile,
  Facility,
  Doctor,
  Appointment,
  Referral,
  FollowUp,
  Investigation,
  Prescription,
  MedicalRecord,
  NotificationItem,
  MessageItem,
  HealthWorkerVisit
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-patient-1',
    email: 'aarthi@gmail.com',
    name: 'M. Aarthi',
    role: 'patient',
    phone: '+91 9876543210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    facility: 'Government Primary Health Centre',
    createdAt: '2024-01-10'
  },
  {
    id: 'user-doctor-1',
    email: 'dr.lakshmi@carelink.ai',
    name: 'Dr. R. Lakshmi',
    role: 'doctor',
    phone: '+91 9012345678',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    specialization: 'General Physician (MBBS, MD)',
    facility: 'Government Primary Health Centre, Thiruvaiyaru',
    createdAt: '2023-06-15'
  },
  {
    id: 'user-worker-1',
    email: 'priya.hw@carelink.ai',
    name: 'K. Priya',
    role: 'health_worker',
    phone: '+91 9876543210',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    zone: 'Ward 7, Tiruttani',
    facility: 'Rural Health Sub Centre',
    createdAt: '2023-08-01'
  },
  {
    id: 'user-admin-1',
    email: 'admin@carelinkai.com',
    name: 'Rajeshwari K.',
    role: 'admin',
    phone: '+91 99400 99887',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    facility: 'CareLink AI Health Headquarters',
    createdAt: '2023-01-01'
  }
];

export const INITIAL_PATIENT_PROFILE: PatientProfile = {
  id: 'patient-aarthi',
  userId: 'user-patient-1',
  patientId: 'CLP001234',
  name: 'M. Aarthi',
  dob: '2003-09-28',
  age: 28,
  gender: 'Female',
  bloodGroup: 'O+',
  height: '160 cm',
  weight: '55 kg',
  phone: '+91 9876543210',
  email: 'aarthi@gmail.com',
  address: 'No. 12, Gandhi Nagar, Tiruttani, Tiruvallur (Dt), Tamil Nadu - 631209',
  language: 'English',
  existingConditions: ['None'],
  allergies: ['None'],
  regularMedications: ['None'],
  emergencyContact: {
    name: 'M. Ramesh',
    relation: 'Father',
    phone: '+91 9876543299'
  },
  consentGiven: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  lastVisit: '15 Aug 2026'
};

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Government Primary Health Centre',
    type: 'PHC',
    category: 'Government',
    verified: true,
    rating: 4.2,
    reviewsCount: 124,
    distance: '2.3 km',
    travelTime: '12 mins',
    address: 'Main Road, Thiruvaiyaru, Tamil Nadu - 625xxx',
    lat: 10.8797,
    lng: 79.1065,
    phone: '+91 4362 260222',
    openingHours: 'Mon - Sat: 8:00 AM - 2:00 PM | Sun: Closed',
    timings: '08:00 AM - 02:00 PM',
    services: ['General Physician', 'Lab Tests', 'Pharmacy', 'Teleconsultation', 'Immunization', 'Maternal Care'],
    appointmentAvailability: 'Available Today',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=80',
    doctorsCount: 4,
    emergencyAvailable: true,
    status: 'Active'
  },
  {
    id: 'fac-2',
    name: 'City Care Hospital',
    type: 'Hospital',
    category: 'Private',
    verified: true,
    rating: 4.5,
    reviewsCount: 210,
    distance: '3.8 km',
    travelTime: '15 mins',
    address: 'Bazaar Street, Tiruttani, Tamil Nadu - 631209',
    lat: 13.1788,
    lng: 79.6105,
    phone: '+91 44 2788 5500',
    openingHours: 'Open 24 Hours / 7 Days',
    timings: '24 Hours Open',
    services: ['Multi-Specialty', 'Lab', 'Pharmacy 24/7', 'ICU', 'Emergency Care', 'Dermatology'],
    appointmentAvailability: 'Available Today',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=80',
    doctorsCount: 18,
    emergencyAvailable: true,
    status: 'Active'
  },
  {
    id: 'fac-3',
    name: 'Sri Lakshmi Clinic',
    type: 'Clinic',
    category: 'Private',
    verified: true,
    rating: 4.0,
    reviewsCount: 86,
    distance: '4.6 km',
    travelTime: '18 mins',
    address: 'Sannathi Street, Tiruttani, Tamil Nadu',
    lat: 13.1812,
    lng: 79.6145,
    phone: '+91 44 2788 1234',
    openingHours: 'Open 9:00 AM - 8:00 PM',
    timings: '09:00 AM - 08:00 PM',
    services: ['General Physician', 'Lab Services', 'Pharmacy', 'Diagnostic Screening'],
    appointmentAvailability: 'Next slot tomorrow',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=80',
    doctorsCount: 2,
    emergencyAvailable: false,
    status: 'Active'
  },
  {
    id: 'fac-4',
    name: 'Rural Health Sub Centre',
    type: 'Sub Centre',
    category: 'Government',
    verified: true,
    rating: 4.1,
    reviewsCount: 42,
    distance: '6.2 km',
    travelTime: '22 mins',
    address: 'Kallupatti Village Road, Tamil Nadu',
    lat: 13.1522,
    lng: 79.5891,
    phone: '+91 44 2788 9011',
    openingHours: '08:30 AM - 01:30 PM (Mon-Fri)',
    timings: '08:30 AM - 01:30 PM',
    services: ['Maternal Health', 'Child Immunization', 'NCD Screening', 'Health Education'],
    appointmentAvailability: 'Available Today',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop&q=80',
    doctorsCount: 1,
    emergencyAvailable: false,
    status: 'Active'
  },
  {
    id: 'fac-5',
    name: 'Urban Health Centre (UHC)',
    type: 'UHC',
    category: 'Government',
    verified: true,
    rating: 4.3,
    reviewsCount: 95,
    distance: '5.1 km',
    travelTime: '20 mins',
    address: 'Collectorate Junction, Thiruvallur, Tamil Nadu',
    lat: 13.1432,
    lng: 79.9081,
    phone: '+91 44 2766 4321',
    openingHours: '08:00 AM - 03:00 PM',
    timings: '08:00 AM - 03:00 PM',
    services: ['General Outpatient', 'Free Pharmacy', 'Lab Diagnostic', 'Dental OPD'],
    appointmentAvailability: 'Available Today',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=80',
    doctorsCount: 5,
    emergencyAvailable: false,
    status: 'Active'
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. R. Lakshmi',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD (General Medicine)',
    experienceYears: 12,
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre, Thiruvaiyaru',
    consultationFee: 200, // ₹200 or Free at PHC
    rating: 4.6,
    reviewsCount: 120,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03'],
    availableTimeSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'],
    phone: '+91 9012345678',
    email: 'dr.lakshmi@carelink.ai',
    status: 'Active'
  },
  {
    id: 'doc-2',
    name: 'Dr. Karthik Menon',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    experienceYears: 9,
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    consultationFee: 500,
    rating: 4.8,
    reviewsCount: 88,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-09-30', '2026-10-01', '2026-10-02'],
    availableTimeSlots: ['11:30 AM', '12:15 PM', '04:00 PM', '05:30 PM'],
    phone: '+91 9345678901',
    email: 'dr.karthik@citycare.org',
    status: 'Active'
  },
  {
    id: 'doc-3',
    name: 'Dr. Meena',
    specialty: 'Pediatrician',
    qualifications: 'MBBS, DCH, MD (Pediatrics)',
    experienceYears: 15,
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre',
    consultationFee: 200,
    rating: 4.9,
    reviewsCount: 145,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813627-8622ef74e5f7?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-09-30', '2026-10-01'],
    availableTimeSlots: ['10:00 AM', '11:00 AM', '02:30 PM', '03:30 PM'],
    phone: '+91 9123456789',
    email: 'dr.meena@carelink.ai',
    status: 'Active'
  },
  {
    id: 'doc-4',
    name: 'Dr. Suresh',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD, DM (Cardiology)',
    experienceYears: 18,
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    consultationFee: 750,
    rating: 4.9,
    reviewsCount: 204,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-10-01', '2026-10-02', '2026-10-03'],
    availableTimeSlots: ['03:00 PM', '04:00 PM', '05:00 PM'],
    phone: '+91 9876521234',
    email: 'dr.suresh@citycare.org',
    status: 'Inactive'
  },
  {
    id: 'doc-5',
    name: 'Dr. Anitha',
    specialty: 'Gynecologist',
    qualifications: 'MBBS, MS (OBG), DGO',
    experienceYears: 14,
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre',
    consultationFee: 200,
    rating: 4.7,
    reviewsCount: 92,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-09-30', '2026-10-01', '2026-10-02'],
    availableTimeSlots: ['09:30 AM', '11:00 AM', '01:30 PM'],
    phone: '+91 8765012345',
    email: 'dr.anitha@carelink.ai',
    status: 'Active'
  },
  {
    id: 'doc-6',
    name: 'Dr. Praveen',
    specialty: 'Orthopedist',
    qualifications: 'MBBS, MS (Ortho), DNB',
    experienceYears: 10,
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    consultationFee: 600,
    rating: 4.6,
    reviewsCount: 65,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    availableDates: ['2026-10-01', '2026-10-02'],
    availableTimeSlots: ['10:00 AM', '11:30 AM', '04:30 PM'],
    phone: '+91 9900112233',
    email: 'dr.praveen@citycare.org',
    status: 'Active'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-201',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    patientAge: 28,
    patientGender: 'Female',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    doctorSpecialty: 'General Physician',
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre, Thiruvaiyaru',
    date: '2026-09-30',
    time: '09:00 AM',
    status: 'Confirmed',
    reason: 'Fever for 3 days, cough with breathlessness and body pain',
    triageUrgency: 'High Priority',
    type: 'In-person',
    notes: 'Referred from CareLink AI Triage.',
    consultationFee: 200,
    createdAt: '2026-09-29T18:30:00'
  },
  {
    id: 'apt-202',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    patientAge: 28,
    patientGender: 'Female',
    doctorId: 'doc-2',
    doctorName: 'Dr. Karthik Menon',
    doctorSpecialty: 'Dermatologist',
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    date: '2026-10-18',
    time: '11:30 AM',
    status: 'Pending',
    reason: 'Skin rash and seasonal allergen follow-up',
    triageUrgency: 'Routine',
    type: 'In-person',
    consultationFee: 500,
    createdAt: '2026-09-28T11:20:00'
  },
  {
    id: 'apt-203',
    patientId: 'patient-ravi',
    patientName: 'Ravi',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-3',
    doctorName: 'Dr. Meena',
    doctorSpecialty: 'Pediatrician',
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre',
    date: '2026-09-30',
    time: '10:30 AM',
    status: 'Pending',
    reason: 'Child immunization & fever check',
    triageUrgency: 'Medium Priority',
    type: 'In-person',
    consultationFee: 200,
    createdAt: '2026-09-29T14:10:00'
  },
  {
    id: 'apt-204',
    patientId: 'patient-meena',
    patientName: 'Meena',
    patientAge: 45,
    patientGender: 'Female',
    doctorId: 'doc-2',
    doctorName: 'Dr. Karthik Menon',
    doctorSpecialty: 'Dermatologist',
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    date: '2026-09-30',
    time: '03:00 PM',
    status: 'Confirmed',
    reason: 'Dermatitis consultation',
    triageUrgency: 'Routine',
    type: 'In-person',
    consultationFee: 500,
    createdAt: '2026-09-29T09:00:00'
  },
  {
    id: 'apt-205',
    patientId: 'patient-anand',
    patientName: 'Anand',
    patientAge: 38,
    patientGender: 'Male',
    doctorId: 'doc-4',
    doctorName: 'Dr. Suresh',
    doctorSpecialty: 'Cardiologist',
    facilityId: 'fac-2',
    facilityName: 'City Care Hospital',
    date: '2026-10-01',
    time: '04:00 PM',
    status: 'Completed',
    reason: 'Cardiac risk assessment and BP check',
    triageUrgency: 'High Priority',
    type: 'In-person',
    consultationFee: 750,
    createdAt: '2026-09-25T11:00:00'
  },
  {
    id: 'apt-206',
    patientId: 'patient-selvi',
    patientName: 'Selvi',
    patientAge: 29,
    patientGender: 'Female',
    doctorId: 'doc-5',
    doctorName: 'Dr. Anitha',
    doctorSpecialty: 'Gynecologist',
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre',
    date: '2026-10-01',
    time: '11:00 AM',
    status: 'Cancelled',
    reason: 'Antenatal Checkup rescheduling',
    triageUrgency: 'Routine',
    type: 'In-person',
    consultationFee: 200,
    createdAt: '2026-09-27T10:00:00'
  },
  {
    id: 'apt-207',
    patientId: 'patient-kumar',
    patientName: 'Kumar',
    patientAge: 70,
    patientGender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    doctorSpecialty: 'General Physician',
    facilityId: 'fac-1',
    facilityName: 'Government Primary Health Centre',
    date: '2026-10-01',
    time: '09:00 AM',
    status: 'Pending',
    reason: 'Geriatric chronic pain and hypertension review',
    triageUrgency: 'Medium Priority',
    type: 'In-person',
    consultationFee: 200,
    createdAt: '2026-09-29T16:00:00'
  }
];

export const INITIAL_REFERRALS: Referral[] = [
  {
    id: 'ref-001234',
    referralCode: 'REF-2026-001234',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    patientAge: 28,
    patientGender: 'Female',
    patientPhone: '+91 9876543210',
    fromRole: 'patient',
    fromName: 'Patient (AI Assistant)',
    fromFacility: 'CareLink AI Triage',
    toDoctorId: 'doc-1',
    toDoctorName: 'Dr. R. Lakshmi',
    toFacilityId: 'fac-1',
    toFacilityName: 'Government Primary Health Centre, Thiruvaiyaru',
    specialtyRequired: 'General Medicine / Pulmonology',
    reason: 'Suspected Lower Respiratory Tract Infection',
    clinicalSummary: 'Fever for 3 days, cough with breathlessness, body pain and fatigue. Symptoms match lower respiratory tract infection (possible pneumonia risk).',
    priority: 'High Priority',
    status: 'Closed',
    createdDate: '2026-09-27',
    updatedDate: '2026-09-30',
    scheduledAppointmentId: 'apt-201',
    timeline: [
      {
        status: 'Created',
        title: 'Referral Created',
        timestamp: '27 Sep 2026, 10:24 AM',
        actor: 'By Patient (AI Assistant)',
        note: 'AI Triage identified High Priority respiratory risk factors',
        completed: true
      },
      {
        status: 'Received',
        title: 'Referral Sent & Received by Facility',
        timestamp: '27 Sep 2026, 10:30 AM',
        actor: 'Govt PHC, Thiruvaiyaru',
        note: 'Referral packet and AI analysis received in Doctor triage queue',
        completed: true
      },
      {
        status: 'Accepted',
        title: 'Accepted by Doctor',
        timestamp: '27 Sep 2026, 03:20 PM',
        actor: 'By Dr. R. Lakshmi',
        note: 'Doctor reviewed AI triage summary and approved consultation pathway',
        completed: true
      },
      {
        status: 'Scheduled',
        title: 'Appointment Scheduled',
        timestamp: '28 Sep 2026, 09:00 AM',
        actor: 'CareLink AI Scheduler',
        note: 'Consultation confirmed for 30 Sep 2026 at 09:00 AM',
        completed: true
      },
      {
        status: 'Completed',
        title: 'Consultation Completed',
        timestamp: '30 Sep 2026, 10:30 AM',
        actor: 'Dr. R. Lakshmi',
        note: 'Clinical assessment complete. Prescriptions and Lab orders issued.',
        completed: true
      },
      {
        status: 'Closed',
        title: 'Referral Closed',
        timestamp: '30 Sep 2026, 11:00 AM',
        actor: 'System / Dr. R. Lakshmi',
        note: 'Referral goal achieved. Follow-up plan activated.',
        completed: true
      }
    ]
  },
  {
    id: 'ref-001235',
    referralCode: 'REF-2026-001235',
    patientId: 'patient-ravi',
    patientName: 'Ravi',
    patientAge: 32,
    patientGender: 'Male',
    patientPhone: '+91 9876543290',
    fromRole: 'health_worker',
    fromName: 'K. Priya (Health Worker)',
    fromFacility: 'Rural Health Sub Centre',
    toDoctorId: 'doc-1',
    toDoctorName: 'Dr. R. Lakshmi',
    toFacilityId: 'fac-1',
    toFacilityName: 'Government Primary Health Centre, Thiruvaiyaru',
    specialtyRequired: 'General Physician',
    reason: 'Fever, body pain and suspected viral infection',
    clinicalSummary: 'Temperature 101.2°F, body aches, SpO2 96%. Needs clinical examination and CBC test.',
    priority: 'Medium',
    status: 'Received',
    createdDate: '2026-09-29',
    updatedDate: '2026-09-29',
    timeline: [
      {
        status: 'Created',
        title: 'Referral Created',
        timestamp: '29 Sep 2026, 08:30 AM',
        actor: 'K. Priya (Health Worker)',
        note: 'Field visit identified persistent fever',
        completed: true
      },
      {
        status: 'Received',
        title: 'Received at Facility',
        timestamp: '29 Sep 2026, 08:45 AM',
        actor: 'Govt PHC Thiruvaiyaru',
        note: 'Pending Doctor Acceptance',
        completed: true
      },
      {
        status: 'Accepted',
        title: 'Accept Referral',
        timestamp: 'Pending',
        actor: 'Dr. R. Lakshmi',
        note: 'Awaiting doctor review',
        completed: false
      },
      {
        status: 'Scheduled',
        title: 'Schedule Appointment',
        timestamp: 'Pending',
        actor: 'System',
        note: 'Will be scheduled upon acceptance',
        completed: false
      },
      {
        status: 'Completed',
        title: 'Consultation Completed',
        timestamp: 'Pending',
        actor: 'Doctor',
        note: '',
        completed: false
      },
      {
        status: 'Closed',
        title: 'Referral Closed',
        timestamp: 'Pending',
        actor: 'System',
        note: '',
        completed: false
      }
    ]
  },
  {
    id: 'ref-001236',
    referralCode: 'REF-2026-001236',
    patientId: 'patient-meena',
    patientName: 'Meena',
    patientAge: 45,
    patientGender: 'Female',
    patientPhone: '+91 8123456789',
    fromRole: 'health_worker',
    fromName: 'K. Priya (Health Worker)',
    fromFacility: 'Ward 7 Tiruttani Community Centre',
    toDoctorId: 'doc-2',
    toDoctorName: 'Dr. Karthik Menon',
    toFacilityId: 'fac-2',
    toFacilityName: 'City Care Hospital',
    specialtyRequired: 'Pulmonology / Internal Medicine',
    reason: 'Breathing difficulty and low oxygen saturation (SpO2 92%)',
    clinicalSummary: 'High risk detected during home visit. Shortness of breath on mild exertion.',
    priority: 'High Priority',
    status: 'Accepted',
    createdDate: '2026-09-29',
    updatedDate: '2026-09-29',
    timeline: [
      {
        status: 'Created',
        title: 'Referral Created',
        timestamp: '29 Sep 2026, 09:15 AM',
        actor: 'K. Priya (Health Worker)',
        note: 'High-risk escalation triggered from AI assessment',
        completed: true
      },
      {
        status: 'Received',
        title: 'Received by City Care Hospital',
        timestamp: '29 Sep 2026, 09:20 AM',
        actor: 'City Care Triage',
        note: 'High priority flag acknowledged',
        completed: true
      },
      {
        status: 'Accepted',
        title: 'Accepted by Doctor',
        timestamp: '29 Sep 2026, 10:00 AM',
        actor: 'Dr. Karthik Menon',
        note: 'Accepted for priority slot',
        completed: true
      },
      {
        status: 'Scheduled',
        title: 'Schedule Appointment',
        timestamp: 'Pending',
        actor: 'Reception',
        note: 'Slot allocation in progress',
        completed: false
      },
      {
        status: 'Completed',
        title: 'Consultation Completed',
        timestamp: 'Pending',
        actor: 'Doctor',
        note: '',
        completed: false
      },
      {
        status: 'Closed',
        title: 'Referral Closed',
        timestamp: 'Pending',
        actor: 'System',
        note: '',
        completed: false
      }
    ]
  },
  {
    id: 'ref-001237',
    referralCode: 'REF-2026-001237',
    patientId: 'patient-anand',
    patientName: 'Anand',
    patientAge: 38,
    patientGender: 'Male',
    patientPhone: '+91 9098765432',
    fromRole: 'doctor',
    fromName: 'Dr. R. Lakshmi',
    fromFacility: 'Government Primary Health Centre',
    toDoctorId: 'doc-4',
    toDoctorName: 'Dr. Suresh',
    toFacilityId: 'fac-2',
    toFacilityName: 'City Care Hospital',
    specialtyRequired: 'Cardiology',
    reason: 'Stage 2 Hypertension with ECG abnormalities',
    clinicalSummary: 'BP consistently 160/100 mmHg. Needs 2D Echo and specialist cardio evaluation.',
    priority: 'High Priority',
    status: 'Scheduled',
    createdDate: '2026-09-26',
    updatedDate: '2026-09-28',
    timeline: [
      {
        status: 'Created',
        title: 'Referral Created',
        timestamp: '26 Sep 2026, 11:00 AM',
        actor: 'Dr. R. Lakshmi',
        note: 'Cardiology specialist referral created',
        completed: true
      },
      {
        status: 'Received',
        title: 'Received by Hospital',
        timestamp: '26 Sep 2026, 11:15 AM',
        actor: 'City Care Hospital',
        note: 'Received',
        completed: true
      },
      {
        status: 'Accepted',
        title: 'Accepted by Specialist',
        timestamp: '27 Sep 2026, 09:30 AM',
        actor: 'Dr. Suresh',
        note: 'Accepted',
        completed: true
      },
      {
        status: 'Scheduled',
        title: 'Appointment Scheduled',
        timestamp: '28 Sep 2026, 02:00 PM',
        actor: 'City Care Scheduler',
        note: 'Scheduled for 01 Oct 2026, 04:00 PM',
        completed: true
      },
      {
        status: 'Completed',
        title: 'Consultation Completed',
        timestamp: 'Pending',
        actor: 'Doctor',
        note: '',
        completed: false
      },
      {
        status: 'Closed',
        title: 'Referral Closed',
        timestamp: 'Pending',
        actor: 'System',
        note: '',
        completed: false
      }
    ]
  }
];

export const INITIAL_FOLLOW_UPS: FollowUp[] = [
  {
    id: 'fol-1',
    followUpCode: 'FOL-2026-001',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Govt PHC, Thiruvaiyaru',
    date: '2026-10-07',
    time: '09:00 AM',
    type: 'In-person Visit',
    reason: 'Post Treatment Review',
    status: 'Upcoming',
    reminderSent: true,
    reminderDate: '06 Oct 2026, 09:00 AM',
    notes: 'Review after completion of medicines. Check repeat chest symptoms and SpO2.',
    timeline: [
      {
        step: 'Created',
        title: 'Follow-up Created',
        timestamp: '30 Sep 2026, 11:00 AM (By Dr. R. Lakshmi)',
        completed: true
      },
      {
        step: 'Received',
        title: 'Follow-up Received',
        timestamp: '30 Sep 2026, 11:02 AM (In Patient Portal)',
        completed: true
      },
      {
        step: 'Reminder',
        title: 'Reminder Scheduled / Sent',
        timestamp: '06 Oct 2026, 09:00 AM (1 day before)',
        completed: true
      },
      {
        step: 'Attend',
        title: 'Attend Follow-up',
        timestamp: 'Scheduled for 07 Oct 2026, 09:00 AM',
        completed: false
      },
      {
        step: 'Complete',
        title: 'Completed / Missed',
        timestamp: 'Pending attendance',
        completed: false
      }
    ]
  },
  {
    id: 'fol-2',
    followUpCode: 'FOL-2026-002',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-2',
    doctorName: 'Dr. Karthik Menon',
    facilityName: 'City Care Hospital',
    date: '2026-10-18',
    time: '11:00 AM',
    type: 'In-person Visit',
    reason: 'Lab Result Review',
    status: 'Upcoming',
    reminderSent: false,
    notes: 'Review allergy blood panel results and skin condition.',
    timeline: [
      {
        step: 'Created',
        title: 'Follow-up Created',
        timestamp: '28 Sep 2026, 12:00 PM',
        completed: true
      },
      {
        step: 'Received',
        title: 'Follow-up Received',
        timestamp: '28 Sep 2026, 12:05 PM',
        completed: true
      },
      {
        step: 'Reminder',
        title: 'Reminder Sent',
        timestamp: 'Pending (Will send on 17 Oct)',
        completed: false
      },
      {
        step: 'Attend',
        title: 'Attend Follow-up',
        timestamp: 'Scheduled for 18 Oct 2026, 11:00 AM',
        completed: false
      },
      {
        step: 'Complete',
        title: 'Completed',
        timestamp: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'fol-3',
    followUpCode: 'FOL-2026-003',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Govt PHC, Thiruvaiyaru',
    date: '2026-08-15',
    time: '10:00 AM',
    type: 'Teleconsultation',
    reason: 'Seasonal Allergic Rhinitis Review',
    status: 'Completed',
    reminderSent: true,
    notes: 'Patient symptom-free. Inhaler dosage successfully tapered.',
    timeline: [
      { step: 'Created', title: 'Created', timestamp: '01 Aug 2026', completed: true },
      { step: 'Received', title: 'Received', timestamp: '01 Aug 2026', completed: true },
      { step: 'Reminder', title: 'Reminder Sent', timestamp: '14 Aug 2026', completed: true },
      { step: 'Attend', title: 'Attended', timestamp: '15 Aug 2026', completed: true },
      { step: 'Complete', title: 'Completed', timestamp: '15 Aug 2026, 10:25 AM', completed: true }
    ]
  },
  {
    id: 'fol-4',
    followUpCode: 'FOL-2026-004',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Govt PHC, Thiruvaiyaru',
    date: '2026-06-20',
    time: '11:30 AM',
    type: 'In-person Visit',
    reason: 'Post-viral checkup',
    status: 'Missed',
    reminderSent: true,
    notes: 'Patient did not attend. Re-booking enabled.',
    timeline: [
      { step: 'Created', title: 'Created', timestamp: '10 Jun 2026', completed: true },
      { step: 'Received', title: 'Received', timestamp: '10 Jun 2026', completed: true },
      { step: 'Reminder', title: 'Reminder Sent', timestamp: '19 Jun 2026', completed: true },
      { step: 'Attend', title: 'Missed Attendance', timestamp: '20 Jun 2026', completed: false },
      { step: 'Complete', title: 'Marked Missed', timestamp: '21 Jun 2026', completed: true }
    ]
  }
];

export const INITIAL_INVESTIGATIONS: Investigation[] = [
  {
    id: 'inv-1',
    orderNumber: 'LAB-2026-991',
    testName: 'CBC (Complete Blood Count)',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Government Primary Health Centre Lab',
    orderedDate: '30 Sep 2026',
    sampleCollectedDate: '30 Sep 2026, 11:30 AM',
    resultAvailableDate: '01 Oct 2026, 09:30 AM',
    reviewedDate: '02 Oct 2026, 10:30 AM',
    patientNotifiedDate: '02 Oct 2026, 11:00 AM',
    status: 'Doctor Reviewed',
    category: 'Hematology',
    fileName: 'CBC_Report_aarthi.pdf',
    fileSize: '245 KB',
    labValues: [
      { parameter: 'WBC', value: '12.4', unit: 'x10³/µL', referenceRange: '4.0 - 11.0', status: 'High' },
      { parameter: 'RBC', value: '4.6', unit: 'x10⁶/µL', referenceRange: '4.0 - 5.2', status: 'Normal' },
      { parameter: 'Hemoglobin', value: '12.8', unit: 'g/dL', referenceRange: '12.0 - 15.0', status: 'Normal' },
      { parameter: 'Platelets', value: '320', unit: 'x10³/µL', referenceRange: '150 - 450', status: 'Normal' },
      { parameter: 'Neutrophils', value: '76', unit: '%', referenceRange: '40 - 70', status: 'High' },
      { parameter: 'Lymphocytes', value: '18', unit: '%', referenceRange: '20 - 40', status: 'Low' }
    ],
    doctorInterpretation: 'Mild infection indicators. Continue prescribed medicine and follow-up as advised.',
    doctorReviewed: true,
    patientNotified: true,
    timeline: [
      { status: 'Ordered', title: 'Test Ordered', timestamp: '30 Sep 2026 (Dr. R. Lakshmi)', completed: true },
      { status: 'Sample Collected', title: 'Sample Collected', timestamp: '30 Sep 2026, 11:30 AM', completed: true },
      { status: 'Processing', title: 'Laboratory Processing', timestamp: '30 Sep 2026, 02:00 PM', completed: true },
      { status: 'Result Available', title: 'Result Available', timestamp: '01 Oct 2026, 09:30 AM', completed: true },
      { status: 'Doctor Reviewed', title: 'Doctor Reviewed', timestamp: '02 Oct 2026, 10:30 AM (Dr. R. Lakshmi)', completed: true },
      { status: 'Patient Notified', title: 'Notified to Patient', timestamp: '02 Oct 2026, 11:00 AM', completed: true }
    ]
  },
  {
    id: 'inv-2',
    orderNumber: 'LAB-2026-992',
    testName: 'Chest X-Ray (PA View)',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Government Primary Health Centre Radiology',
    orderedDate: '30 Sep 2026',
    sampleCollectedDate: '30 Sep 2026, 12:00 PM',
    resultAvailableDate: '01 Oct 2026, 11:00 AM',
    status: 'Result Available',
    category: 'Radiology',
    fileName: 'Chest_XRay_PA_aarthi.pdf',
    fileSize: '3.2 MB',
    labValues: [
      { parameter: 'Broncho-vascular Markings', value: 'Prominent in lower zones', referenceRange: 'Normal lung fields', status: 'Abnormal' },
      { parameter: 'Costophrenic Angles', value: 'Clear & sharp bilaterally', referenceRange: 'Clear', status: 'Normal' },
      { parameter: 'Cardiac Silhouette', value: 'Within normal limits (CTR < 0.5)', referenceRange: 'Normal size', status: 'Normal' }
    ],
    doctorInterpretation: 'Pending doctor review in clinical dashboard.',
    doctorReviewed: false,
    patientNotified: false,
    timeline: [
      { status: 'Ordered', title: 'Test Ordered', timestamp: '30 Sep 2026 by Dr. R. Lakshmi', completed: true },
      { status: 'Sample Collected', title: 'Test Completed (X-Ray Taken)', timestamp: '30 Sep 2026, 12:00 PM', completed: true },
      { status: 'Processing', title: 'Radiologist Reading', timestamp: '01 Oct 2026, 09:00 AM', completed: true },
      { status: 'Result Available', title: 'Result Available', timestamp: '01 Oct 2026, 11:00 AM', completed: true },
      { status: 'Doctor Reviewed', title: 'Doctor Review', timestamp: 'Pending Review', completed: false },
      { status: 'Patient Notified', title: 'Patient Notified', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: 'inv-3',
    orderNumber: 'LAB-2026-993',
    testName: 'CRP (C-Reactive Protein)',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Government Primary Health Centre Lab',
    orderedDate: '30 Sep 2026',
    sampleCollectedDate: '30 Sep 2026, 11:30 AM',
    status: 'Processing',
    category: 'Biochemistry',
    doctorReviewed: false,
    patientNotified: false,
    timeline: [
      { status: 'Ordered', title: 'Ordered', timestamp: '30 Sep 2026', completed: true },
      { status: 'Sample Collected', title: 'Sample Collected', timestamp: '30 Sep 2026', completed: true },
      { status: 'Processing', title: 'Processing in Lab', timestamp: 'In progress', completed: true },
      { status: 'Result Available', title: 'Result Available', timestamp: 'Expected in 4 hours', completed: false },
      { status: 'Doctor Reviewed', title: 'Doctor Review', timestamp: 'Pending', completed: false },
      { status: 'Patient Notified', title: 'Patient Notified', timestamp: 'Pending', completed: false }
    ]
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-0930',
    prescriptionNumber: 'RX-2026-0930',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    doctorId: 'doc-1',
    doctorName: 'Dr. R. Lakshmi',
    facilityName: 'Government Primary Health Centre, Thiruvaiyaru',
    date: '30 Sep 2026',
    diagnosis: 'Acute Lower Respiratory Tract Infection (LRTI) & Bronchitis',
    medications: [
      {
        id: 'med-1',
        name: 'Paracetamol 500 mg',
        dosage: '1 tablet',
        frequency: 'Thrice daily (After food)',
        duration: '5 days',
        instructions: 'Take after meals. For fever and body pain.'
      },
      {
        id: 'med-2',
        name: 'Azithromycin 500 mg',
        dosage: '1 tablet',
        frequency: 'Once daily (After food)',
        duration: '3 days',
        instructions: 'Take at fixed time daily. Complete the full 3-day course.'
      },
      {
        id: 'med-3',
        name: 'Cough Syrup (Ambroxol + Levosalbutamol)',
        dosage: '10 ml',
        frequency: 'Thrice daily',
        duration: '5 days',
        instructions: 'Take with warm water. Avoid cold drinks.'
      }
    ],
    instructions: [
      'Take medicines after food',
      'Drink warm fluids (2.5 - 3 liters daily)',
      'Avoid cold drinks and ice cream',
      'Come for in-person follow-up if symptoms persist after 5 days'
    ],
    advice: 'Rest well. Steam inhalation twice daily for 5-7 minutes.',
    status: 'Current'
  }
];

export const INITIAL_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-101',
    patientId: 'patient-aarthi',
    category: 'Consultation Records',
    title: 'Outpatient Clinical Consultation Summary',
    date: '30 Sep 2026',
    facility: 'Government Primary Health Centre, Thiruvaiyaru',
    doctorName: 'Dr. R. Lakshmi (General Physician)',
    summary: 'Diagnosed with Acute LRTI. Vitals: Temp 101.2°F, Pulse 96 bpm, BP 110/70 mmHg, SpO2 98%. Prescribed Azithromycin, Paracetamol & Cough Syrup. Ordered CBC & Chest X-Ray.',
    fileSize: '420 KB',
    downloadUrl: '#'
  },
  {
    id: 'rec-102',
    patientId: 'patient-aarthi',
    category: 'Lab Reports',
    title: 'Complete Blood Count (CBC) Profile',
    date: '01 Oct 2026',
    facility: 'Government Primary Health Centre Lab',
    doctorName: 'Dr. R. Lakshmi',
    summary: 'WBC 12.4 x10³/µL (Elevated), Platelets 320k, Hemoglobin 12.8 g/dL. Reviewed by Dr. R. Lakshmi.',
    fileSize: '245 KB',
    downloadUrl: '#'
  },
  {
    id: 'rec-103',
    patientId: 'patient-aarthi',
    category: 'Growth & Vitals',
    title: 'Baseline Vitals & Triage Examination',
    date: '30 Sep 2026',
    facility: 'CareLink AI Triage & Govt PHC',
    summary: 'BP: 110/70 mmHg | Pulse: 96 bpm | SpO2: 98% | Temp: 101.2°F | Weight: 55 kg | Height: 160 cm',
    vitalsData: {
      bloodPressure: '110/70 mmHg',
      heartRate: '96 bpm',
      spO2: '98%',
      temperature: '101.2°F'
    }
  },
  {
    id: 'rec-104',
    patientId: 'patient-aarthi',
    category: 'Vaccination Records',
    title: 'Universal Immunization Card',
    date: '2024-05-12',
    facility: 'Government Primary Health Centre',
    summary: 'Tetanus Toxoid booster administered. Hepatitis B 3-dose series verified complete.',
    fileSize: '890 KB',
    downloadUrl: '#'
  },
  {
    id: 'rec-105',
    patientId: 'patient-aarthi',
    category: 'Documents',
    title: 'CMCHIS Health Insurance Scheme ID',
    date: '2024-01-15',
    facility: 'Tamil Nadu Health Systems Project',
    summary: 'Beneficiary ID: TN-CHIS-894102. Fully active across all PHC & empanelled hospitals.',
    fileSize: '1.2 MB',
    downloadUrl: '#'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-patient-1',
    title: 'Appointment Confirmed',
    message: 'Your appointment on 30 Sep is confirmed with Dr. R. Lakshmi at Government Primary Health Centre.',
    timestamp: '10 mins ago',
    read: false,
    category: 'Appointments',
    link: '/patient/appointments'
  },
  {
    id: 'notif-2',
    userId: 'user-patient-1',
    title: 'Referral Update',
    message: 'Your referral is accepted by Govt PHC, Thiruvaiyaru.',
    timestamp: '2 hours ago',
    read: false,
    category: 'Referrals',
    link: '/patient/referrals'
  },
  {
    id: 'notif-3',
    userId: 'user-patient-1',
    title: 'Lab Report Available',
    message: 'Your CBC lab report is ready to view.',
    timestamp: 'Yesterday',
    read: false,
    category: 'Lab Results',
    link: '/patient/investigations'
  },
  {
    id: 'notif-4',
    userId: 'user-patient-1',
    title: 'Doctor Reviewed Your Result',
    message: 'Dr. R. Lakshmi has reviewed your CBC test results and added clinical interpretation notes.',
    timestamp: 'Yesterday',
    read: false,
    category: 'Lab Results',
    link: '/patient/investigations'
  },
  {
    id: 'notif-5',
    userId: 'user-patient-1',
    title: 'Follow-up Reminder',
    message: 'You have an upcoming in-person follow-up scheduled for 07 Oct 2026 with Dr. R. Lakshmi.',
    timestamp: '2 days ago',
    read: true,
    category: 'Follow-ups',
    link: '/patient/follow-ups'
  },
  {
    id: 'notif-6',
    userId: 'user-patient-1',
    title: 'Health Tip',
    message: 'Drink more water and maintain warm fluid intake to stay healthy during changing seasonal weather.',
    timestamp: '3 days ago',
    read: true,
    category: 'Health Tips',
    link: '/patient'
  },
  {
    id: 'notif-7',
    userId: 'user-patient-1',
    title: 'System Alert',
    message: 'CareLink AI 2.0 active. Instant voice triage and investigation tracking are now live.',
    timestamp: '29 Sep 2026, 04:30 PM',
    read: true,
    category: 'System',
    link: '/patient'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    senderId: 'user-patient-1',
    senderName: 'M. Aarthi',
    senderRole: 'patient',
    receiverId: 'user-doctor-1',
    receiverName: 'Dr. R. Lakshmi',
    subject: 'Question regarding medication timing',
    message: 'Good morning Doctor, should I take Azithromycin before or after my morning breakfast? Thank you.',
    timestamp: '29 Sep 2026, 06:00 PM',
    read: false,
    patientId: 'patient-aarthi'
  },
  {
    id: 'msg-2',
    senderId: 'user-worker-1',
    senderName: 'K. Priya (Health Worker)',
    senderRole: 'health_worker',
    receiverId: 'user-doctor-1',
    receiverName: 'Dr. R. Lakshmi',
    subject: 'High Risk Escalation for Patient Meena',
    message: 'Dr. Lakshmi, I completed a home visit for Meena (45 yrs). Her SpO2 is 92% with marked shortness of breath. I have sent an urgent referral.',
    timestamp: '29 Sep 2026, 09:25 AM',
    read: true,
    patientId: 'patient-meena'
  }
];

export const INITIAL_HEALTH_WORKER_VISITS: HealthWorkerVisit[] = [
  {
    id: 'hw-visit-101',
    workerId: 'user-worker-1',
    workerName: 'K. Priya',
    patientId: 'patient-aarthi',
    patientName: 'M. Aarthi',
    patientAge: 28,
    patientGender: 'Female',
    visitDate: '2026-09-27',
    visitType: 'General Home Visit',
    location: 'No. 12, Gandhi Nagar, Tiruttani',
    chiefComplaint: 'Fever for 3 days and dry cough with chest heaviness',
    vitals: {
      temperature: '101.2°F',
      pulse: '96 bpm',
      bp: '110/70 mmHg',
      spO2: '98%',
      weight: '55 kg'
    },
    observations: 'Patient looks fatigued. Mild throat redness. Clear lung bases with mild right mid-zone rhonchi.',
    aiDecisionSupport: {
      riskClassification: 'HIGH RISK',
      riskFactors: [
        'Fever for 3 days',
        'Cough with breathlessness',
        'Elevated pulse (96 bpm)'
      ],
      recommendedAction: 'Create referral to nearby facility or escalate to doctor immediately.',
      preliminaryNote: 'AI-assisted assessment suggests possible Acute LRTI.'
    },
    escalatedToDoctor: true,
    referralCreated: true,
    referralId: 'REF-2026-001234',
    assessmentRemarks: 'Escalated to Govt PHC Thiruvaiyaru for clinical evaluation by Dr. R. Lakshmi.',
    followUpPlan: 'Monitor fever curve and verify attendance at PHC.',
    nextVisitDate: '2026-10-02',
    adviceToPatient: 'Hydrate well with warm water. Avoid dust exposure. Report immediately if breathlessness increases.',
    additionalNotes: 'Patient consented to digital referral sync.',
    status: 'Completed'
  },
  {
    id: 'hw-visit-102',
    workerId: 'user-worker-1',
    workerName: 'K. Priya',
    patientId: 'patient-meena',
    patientName: 'Meena',
    patientAge: 45,
    patientGender: 'Female',
    visitDate: '2026-09-29',
    visitType: 'NCD Screening',
    location: 'Ward 7 Community Health Point',
    chiefComplaint: 'Severe breathlessness and chest tightness on walking 10 meters',
    vitals: {
      temperature: '99.0°F',
      pulse: '108 bpm',
      bp: '138/88 mmHg',
      spO2: '92%',
      glucose: '142 mg/dL'
    },
    observations: 'Visible respiratory distress with accessory muscle usage. Lips slightly pale.',
    aiDecisionSupport: {
      riskClassification: 'HIGH RISK',
      riskFactors: [
        'Low oxygen level (SpO2 92%)',
        'Tachycardia (108 bpm)',
        'Exertional dyspnea'
      ],
      recommendedAction: 'Immediate referral to tertiary center with oxygen facility.',
      preliminaryNote: 'High risk acute hypoxemic respiratory event.'
    },
    escalatedToDoctor: true,
    referralCreated: true,
    referralId: 'REF-2026-001236',
    assessmentRemarks: 'Urgent referral sent to City Care Hospital.',
    followUpPlan: 'Escorted to facility transport.',
    nextVisitDate: '2026-09-30',
    adviceToPatient: 'Do not walk unassisted. Immediate specialist evaluation required.',
    additionalNotes: 'Attender notified.',
    status: 'Completed'
  }
];

export const initialPatients: PatientProfile[] = [
  INITIAL_PATIENT_PROFILE,
  {
    id: 'patient-ravi',
    userId: 'user-patient-2',
    patientId: 'CLP001235',
    name: 'Ravi Kumar',
    dob: '1994-04-12',
    age: 32,
    gender: 'Male',
    bloodGroup: 'B+',
    height: '172 cm',
    weight: '68 kg',
    phone: '+91 7654321098',
    email: 'ravi.k@gmail.com',
    address: 'Kallupatti, Thiruvallur, Tamil Nadu',
    language: 'Tamil',
    existingConditions: ['Mild Asthma'],
    allergies: ['Dust'],
    regularMedications: ['Salbutamol Inhaler (SOS)'],
    emergencyContact: {
      name: 'R. Lakshmi (Wife)',
      relation: 'Spouse',
      phone: '+91 7654321099'
    },
    consentGiven: true,
    lastVisit: '10 Sep 2026'
  },
  {
    id: 'patient-meena',
    userId: 'user-patient-3',
    patientId: 'CLP001236',
    name: 'Meena Sundaram',
    dob: '1981-06-20',
    age: 45,
    gender: 'Female',
    bloodGroup: 'A+',
    height: '158 cm',
    weight: '62 kg',
    phone: '+91 8123456789',
    email: 'meena.s@gmail.com',
    address: 'Near Temple, Tiruttani, Tamil Nadu',
    language: 'Tamil',
    existingConditions: ['Hypertension'],
    allergies: ['Penicillin'],
    regularMedications: ['Amlodipine 5mg'],
    emergencyContact: {
      name: 'S. Sundaram',
      relation: 'Husband',
      phone: '+91 8123456788'
    },
    consentGiven: true,
    lastVisit: '20 Sep 2026'
  }
];

export const initialDoctors: Doctor[] = INITIAL_DOCTORS;
export const initialFacilities: Facility[] = INITIAL_FACILITIES;


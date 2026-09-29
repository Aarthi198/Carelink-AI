export type UserRole = 'patient' | 'doctor' | 'health_worker' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone: string;
  avatar?: string;
  specialization?: string;
  zone?: string;
  facility?: string;
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  patientId: string; // e.g. "CLP001234"
  name: string;
  dob: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  height: string; // "160 cm"
  weight: string; // "55 kg"
  phone: string;
  email: string;
  address: string;
  language: 'English' | 'Tamil';
  existingConditions: string[];
  allergies: string[];
  regularMedications: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  consentGiven: boolean;
  avatarUrl?: string;
  lastVisit?: string;
}

export interface SymptomItem {
  id: string;
  name: string;
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

export type UrgencyLevel = 'High Priority' | 'Medium Priority' | 'Routine' | 'URGENT_CARE_NEEDED';

export interface AITriageResult {
  id: string;
  urgencyLevel: UrgencyLevel;
  primaryConditionSummary: string;
  reasons: string[];
  riskIndicators: string[];
  extractedSymptoms: SymptomItem[];
  nextAction: string;
  requiresImmediateEmergency: boolean;
  disclaimer: string;
  possibleConditions: {
    name: string;
    probability: 'High' | 'Medium' | 'Low';
    description: string;
  }[];
  recommendedInvestigations: string[];
}

export type FacilityType = 'Government' | 'Private' | 'Specialist' | 'PHC' | 'CHC' | 'Clinic' | 'Sub Centre' | 'UHC' | 'Hospital' | 'phc' | 'clinic' | 'sub_centre' | 'hospital' | 'specialist';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  category: 'Government' | 'Private' | 'Specialist';
  verified: boolean;
  rating: number;
  reviewsCount: number;
  distance: string;
  travelTime: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  openingHours: string;
  timings: string;
  services: string[];
  appointmentAvailability: string;
  imageUrl: string;
  doctorsCount: number;
  emergencyAvailable: boolean;
  status: 'Active' | 'Inactive';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  facilityId: string;
  facilityName: string;
  consultationFee: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  availableDates: string[];
  availableTimeSlots: string[];
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  facilityId: string;
  facilityName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  triageUrgency?: UrgencyLevel;
  type: 'In-person' | 'Teleconsultation';
  notes?: string;
  consultationFee: number;
  createdAt: string;
}

export type ReferralStatus = 'Created' | 'Received' | 'Accepted' | 'Scheduled' | 'Completed' | 'Closed' | 'Rejected' | 'Escalated';

export interface ReferralTimelineStep {
  status: ReferralStatus;
  title: string;
  timestamp: string;
  actor: string;
  note: string;
  completed: boolean;
}

export interface Referral {
  id: string;
  referralCode: string; // e.g. "REF-2026-001234"
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone: string;
  fromRole: 'patient' | 'doctor' | 'health_worker';
  fromName: string;
  fromFacility: string;
  toDoctorId?: string;
  toDoctorName?: string;
  toFacilityId: string;
  toFacilityName: string;
  specialtyRequired: string;
  reason: string;
  clinicalSummary: string;
  priority: 'High Priority' | 'Medium' | 'Routine' | 'Emergency';
  status: ReferralStatus;
  createdDate: string;
  updatedDate: string;
  scheduledAppointmentId?: string;
  timeline: ReferralTimelineStep[];
}

export type FollowUpStatus = 'Upcoming' | 'Completed' | 'Missed' | 'Rescheduled';
export type FollowUpType = 'In-person Visit' | 'Teleconsultation' | 'Phone Review' | 'Lab Review';

export interface FollowUpTimelineStep {
  step: 'Created' | 'Received' | 'Reminder' | 'Attend' | 'Complete';
  title: string;
  timestamp: string;
  completed: boolean;
}

export interface FollowUp {
  id: string;
  followUpCode: string; // e.g. "FOL-2026-081"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  facilityName: string;
  date: string;
  time: string;
  type: FollowUpType;
  reason: string;
  status: FollowUpStatus;
  reminderSent: boolean;
  reminderDate?: string;
  notes?: string;
  timeline: FollowUpTimelineStep[];
}

export type InvestigationStatus = 'Ordered' | 'Sample Collected' | 'Processing' | 'Result Available' | 'Doctor Reviewed' | 'Patient Notified';

export interface LabValue {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Low' | 'Abnormal';
}

export interface Investigation {
  id: string;
  orderNumber: string; // e.g. "LAB-2026-991"
  testName: string; // e.g. "CBC (Complete Blood Count)", "Chest X-Ray (PA View)"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  facilityName: string;
  orderedDate: string;
  sampleCollectedDate?: string;
  resultAvailableDate?: string;
  reviewedDate?: string;
  patientNotifiedDate?: string;
  status: InvestigationStatus;
  category: 'Hematology' | 'Radiology' | 'Biochemistry' | 'Microbiology';
  fileName?: string;
  fileSize?: string;
  labValues?: LabValue[];
  doctorInterpretation?: string;
  doctorReviewed: boolean;
  patientNotified: boolean;
  timeline: {
    status: InvestigationStatus;
    title: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export type MedicalRecordCategory = 'Medical History' | 'Lab Reports' | 'Prescriptions' | 'Vaccination Records' | 'Documents' | 'Allergies' | 'Growth & Vitals' | 'Consultation Records';

export interface MedicalRecord {
  id: string;
  patientId: string;
  category: MedicalRecordCategory;
  title: string;
  date: string;
  facility: string;
  doctorName?: string;
  summary: string;
  fileSize?: string;
  downloadUrl?: string;
  vitalsData?: {
    bloodPressure?: string;
    heartRate?: string;
    spO2?: string;
    temperature?: string;
    bloodGlucose?: string;
  };
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  facilityName: string;
  date: string;
  diagnosis: string;
  medications: MedicationItem[];
  instructions: string[];
  advice: string;
  status: 'Current' | 'Past';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'Appointments' | 'Referrals' | 'Follow-ups' | 'Lab Results' | 'Health Tips' | 'System';
  link?: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar?: string;
  receiverId: string;
  receiverName: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  patientId?: string;
}

export interface AIDecisionSupport {
  possibleConditions: {
    rank: number;
    name: string;
    probability: 'High' | 'Medium' | 'Low';
    description?: string;
  }[];
  supportingFactors: string[];
  recommendedInvestigations: string[];
  status: 'Preliminary';
  isNotFinal: boolean;
  disclaimer: string;
  acceptedByDoctor?: boolean;
}

export interface ConsultationRecord {
  id: string;
  appointmentId?: string;
  referralId?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  facilityName: string;
  date: string;
  // Step 1: Symptoms & Complaints
  chiefComplaints: {
    symptom: string;
    duration: string;
    severity: string;
  }[];
  historyOfPresentIllness: string;
  // Step 2: Examination & Vitals
  vitalSigns: {
    temperature: string;
    pulse: string;
    bp: string;
    spO2: string;
  };
  examinationFindings: {
    general?: string;
    respiratory?: string;
    cardio?: string;
    abdomen?: string;
    additional?: string;
  };
  // Step 3: AI Decision Support
  aiDecisionSupport: AIDecisionSupport;
  aiAccepted: boolean;
  // Step 4: Diagnosis
  primaryDiagnosis: string;
  additionalDiagnoses: string[];
  diagnosisNotes: string;
  investigationsOrdered: string[];
  // Step 5: Prescription
  medications: MedicationItem[];
  prescriptionInstructions: string;
  // Step 6: Follow-up Plan
  followUpPlan: {
    needed: boolean;
    date?: string;
    type?: FollowUpType;
    reason?: string;
    additionalNotes?: string;
    sendReminder?: boolean;
    showInPatientApp?: boolean;
  };
  // Step 7: Review & Save
  doctorReviewConfirmed: boolean;
  savedAsDraft: boolean;
  reviewedAt: string;
}

export interface HealthWorkerVisit {
  id: string;
  workerId: string;
  workerName: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  visitDate: string;
  visitType: 'ANC Visit' | 'Child Immunization' | 'NCD Screening' | 'Elderly Care' | 'General Home Visit';
  location: string;
  chiefComplaint: string;
  vitals: {
    temperature: string;
    pulse: string;
    bp: string;
    spO2: string;
    glucose?: string;
    weight?: string;
  };
  observations: string;
  aiDecisionSupport: {
    riskClassification: 'HIGH RISK' | 'MODERATE RISK' | 'LOW RISK';
    riskFactors: string[];
    recommendedAction: string;
    preliminaryNote: string;
  };
  escalatedToDoctor: boolean;
  referralCreated: boolean;
  referralId?: string;
  assessmentRemarks: string;
  followUpPlan: string;
  nextVisitDate: string;
  adviceToPatient: string;
  additionalNotes: string;
  status: 'Completed' | 'Pending Referral';
}

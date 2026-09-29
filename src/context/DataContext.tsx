import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Facility,
  Doctor,
  Appointment,
  Referral,
  ReferralStatus,
  FollowUp,
  Investigation,
  Prescription,
  MedicalRecord,
  NotificationItem,
  MessageItem,
  HealthWorkerVisit,
  ConsultationRecord
} from '../types';
import {
  INITIAL_FACILITIES,
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_REFERRALS,
  INITIAL_FOLLOW_UPS,
  INITIAL_INVESTIGATIONS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES,
  INITIAL_HEALTH_WORKER_VISITS
} from '../services/mockData';

interface DataContextType {
  facilities: Facility[];
  doctors: Doctor[];
  appointments: Appointment[];
  referrals: Referral[];
  followUps: FollowUp[];
  investigations: Investigation[];
  prescriptions: Prescription[];
  medicalRecords: MedicalRecord[];
  notifications: NotificationItem[];
  messages: MessageItem[];
  healthWorkerVisits: HealthWorkerVisit[];
  consultations: ConsultationRecord[];

  // Actions
  createAppointment: (data: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  cancelAppointment: (id: string) => void;

  createReferral: (data: Omit<Referral, 'id' | 'referralCode' | 'createdDate' | 'updatedDate' | 'timeline' | 'status'> & { status?: ReferralStatus }) => Referral;
  acceptReferral: (referralId: string, doctorId: string, doctorName: string) => void;
  scheduleReferral: (referralId: string, appointmentDate: string, time: string) => void;
  completeReferral: (referralId: string) => void;
  closeReferral: (referralId: string) => void;
  rejectReferral: (referralId: string, reason?: string) => void;

  createFollowUp: (data: Omit<FollowUp, 'id' | 'followUpCode' | 'timeline'>) => FollowUp;
  markFollowUpAttended: (id: string) => void;
  markFollowUpMissed: (id: string) => void;
  rescheduleFollowUp: (id: string, newDate: string, newTime: string) => void;

  orderInvestigation: (data: Omit<Investigation, 'id' | 'orderNumber' | 'status' | 'doctorReviewed' | 'patientNotified' | 'timeline'>) => Investigation;
  reviewInvestigation: (id: string, doctorInterpretation: string) => void;

  createPrescription: (data: Omit<Prescription, 'id' | 'prescriptionNumber'>) => Prescription;
  addMedicalRecord: (record: Omit<MedicalRecord, 'id'>) => MedicalRecord;

  createHealthWorkerVisit: (data: Omit<HealthWorkerVisit, 'id'>) => HealthWorkerVisit;
  saveConsultation: (consultation: Omit<ConsultationRecord, 'id' | 'reviewedAt'>) => ConsultationRecord;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  sendMessage: (msg: Omit<MessageItem, 'id' | 'timestamp' | 'read'>) => void;
  markMessageRead: (id: string) => void;

  // Management (Admin)
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (id: string, data: Partial<Facility>) => void;
  toggleFacilityStatus: (id: string) => void;

  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, data: Partial<Doctor>) => void;
  toggleDoctorStatus: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('carelink_facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('carelink_doctors');
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('carelink_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem('carelink_referrals');
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem('carelink_followups');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOW_UPS;
  });

  const [investigations, setInvestigations] = useState<Investigation[]>(() => {
    const saved = localStorage.getItem('carelink_investigations');
    return saved ? JSON.parse(saved) : INITIAL_INVESTIGATIONS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('carelink_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('carelink_records');
    return saved ? JSON.parse(saved) : INITIAL_MEDICAL_RECORDS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('carelink_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const saved = localStorage.getItem('carelink_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [healthWorkerVisits, setHealthWorkerVisits] = useState<HealthWorkerVisit[]>(() => {
    const saved = localStorage.getItem('carelink_hw_visits');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_WORKER_VISITS;
  });

  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('carelink_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('carelink_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('carelink_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('carelink_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('carelink_followups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('carelink_investigations', JSON.stringify(investigations));
  }, [investigations]);

  useEffect(() => {
    localStorage.setItem('carelink_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('carelink_records', JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  useEffect(() => {
    localStorage.setItem('carelink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('carelink_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('carelink_hw_visits', JSON.stringify(healthWorkerVisits));
  }, [healthWorkerVisits]);

  // Helper to add notification
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Appointment Actions
  const createAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);

    addNotification({
      userId: data.patientId,
      title: 'Appointment Confirmed',
      message: `Your appointment with ${data.doctorName} at ${data.facilityName} is confirmed for ${data.date} at ${data.time}.`,
      category: 'Appointments',
      link: '/patient/appointments'
    });

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  // Referral Actions
  const createReferral = (data: Omit<Referral, 'id' | 'referralCode' | 'createdDate' | 'updatedDate' | 'timeline' | 'status'> & { status?: ReferralStatus }): Referral => {
    const refCode = `REF-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newRef: Referral = {
      ...data,
      id: `ref-${Date.now()}`,
      referralCode: refCode,
      status: data.status || 'Received',
      createdDate: now.toISOString().split('T')[0],
      updatedDate: now.toISOString().split('T')[0],

      timeline: [
        {
          status: 'Created',
          title: 'Referral Created',
          timestamp: `${formattedDate}, ${formattedTime}`,
          actor: data.fromName,
          note: `Initiated for: ${data.reason}`,
          completed: true
        },
        {
          status: 'Received',
          title: 'Received by Facility',
          timestamp: `${formattedDate}, ${formattedTime}`,
          actor: data.toFacilityName,
          note: 'Awaiting Doctor Review & Acceptance',
          completed: true
        },
        {
          status: 'Accepted',
          title: 'Doctor Acceptance',
          timestamp: 'Pending',
          actor: data.toDoctorName || 'Assigned Physician',
          note: '',
          completed: false
        },
        {
          status: 'Scheduled',
          title: 'Appointment Scheduled',
          timestamp: 'Pending',
          actor: 'System',
          note: '',
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
    };

    setReferrals(prev => [newRef, ...prev]);

    addNotification({
      userId: data.patientId,
      title: 'Referral Created',
      message: `Your referral ${refCode} has been sent to ${data.toFacilityName}.`,
      category: 'Referrals',
      link: '/patient/referrals'
    });

    return newRef;
  };

  const acceptReferral = (referralId: string, doctorId: string, doctorName: string) => {
    const now = new Date();
    const ts = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        const updatedTimeline = ref.timeline.map(step => {
          if (step.status === 'Accepted') {
            return {
              ...step,
              timestamp: ts,
              actor: `Dr. ${doctorName}`,
              note: 'Referral reviewed and accepted for priority consultation',
              completed: true
            };
          }
          return step;
        });

        addNotification({
          userId: ref.patientId,
          title: 'Referral Accepted',
          message: `Your referral ${ref.referralCode} has been accepted by Dr. ${doctorName} at ${ref.toFacilityName}.`,
          category: 'Referrals',
          link: '/patient/referrals'
        });

        return {
          ...ref,
          status: 'Accepted',
          toDoctorId: doctorId,
          toDoctorName: doctorName,
          timeline: updatedTimeline
        };
      }
      return ref;
    }));
  };

  const scheduleReferral = (referralId: string, appointmentDate: string, time: string) => {
    const now = new Date();
    const ts = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        const updatedTimeline = ref.timeline.map(step => {
          if (step.status === 'Scheduled') {
            return {
              ...step,
              timestamp: ts,
              note: `Appointment confirmed for ${appointmentDate} at ${time}`,
              completed: true
            };
          }
          return step;
        });

        addNotification({
          userId: ref.patientId,
          title: 'Referral Appointment Scheduled',
          message: `Appointment for referral ${ref.referralCode} is scheduled for ${appointmentDate} at ${time}.`,
          category: 'Referrals',
          link: '/patient/appointments'
        });

        return {
          ...ref,
          status: 'Scheduled',
          timeline: updatedTimeline
        };
      }
      return ref;
    }));
  };

  const completeReferral = (referralId: string) => {
    const ts = new Date().toLocaleString();
    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        const updatedTimeline = ref.timeline.map(step => {
          if (step.status === 'Completed') {
            return { ...step, timestamp: ts, completed: true, note: 'Consultation and clinical assessment finished.' };
          }
          return step;
        });
        return { ...ref, status: 'Completed', timeline: updatedTimeline };
      }
      return ref;
    }));
  };

  const closeReferral = (referralId: string) => {
    const ts = new Date().toLocaleString();
    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        const updatedTimeline = ref.timeline.map(step => {
          if (step.status === 'Closed') {
            return { ...step, timestamp: ts, completed: true, note: 'Referral lifecycle closed.' };
          }
          return step;
        });
        return { ...ref, status: 'Closed', timeline: updatedTimeline };
      }
      return ref;
    }));
  };

  const rejectReferral = (referralId: string, reason?: string) => {
    setReferrals(prev => prev.map(ref => ref.id === referralId ? { ...ref, status: 'Rejected' } : ref));
  };

  // Follow-up Actions
  const createFollowUp = (data: Omit<FollowUp, 'id' | 'followUpCode' | 'timeline'>): FollowUp => {
    const code = `FOL-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newFol: FollowUp = {
      ...data,
      id: `fol-${Date.now()}`,
      followUpCode: code,
      timeline: [
        {
          step: 'Created',
          title: 'Follow-up Created',
          timestamp: `${formattedDate} (By ${data.doctorName})`,
          completed: true
        },
        {
          step: 'Received',
          title: 'Follow-up Received',
          timestamp: `${formattedDate} (In Patient Portal)`,
          completed: true
        },
        {
          step: 'Reminder',
          title: 'Reminder Scheduled',
          timestamp: `Scheduled for 1 day before ${data.date}`,
          completed: true
        },
        {
          step: 'Attend',
          title: 'Attend Follow-up',
          timestamp: `Scheduled for ${data.date}, ${data.time}`,
          completed: false
        },
        {
          step: 'Complete',
          title: 'Completed / Missed',
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setFollowUps(prev => [newFol, ...prev]);

    addNotification({
      userId: data.patientId,
      title: 'Follow-up Plan Created',
      message: `Dr. ${data.doctorName} scheduled a ${data.type} follow-up for you on ${data.date}.`,
      category: 'Follow-ups',
      link: '/patient/follow-ups'
    });

    return newFol;
  };

  const markFollowUpAttended = (id: string) => {
    const ts = new Date().toLocaleTimeString();
    setFollowUps(prev => prev.map(fol => {
      if (fol.id === id) {
        const updatedTimeline = fol.timeline.map(step => {
          if (step.step === 'Attend' || step.step === 'Complete') {
            return { ...step, completed: true, timestamp: `Completed at ${ts}` };
          }
          return step;
        });
        return { ...fol, status: 'Completed', timeline: updatedTimeline };
      }
      return fol;
    }));
  };

  const markFollowUpMissed = (id: string) => {
    setFollowUps(prev => prev.map(fol => fol.id === id ? { ...fol, status: 'Missed' } : fol));
  };

  const rescheduleFollowUp = (id: string, newDate: string, newTime: string) => {
    setFollowUps(prev => prev.map(fol => {
      if (fol.id === id) {
        return {
          ...fol,
          date: newDate,
          time: newTime,
          status: 'Upcoming'
        };
      }
      return fol;
    }));
  };

  // Investigation Actions
  const orderInvestigation = (data: Omit<Investigation, 'id' | 'orderNumber' | 'status' | 'doctorReviewed' | 'patientNotified' | 'timeline'>): Investigation => {
    const orderNumber = `LAB-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newInv: Investigation = {
      ...data,
      id: `inv-${Date.now()}`,
      orderNumber,
      status: 'Ordered',
      doctorReviewed: false,
      patientNotified: false,
      timeline: [
        { status: 'Ordered', title: 'Test Ordered', timestamp: `${formattedDate} (By ${data.doctorName})`, completed: true },
        { status: 'Sample Collected', title: 'Sample Collected', timestamp: 'Pending', completed: false },
        { status: 'Processing', title: 'Laboratory Processing', timestamp: 'Pending', completed: false },
        { status: 'Result Available', title: 'Result Available', timestamp: 'Pending', completed: false },
        { status: 'Doctor Reviewed', title: 'Doctor Review', timestamp: 'Pending', completed: false },
        { status: 'Patient Notified', title: 'Patient Notified', timestamp: 'Pending', completed: false }
      ]
    };

    setInvestigations(prev => [newInv, ...prev]);

    addNotification({
      userId: data.patientId,
      title: 'Lab Test Ordered',
      message: `${data.testName} was ordered by ${data.doctorName}. Please visit the laboratory for sample collection.`,
      category: 'Lab Results',
      link: '/patient/investigations'
    });

    return newInv;
  };

  const reviewInvestigation = (id: string, doctorInterpretation: string) => {
    const now = new Date();
    const ts = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    setInvestigations(prev => prev.map(inv => {
      if (inv.id === id) {
        const updatedTimeline = inv.timeline.map(step => {
          if (step.status === 'Doctor Reviewed' || step.status === 'Patient Notified') {
            return {
              ...step,
              timestamp: ts,
              completed: true
            };
          }
          return step;
        });

        // Trigger patient notification
        addNotification({
          userId: inv.patientId,
          title: 'Doctor Reviewed Your Lab Result',
          message: `${inv.doctorName} has reviewed your ${inv.testName} report. Interpretation: "${doctorInterpretation.slice(0, 80)}..."`,
          category: 'Lab Results',
          link: '/patient/investigations'
        });

        return {
          ...inv,
          status: 'Doctor Reviewed',
          doctorInterpretation,
          doctorReviewed: true,
          patientNotified: true,
          reviewedDate: ts,
          patientNotifiedDate: ts,
          timeline: updatedTimeline
        };
      }
      return inv;
    }));
  };

  // Prescription Actions
  const createPrescription = (data: Omit<Prescription, 'id' | 'prescriptionNumber'>): Prescription => {
    const rxNumber = `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRx: Prescription = {
      ...data,
      id: `rx-${Date.now()}`,
      prescriptionNumber: rxNumber
    };
    setPrescriptions(prev => [newRx, ...prev]);

    addNotification({
      userId: data.patientId,
      title: 'New Digital Prescription Added',
      message: `Prescription ${rxNumber} by ${data.doctorName} for ${data.diagnosis} is now active.`,
      category: 'Health Tips',
      link: '/patient/prescriptions'
    });

    return newRx;
  };

  const addMedicalRecord = (record: Omit<MedicalRecord, 'id'>): MedicalRecord => {
    const newRec: MedicalRecord = {
      ...record,
      id: `rec-${Date.now()}`
    };
    setMedicalRecords(prev => [newRec, ...prev]);
    return newRec;
  };

  const createHealthWorkerVisit = (data: Omit<HealthWorkerVisit, 'id'>): HealthWorkerVisit => {
    const newVisit: HealthWorkerVisit = {
      ...data,
      id: `hw-visit-${Date.now()}`
    };
    setHealthWorkerVisits(prev => [newVisit, ...prev]);
    return newVisit;
  };

  const saveConsultation = (consultation: Omit<ConsultationRecord, 'id' | 'reviewedAt'>): ConsultationRecord => {
    const newRecord: ConsultationRecord = {
      ...consultation,
      id: `consult-${Date.now()}`,
      reviewedAt: new Date().toISOString()
    };
    setConsultations(prev => [newRecord, ...prev]);

    // Create prescription if medications exist
    if (consultation.medications.length > 0) {
      createPrescription({
        patientId: consultation.patientId,
        patientName: 'M. Aarthi',
        doctorId: consultation.doctorId,
        doctorName: consultation.doctorName,
        facilityName: consultation.facilityName,
        date: consultation.date,
        diagnosis: consultation.primaryDiagnosis,
        medications: consultation.medications,
        instructions: [consultation.prescriptionInstructions || 'Take as directed'],
        advice: consultation.diagnosisNotes || 'Rest and hydrate',
        status: 'Current'
      });
    }

    // Create follow-up if needed
    if (consultation.followUpPlan.needed && consultation.followUpPlan.date) {
      createFollowUp({
        patientId: consultation.patientId,
        patientName: 'M. Aarthi',
        doctorId: consultation.doctorId,
        doctorName: consultation.doctorName,
        facilityName: consultation.facilityName,
        date: consultation.followUpPlan.date,
        time: '09:00 AM',
        type: consultation.followUpPlan.type || 'In-person Visit',
        reason: consultation.followUpPlan.reason || 'Post Consultation Review',
        status: 'Upcoming',
        reminderSent: true,
        notes: consultation.followUpPlan.additionalNotes
      });
    }

    // Add consultation to medical records
    addMedicalRecord({
      patientId: consultation.patientId,
      category: 'Consultation Records',
      title: `Consultation Summary — ${consultation.primaryDiagnosis}`,
      date: consultation.date,
      facility: consultation.facilityName,
      doctorName: consultation.doctorName,
      summary: `Primary Diagnosis: ${consultation.primaryDiagnosis}. Vitals: Temp ${consultation.vitalSigns.temperature}, Pulse ${consultation.vitalSigns.pulse}, SpO2 ${consultation.vitalSigns.spO2}. ${consultation.medications.length} medications prescribed.`,
      fileSize: '350 KB',
      downloadUrl: '#'
    });

    return newRecord;
  };

  // Notification Actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Messages
  const sendMessage = (msg: Omit<MessageItem, 'id' | 'timestamp' | 'read'>) => {
    const newMsg: MessageItem = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  // Admin Facility Actions
  const addFacility = (facility: Omit<Facility, 'id'>) => {
    const newFac: Facility = {
      ...facility,
      id: `fac-${Date.now()}`
    };
    setFacilities(prev => [newFac, ...prev]);
  };

  const updateFacility = (id: string, data: Partial<Facility>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  };

  const toggleFacilityStatus = (id: string) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' } : f));
  };

  // Admin Doctor Actions
  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoc: Doctor = {
      ...doctor,
      id: `doc-${Date.now()}`
    };
    setDoctors(prev => [newDoc, ...prev]);
  };

  const updateDoctor = (id: string, data: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const toggleDoctorStatus = (id: string) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d));
  };

  return (
    <DataContext.Provider
      value={{
        facilities,
        doctors,
        appointments,
        referrals,
        followUps,
        investigations,
        prescriptions,
        medicalRecords,
        notifications,
        messages,
        healthWorkerVisits,
        consultations,
        createAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        createReferral,
        acceptReferral,
        scheduleReferral,
        completeReferral,
        closeReferral,
        rejectReferral,
        createFollowUp,
        markFollowUpAttended,
        markFollowUpMissed,
        rescheduleFollowUp,
        orderInvestigation,
        reviewInvestigation,
        createPrescription,
        addMedicalRecord,
        createHealthWorkerVisit,
        saveConsultation,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        sendMessage,
        markMessageRead,
        addFacility,
        updateFacility,
        toggleFacilityStatus,
        addDoctor,
        updateDoctor,
        toggleDoctorStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

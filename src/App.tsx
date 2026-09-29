import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { PatientBottomNav } from './components/patient/PatientBottomNav';
import { OfflineBanner } from './components/common/OfflineBanner';
import { EmergencyAlert } from './components/common/EmergencyAlert';

// Public & Onboarding Pages
import { LandingSplash } from './pages/LandingSplash';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPatientPage } from './pages/auth/RegisterPatientPage';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { PatientAIAssistant } from './pages/patient/PatientAIAssistant';
import { PatientFacilities } from './pages/patient/PatientFacilities';
import { PatientFacilityDetails } from './pages/patient/PatientFacilityDetails';
import { PatientBookAppointment } from './pages/patient/PatientBookAppointment';
import { PatientAppointments } from './pages/patient/PatientAppointments';
import { PatientReferrals } from './pages/patient/PatientReferrals';
import { PatientFollowUps } from './pages/patient/PatientFollowUps';
import { PatientInvestigations } from './pages/patient/PatientInvestigations';
import { PatientRecords } from './pages/patient/PatientRecords';
import { PatientPrescriptions } from './pages/patient/PatientPrescriptions';
import { PatientProfile } from './pages/patient/PatientProfile';
import { PatientEditProfile } from './pages/patient/PatientEditProfile';
import { PatientNotifications } from './pages/patient/PatientNotifications';
import { PatientEmergency } from './pages/patient/PatientEmergency';
import { PatientSettings } from './pages/patient/PatientSettings';
import { PatientHelpSupport } from './pages/patient/PatientHelpSupport';

// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorConsultation } from './pages/doctor/DoctorConsultation';
import { DoctorReferrals } from './pages/doctor/DoctorReferrals';
import { DoctorInvestigations } from './pages/doctor/DoctorInvestigations';
import { DoctorPatients } from './pages/doctor/DoctorPatients';
import { DoctorPatientDetails } from './pages/doctor/DoctorPatientDetails';
import { DoctorAppointments } from './pages/doctor/DoctorAppointments';
import { DoctorFollowUps } from './pages/doctor/DoctorFollowUps';
import { DoctorMessages } from './pages/doctor/DoctorMessages';
import { DoctorProfile } from './pages/doctor/DoctorProfile';

// Health Worker Pages
import { HealthWorkerDashboard } from './pages/healthworker/HealthWorkerDashboard';
import { HealthWorkerVisits } from './pages/healthworker/HealthWorkerVisits';
import { HealthWorkerPatients } from './pages/healthworker/HealthWorkerPatients';
import { HealthWorkerReferrals } from './pages/healthworker/HealthWorkerReferrals';
import { HealthWorkerReports } from './pages/healthworker/HealthWorkerReports';
import { HealthWorkerProfile } from './pages/healthworker/HealthWorkerProfile';
import { HealthWorkerMessages } from './pages/healthworker/HealthWorkerMessages';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminPatients } from './pages/admin/AdminPatients';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminHealthWorkers } from './pages/admin/AdminHealthWorkers';
import { AdminFacilities } from './pages/admin/AdminFacilities';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AdminReferrals } from './pages/admin/AdminReferrals';
import { AdminFollowUps } from './pages/admin/AdminFollowUps';
import { AdminInvestigations } from './pages/admin/AdminInvestigations';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

// Layout Wrappers
const PatientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <Outlet />
      </main>
      <PatientBottomNav />
      <EmergencyAlert />
    </div>
  );
};

const DoctorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <OfflineBanner />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar className="hidden md:flex shrink-0" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
      <EmergencyAlert />
    </div>
  );
};

const HealthWorkerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <OfflineBanner />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar className="hidden md:flex shrink-0" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
      <EmergencyAlert />
    </div>
  );
};

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <OfflineBanner />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar className="hidden md:flex shrink-0" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
      <EmergencyAlert />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth */}
        <Route path="/" element={<LandingSplash />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPatientPage />} />

        {/* Patient Portal */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="ai-assistant" element={<PatientAIAssistant />} />
          <Route path="facilities" element={<PatientFacilities />} />
          <Route path="facilities/:facilityId" element={<PatientFacilityDetails />} />
          <Route path="book-appointment" element={<PatientBookAppointment />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="referrals" element={<PatientReferrals />} />
          <Route path="follow-ups" element={<PatientFollowUps />} />
          <Route path="investigations" element={<PatientInvestigations />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="profile/edit" element={<PatientEditProfile />} />
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="emergency" element={<PatientEmergency />} />
          <Route path="settings" element={<PatientSettings />} />
          <Route path="help" element={<PatientHelpSupport />} />
        </Route>

        {/* Doctor Portal */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="patients/:patientId" element={<DoctorPatientDetails />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="referrals" element={<DoctorReferrals />} />
          <Route path="consultation" element={<DoctorConsultation />} />
          <Route path="investigations" element={<DoctorInvestigations />} />
          <Route path="follow-ups" element={<DoctorFollowUps />} />
          <Route path="messages" element={<DoctorMessages />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>

        {/* Health Worker Portal */}
        <Route path="/health-worker" element={<HealthWorkerLayout />}>
          <Route index element={<HealthWorkerDashboard />} />
          <Route path="patients" element={<HealthWorkerPatients />} />
          <Route path="visits" element={<HealthWorkerVisits />} />
          <Route path="referrals" element={<HealthWorkerReferrals />} />
          <Route path="reports" element={<HealthWorkerReports />} />
          <Route path="messages" element={<HealthWorkerMessages />} />
          <Route path="profile" element={<HealthWorkerProfile />} />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="health-workers" element={<AdminHealthWorkers />} />
          <Route path="facilities" element={<AdminFacilities />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="referrals" element={<AdminReferrals />} />
          <Route path="follow-ups" element={<AdminFollowUps />} />
          <Route path="investigations" element={<AdminInvestigations />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

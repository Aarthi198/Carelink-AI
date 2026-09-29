import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Globe,
  Clock,
  Shield,
  Bell,
  Lock,
  CheckCircle2,
  Save,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Upload
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'roles' | 'security'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State matching wireframe 12
  const [generalSettings, setGeneralSettings] = useState({
    hospitalName: 'CareLink AI Health Network',
    tagline: 'Your Health, Our Priority',
    primaryLanguage: 'English',
    secondaryLanguage: 'Tamil (தமிழ்)',
    timezone: '(UTC+05:30) India Standard Time (IST)',
    allowPatientReg: true,
    allowDoctorReg: true,
    allowHealthWorkerReg: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    smsAlerts: true,
    emailAlerts: true,
    pushNotifications: true,
    emergency108AutoDispatch: true,
    ashaDailyDigest: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeoutMins: 30,
    enforcePasswordPolicy: true,
    aiClinicalAuditLogging: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-sm text-slate-500">Configure global platform parameters, languages, access rules, and security controls</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>System configuration changes have been applied and synced across all network nodes.</span>
        </div>
      )}

      {/* Tabs (Wireframe 12) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['general', 'notifications', 'roles', 'security'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'general' && 'General Settings'}
            {tab === 'notifications' && 'Notifications & Alerts'}
            {tab === 'roles' && 'Roles & Permissions'}
            {tab === 'security' && 'Security & AI Governance'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">Hospital & Platform Identity</h2>
              <p className="text-xs text-slate-500">Customize the healthcare entity branding visible across mobile & web portals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Platform / Hospital Name</label>
                <input
                  type="text"
                  value={generalSettings.hospitalName}
                  onChange={e => setGeneralSettings({ ...generalSettings, hospitalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={generalSettings.tagline}
                  onChange={e => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Language</label>
                <select
                  value={generalSettings.primaryLanguage}
                  onChange={e => setGeneralSettings({ ...generalSettings, primaryLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="English">English</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Timezone</label>
                <input
                  type="text"
                  disabled
                  value={generalSettings.timezone}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Self-Registration Permissions (Wireframe 12)</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">Allow Patient Registration</div>
                    <div className="text-[11px] text-slate-500">Enable public patient onboarding with OTP verification</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGeneralSettings(prev => ({ ...prev, allowPatientReg: !prev.allowPatientReg }))}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      generalSettings.allowPatientReg ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">Allow Doctor Registration</div>
                    <div className="text-[11px] text-slate-500">Allow medical officers to register pending credential verification</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGeneralSettings(prev => ({ ...prev, allowDoctorReg: !prev.allowDoctorReg }))}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      generalSettings.allowDoctorReg ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">Allow Health Worker Registration</div>
                    <div className="text-[11px] text-slate-500">Allow field ASHA/ANM workers to register under linked PHC</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGeneralSettings(prev => ({ ...prev, allowHealthWorkerReg: !prev.allowHealthWorkerReg }))}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      generalSettings.allowHealthWorkerReg ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800">Dispatch & Automated Notification Rules</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Automated SMS Reminders</div>
                  <div className="text-[11px] text-slate-500">Send 24-hour appointment & follow-up SMS reminders in Tamil/English</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationSettings(p => ({ ...p, smsAlerts: !p.smsAlerts }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notificationSettings.smsAlerts ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Emergency 108 Auto-Dispatch Integration</div>
                  <div className="text-[11px] text-slate-500">Share GPS location coordinates with 108 ambulance dispatch upon red triage trigger</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationSettings(p => ({ ...p, emergency108AutoDispatch: !p.emergency108AutoDispatch }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notificationSettings.emergency108AutoDispatch ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Field Health Worker Daily Digest</div>
                  <div className="text-[11px] text-slate-500">Transmit daily schedule and high-risk case list to mobile apps at 07:00 AM</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationSettings(p => ({ ...p, ashaDailyDigest: !p.ashaDailyDigest }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notificationSettings.ashaDailyDigest ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800">Role-Based Access Control Matrix (RBAC)</h2>
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-sky-900">Configured Security Enforcement:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Patients:</strong> Strictly isolated to self-records, prescriptions, appointments, and referrals.</li>
                <li><strong>Doctors:</strong> Access to assigned and referred patients; mandatory clinical review before saving AI triage.</li>
                <li><strong>Health Workers:</strong> Field screening, high-risk escalation, and visit recording. No independent prescribing.</li>
                <li><strong>Admins:</strong> Full operational oversight, compliance metrics, user and facility management.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800">AI Safety & Clinical Governance</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">AI Clinical Audit Trail</div>
                  <div className="text-[11px] text-slate-500">Record all AI preliminary symptom extractions and doctor accept/reject decisions in immutable log</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSecuritySettings(p => ({ ...p, aiClinicalAuditLogging: !p.aiClinicalAuditLogging }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    securitySettings.aiClinicalAuditLogging ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800 text-xs">Mandatory Two-Factor Authentication (2FA) for Doctors</div>
                  <div className="text-[11px] text-slate-500">Require OTP or biometric authentication for signing clinical records</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSecuritySettings(p => ({ ...p, twoFactorAuth: !p.twoFactorAuth }))}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    securitySettings.twoFactorAuth ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md transition-colors text-sm"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

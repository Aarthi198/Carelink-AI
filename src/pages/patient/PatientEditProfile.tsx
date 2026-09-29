import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Check, Camera, User, Heart, PhoneCall, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PatientEditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile, updateProfile } = useAuth();

  const [name, setName] = useState(patientProfile.name);
  const [dob, setDob] = useState(patientProfile.dob);
  const [gender, setGender] = useState(patientProfile.gender);
  const [email, setEmail] = useState(patientProfile.email);
  const [phone, setPhone] = useState(patientProfile.phone);
  const [address, setAddress] = useState(patientProfile.address);
  const [language, setLanguage] = useState(patientProfile.language);
  const [bloodGroup, setBloodGroup] = useState(patientProfile.bloodGroup);
  const [height, setHeight] = useState(patientProfile.height.replace(' cm', ''));
  const [weight, setWeight] = useState(patientProfile.weight.replace(' kg', ''));
  const [emergencyName, setEmergencyName] = useState(patientProfile.emergencyContact.name);
  const [emergencyRelation, setEmergencyRelation] = useState(patientProfile.emergencyContact.relation);
  const [emergencyPhone, setEmergencyPhone] = useState(patientProfile.emergencyContact.phone);
  const [allergies, setAllergies] = useState(patientProfile.allergies.join(', '));
  const [medications, setMedications] = useState(patientProfile.regularMedications.join(', '));

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      dob,
      gender,
      email,
      phone,
      address,
      language,
      bloodGroup,
      height: `${height} cm`,
      weight: `${weight} kg`,
      emergencyContact: {
        name: emergencyName,
        relation: emergencyRelation,
        phone: emergencyPhone
      },
      allergies: allergies ? allergies.split(',').map(a => a.trim()) : ['None'],
      regularMedications: medications ? medications.split(',').map(m => m.trim()) : ['None']
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate('/patient/profile');
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/patient/profile')}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Edit Profile</h1>
        <div className="w-8" />
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Edit Form (Matching Wireframe Page 14) */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        {/* Photo */}
        <div className="flex flex-col items-center justify-center pb-2">
          <img
            src={patientProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-100 shadow-sm"
          />
          <span className="text-[10px] text-slate-400 mt-1">Photo synced from account</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Female', 'Male', 'Other'] as const).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                    gender === g
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Address *</label>
          <textarea
            rows={2}
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={e => setBloodGroup(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
          <label className="block text-xs font-extrabold text-slate-800">
            Emergency Contact Information
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={emergencyName}
              onChange={e => setEmergencyName(e.target.value)}
              placeholder="Contact Name"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
            />
            <input
              type="text"
              value={emergencyRelation}
              onChange={e => setEmergencyRelation(e.target.value)}
              placeholder="Relation (e.g. Father)"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
            />
            <input
              type="tel"
              value={emergencyPhone}
              onChange={e => setEmergencyPhone(e.target.value)}
              placeholder="Phone Number"
              className="col-span-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
            />
          </div>
        </div>

        {/* Allergies & Medications */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Allergies (comma separated)</label>
          <input
            type="text"
            value={allergies}
            onChange={e => setAllergies(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Regular Medications</label>
          <input
            type="text"
            value={medications}
            onChange={e => setMedications(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          >
            <option value="English">English</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, ArrowRight, ArrowLeft, Check, Edit2, ShieldCheck, Heart, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';

export const RegisterPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, switchRole } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Personal
  const [fullName, setFullName] = useState('M. Aarthi');
  const [dob, setDob] = useState('2003-09-28');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [mobile, setMobile] = useState('+91 9876543210');
  const [email, setEmail] = useState('aarthi@gmail.com');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80');

  // Step 2: Health
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [height, setHeight] = useState('160');
  const [weight, setWeight] = useState('55');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['None']);
  const [allergies, setAllergies] = useState('None');
  const [medications, setMedications] = useState('None');

  // Step 3: Consent
  const [agreeConsent, setAgreeConsent] = useState(true);

  const conditionOptions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Thyroid',
    'Heart Disease',
    'Allergies',
    'None'
  ];

  const toggleCondition = (cond: string) => {
    if (cond === 'None') {
      setSelectedConditions(['None']);
      return;
    }
    const filtered = selectedConditions.filter(c => c !== 'None');
    if (filtered.includes(cond)) {
      const next = filtered.filter(c => c !== cond);
      setSelectedConditions(next.length ? next : ['None']);
    } else {
      setSelectedConditions([...filtered, cond]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeConsent) return;

    updateProfile({
      name: fullName,
      dob,
      gender,
      phone: mobile,
      email,
      bloodGroup,
      height: `${height} cm`,
      weight: `${weight} kg`,
      existingConditions: selectedConditions,
      allergies: allergies ? [allergies] : ['None'],
      regularMedications: medications ? [medications] : ['None'],
      consentGiven: true,
      avatarUrl
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    switchRole('patient');
    navigate('/patient');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100">
        {/* Header */}
        <div className="text-center mb-5">
          <Logo size="md" className="justify-center mb-2" />
          <h2 className="text-xl font-black text-slate-900">Create Patient Account</h2>
          <p className="text-xs text-slate-500">
            Join CareLink AI to access smarter healthcare services.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between relative mb-6 px-4">
          <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
          <div
            className="absolute top-3.5 left-8 h-0.5 bg-brand-500 -z-0 transition-all duration-300"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Health' },
            { num: 3, label: 'Review' }
          ].map(s => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center relative z-10">
                <button
                  type="button"
                  onClick={() => s.num < step && setStep(s.num as any)}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-brand-600 text-white'
                      : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </button>
                <span className={`text-[10px] font-semibold mt-1 ${isCurrent ? 'text-brand-700' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: Personal Information */}
        {step === 1 && (
          <form onSubmit={e => { e.preventDefault(); setStep(2); }} className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Personal Information
            </h3>

            {/* Photo Upload */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-100 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    const sampleAvatars = [
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
                    ];
                    const next = sampleAvatars[(sampleAvatars.indexOf(avatarUrl) + 1) % sampleAvatars.length];
                    setAvatarUrl(next);
                  }}
                  className="absolute bottom-0 right-0 p-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-sm"
                  title="Change sample photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Upload Photo (Optional)</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
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
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
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
                          ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Health Information */}
        {step === 2 && (
          <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Health Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="160"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="55"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Existing Medical Conditions <span className="text-slate-400 font-normal">(Select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {conditionOptions.map(cond => {
                  const isSelected = selectedConditions.includes(cond);
                  return (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => toggleCondition(cond)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                        isSelected
                          ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cond} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Allergies (if any)</label>
              <input
                type="text"
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                placeholder="e.g. Pollen, Dust, Medicines, Food"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Regular Medications (if any)</label>
              <input
                type="text"
                value={medications}
                onChange={e => setMedications(e.target.value)}
                placeholder="e.g. Paracetamol 500mg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Review Details */}
        {step === 3 && (
          <form onSubmit={handleFinish} className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Review Your Details
            </h3>

            {/* Personal Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-600" />
                  Personal Information
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-bold text-brand-600 flex items-center gap-1 hover:underline"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
              </div>

              <div className="flex items-center gap-3">
                <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{fullName}</p>
                  <p className="text-slate-500">28 Sep 2003 • {gender}</p>
                  <p className="text-slate-500">{mobile}</p>
                  <p className="text-slate-500">{email}</p>
                </div>
              </div>
            </div>

            {/* Health Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  Health Information
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[11px] font-bold text-brand-600 flex items-center gap-1 hover:underline"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Blood Group</span>
                  <span className="font-bold text-slate-800">{bloodGroup}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Height / Weight</span>
                  <span className="font-bold text-slate-800">{height} cm / {weight} kg</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 block font-semibold">Conditions</span>
                  <span className="font-medium text-slate-700">{selectedConditions.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Allergies</span>
                  <span className="font-medium text-slate-700">{allergies}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Regular Meds</span>
                  <span className="font-medium text-slate-700">{medications}</span>
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-brand-50/50 border border-brand-100 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeConsent}
                onChange={e => setAgreeConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span className="text-[11px] text-slate-600 leading-relaxed font-medium">
                I agree to the <span className="font-bold text-brand-700">Terms & Privacy Policy</span> and allow CareLink AI to securely process my health information for clinical assistance.
              </span>
            </label>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={!agreeConsent}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-5 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

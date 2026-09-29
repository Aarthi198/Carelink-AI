import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Mic,
  ShieldCheck,
  RotateCcw,
  Pill,
  Calendar,
  Save,
  FileText,
  User,
  Heart,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { MedicationItem, FollowUpType } from '../../types';

export const DoctorConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { patientProfile } = useAuth();
  const { saveConsultation, orderInvestigation } = useData();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // Step 1: Chief complaints & HPI
  const [chiefComplaints, setChiefComplaints] = useState([
    { symptom: 'Fever', duration: '3 days', severity: 'Moderate' },
    { symptom: 'Cough with phlegm', duration: '3 days', severity: 'Moderate' },
    { symptom: 'Breathing difficulty', duration: '1 day', severity: 'Moderate' }
  ]);
  const [hpiText, setHpiText] = useState('Patient reports 3-day history of acute onset high-grade fever associated with productive cough and mild exertional breathlessness.');

  // Step 2: Vitals & Exam
  const [temp, setTemp] = useState('101.2 °F');
  const [pulse, setPulse] = useState('96 bpm');
  const [bp, setBp] = useState('110/70 mmHg');
  const [spO2, setSpO2] = useState('98 %');
  const [respiratoryExam, setRespiratoryExam] = useState('Bilateral vesicular breath sounds, mild right mid-zone rhonchi on forced expiration.');
  const [generalExam, setGeneralExam] = useState('Febrile, oriented, mild dehydration.');

  // Step 3: AI Decision Support State
  const [aiAccepted, setAiAccepted] = useState<boolean | null>(null);

  // Step 4: Diagnosis & Investigations
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('Acute Lower Respiratory Tract Infection (LRTI)');
  const [additionalDiagnoses, setAdditionalDiagnoses] = useState<string[]>(['Viral Fever']);
  const [diagnosisNotes, setDiagnosisNotes] = useState('Acute onset LRTI with mild bronchial hyper-responsiveness.');
  const [orderedLabs, setOrderedLabs] = useState<string[]>(['CBC', 'CRP', 'Chest X-Ray (PA View)']);

  // Step 5: Prescription
  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: 'med-1',
      name: 'Paracetamol 500 mg',
      dosage: '1 tablet',
      frequency: 'thrice daily',
      duration: '5 days',
      instructions: 'Take after meals. For fever & body pain.'
    },
    {
      id: 'med-2',
      name: 'Azithromycin 500 mg',
      dosage: '1 tablet',
      frequency: 'once daily',
      duration: '3 days',
      instructions: 'Take at fixed time daily. Complete the course.'
    },
    {
      id: 'med-3',
      name: 'Cough Syrup (Ambroxol)',
      dosage: '10 ml',
      frequency: 'thrice daily',
      duration: '5 days',
      instructions: 'Take with warm water. Avoid cold drinks.'
    }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('1 tablet');
  const [newMedFrequency, setNewMedFrequency] = useState('twice daily');
  const [newMedDuration, setNewMedDuration] = useState('5 days');

  // Step 6: Follow-up Plan
  const [followUpNeeded, setFollowUpNeeded] = useState(true);
  const [followUpDate, setFollowUpDate] = useState('2026-10-07');
  const [followUpType, setFollowUpType] = useState<FollowUpType>('In-person Visit');
  const [followUpReason, setFollowUpReason] = useState('Symptom review');
  const [followUpNotes, setFollowUpNotes] = useState('Review after completion of antibiotic course. Check repeat SpO2.');
  const [sendReminder, setSendReminder] = useState(true);
  const [showInPatientApp, setShowInPatientApp] = useState(true);

  // Step 7: Doctor Review Confirmation Checkbox
  const [doctorConfirmed, setDoctorConfirmed] = useState(false);

  const toggleLabOrder = (lab: string) => {
    if (orderedLabs.includes(lab)) {
      setOrderedLabs(prev => prev.filter(l => l !== lab));
    } else {
      setOrderedLabs(prev => [...prev, lab]);
    }
  };

  const handleAddMedication = () => {
    if (!newMedName.trim()) return;
    setMedications(prev => [
      ...prev,
      {
        id: `med-${Date.now()}`,
        name: newMedName.trim(),
        dosage: newMedDosage,
        frequency: newMedFrequency,
        duration: newMedDuration,
        instructions: 'Take after food'
      }
    ]);
    setNewMedName('');
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const handleSaveConsultation = () => {
    if (!doctorConfirmed) {
      alert('Doctor confirmation is mandatory before saving the consultation.');
      return;
    }

    // Save Consultation Record
    saveConsultation({
      patientId: patientProfile.id,
      doctorId: 'doc-1',
      doctorName: 'Dr. R. Lakshmi',
      facilityName: 'Government Primary Health Centre, Thiruvaiyaru',
      date: '2026-09-30',
      chiefComplaints,
      historyOfPresentIllness: hpiText,
      vitalSigns: {
        temperature: temp,
        pulse,
        bp,
        spO2
      },
      examinationFindings: {
        general: generalExam,
        respiratory: respiratoryExam
      },
      aiDecisionSupport: {
        possibleConditions: [
          { rank: 1, name: 'Acute Lower Respiratory Tract Infection', probability: 'High' },
          { rank: 2, name: 'Viral Fever', probability: 'Medium' },
          { rank: 3, name: 'COVID-19', probability: 'Low' }
        ],
        supportingFactors: ['Fever for 3 days', 'Cough with phlegm', 'Breathlessness'],
        recommendedInvestigations: ['CBC', 'CRP', 'Chest X-Ray (PA View)'],
        status: 'Preliminary',
        isNotFinal: true,
        disclaimer: 'AI Decision Support. Doctor reviewed and accepted.',
        acceptedByDoctor: aiAccepted ?? true
      },
      aiAccepted: aiAccepted ?? true,
      primaryDiagnosis,
      additionalDiagnoses,
      diagnosisNotes,
      investigationsOrdered: orderedLabs,
      medications,
      prescriptionInstructions: 'Take with warm water after meals. Avoid cold beverages.',
      followUpPlan: {
        needed: followUpNeeded,
        date: followUpDate,
        type: followUpType,
        reason: followUpReason,
        additionalNotes: followUpNotes,
        sendReminder,
        showInPatientApp
      },
      doctorReviewConfirmed: true,
      savedAsDraft: false
    });

    // Create Lab Orders if selected
    orderedLabs.forEach(testName => {
      orderInvestigation({
        testName,
        patientId: patientProfile.id,
        patientName: patientProfile.name || 'M. Aarthi',
        doctorId: 'doc-1',
        doctorName: 'Dr. R. Lakshmi',
        facilityName: 'Government Primary Health Centre Lab',
        orderedDate: '30 Sep 2026',
        category: testName.includes('X-Ray') ? 'Radiology' : 'Hematology'
      });
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    alert('Consultation saved successfully! Digital prescription, lab orders, and follow-up plan synced to patient portal.');
    navigate('/doctor/dashboard');
  };

  const stepsList = [
    { num: 1, label: 'Symptoms' },
    { num: 2, label: 'Examination' },
    { num: 3, label: 'AI Support' },
    { num: 4, label: 'Diagnosis' },
    { num: 5, label: 'Prescription' },
    { num: 6, label: 'Follow-up' },
    { num: 7, label: 'Review' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn pb-12">
      {/* Top Patient Header Bar (Matching Wireframe Page 8) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <img
            src={patientProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt="Patient"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-slate-900">{patientProfile.name}</h2>
              <span className="text-[11px] text-slate-500 font-semibold">{patientProfile.age} yrs • {patientProfile.gender}</span>
            </div>
            <p className="text-[11px] text-brand-700 font-bold">PID: {patientProfile.patientId || 'CLP001234'} • Blood: {patientProfile.bloodGroup}</p>
          </div>
        </div>

        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
          Active Consultation
        </span>
      </div>

      {/* Stepper (Matching Wireframe Page 8 & 9) */}
      <div className="flex items-center justify-between relative px-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle overflow-x-auto">
        <div className="absolute top-7 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-7 left-8 h-0.5 bg-brand-500 -z-0 transition-all duration-300"
          style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
        />

        {stepsList.map(s => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num as any)}
              className="flex flex-col items-center relative z-10 min-w-[50px]"
            >
              <div
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-brand-600 text-white'
                    : isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
              </div>
              <span className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${isCurrent ? 'text-brand-700' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* STEP 1: Symptoms & Complaints (Matching Wireframe Page 9) */}
      {/* ========================================================= */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <h3 className="text-sm font-black text-slate-900">Chief Complaints (Today)</h3>

          <div className="space-y-2.5">
            {chiefComplaints.map((c, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <span className="text-red-500">•</span>
                  <span>{c.symptom}</span>
                  <span className="text-slate-400 font-normal">({c.duration})</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {c.severity}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">History of Present Illness (HPI)</label>
              <button
                type="button"
                onClick={() => alert('Speech-to-text clinical dictation active')}
                className="text-[11px] text-brand-600 font-bold flex items-center gap-1 hover:underline"
              >
                <Mic className="w-3.5 h-3.5" />
                Voice Dictation
              </button>
            </div>
            <textarea
              rows={3}
              value={hpiText}
              onChange={e => setHpiText(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Next: Examination & Vitals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: Examination & Vitals (Matching Wireframe Page 9)  */}
      {/* ========================================================= */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <h3 className="text-sm font-black text-slate-900">Clinical Examination & Vital Signs</h3>

          {/* Vitals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
              <span className="text-[10px] font-bold text-red-700 uppercase">Temperature</span>
              <input
                type="text"
                value={temp}
                onChange={e => setTemp(e.target.value)}
                className="w-full mt-1 bg-transparent font-black text-sm text-red-900 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-brand-50 border border-brand-200 rounded-2xl">
              <span className="text-[10px] font-bold text-brand-700 uppercase">Pulse</span>
              <input
                type="text"
                value={pulse}
                onChange={e => setPulse(e.target.value)}
                className="w-full mt-1 bg-transparent font-black text-sm text-brand-900 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Blood Pressure</span>
              <input
                type="text"
                value={bp}
                onChange={e => setBp(e.target.value)}
                className="w-full mt-1 bg-transparent font-black text-sm text-indigo-900 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl">
              <span className="text-[10px] font-bold text-teal-700 uppercase">SpO2</span>
              <input
                type="text"
                value={spO2}
                onChange={e => setSpO2(e.target.value)}
                className="w-full mt-1 bg-transparent font-black text-sm text-teal-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Respiratory System Findings</label>
            <input
              type="text"
              value={respiratoryExam}
              onChange={e => setRespiratoryExam(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">General Appearance & Notes</label>
            <input
              type="text"
              value={generalExam}
              onChange={e => setGeneralExam(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: AI Decision Support</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STEP 3: AI Clinical Decision Support (Matching Wireframe Page 10)  */}
      {/* =================================================================== */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <h3 className="text-sm font-black text-slate-900">AI Clinical Decision Support</h3>
            </div>
            <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
              Preliminary • Not Final
            </span>
          </div>

          {/* Suggested Conditions List (Matching Wireframe Page 10) */}
          <div className="bg-purple-50/50 border border-purple-200/80 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">
              Possible Conditions (Top 3)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">1. Acute Lower Respiratory Tract Infection</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Probability: High</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">2. Viral Fever</span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Probability: Medium</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">3. COVID-19 / Acute Bronchitis</span>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">Probability: Low</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-purple-900 block mb-1">Supporting Factors:</span>
              <p className="text-xs text-slate-600">• Fever for 3 days • Cough with phlegm • Moderate breathing difficulty</p>
            </div>

            <div className="pt-1">
              <span className="text-[11px] font-bold text-purple-900 block mb-1">Recommended Investigations:</span>
              <p className="text-xs text-slate-600">• CBC, CRP • Chest X-Ray (PA View) • COVID-19 RT-PCR</p>
            </div>
          </div>

          {/* AI Clinical Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Clinical Advisory:</strong> This is an AI-generated suggestion. Please review, correlate with clinical findings, and use your medical judgment.
            </p>
          </div>

          {/* Reject / Accept Buttons (Matching Wireframe Page 10) */}
          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => {
                setAiAccepted(false);
                setStep(4);
              }}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl text-xs transition-colors"
            >
              Reject Suggestion
            </button>
            <button
              onClick={() => {
                setAiAccepted(true);
                setStep(4);
              }}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Accept & Use</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: Diagnosis & Labs (Matching Wireframe Page 11)     */}
      {/* ========================================================= */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <h3 className="text-sm font-black text-slate-900">Diagnosis & Investigation Orders</h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Diagnosis *</label>
            <input
              type="text"
              value={primaryDiagnosis}
              onChange={e => setPrimaryDiagnosis(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Diagnosis Notes</label>
            <input
              type="text"
              value={diagnosisNotes}
              onChange={e => setDiagnosisNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Investigations Ordered Checkboxes (Matching Wireframe Page 11) */}
          <div>
            <label className="block text-xs font-extrabold text-slate-900 mb-2">
              Order Investigations (Will transmit directly to Laboratory)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['CBC', 'CRP', 'Chest X-Ray (PA View)', 'COVID-19 RT-PCR'].map(lab => (
                <label key={lab} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={orderedLabs.includes(lab)}
                    onChange={() => toggleLabOrder(lab)}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <span className="font-bold text-slate-800">{lab}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Prescription</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 5: Prescription (Matching Wireframe Page 12)         */}
      {/* ========================================================= */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <h3 className="text-sm font-black text-slate-900">Prescription</h3>

          {/* Medications List */}
          <div className="space-y-2.5">
            {medications.map(med => (
              <div key={med.id} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-brand-600" />
                    <h4 className="text-xs font-black text-slate-900">{med.name}</h4>
                    <span className="text-[10px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded border border-slate-200">{med.dosage}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{med.frequency} • {med.duration} • {med.instructions}</p>
                </div>
                <button
                  onClick={() => handleDeleteMedication(med.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Medicine Inline */}
          <div className="p-3.5 bg-brand-50/50 border border-brand-200 rounded-2xl space-y-2">
            <span className="text-[11px] font-bold text-brand-900 uppercase tracking-wider block">Add Medicine</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newMedName}
                onChange={e => setNewMedName(e.target.value)}
                placeholder="Medicine name (e.g. Paracetamol)"
                className="col-span-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
              />
              <input
                type="text"
                value={newMedDosage}
                onChange={e => setNewMedDosage(e.target.value)}
                placeholder="Dosage (500 mg)"
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
              />
              <input
                type="text"
                value={newMedFrequency}
                onChange={e => setNewMedFrequency(e.target.value)}
                placeholder="Frequency (thrice daily)"
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
              />
            </div>
            <button
              onClick={handleAddMedication}
              type="button"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Prescription</span>
            </button>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(4)}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Follow-up Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 6: Follow-up Plan (Matching Wireframe Page 13)       */}
      {/* ========================================================= */}
      {step === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Follow-up Plan</h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <span>Follow-up Needed</span>
              <input
                type="checkbox"
                checked={followUpNeeded}
                onChange={e => setFollowUpNeeded(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600"
              />
            </label>
          </div>

          {followUpNeeded && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={e => setFollowUpDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Follow-up Type</label>
                  <select
                    value={followUpType}
                    onChange={e => setFollowUpType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                  >
                    <option value="In-person Visit">In-person Visit</option>
                    <option value="Teleconsultation">Teleconsultation</option>
                    <option value="Phone Review">Phone Review</option>
                    <option value="Lab Review">Lab Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Follow-up</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Symptom review', 'Lab results review', 'Chronic condition', 'Post-treatment', 'Others'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFollowUpReason(r)}
                      className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                        followUpReason === r
                          ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  rows={2}
                  value={followUpNotes}
                  onChange={e => setFollowUpNotes(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={sendReminder}
                    onChange={e => setSendReminder(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <span>Send automatic reminder to patient 1 day before</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={showInPatientApp}
                    onChange={e => setShowInPatientApp(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <span>Show follow-up lifecycle in Patient App</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(5)}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setStep(7)}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Review & Save</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* STEP 7: Review & Doctor Confirmation Requirement (Matching Wireframe 14) */}
      {/* ======================================================================== */}
      {step === 7 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-5">
          <div>
            <h3 className="text-lg font-black text-slate-900">Review & Save Consultation</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Please review all clinical information before confirming. All suggestions have been incorporated.
            </p>
          </div>

          {/* Section Summary Cards with Checkmarks */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block">Patient Details</span>
                <span className="text-slate-500">{patientProfile.name} • {patientProfile.age} yrs • {patientProfile.gender}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block">Clinical Findings & Vitals</span>
                <span className="text-slate-500">Temp: {temp} • Pulse: {pulse} • SpO2: {spO2} • BP: {bp}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block">Confirmed Diagnosis</span>
                <span className="text-brand-700 font-bold">{primaryDiagnosis}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block">Prescription</span>
                <span className="text-slate-500">{medications.length} medicines prescribed</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 block">Follow-up Plan</span>
                <span className="text-slate-500">{followUpDate} • {followUpType}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          {/* Mandatory Doctor Confirmation Checkbox (Safety Requirement) */}
          <label className="flex items-start gap-3 p-4 rounded-2xl bg-brand-50 border border-brand-200 cursor-pointer">
            <input
              type="checkbox"
              checked={doctorConfirmed}
              onChange={e => setDoctorConfirmed(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded text-brand-600 focus:ring-brand-500"
            />
            <span className="text-xs text-brand-950 font-bold leading-relaxed">
              I have reviewed the AI-assisted suggestions and confirm the final clinical diagnosis, prescription, and follow-up plan with my medical judgment.
            </span>
          </label>

          {/* Action Buttons (Matching Wireframe Page 14) */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSaveConsultation}
              disabled={!doctorConfirmed}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Save className="w-4 h-4" />
              <span>Save Consultation</span>
            </button>

            <button
              onClick={() => {
                alert('Consultation saved as draft.');
                navigate('/doctor/dashboard');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

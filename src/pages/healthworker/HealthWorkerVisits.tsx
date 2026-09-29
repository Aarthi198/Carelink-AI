import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  AlertTriangle,
  Send,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Stethoscope,
  Activity,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HealthWorkerVisits: React.FC = () => {
  const navigate = useNavigate();
  const { facilities, createReferral, createHealthWorkerVisit } = useData();

  // Workflow: 1: New Visit Form, 2: AI Risk Assessment & Escalation Trigger, 3: Multi-step Referral Modal
  const [stage, setStage] = useState<1 | 2>(1);

  // Visit Form State
  const [patientName, setPatientName] = useState('Meena');
  const [patientAge, setPatientAge] = useState(45);
  const [patientGender, setPatientGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [patientPhone, setPatientPhone] = useState('+91 8123456789');
  const [visitType, setVisitType] = useState<'ANC Visit' | 'Child Immunization' | 'NCD Screening' | 'Elderly Care' | 'General Home Visit'>('NCD Screening');
  const [chiefComplaint, setChiefComplaint] = useState('Severe breathlessness and chest tightness on walking');
  const [temp, setTemp] = useState('99.0 °F');
  const [pulse, setPulse] = useState('108 bpm');
  const [bp, setBp] = useState('138/88 mmHg');
  const [spO2, setSpO2] = useState('92 %');
  const [observations, setObservations] = useState('Visible respiratory distress on mild exertion. Tachypnea present.');

  // Multi-step Referral Modal State
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [refStep, setRefStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFacilityId, setSelectedFacilityId] = useState('fac-2');
  const [referralReason, setReferralReason] = useState('Respiratory distress and low oxygen saturation (SpO2 92%)');
  const [createdRefCode, setCreatedRefCode] = useState('');

  const handleAnalyzeVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage(2);
  };

  const handleStartReferralModal = () => {
    setRefStep(1);
    setShowReferralModal(true);
  };

  const handleConfirmReferral = () => {
    const chosenFac = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

    const ref = createReferral({
      patientId: `patient-${patientName.toLowerCase()}`,
      patientName,
      patientAge,
      patientGender,
      patientPhone,
      fromRole: 'health_worker',
      fromName: 'K. Priya (Health Worker)',
      fromFacility: 'Rural Health Sub Centre (Ward 7)',
      toFacilityId: chosenFac.id,
      toFacilityName: chosenFac.name,
      specialtyRequired: 'Pulmonology / Internal Medicine',
      reason: referralReason,
      clinicalSummary: `SpO2: ${spO2}, Pulse: ${pulse}, BP: ${bp}. ${observations}`,
      priority: 'High Priority'
    });

    createHealthWorkerVisit({
      workerId: 'user-worker-1',
      workerName: 'K. Priya',
      patientId: `patient-${patientName.toLowerCase()}`,
      patientName,
      patientAge,
      patientGender,
      visitDate: new Date().toISOString().split('T')[0],
      visitType,
      location: 'Ward 7 Household Field Visit',
      chiefComplaint,
      vitals: {
        temperature: temp,
        pulse,
        bp,
        spO2
      },
      observations,
      aiDecisionSupport: {
        riskClassification: 'HIGH RISK',
        riskFactors: ['Low oxygen saturation (SpO2 92%)', 'Tachycardia (108 bpm)', 'Exertional dyspnea'],
        recommendedAction: 'Immediate referral to tertiary center or hospital with oxygen capability.',
        preliminaryNote: 'High risk acute hypoxemic respiratory event.'
      },
      escalatedToDoctor: true,
      referralCreated: true,
      referralId: ref.id,
      assessmentRemarks: `Urgent referral sent to ${chosenFac.name}.`,
      followUpPlan: 'Verify facility arrival and follow-up consultation.',
      nextVisitDate: '2026-10-02',
      adviceToPatient: 'Limit physical exertion. Proceed to hospital immediately.',
      additionalNotes: 'Attender alerted.',
      status: 'Completed'
    });

    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });

    setCreatedRefCode(ref.referralCode);
    setRefStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Field Visit & Outreach Consultation</h1>
          <p className="text-xs text-slate-500 mt-0.5">Capture community vitals, run AI triage risk checks, and escalate high-risk cases</p>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          Ward 7 Division
        </span>
      </div>

      {/* STAGE 1: Visit Form */}
      {stage === 1 && (
        <form onSubmit={handleAnalyzeVisit} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            1. Patient & Visit Information
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name *</label>
              <input
                type="text"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Program / Visit Type</label>
              <select
                value={visitType}
                onChange={e => setVisitType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              >
                <option value="ANC Visit">ANC Visit</option>
                <option value="Child Immunization">Child Immunization</option>
                <option value="NCD Screening">NCD Screening</option>
                <option value="Elderly Care">Elderly Care</option>
                <option value="General Home Visit">General Home Visit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
              <input
                type="number"
                value={patientAge}
                onChange={e => setPatientAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={patientGender}
                onChange={e => setPatientGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={patientPhone}
                onChange={e => setPatientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Chief Complaint *</label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={e => setChiefComplaint(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          {/* Vitals Captured */}
          <div>
            <label className="block text-xs font-extrabold text-slate-900 mb-1.5">
              2. Field Vital Signs Captured
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
                <span className="text-[10px] font-bold text-red-700 uppercase">Temp</span>
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
                <span className="text-[10px] font-bold text-indigo-700 uppercase">BP</span>
                <input
                  type="text"
                  value={bp}
                  onChange={e => setBp(e.target.value)}
                  className="w-full mt-1 bg-transparent font-black text-sm text-indigo-900 focus:outline-none"
                />
              </div>
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl">
                <span className="text-[10px] font-bold text-teal-700 uppercase">SpO2 (Pulse Oximeter)</span>
                <input
                  type="text"
                  value={spO2}
                  onChange={e => setSpO2(e.target.value)}
                  className="w-full mt-1 bg-transparent font-black text-sm text-teal-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Observations</label>
            <textarea
              rows={2}
              value={observations}
              onChange={e => setObservations(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Evaluate Clinical Risk with AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* STAGE 2: AI Risk Assessment & Escalation (Matching Updated Health Worker Interface) */}
      {stage === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">AI Assessment — Result</h2>
            <StatusBadge status="High Priority" />
          </div>

          {/* High Risk Alert Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-red-800 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>High Risk Case Detected!</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-7">
              Based on symptoms and vitals (SpO2 {spO2}), this patient may require immediate clinical evaluation.
            </p>
          </div>

          {/* Risk Factors List */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Identified Risk Factors:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Fever for 3 days</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Breathing difficulty with elevated pulse ({pulse})</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Low oxygen level (SpO2 {spO2})</span>
              </li>
            </ul>
          </div>

          {/* Recommended Action */}
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">
              Recommended Protocol Action:
            </span>
            <p className="text-xs font-bold text-slate-900">
              Create referral to nearby facility or escalate to doctor immediately.
            </p>
          </div>

          {/* Escalation Action Buttons (Matching Wireframe) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={handleStartReferralModal}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Create Referral</span>
            </button>

            <button
              onClick={handleStartReferralModal}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Escalate to Doctor</span>
            </button>

            <button
              onClick={() => navigate('/patient/facilities')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Find Facility</span>
            </button>
          </div>
        </div>
      )}

      {/* Multi-Step Referral Modal (Matching Updated Health Worker Interface) */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {refStep < 4 ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">Create Clinical Referral</h3>
                  <span className="text-xs font-bold text-brand-600">Step {refStep} of 3</span>
                </div>

                {/* Step 1: Patient Summary */}
                {refStep === 1 && (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <p><strong>Patient:</strong> {patientName} ({patientAge} yrs, {patientGender})</p>
                      <p><strong>Phone:</strong> {patientPhone}</p>
                      <p><strong>Vitals:</strong> SpO2: {spO2} | BP: {bp} | Pulse: {pulse}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Referral Reason</label>
                      <input
                        type="text"
                        value={referralReason}
                        onChange={e => setReferralReason(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                      />
                    </div>
                    <button
                      onClick={() => setRefStep(2)}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Next: Select Facility</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2: Select Facility */}
                {refStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700">Select Receiving Facility</h4>
                    <div className="space-y-2">
                      {facilities.slice(0, 3).map(fac => (
                        <label
                          key={fac.id}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedFacilityId === fac.id
                              ? 'bg-brand-50 border-brand-400 shadow-xs'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="text-xs">
                            <p className="font-bold text-slate-900">{fac.name}</p>
                            <p className="text-[11px] text-slate-500">{fac.distance} • {fac.type}</p>
                          </div>
                          <input
                            type="radio"
                            name="facility"
                            checked={selectedFacilityId === fac.id}
                            onChange={() => setSelectedFacilityId(fac.id)}
                            className="w-4 h-4 text-brand-600"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRefStep(1)}
                        className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setRefStep(3)}
                        className="flex-1 bg-brand-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1"
                      >
                        <span>Next: Confirm</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {refStep === 3 && (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-2">
                      <p><strong>Patient:</strong> {patientName}</p>
                      <p><strong>Target Facility:</strong> {facilities.find(f => f.id === selectedFacilityId)?.name}</p>
                      <p><strong>Priority:</strong> <span className="text-red-600 font-bold">High Priority</span></p>
                      <p><strong>Reason:</strong> {referralReason}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRefStep(2)}
                        className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmReferral}
                        className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-brand-500/20"
                      >
                        Confirm & Transmit Referral
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success Screen (Matching Updated Wireframe) */
              <div className="text-center py-4 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Referral Created Successfully</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Transmitted to Doctor & Hospital Triage</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <span className="font-bold text-slate-900">{patientName} ({patientAge} yrs, {patientGender})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Facility:</span>
                    <span className="font-bold text-brand-700">{facilities.find(f => f.id === selectedFacilityId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Referral ID:</span>
                    <span className="font-bold text-slate-900">{createdRefCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">High Risk:</span>
                    <span className="font-bold text-red-600">Yes (High Priority)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Notified To:</span>
                    <span className="font-bold text-emerald-700">Doctor & Facility Queue</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowReferralModal(false);
                      navigate('/health-worker/referrals');
                    }}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs"
                  >
                    View Referral
                  </button>
                  <button
                    onClick={() => {
                      setShowReferralModal(false);
                      setStage(1);
                      navigate('/health-worker');
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

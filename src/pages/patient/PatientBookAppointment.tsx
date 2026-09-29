import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  User,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const PatientBookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { doctors, facilities, createAppointment } = useData();
  const { patientProfile } = useAuth();

  const paramDocId = searchParams.get('doctorId');
  const paramFacId = searchParams.get('facilityId');

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Selected state
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(paramDocId || 'doc-1');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-30');
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');
  const [reason, setReason] = useState('Fever, cough with breathlessness and body pain');
  const [appointmentType, setAppointmentType] = useState<'In-person' | 'Teleconsultation'>('In-person');

  const doctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];
  const facility = facilities.find(f => f.id === (paramFacId || doctor.facilityId)) || facilities[0];

  const dateOptions = [
    { day: 'Mon', dateNum: '29', month: 'Sep', fullDate: '2026-09-29' },
    { day: 'Tue', dateNum: '30', month: 'Sep', fullDate: '2026-09-30' },
    { day: 'Wed', dateNum: '1', month: 'Oct', fullDate: '2026-10-01' },
    { day: 'Thu', dateNum: '2', month: 'Oct', fullDate: '2026-10-02' },
    { day: 'Fri', dateNum: '3', month: 'Oct', fullDate: '2026-10-03' }
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  const handleConfirm = () => {
    createAppointment({
      patientId: patientProfile.id,
      patientName: patientProfile.name || 'M. Aarthi',
      patientAge: patientProfile.age || 28,
      patientGender: patientProfile.gender || 'Female',
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      facilityId: facility.id,
      facilityName: facility.name,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmed',
      reason,
      triageUrgency: 'High Priority',
      type: appointmentType,
      consultationFee: doctor.consultationFee,
      notes: 'Booked via CareLink AI Patient Portal.'
    });

    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });

    setStep(3);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (step === 2) setStep(1);
            else navigate(-1);
          }}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Book Appointment</h1>
        <div className="w-8" />
      </div>

      {/* Stepper (Matching Wireframe Page 15) */}
      <div className="flex items-center justify-between relative px-4 mb-2">
        <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-3.5 left-8 h-0.5 bg-brand-500 -z-0 transition-all duration-300"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        />

        {[
          { num: 1, label: 'Doctor' },
          { num: 2, label: 'Date & Time' },
          { num: 3, label: 'Confirm' }
        ].map(s => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <div key={s.num} className="flex flex-col items-center relative z-10">
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
              <span className={`text-[10px] font-semibold mt-1 ${isCurrent ? 'text-brand-700' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Doctor Selection */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step 1: Choose Healthcare Professional
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an available physician for your clinical visit.
            </p>
          </div>

          <div className="space-y-3">
            {doctors.map(doc => {
              const isSelected = selectedDoctorId === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-400 shadow-xs ring-2 ring-brand-100'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-xs text-brand-600 font-semibold">{doc.specialty}</p>
                        <p className="text-[11px] text-slate-500">{doc.qualifications}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current mr-0.5" />
                            {doc.rating}
                          </span>
                          <span>•</span>
                          <span>{doc.facilityName.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900">
                        {doc.consultationFee === 0 ? 'Free' : `₹${doc.consultationFee}`}
                      </span>
                      <p className="text-[10px] text-slate-400">Consultation</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Continue to Date & Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Date & Time Selection (Matching Wireframe Page 15) */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-5">
          {/* Selected Doctor Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={doctor.avatarUrl} alt={doctor.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{doctor.name}</h4>
                <p className="text-[11px] text-brand-600 font-semibold">{doctor.specialty}</p>
                <p className="text-[10px] text-slate-500">{doctor.facilityName}</p>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Change
            </button>
          </div>

          {/* Date Selector Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Select Date
            </label>
            <div className="grid grid-cols-5 gap-2">
              {dateOptions.map(d => {
                const isSelected = selectedDate === d.fullDate;
                return (
                  <button
                    key={d.fullDate}
                    type="button"
                    onClick={() => setSelectedDate(d.fullDate)}
                    className={`py-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-semibold block">{d.day}</span>
                    <span className="text-sm font-black block mt-0.5">{d.dateNum}</span>
                    <span className="text-[9px] font-medium block">{d.month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consultation Fee Banner */}
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="text-xs">
              <p className="font-bold text-brand-900">Consultation Fee</p>
              <p className="text-[11px] text-brand-700">Payable at clinic desk or insurance</p>
            </div>
            <span className="text-base font-black text-brand-700">
              {doctor.consultationFee === 0 ? 'Free' : `₹${doctor.consultationFee}`}
            </span>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Reason for Visit</label>
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Appointment Confirmed Success Screen (Matching Wireframe Page 16) */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 text-center space-y-5 animate-fadeIn">
          {/* Success Check Icon */}
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">Appointment Confirmed</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your appointment has been booked successfully.
            </p>
          </div>

          {/* Appointment Details Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <img src={doctor.avatarUrl} alt={doctor.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{doctor.name}</h4>
                <p className="text-[11px] text-brand-600 font-semibold">{doctor.specialty}</p>
                <p className="text-[10px] text-slate-500">{doctor.qualifications}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Date</span>
                <span className="font-bold text-slate-800">{selectedDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Time</span>
                <span className="font-bold text-slate-800">{selectedTime}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Facility</span>
                <span className="font-bold text-slate-800">{facility.name}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Patient</span>
                <span className="font-bold text-slate-800">{patientProfile.name} (ID: {patientProfile.patientId})</span>
              </div>
            </div>
          </div>

          {/* Reminder Notice */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-[11px] text-brand-800 font-medium">
            You will receive a reminder before your appointment via SMS & notification.
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => navigate('/patient/appointments')}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 transition-all active:scale-98"
            >
              Continue to My Appointments
            </button>
            <button
              onClick={() => {
                alert(`Added appointment on ${selectedDate} at ${selectedTime} to your device calendar!`);
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              Add to Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

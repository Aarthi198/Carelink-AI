import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Video,
  Navigation,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const PatientFacilityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { facilities, doctors } = useData();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Doctors' | 'Services' | 'Reviews'>('Overview');
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  const facility = facilities.find(f => f.id === id) || facilities[0];
  const facilityDoctors = doctors.filter(d => d.facilityId === facility.id || d.facilityName.includes(facility.name));

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Facility Details</h1>
        <div className="w-8" />
      </div>

      {/* Facility Main Image & Banner (Matching Wireframe Page 12) */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card">
        <div className="relative h-48 w-full">
          <img
            src={facility.imageUrl}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Verified Badge */}
          {facility.verified && (
            <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Facility
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="text-lg font-black">{facility.name}</h2>
            <div className="flex items-center gap-3 text-xs mt-0.5 text-slate-200">
              <span className="flex items-center text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {facility.rating} ({facility.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="font-semibold text-teal-300">{facility.distance} ({facility.travelTime})</span>
            </div>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="grid grid-cols-4 border-b border-slate-100 text-center font-bold text-xs">
          {(['Overview', 'Doctors', 'Services', 'Reviews'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`py-3 transition-colors ${
                activeTab === t
                  ? 'text-brand-600 border-b-2 border-brand-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-5 space-y-4">
          {/* TAB 1: Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-4 text-xs">
              {/* Services Available 2x2 Grid (Matching Wireframe Page 12) */}
              <div>
                <h4 className="font-extrabold text-slate-900 mb-2.5 uppercase tracking-wider text-[11px]">
                  Services Available
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                    <Stethoscope className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">General Physician</p>
                      <p className="text-[10px] text-slate-500">Daily OPD Consultation</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                    <FlaskConical className="w-5 h-5 text-teal-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Lab Tests</p>
                      <p className="text-[10px] text-slate-500">Blood, urine & vitals</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                    <Pill className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Pharmacy</p>
                      <p className="text-[10px] text-slate-500">Essential generic medicines</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                    <Video className="w-5 h-5 text-indigo-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Teleconsultation</p>
                      <p className="text-[10px] text-slate-500">Specialist video review</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timings */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                <h5 className="font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" />
                  Timings
                </h5>
                <p className="text-slate-600">{facility.openingHours}</p>
              </div>

              {/* Address */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                <h5 className="font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  Address
                </h5>
                <p className="text-slate-600 leading-relaxed">{facility.address}</p>
                <p className="text-slate-500 text-[11px] pt-1">Phone: {facility.phone}</p>
              </div>
            </div>
          )}

          {/* TAB 2: Doctors */}
          {activeTab === 'Doctors' && (
            <div className="space-y-3">
              {facilityDoctors.map(doc => (
                <div
                  key={doc.id}
                  className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={doc.avatarUrl} alt={doc.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-[11px] text-brand-600 font-semibold">{doc.specialty}</p>
                      <p className="text-[10px] text-slate-500">{doc.qualifications} • {doc.experienceYears} yrs exp</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/patient/book-appointment?doctorId=${doc.id}&facilityId=${facility.id}`)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Services */}
          {activeTab === 'Services' && (
            <div className="space-y-2">
              {facility.services.map((srv, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {srv}
                  </span>
                  <span className="text-[11px] text-brand-600 font-bold">Included</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Reviews */}
          {activeTab === 'Reviews' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Karthik R.</span>
                  <span className="text-amber-500 font-bold">★★★★★</span>
                </div>
                <p className="text-slate-600">Quick consultation by Dr. Lakshmi and free pharmacy dispatch without delay.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Revathi S.</span>
                  <span className="text-amber-500 font-bold">★★★★☆</span>
                </div>
                <p className="text-slate-600">Clean premises and friendly staff. Digital records synced automatically to CareLink AI.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Buttons (Matching Wireframe Page 12) */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2.5">
          <button
            onClick={() => navigate(`/patient/book-appointment?facilityId=${facility.id}`)}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
          <button
            onClick={() => setShowDirectionsModal(true)}
            className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-4 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Navigation className="w-4 h-4 text-brand-600" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>

      {/* Directions Modal */}
      {showDirectionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-brand-600" />
              Route Directions to {facility.name}
            </h3>
            <div className="bg-slate-100 rounded-2xl p-4 text-xs space-y-2">
              <p className="font-bold text-slate-800">Estimated Travel: {facility.travelTime} ({facility.distance})</p>
              <p className="text-slate-600">Starting from: No. 12, Gandhi Nagar, Tiruttani</p>
              <p className="text-slate-600">Destination: {facility.address}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(facility.name + ' ' + facility.address)}`, '_blank')}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Open in Google Maps
              </button>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

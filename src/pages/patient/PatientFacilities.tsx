import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Clock, ArrowRight, ArrowLeft, Filter, Phone, Navigation } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Facility } from '../../types';

export const PatientFacilities: React.FC = () => {
  const navigate = useNavigate();
  const { facilities } = useData();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Government' | 'Private' | 'Specialist'>('All');
  const [searchRadius, setSearchRadius] = useState('Within 10 km');

  const filteredFacilities = facilities.filter(f => {
    if (activeFilter === 'All') return true;
    return f.category === activeFilter;
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Recommended Facilities</h1>
        <div className="w-8" />
      </div>

      {/* Location Bar (Matching Wireframe Page 11) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-2.5 text-xs">
          <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Based on your location</p>
            <p className="font-bold text-slate-800">{searchRadius} • Tiruttani / Thiruvallur</p>
          </div>
        </div>
        <button
          onClick={() => setSearchRadius(prev => prev === 'Within 10 km' ? 'Within 25 km' : 'Within 10 km')}
          className="text-xs font-bold text-brand-600 hover:underline"
        >
          Change
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'Government', 'Private', 'Specialist'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Facilities List (Matching Wireframe Page 11) */}
      <div className="space-y-3.5">
        {filteredFacilities.map(fac => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-card hover:border-brand-300 transition-all space-y-3"
          >
            <div className="flex gap-3.5">
              <img
                src={fac.imageUrl}
                alt={fac.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    {fac.name}
                  </h3>
                  {fac.verified && (
                    <span className="shrink-0 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 mr-0.5" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {fac.rating}
                  </span>
                  <span className="text-[11px] text-slate-400">({fac.reviewsCount} reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-brand-700">{fac.distance}</span>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 truncate">
                  {fac.services.slice(0, 3).join(' • ')}
                </p>

                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {fac.openingHours.split('|')[0]}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => navigate(`/patient/facilities/${fac.id}`)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/patient/book-appointment?facilityId=${fac.id}`)}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

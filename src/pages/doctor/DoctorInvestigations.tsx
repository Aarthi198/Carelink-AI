import React, { useState } from 'react';
import {
  FlaskConical,
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Download,
  AlertCircle,
  Eye,
  Save,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Investigation } from '../../types';

export const DoctorInvestigations: React.FC = () => {
  const { investigations, reviewInvestigation } = useData();

  const [selectedInv, setSelectedInv] = useState<Investigation>(investigations[0]);
  const [doctorNotes, setDoctorNotes] = useState(selectedInv.doctorInterpretation || 'Mild infection indicators. Continue prescribed medicine and follow-up as advised.');
  const [isReviewedChecked, setIsReviewedChecked] = useState(selectedInv.doctorReviewed);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectInvestigation = (inv: Investigation) => {
    setSelectedInv(inv);
    setDoctorNotes(inv.doctorInterpretation || 'Mild infection indicators. Continue prescribed medicine and follow-up as advised.');
    setIsReviewedChecked(inv.doctorReviewed);
    setSavedSuccess(false);
  };

  const handleSaveReview = () => {
    if (!isReviewedChecked) {
      alert('Please check the confirmation box to verify you have reviewed these results.');
      return;
    }

    reviewInvestigation(selectedInv.id, doctorNotes);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Investigation Result Review</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review laboratory reports, add clinical interpretations, and notify patients
          </p>
        </div>
        <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">
          {investigations.filter(i => !i.doctorReviewed && i.status === 'Result Available').length} Awaiting Doctor Notes
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Investigation Orders List */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            All Laboratory Orders ({investigations.length})
          </h3>
          <div className="space-y-2.5">
            {investigations.map(inv => {
              const isSelected = selectedInv.id === inv.id;
              return (
                <div
                  key={inv.id}
                  onClick={() => handleSelectInvestigation(inv)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-400 shadow-xs ring-2 ring-brand-100'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h4 className="text-xs font-black text-slate-900">{inv.testName}</h4>
                    <StatusBadge status={inv.doctorReviewed ? 'Reviewed' : inv.status} size="xs" />
                  </div>
                  <p className="text-[11px] text-slate-600 font-semibold">{inv.patientName}</p>
                  <p className="text-[10px] text-slate-400">Order: {inv.orderNumber} • {inv.orderedDate}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Review Panel (Matching Updated Doctor Interface Page 4) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Laboratory Result Review Workspace
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">{selectedInv.testName}</h2>
              <p className="text-xs text-slate-500">Patient: {selectedInv.patientName} • Order ID: {selectedInv.orderNumber}</p>
            </div>
            <StatusBadge status={selectedInv.doctorReviewed ? 'Result Available' : selectedInv.status} />
          </div>

          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Review saved! Patient M. Aarthi has been notified automatically with your clinical notes.</span>
            </div>
          )}

          {/* Report Attachment Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand-600" />
              <div className="text-xs">
                <h5 className="font-bold text-slate-900">{selectedInv.fileName || 'Report_Document.pdf'}</h5>
                <p className="text-[10px] text-slate-500">{selectedInv.fileSize || '245 KB'}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Opening simulated viewer for ${selectedInv.fileName}`)}
              className="bg-white hover:bg-slate-100 text-slate-700 font-bold px-3.5 py-1.5 rounded-xl text-xs border border-slate-200"
            >
              View PDF
            </button>
          </div>

          {/* Lab Values Table (Matching Page 4) */}
          {selectedInv.labValues && (
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider">
                Lab Parameter Values
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-3">Parameter</th>
                      <th className="p-3">Value</th>
                      <th className="p-3">Reference Range</th>
                      <th className="p-3 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInv.labValues.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-800">{row.parameter}</td>
                        <td className={`p-3 font-black ${row.status === 'High' ? 'text-red-600' : 'text-slate-800'}`}>
                          {row.value} {row.status === 'High' && '(H)'}
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">{row.referenceRange}</td>
                        <td className="p-3 text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            row.status === 'High' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Doctor Notes Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Doctor Clinical Notes & Patient Advice *
            </label>
            <textarea
              rows={3}
              value={doctorNotes}
              onChange={e => setDoctorNotes(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          {/* Mandatory Confirmation Checkbox */}
          <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-brand-50/60 border border-brand-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isReviewedChecked}
              onChange={e => setIsReviewedChecked(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600"
            />
            <span className="text-xs font-bold text-brand-950">
              I have reviewed this result and confirm the clinical interpretation.
            </span>
          </label>

          {/* Action Button */}
          <button
            onClick={handleSaveReview}
            disabled={!isReviewedChecked}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Save className="w-4 h-4" />
            <span>Save Review & Notify Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};

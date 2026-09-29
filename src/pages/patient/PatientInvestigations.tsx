import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Eye,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Investigation } from '../../types';

export const PatientInvestigations: React.FC = () => {
  const navigate = useNavigate();
  const { investigations } = useData();
  const { patientProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'All' | 'Ordered' | 'Results' | 'Reviewed'>('All');
  const [selectedInv, setSelectedInv] = useState<Investigation | null>(null);

  const patientInvs = investigations.filter(
    i => i.patientId === patientProfile.id || i.patientName.includes('Aarthi')
  );

  const ordered = patientInvs.filter(i => i.status === 'Ordered' || i.status === 'Sample Collected' || i.status === 'Processing');
  const results = patientInvs.filter(i => i.status === 'Result Available' || i.status === 'Doctor Reviewed');
  const reviewed = patientInvs.filter(i => i.doctorReviewed);

  const displayed = activeTab === 'All' ? patientInvs : activeTab === 'Ordered' ? ordered : activeTab === 'Results' ? results : reviewed;

  const handleDownload = (fileName?: string) => {
    alert(`Downloading simulated laboratory report: ${fileName || 'Medical_Investigation_Report.pdf'}`);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/patient')}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">My Investigations</h1>
        <div className="w-8" />
      </div>

      {/* Tabs (Matching Updated Patient Interface Page 5) */}
      <div className="grid grid-cols-4 p-1 bg-slate-100 rounded-2xl text-[11px] font-bold">
        {(['All', 'Ordered', 'Results', 'Reviewed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Investigation Cards List */}
      <div className="space-y-3.5">
        {displayed.map(inv => (
          <div
            key={inv.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3 hover:border-brand-200 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900">{inv.testName}</h3>
                  <p className="text-[11px] text-slate-500">Ordered by {inv.doctorName}</p>
                </div>
              </div>

              <StatusBadge status={inv.status} />
            </div>

            {/* Lifecycle Status Row */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Ordered on</span>
                <span className="font-bold text-slate-800">{inv.orderedDate}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Test Completed</span>
                <span className="font-bold text-slate-800">{inv.sampleCollectedDate || 'In Progress'}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Doctor Reviewed</span>
                <span className={`font-bold ${inv.doctorReviewed ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {inv.reviewedDate ? `Reviewed (${inv.reviewedDate.split(',')[0]})` : 'Pending Review'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Notified to Patient</span>
                <span className={`font-bold ${inv.patientNotified ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {inv.patientNotified ? 'Notified ✓' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => setSelectedInv(inv)}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Result</span>
              </button>

              {inv.doctorInterpretation && (
                <button
                  onClick={() => setSelectedInv(inv)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  View Doctor Notes
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Investigation Result Detailed Modal (Matching Updated Patient Interface Page 6) */}
      {selectedInv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedInv(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 pr-8">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedInv.testName}</h3>
                <p className="text-[11px] text-slate-500">Order: {selectedInv.orderNumber}</p>
              </div>
              <StatusBadge status={selectedInv.doctorReviewed ? 'Reviewed' : selectedInv.status} />
            </div>

            {/* Order Meta */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-[11px]">
              <div>
                <span className="text-slate-400 block font-semibold">Ordered by</span>
                <span className="font-bold text-slate-800">{selectedInv.doctorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Ordered on</span>
                <span className="font-bold text-slate-800">{selectedInv.orderedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Result available</span>
                <span className="font-bold text-slate-800">{selectedInv.resultAvailableDate || 'Pending'}</span>
              </div>
            </div>

            {/* Lab Report PDF Download Card */}
            <div className="bg-brand-50/60 border border-brand-200/80 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-brand-600" />
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">{selectedInv.fileName || 'Lab_Report.pdf'}</h5>
                  <p className="text-[10px] text-slate-500">{selectedInv.fileSize || '245 KB'}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(selectedInv.fileName)}
                className="bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>

            {/* Doctor Review & Interpretation (Matching Page 6) */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Reviewed by {selectedInv.doctorName}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed pl-6">
                "{selectedInv.doctorInterpretation || 'No significant abnormalities observed. Continue maintenance medications.'}"
              </p>
              {selectedInv.patientNotified && (
                <div className="text-[10px] text-emerald-700 font-bold pt-1 pl-6 flex items-center gap-1">
                  <span>✓ Notified to Patient ({selectedInv.patientNotifiedDate || '02 Oct 2026, 11:00 AM'})</span>
                </div>
              )}
            </div>

            {/* Detailed Lab Values Table */}
            {selectedInv.labValues && selectedInv.labValues.length > 0 && (
              <div>
                <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider">
                  Laboratory Test Parameters
                </h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold">
                      <tr>
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Value</th>
                        <th className="p-2.5">Reference</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedInv.labValues.map((val, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-2.5 font-bold text-slate-800">{val.parameter}</td>
                          <td className={`p-2.5 font-black ${val.status === 'High' ? 'text-red-600' : 'text-slate-800'}`}>
                            {val.value} {val.unit || ''}
                          </td>
                          <td className="p-2.5 text-slate-500 text-[11px]">{val.referenceRange}</td>
                          <td className="p-2.5 text-right">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              val.status === 'High' ? 'bg-red-50 text-red-700' : val.status === 'Abnormal' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              {val.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setSelectedInv(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

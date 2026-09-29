import React, { useState } from 'react';
import { MessageSquare, Send, User, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const HealthWorkerMessages: React.FC = () => {
  const { messages, sendMessage } = useData();
  const { user } = useAuth();

  const [replyText, setReplyText] = useState('');
  const [targetDoctor, setTargetDoctor] = useState('Dr. R. Lakshmi');
  const [subject, setSubject] = useState('High-risk patient home visit report');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendMessage({
      senderId: user?.id || 'user-worker-1',
      senderName: 'K. Priya (Health Worker)',
      senderRole: 'health_worker',
      receiverId: 'user-doctor-1',
      receiverName: targetDoctor,
      subject,
      message: replyText
    });

    setReplyText('');
    alert('Message sent to physician queue.');
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
        <h1 className="text-xl font-black text-slate-900">Health Worker Communications</h1>
        <p className="text-xs text-slate-500 mt-0.5">Send clinical escalation queries and patient field notes directly to attending doctors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-2.5">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Recent Transmissions</h3>
          {messages.map(msg => (
            <div key={msg.id} className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-subtle space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-900">
                <span>{msg.receiverName}</span>
                <span className="text-[10px] text-slate-400 font-normal">{msg.timestamp}</span>
              </div>
              <p className="text-xs text-brand-700 font-bold">{msg.subject}</p>
              <p className="text-[11px] text-slate-600 line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <h2 className="text-sm font-black text-slate-900">Compose Message / Escalation Note</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Send to Attending Doctor</label>
            <select
              value={targetDoctor}
              onChange={e => setTargetDoctor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            >
              <option value="Dr. R. Lakshmi">Dr. R. Lakshmi (Govt Primary Health Centre)</option>
              <option value="Dr. Karthik Menon">Dr. Karthik Menon (City Care Hospital)</option>
              <option value="Dr. Suresh">Dr. Suresh (Cardiology Hub)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Field Clinical Observation / Question</label>
            <textarea
              rows={4}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Enter details of patient vitals or follow-up status..."
              required
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-2xl text-xs shadow-md shadow-brand-500/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MessageSquare, Send, User, Check, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const DoctorMessages: React.FC = () => {
  const { messages, sendMessage } = useData();
  const { user } = useAuth();

  const [replyText, setReplyText] = useState('');
  const [selectedMsgId, setSelectedMsgId] = useState<string>(messages[0]?.id || 'msg-1');

  const selectedMessage = messages.find(m => m.id === selectedMsgId) || messages[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendMessage({
      senderId: user?.id || 'user-doctor-1',
      senderName: user?.name || 'Dr. R. Lakshmi',
      senderRole: 'doctor',
      receiverId: selectedMessage.senderId,
      receiverName: selectedMessage.senderName,
      subject: `Re: ${selectedMessage.subject}`,
      message: replyText,
      patientId: selectedMessage.patientId
    });

    setReplyText('');
    alert('Reply transmitted securely to patient portal.');
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
        <h1 className="text-xl font-black text-slate-900">Clinical Messages & Queries</h1>
        <p className="text-xs text-slate-500 mt-0.5">Direct encrypted inquiries from patients & community health workers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Messages List */}
        <div className="space-y-2.5">
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => setSelectedMsgId(msg.id)}
              className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                selectedMsgId === msg.id
                  ? 'bg-brand-50/70 border-brand-400 shadow-xs ring-2 ring-brand-100'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <h4 className="text-xs font-black text-slate-900">{msg.senderName}</h4>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="text-xs font-bold text-brand-700 truncate">{msg.subject}</p>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Message Detail & Reply */}
        {selectedMessage && (
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                From: {selectedMessage.senderRole.toUpperCase()}
              </span>
              <h2 className="text-base font-black text-slate-900 mt-2">{selectedMessage.subject}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Sender: {selectedMessage.senderName} • {selectedMessage.timestamp}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-700 leading-relaxed">
              {selectedMessage.message}
            </div>

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-800">Doctor Response</label>
              <textarea
                rows={3}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your clinical instruction or answer..."
                required
                className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Response</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

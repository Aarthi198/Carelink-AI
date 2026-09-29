import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  Plus,
  Send,
  Calendar,
  AlertTriangle,
  RotateCcw,
  FlaskConical,
  MessageSquare,
  Shield,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminNotification {
  id: string;
  type: 'announcement' | 'system' | 'appointment' | 'referral' | 'followup' | 'investigation' | 'user';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  sender?: string;
}

export const AdminMessages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'announcement' | 'system' | 'user'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // Demo broadcast messages matching wireframe 11
  const [messages, setMessages] = useState<AdminNotification[]>([
    {
      id: 'msg-01',
      type: 'announcement',
      title: 'System Announcement: Pulse Polio & Dengue Screening Drive',
      message: 'New district-wide vaccination and fever survey begins on 10 Oct 2026. All PHCs and field ASHA workers to coordinate.',
      timestamp: '30 Sep 2026, 09:00 AM',
      isRead: false,
      sender: 'District Medical Officer (DMO)'
    },
    {
      id: 'msg-02',
      type: 'system',
      title: 'Pending Doctor Reviews Alert',
      message: '3 lab investigation reports for CBC and Chest X-Ray are waiting for Doctor MD review over 6 hours.',
      timestamp: '30 Sep 2026, 08:45 AM',
      isRead: false
    },
    {
      id: 'msg-03',
      type: 'user',
      title: 'User Message from M. Aarthi',
      message: 'Patient requested assistance with rescheduled follow-up slot at Govt PHC Thiruvaiyaru.',
      timestamp: '29 Sep 2026, 05:30 PM',
      isRead: true,
      sender: 'M. Aarthi (Patient)'
    },
    {
      id: 'msg-04',
      type: 'system',
      title: 'System Update Completed: AI Triage Engine v2.4 Active',
      message: 'New multilingual Tamil speech phoneme model and high-risk respiratory screening protocol deployed successfully.',
      timestamp: '29 Sep 2026, 04:00 PM',
      isRead: true
    },
    {
      id: 'msg-05',
      type: 'announcement',
      title: 'Leave Request Approved: Dr. Karthik Menon',
      message: 'Dermatologist on scheduled administrative training on 05 Oct 2026. Teleconsultation queue routed to Dr. Lakshmi.',
      timestamp: '28 Sep 2026, 06:10 PM',
      isRead: true,
      sender: 'Admin Office'
    }
  ]);

  // Form for broadcasting announcement
  const [broadcast, setBroadcast] = useState({
    title: '',
    message: '',
    targetAudience: 'all'
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcast.title || !broadcast.message) return;

    const created: AdminNotification = {
      id: `msg-${Date.now()}`,
      type: 'announcement',
      title: broadcast.title,
      message: broadcast.message,
      timestamp: 'Just now',
      isRead: false,
      sender: `Admin (${broadcast.targetAudience.toUpperCase()})`
    };

    setMessages([created, ...messages]);
    setShowBroadcastModal(false);
    setBroadcast({ title: '', message: '', targetAudience: 'all' });
  };

  const filteredMessages = messages.filter(msg => {
    const matchesTab = activeTab === 'all' || msg.type === activeTab || (activeTab === 'system' && msg.type !== 'announcement' && msg.type !== 'user');
    const matchesSearch =
      msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Bell className="w-5 h-5 text-indigo-600" />;
      case 'system':
        return <Shield className="w-5 h-5 text-amber-600" />;
      case 'user':
        return <MessageSquare className="w-5 h-5 text-sky-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Messages & Notifications</h1>
          <p className="text-sm text-slate-500">System broadcasts, clinical alerts, user communications, and operational bulletins</p>
        </div>
        <button
          onClick={() => setShowBroadcastModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Send className="w-4 h-4" /> Broadcast Announcement
        </button>
      </div>

      {/* Tabs (Wireframe 11) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'announcement', 'system', 'user'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'all' && 'All Messages'}
            {tab === 'announcement' && 'Announcements'}
            {tab === 'system' && 'System Alerts'}
            {tab === 'user' && 'User Messages'}
            <span className="ml-1.5 opacity-75 text-xs">
              ({tab === 'all' ? messages.length : messages.filter(m => m.type === tab).length})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search notifications, alerts, or messages..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
        />
      </div>

      {/* Message Cards List */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
            No messages found.
          </div>
        ) : (
          filteredMessages.map(item => (
            <div
              key={item.id}
              className={`p-4 bg-white rounded-2xl border transition-all ${
                !item.isRead ? 'border-sky-300 shadow-sm bg-sky-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'announcement' ? 'bg-indigo-50' : item.type === 'system' ? 'bg-amber-50' : 'bg-sky-50'
                }`}>
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>

                  {item.sender && (
                    <div className="mt-2 text-[11px] text-slate-400 font-medium">
                      From: <span className="text-slate-700">{item.sender}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Announcement Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Broadcast Announcement</h2>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                <select
                  value={broadcast.targetAudience}
                  onChange={e => setBroadcast({ ...broadcast, targetAudience: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="all">All Portals (Patients, Doctors, Health Workers)</option>
                  <option value="doctors">Doctors & Specialists Only</option>
                  <option value="health_workers">Field Health Workers (ASHAs / ANMs) Only</option>
                  <option value="patients">Registered Patients Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Health Camp & Screening Drive"
                  value={broadcast.title}
                  onChange={e => setBroadcast({ ...broadcast, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter detailed notification or bulletin details..."
                  value={broadcast.message}
                  onChange={e => setBroadcast({ ...broadcast, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

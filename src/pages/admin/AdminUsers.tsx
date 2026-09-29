import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Check,
  Shield,
  Stethoscope,
  HeartHandshake,
  User as UserIcon
} from 'lucide-react';
import { UserRole } from '../../types';

interface ManagedUser {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar?: string;
}

export const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'patient' | 'doctor' | 'health_worker' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  // Initial demo users list matching wireframe 3
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'usr-01',
      name: 'M. Aarthi',
      role: 'patient',
      phone: '+91 9876543210',
      email: 'aarthi@gmail.com',
      status: 'active',
      joinedDate: '28 Sep 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-02',
      name: 'Dr. R. Lakshmi',
      role: 'doctor',
      phone: '+91 9012345678',
      email: 'lakshmi.r@govphc.in',
      status: 'active',
      joinedDate: '15 Jan 2024',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-03',
      name: 'K. Priya',
      role: 'health_worker',
      phone: '+91 9876543210',
      email: 'priya.k@healthfield.org',
      status: 'active',
      joinedDate: '01 Mar 2025',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-04',
      name: 'Ravi Kumar',
      role: 'patient',
      phone: '+91 7654321098',
      email: 'ravi.k@gmail.com',
      status: 'inactive',
      joinedDate: '12 Aug 2026'
    },
    {
      id: 'usr-05',
      name: 'Dr. Karthik Menon',
      role: 'doctor',
      phone: '+91 9345678901',
      email: 'karthik.menon@citycare.in',
      status: 'active',
      joinedDate: '10 Feb 2025',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-06',
      name: 'Meena Sundaram',
      role: 'patient',
      phone: '+91 8123456789',
      email: 'meena.s@gmail.com',
      status: 'active',
      joinedDate: '05 Jul 2026'
    },
    {
      id: 'usr-07',
      name: 'Anand Kumar',
      role: 'patient',
      phone: '+91 9098765432',
      email: 'anand.k@gmail.com',
      status: 'active',
      joinedDate: '18 Sep 2026'
    },
    {
      id: 'usr-08',
      name: 'Rajeshwari K.',
      role: 'admin',
      phone: '+91 9443322110',
      email: 'admin@carelinkai.com',
      status: 'active',
      joinedDate: '01 Jan 2024',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  // Form state for adding user (Wireframe 4)
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'patient' as UserRole,
    phone: '',
    email: '',
    dob: '',
    gender: 'female'
  });

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.phone) return;

    const created: ManagedUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newUser.name,
      role: newUser.role,
      phone: newUser.phone,
      email: newUser.email || `${newUser.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      status: 'active',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setUsers([created, ...users]);
    setShowAddModal(false);
    setNewUser({
      name: '',
      role: 'patient',
      phone: '',
      email: '',
      dob: '',
      gender: 'female'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800"><UserIcon className="w-3 h-3" /> Patient</span>;
      case 'doctor':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800"><Stethoscope className="w-3 h-3" /> Doctor</span>;
      case 'health_worker':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><HeartHandshake className="w-3 h-3" /> Health Worker</span>;
      case 'admin':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800"><Shield className="w-3 h-3" /> Admin</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Users</h1>
          <p className="text-sm text-slate-500">View, search, and manage all system users and their roles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'patient', 'doctor', 'health_worker', 'admin'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'all' && 'All Users'}
            {tab === 'patient' && 'Patients'}
            {tab === 'doctor' && 'Doctors'}
            {tab === 'health_worker' && 'Health Workers'}
            {tab === 'admin' && 'Admins'}
            <span className="ml-1.5 opacity-75 text-xs">
              ({tab === 'all' ? users.length : users.filter(u => u.role === tab).length})
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID or phone number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Filter className="w-4 h-4 text-slate-500" /> Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 font-semibold flex items-center justify-center text-xs border border-slate-200">
                            {user.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-800">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700">{user.phone}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {user.joinedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(user)}
                          title="View Details"
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.status === 'active'
                              ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50'
                              : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1 to {filteredUsers.length} of {users.length} users</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">3</button>
          </div>
        </div>
      </div>

      {/* Add User Modal (Wireframe 4) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  User Role *
                </label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="health_worker">Health Worker</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newUser.dob}
                    onChange={e => setNewUser({ ...newUser, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    value={newUser.gender}
                    onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={newUser.phone}
                  onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-sm transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              {selectedUser.avatar ? (
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-sky-100 shadow-sm" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-sky-100 text-sky-700 font-bold text-xl flex items-center justify-center mx-auto border-2 border-sky-200">
                  {selectedUser.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <h3 className="text-lg font-bold text-slate-800">{selectedUser.name}</h3>
              <div>{getRoleBadge(selectedUser.role)}</div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-xs text-slate-600 border border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">User ID</span>
                <span className="font-semibold text-slate-800">{selectedUser.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Phone</span>
                <span className="font-semibold text-slate-800">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-slate-800">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Joined</span>
                <span className="font-semibold text-slate-800">{selectedUser.joinedDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Account Status</span>
                <span className={`font-semibold ${selectedUser.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {selectedUser.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
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

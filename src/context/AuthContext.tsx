import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, PatientProfile } from '../types';
import { INITIAL_USERS, INITIAL_PATIENT_PROFILE } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  patientProfile: PatientProfile;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateProfile: (profile: Partial<PatientProfile>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('carelink_role');
    return (saved as UserRole) || 'patient';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('carelink_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS.find(u => u.role === 'patient') || INITIAL_USERS[0];
  });

  const [patientProfile, setPatientProfile] = useState<PatientProfile>(() => {
    const saved = localStorage.getItem('carelink_patient_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PATIENT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('carelink_role', role);
    const matchedUser = INITIAL_USERS.find(u => u.role === role);
    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem('carelink_user', JSON.stringify(matchedUser));
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem('carelink_patient_profile', JSON.stringify(patientProfile));
  }, [patientProfile]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const matched = INITIAL_USERS.find(u => u.role === newRole) || INITIAL_USERS[0];
    setUser(matched);
  };

  const login = (email: string, requestedRole: UserRole = 'patient') => {
    const matched = INITIAL_USERS.find(u => u.role === requestedRole) || INITIAL_USERS[0];
    setRole(requestedRole);
    setUser(matched);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carelink_user');
  };

  const updateProfile = (updatedFields: Partial<PatientProfile>) => {
    setPatientProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        patientProfile,
        login,
        logout,
        switchRole,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

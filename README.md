# 🏥 CareLink AI — "Your Health, Our Priority"

> **An AI-assisted healthcare access, referral, consultation, and follow-up continuum platform designed for patients, doctors, community health workers, and administrators.**

---

## 🌟 Overview

CareLink AI is a unified clinical ecosystem designed to bridge the gap between primary healthcare centres (PHCs), tertiary hospitals, field health workers (ASHAs/ANMs), and patients. It replaces fragmented healthcare tools with a single, highly integrated platform featuring AI-assisted triage, dual-language voice support (English & Tamil), structured clinical workspaces, mandatory clinical safety checks, and real-time operational monitoring.

---

## 🚀 Key Features by User Role

### 1. 🧑‍⚕️ Patient Portal
- **AI Health Assistant & Voice Triage**: Multilingual symptom intake via Web Speech API (English & Tamil) with waveform visualizer and text fallback.
- **Decision Support (Not Diagnosis)**: Clear differential risk classification (*High Priority, Medium, Routine*) with symptom breakdown (*Fever, Cough, Breathlessness*).
- **Nearby Healthcare Facility Locator**: Geo-distance, travel time, services, and live appointment booking for Government PHCs, Private Hospitals, and Clinics.
- **End-to-End Referral Tracking**: Live 6-stage lifecycle (`Created` → `Sent` → `Received` → `Accepted` → `Scheduled` → `Completed` → `Closed`).
- **Follow-up Care Tracker**: Post-consultation visit schedule, automated SMS/Push reminder indicators, and attendance check-in.
- **Lab & Investigation Results**: Turnaround tracking, parameters with reference ranges, and doctor sign-off verification badges.
- **Health Records & Prescriptions**: Downloadable digital prescriptions, vaccination logs, and emergency 108 direct dispatch.

### 2. 🩺 Doctor Clinical Workspace
- **Referral Inbox**: Dedicated queue to accept, reject, schedule, or close referred patient cases.
- **7-Step Structured Clinical Consultation**:
  1. *Chief Complaints & HPI* (with voice notes)
  2. *Vitals & Physical Examination* (General, Respiratory, Cardio, Abdomen)
  3. *AI Clinical Decision Support* (Preliminary differential suggestions, investigations, safety disclaimers)
  4. *Final Diagnosis* (Primary & secondary codes, doctor clinical notes)
  5. *Prescription Management* (Dosage, frequency, duration, explicit doctor review)
  6. *Follow-up Care Plan* (Date, type, patient reminders)
  7. *Review & Clinical Confirmation* (Mandatory review checkbox before finalization)
- **Investigation Sign-off & Interpretation**: Review pending diagnostic tests, provide clinical interpretation, and automatically notify patients.

### 3. 👩‍💼 Community Health Worker Portal (ASHA / ANM)
- **Field & Home Visits**: Screening templates for ANC visits, Child Immunization, NCD screening, and Elderly care.
- **AI Risk Stratification & High-Risk Alert**: Automatic classification of critical vitals (`LOW`, `MODERATE`, `HIGH RISK`).
- **1-Click High-Risk Escalation**: Direct transfer of vitals, chief complaints, and urgent priority to linked PHC doctors.
- **Population Health Reports**: Household coverage, follow-up adherence, and high-risk case tracking.

### 4. 🏢 Administrator Portal
- **Operational Dashboards**: Real-time referral closure rate (`88.5%`), follow-up completion rate (`76.2%`), missed care triggers (`23.8%`), and lab turnaround analytics.
- **Staff & Facility Management**: Add and manage Patients, Doctors, Health Workers, and Healthcare Facilities (PHCs, CHCs, Hospitals, Sub-Centres).
- **Public Health Analytics**: Recharts visual graphs for age distribution, common symptoms (Fever, Cough, Hypertension, Diabetes), and monthly registrations.
- **System Broadcasts & RBAC**: Emergency bulletins, system alerts, and role-based permissions matrix.

---

## 🛡️ AI Safety & Clinical Governance Principles

CareLink AI strictly follows clinical safety guardrails:
1. **AI is Decision Support Only**: All AI outputs are labeled *"AI Clinical Decision Support — Preliminary (Not Final)"*.
2. **Mandatory Doctor Review**: AI cannot independently finalize a medical diagnosis or prescription. Final submission requires affirmative clinical confirmation.
3. **Transparent Clinical Rationale**: Triage outputs always explain *why* a priority category was recommended based on duration, severity, and risk indicators.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS animations, Glassmorphism design tokens
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts & Visuals**: Recharts, Canvas Confetti
- **Speech & Audio**: Web Speech API (`ta-IN` / `en-IN`), Web Audio Waveforms
- **Architecture**: Context API (`AuthContext`, `DataContext`, `NetworkContext`), LocalStorage Offline Fallback

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Aarthi198/Carelink-AI.git

# Navigate into the project folder
cd Carelink-AI

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

---

## 👥 Demo Personas

Use the **Role Selector** in the navigation bar to switch personas on the fly:

| Role | Demo User | Notes |
| :--- | :--- | :--- |
| **Patient** | M. Aarthi (28 yrs, Female) | Self-assessment, appointments, referrals, prescriptions |
| **Doctor** | Dr. R. Lakshmi (MD, General Physician) | Govt PHC Thiruvaiyaru, clinical workspace, referrals, lab reviews |
| **Health Worker** | K. Priya (ASHA Worker) | Ward 7 field visits, high-risk screening & escalation |
| **Admin** | Rajeshwari K. (System Administrator) | Platform operations, facility roster, lifecycle metrics |

---

## 📄 License
MIT License. Created for the CareLink AI Healthcare Initiative.

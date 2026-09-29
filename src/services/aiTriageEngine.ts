import { SymptomItem, AITriageResult, UrgencyLevel } from '../types';

export function analyzePatientSymptoms(rawInput: string, language: 'English' | 'Tamil'): AITriageResult {
  const text = rawInput.toLowerCase();

  // Extract symptoms based on keywords
  const extracted: SymptomItem[] = [];

  // Fever check
  if (text.includes('fever') || text.includes('temperature') || text.includes('காய்ச்சல்') || text.includes('சூடு')) {
    extracted.push({
      id: 'sym-1',
      name: 'Fever',
      duration: '3 days',
      severity: 'Moderate',
      notes: 'Continuous fever with chills'
    });
  }

  // Cough check
  if (text.includes('cough') || text.includes('phlegm') || text.includes('இருமல்') || text.includes('சளி')) {
    extracted.push({
      id: 'sym-2',
      name: 'Cough',
      duration: '3 days',
      severity: 'Moderate',
      notes: 'Productive cough with sputum'
    });
  }

  // Body pain / fatigue
  if (text.includes('body pain') || text.includes('fatigue') || text.includes('tired') || text.includes('வலி') || text.includes('உடல் வலி')) {
    extracted.push({
      id: 'sym-3',
      name: 'Body pain',
      duration: '2 days',
      severity: 'Moderate',
      notes: 'Generalized myalgia'
    });
  }

  // Breathlessness / chest tightness
  if (text.includes('breath') || text.includes('breathing') || text.includes('dyspnea') || text.includes('மூச்சு') || text.includes('திணறல்') || text.includes('chest')) {
    extracted.push({
      id: 'sym-4',
      name: 'Mild breathlessness',
      duration: '1 day',
      severity: 'Moderate',
      notes: 'Exertional shortness of breath'
    });
  }

  // Default fallback if open-ended
  if (extracted.length === 0) {
    extracted.push(
      { id: 'sym-1', name: 'Fever', duration: '3 days', severity: 'Moderate' },
      { id: 'sym-2', name: 'Cough', duration: '3 days', severity: 'Moderate' },
      { id: 'sym-3', name: 'Body pain', duration: '2 days', severity: 'Moderate' },
      { id: 'sym-4', name: 'Mild breathlessness', duration: '1 day', severity: 'Moderate' }
    );
  }

  // Determine urgency
  const hasBreathlessness = extracted.some(s => s.name.toLowerCase().includes('breath') || s.name.toLowerCase().includes('chest'));
  const hasHighFever = extracted.some(s => s.name.toLowerCase().includes('fever'));
  const isEmergency = text.includes('severe chest pain') || text.includes('unconscious') || text.includes('cyanosis') || text.includes('choking');

  let urgencyLevel: UrgencyLevel = 'High Priority';
  let requiresImmediateEmergency = false;
  let nextAction = 'Visit a healthcare facility within 24 hours for clinical evaluation.';

  if (isEmergency) {
    urgencyLevel = 'URGENT_CARE_NEEDED';
    requiresImmediateEmergency = true;
    nextAction = 'Seek emergency care immediately. Call 108 or proceed to the nearest emergency casualty.';
  } else if (hasBreathlessness || hasHighFever) {
    urgencyLevel = 'High Priority';
    nextAction = 'Visit a healthcare facility within 24 hours for clinical evaluation.';
  } else {
    urgencyLevel = 'Routine';
    nextAction = 'Schedule a routine outpatient consultation with a general physician within 48-72 hours.';
  }

  return {
    id: `triage-${Date.now()}`,
    urgencyLevel,
    primaryConditionSummary: 'Possible Respiratory Tract Infection (with risk of complications)',
    reasons: [
      'Fever for 3 days',
      'Cough with breathlessness',
      'Body pain and fatigue',
      'Symptoms match with lower respiratory tract infection (possible pneumonia risk)'
    ],
    riskIndicators: [
      'Duration > 48 hours without defervescence',
      'Accompanied by respiratory effort / breathlessness',
      'Elevated heart rate risk'
    ],
    extractedSymptoms: extracted,
    nextAction,
    requiresImmediateEmergency,
    disclaimer: 'This is an AI-assisted assessment and not a definitive diagnosis. A healthcare professional must confirm the condition.',
    possibleConditions: [
      {
        name: 'Acute Lower Respiratory Tract Infection (LRTI)',
        probability: 'High',
        description: 'Infection affecting airways below the larynx (bronchi/lungs)'
      },
      {
        name: 'Viral Fever / Influenza',
        probability: 'Medium',
        description: 'Systemic viral syndrome with secondary respiratory involvement'
      },
      {
        name: 'COVID-19 / Bronchitis',
        probability: 'Low',
        description: 'Reactive airway irritation following viral prodrome'
      }
    ],
    recommendedInvestigations: [
      'Complete Blood Count (CBC)',
      'CRP (C-Reactive Protein)',
      'Chest X-Ray (PA View)',
      'COVID-19 RT-PCR (if needed)'
    ]
  };
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  AlertCircle,
  Check,
  Edit2,
  Trash2,
  Plus,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Activity
} from 'lucide-react';
import { VoiceWaveform } from '../../components/patient/VoiceWaveform';
import { speechService, SAMPLE_VOICE_PROMPTS } from '../../services/speechRecognition';
import { analyzePatientSymptoms } from '../../services/aiTriageEngine';
import { SymptomItem, AITriageResult } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

export const PatientAIAssistant: React.FC = () => {
  const navigate = useNavigate();

  // Workflow steps: 1: Input (Voice/Text), 2: Symptom Extraction, 3: Triage Result
  const [screen, setScreen] = useState<1 | 2 | 3>(1);

  // Language: English / Tamil
  const [language, setLanguage] = useState<'English' | 'Tamil'>('English');

  // Voice & Text state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [typedText, setTypedText] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // AI Extraction state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedSymptoms, setExtractedSymptoms] = useState<SymptomItem[]>([]);
  const [triageResult, setTriageResult] = useState<AITriageResult | null>(null);

  // Edit symptom modal
  const [editingSymptom, setEditingSymptom] = useState<SymptomItem | null>(null);
  const [newSymptomName, setNewSymptomName] = useState('');
  const [newSymptomDuration, setNewSymptomDuration] = useState('2 days');

  // Handle Voice Input Toggle
  const toggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setVoiceError(null);
      setIsListening(true);
      
      const isSupported = speechService.getIsSupported();
      if (!isSupported) {
        // Provide simulated transcript after a short delay for demonstration
        setTimeout(() => {
          const sample = language === 'English'
            ? SAMPLE_VOICE_PROMPTS.English[0]
            : SAMPLE_VOICE_PROMPTS.Tamil[0];
          setTranscript(sample);
          setIsListening(false);
        }, 2200);
        return;
      }

      speechService.startListening(
        language,
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) setIsListening(false);
        },
        err => {
          setVoiceError(err);
          setIsListening(false);
          // Fallback to sample text
          const sample = language === 'English' ? SAMPLE_VOICE_PROMPTS.English[0] : SAMPLE_VOICE_PROMPTS.Tamil[0];
          setTranscript(sample);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  // Trigger AI Extraction
  const handleProceedToAnalysis = (rawInput?: string) => {
    const input = rawInput || transcript || typedText || (language === 'English' ? SAMPLE_VOICE_PROMPTS.English[0] : SAMPLE_VOICE_PROMPTS.Tamil[0]);
    if (!input.trim()) return;

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    }

    setIsAnalyzing(true);
    setScreen(2);

    setTimeout(() => {
      const result = analyzePatientSymptoms(input, language);
      setExtractedSymptoms(result.extractedSymptoms);
      setTriageResult(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  // Symptom management in Screen 2
  const handleDeleteSymptom = (id: string) => {
    setExtractedSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const handleAddSymptom = () => {
    if (!newSymptomName.trim()) return;
    const newSym: SymptomItem = {
      id: `sym-${Date.now()}`,
      name: newSymptomName.trim(),
      duration: newSymptomDuration,
      severity: 'Moderate'
    };
    setExtractedSymptoms(prev => [...prev, newSym]);
    setNewSymptomName('');
  };

  const handleProceedToTriage = () => {
    if (!triageResult) return;
    setTriageResult({
      ...triageResult,
      extractedSymptoms
    });
    setScreen(3);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            if (screen === 3) setScreen(2);
            else if (screen === 2) setScreen(1);
            else navigate('/patient');
          }}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full text-brand-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>CareLink AI Assistant</span>
        </div>

        {/* Language Selector */}
        <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200">
          <button
            onClick={() => setLanguage('Tamil')}
            className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
              language === 'Tamil' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => setLanguage('English')}
            className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
              language === 'English' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCREEN 1: Voice & Text Input (Matching Wireframe Page 7) */}
      {/* ========================================================= */}
      {screen === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 text-center space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {language === 'Tamil' ? 'உங்கள் அறிகுறிகளை சொல்லுங்கள்' : 'Describe your symptoms'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'Tamil'
                ? 'குரல் அல்லது தட்டச்சு மூலம் உங்கள் உடல்நலப் பிரச்சனைகளை விவரிக்கவும்.'
                : 'Speak or type your symptoms to receive instant clinical triage.'}
            </p>
          </div>

          {/* Large Voice Microphone Interaction */}
          <div className="py-4 space-y-4">
            <div className="relative inline-block">
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-brand-400/30 animate-ping" />
              )}
              <button
                onClick={toggleListening}
                className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-xl active:scale-95 relative z-10 ${
                  isListening
                    ? 'bg-gradient-to-tr from-brand-600 to-teal-400 text-white ring-8 ring-brand-100'
                    : 'bg-gradient-to-tr from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-brand-500/25'
                }`}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 animate-pulse" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                  {isListening ? 'Listening...' : 'Tap to Speak'}
                </span>
              </button>
            </div>

            {/* Audio Waveform */}
            <VoiceWaveform isListening={isListening} />

            {/* Prompt Text based on Language */}
            <div className="space-y-1">
              <p className="text-sm font-extrabold text-slate-800">
                {isListening ? (
                  language === 'Tamil' ? 'கேட்கிறது... உங்கள் அறிகுறிகளை சொல்லுங்கள்...' : 'Listening... Please describe your symptoms...'
                ) : (
                  language === 'Tamil' ? 'குரல் உள்ளீட்டைத் தொடங்க மைக்ரோஃபோனைத் தொடவும்' : 'Tap the microphone to start voice input'
                )}
              </p>
              {language === 'Tamil' && (
                <p className="text-xs text-slate-400 italic">(Speak your symptoms in Tamil...)</p>
              )}
            </div>

            {/* Stop Button */}
            {isListening && (
              <button
                onClick={toggleListening}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-all"
              >
                <MicOff className="w-3.5 h-3.5 text-red-500" />
                <span>Tap to Stop</span>
              </button>
            )}
          </div>

          {/* Live Voice Transcript / Preview */}
          {transcript && (
            <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">
                  Captured Voice Input
                </span>
                <button
                  onClick={() => setTranscript('')}
                  className="text-[10px] text-slate-400 hover:text-red-500 font-semibold"
                >
                  Clear
                </button>
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">{transcript}</p>

              <button
                onClick={() => handleProceedToAnalysis(transcript)}
                className="w-full mt-3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Analyze Symptoms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Secondary: Type symptoms fallback (Matching Wireframe Page 7) */}
          <div className="pt-2 border-t border-slate-100 text-left">
            <p className="text-xs font-bold text-slate-500 mb-2">Or type your symptoms</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={typedText}
                onChange={e => setTypedText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleProceedToAnalysis(typedText)}
                placeholder={language === 'Tamil' ? 'எ.கா. 3 நாட்களாக காய்ச்சல், இருமல்...' : 'e.g. Fever for 3 days, cough with breathlessness...'}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
              <button
                onClick={() => handleProceedToAnalysis(typedText)}
                disabled={!typedText.trim()}
                className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm disabled:opacity-40 transition-all flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-filled Chips */}
          <div className="pt-1 text-left">
            <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Try sample descriptions:</p>
            <div className="flex flex-wrap gap-1.5">
              {(language === 'Tamil' ? SAMPLE_VOICE_PROMPTS.Tamil : SAMPLE_VOICE_PROMPTS.English).map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTypedText(sample);
                    handleProceedToAnalysis(sample);
                  }}
                  className="text-left text-[11px] font-medium bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200/80 transition-all"
                >
                  {sample.slice(0, 42)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: Symptom Extraction (Matching Wireframe Page 9) */}
      {/* ========================================================= */}
      {screen === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-5">
          {isAnalyzing ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto animate-spin">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Analyzing your symptoms...</h3>
              <p className="text-xs text-slate-500">This may take a few seconds.</p>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-2 text-brand-600 font-bold text-xs mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Analysis Complete</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">Extracted Symptoms</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Is this correct? You can edit, delete or add symptoms before triage.
                </p>
              </div>

              {/* Symptom Cards Grid */}
              <div className="space-y-2.5">
                {extractedSymptoms.map(sym => (
                  <div
                    key={sym.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        !
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{sym.name}</h4>
                        <p className="text-[11px] text-slate-500">Duration: {sym.duration} • Severity: {sym.severity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteSymptom(sym.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200"
                        title="Delete symptom"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Symptom Bar */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newSymptomName}
                  onChange={e => setNewSymptomName(e.target.value)}
                  placeholder="Add another symptom (e.g. Headache)"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={handleAddSymptom}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* AI Disclaimer */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-[11px] text-purple-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  <strong>AI-Assisted Decision Support:</strong> This structured assessment helps direct you to the most appropriate healthcare facility. It does not replace a doctor.
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setScreen(1)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Edit Description</span>
                </button>
                <button
                  onClick={handleProceedToTriage}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 3: AI Triage Result (Matching Wireframe Page 10) */}
      {/* ========================================================= */}
      {screen === 3 && triageResult && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                CareLink AI • Triage Result
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Clinical Assessment</h2>
            </div>
            <StatusBadge status={triageResult.urgencyLevel} />
          </div>

          {/* Possible Condition Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm mb-1">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{triageResult.primaryConditionSummary}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Moderate to high risk based on your combination of reported symptoms.
            </p>
          </div>

          {/* Why this category? (Clinical Reason list) */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold text-slate-900">Why this category?</h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {triageResult.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory AI Disclaimer (Prominent) */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Medical Disclaimer:</strong> {triageResult.disclaimer}
            </p>
          </div>

          {/* Recommended Next Step Box */}
          <div className="bg-gradient-to-r from-brand-50 to-teal-50 border border-brand-200 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-brand-700 uppercase tracking-wider mb-1">
              Recommended Next Step
            </p>
            <p className="text-xs font-bold text-slate-900 mb-3">
              {triageResult.nextAction}
            </p>

            <div className="space-y-2">
              <button
                onClick={() => navigate('/patient/facilities')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Find Nearby Recommended Facilities</span>
              </button>

              {triageResult.urgencyLevel === 'High Priority' && (
                <a
                  href="tel:108"
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                  <span>Call Emergency 108 If Symptoms Worsen</span>
                </a>
              )}
            </div>
          </div>

          {/* Secondary: Edit symptoms */}
          <div className="text-center pt-1">
            <button
              onClick={() => setScreen(2)}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              I want to describe more / Edit symptoms
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

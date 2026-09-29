// Speech Recognition service with browser Web Speech API and simulated fallback

export interface SpeechRecognitionResultState {
  transcript: string;
  isListening: boolean;
  error?: string;
  isSupported: boolean;
}

export class VoiceSpeechService {
  private recognition: any = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.isSupported = true;
      }
    }
  }

  public getIsSupported(): boolean {
    return this.isSupported;
  }

  public startListening(
    language: 'English' | 'Tamil',
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError("Voice input isn't available on this device. Please type your symptoms instead.");
      return;
    }

    try {
      this.recognition.lang = language === 'Tamil' ? 'ta-IN' : 'en-IN';
      
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const combined = finalTranscript || interimTranscript;
        onResult(combined, !!finalTranscript);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          onError('Microphone access was denied. Please allow microphone permissions or type your symptoms.');
        } else {
          onError(`Voice input error (${event.error}). Please type your symptoms.`);
        }
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
    } catch (e: any) {
      onError('Unable to start speech recognition. Please type your symptoms.');
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

export const speechService = new VoiceSpeechService();

// Quick simulated voice prompt helpers for demo testing
export const SAMPLE_VOICE_PROMPTS = {
  English: [
    "I have had high fever for 3 days, cough with thick phlegm, body pain, and I am feeling mild breathlessness when climbing stairs.",
    "I have severe throat pain, difficulty swallowing for 2 days, and mild headache.",
    "My blood pressure reading was 155/95 this morning and I have slight dizziness."
  ],
  Tamil: [
    "எனக்கு 3 நாட்களாக காய்ச்சல், இருமல், உடல் வலி மற்றும் லேசான மூச்சுத்திணறல் இருக்கிறது.",
    "எனக்கு 2 நாட்களாக கடுமையான தொண்டை வலி மற்றும் தலைவலி உள்ளது.",
    "எனக்கு தலைசுற்றல் மற்றும் லேசான நெஞ்சு படபடப்பு உள்ளது."
  ]
};

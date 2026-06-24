export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  profileUpdate?: Partial<UserProfile>;
}

export interface UserProfile {
  mobility: string;
  effort: string;
  budget: string;
  reuse: string;
}

export interface HardwareConcept {
  id: string;
  name: string;
  technicalTerm: string;
  metaphorTitle: string;
  metaphorDescription: string;
  whyItMatters: string;
  icon: string;
}

export interface RecommendationOption {
  title: string;
  type: 'A' | 'B' | 'C'; // Perfect Balance, Economic, Future-Proof
  machineName: string;
  whyPerfect: string;
  specs: string[];
  costDetails?: string; // e.g. "Onde economizamos" or "O Investimento"
}

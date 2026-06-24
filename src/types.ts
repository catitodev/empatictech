export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  profileUpdate?: Partial<UserProfile>;
}

export interface UserProfile {
  mobility: 'Notebook (Portátil)' | 'Computador de Mesa (Desktop)' | 'Ainda Não Definido';
  effort: 'Básico (Textos, Vídeos, Estudos)' | 'Intermediário (Múltiplas Abas, Planilhas)' | 'Avançado (Jogos, Edição, Design)' | 'Ainda Não Definido';
  budget: string; // ex: "Até R$ 2.500" ou "Não definido"
  reuse: string;  // ex: "Tem mouse/teclado" ou "Nenhum"
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

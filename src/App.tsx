import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Message, UserProfile } from './types';
// @ts-ignore
import logoEmpatictech from './assets/images/empatictech_icon.png';
import ChatWindow from './components/ChatWindow';
import ProfileTracker from './components/ProfileTracker';
import MetaphorDictionary from './components/MetaphorDictionary';
import RecommendationCards from './components/RecommendationCards';
import ExportActions from './components/ExportActions';
import ThemeToggle from './components/ThemeToggle';
import AskAnything from './components/AskAnything';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    mobility: 'Ainda Não Definido',
    effort: 'Ainda Não Definido',
    budget: 'Ainda Não Definido',
    reuse: 'Ainda Não Definido',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Helper to parse profile updates out of the assistant's response text
  const parseProfileUpdate = (text: string): { cleanText: string; updatedProfile?: Partial<UserProfile> } => {
    const marker = '[PROFILE_UPDATE:';
    const markerIndex = text.indexOf(marker);
    if (markerIndex === -1) return { cleanText: text };

    const jsonStart = markerIndex + marker.length;
    const jsonEnd = text.indexOf(']', jsonStart);
    if (jsonEnd === -1) return { cleanText: text };

    const jsonStr = text.substring(jsonStart, jsonEnd).trim();
    let cleanText = text.substring(0, markerIndex).trim();

    // Clean up trailing markdown dividing dashes if present
    if (cleanText.endsWith('---')) {
      cleanText = cleanText.substring(0, cleanText.length - 3).trim();
    }

    try {
      const parsedUpdate = JSON.parse(jsonStr);
      
      // Map server terms if needed or take them directly
      const updatedProfile: Partial<UserProfile> = {};
      
      if (parsedUpdate.mobility) {
        if (parsedUpdate.mobility.toLowerCase().includes('notebook') || parsedUpdate.mobility.toLowerCase().includes('portatil')) {
          updatedProfile.mobility = 'Notebook (Portátil)';
        } else if (parsedUpdate.mobility.toLowerCase().includes('desktop') || parsedUpdate.mobility.toLowerCase().includes('mesa') || parsedUpdate.mobility.toLowerCase().includes('fixo')) {
          updatedProfile.mobility = 'Computador de Mesa (Desktop)';
        } else if (parsedUpdate.mobility !== 'Ainda Não Definido') {
          updatedProfile.mobility = parsedUpdate.mobility;
        }
      }

      if (parsedUpdate.effort) {
        if (parsedUpdate.effort.toLowerCase().includes('basico') || parsedUpdate.effort.toLowerCase().includes('básico')) {
          updatedProfile.effort = 'Básico (Textos, Vídeos, Estudos)';
        } else if (parsedUpdate.effort.toLowerCase().includes('medio') || parsedUpdate.effort.toLowerCase().includes('médio') || parsedUpdate.effort.toLowerCase().includes('intermediario') || parsedUpdate.effort.toLowerCase().includes('intermediário')) {
          updatedProfile.effort = 'Intermediário (Múltiplas Abas, Planilhas)';
        } else if (parsedUpdate.effort.toLowerCase().includes('avancado') || parsedUpdate.effort.toLowerCase().includes('avançado') || parsedUpdate.effort.toLowerCase().includes('jogo') || parsedUpdate.effort.toLowerCase().includes('edicao') || parsedUpdate.effort.toLowerCase().includes('edição')) {
          updatedProfile.effort = 'Avançado (Jogos, Edição, Design)';
        } else if (parsedUpdate.effort !== 'Ainda Não Definido') {
          updatedProfile.effort = parsedUpdate.effort;
        }
      }

      if (parsedUpdate.budget && parsedUpdate.budget !== 'Ainda Não Definido' && parsedUpdate.budget !== 'Não mencionado') {
        updatedProfile.budget = parsedUpdate.budget;
      }

      if (parsedUpdate.reuse && parsedUpdate.reuse !== 'Ainda Não Definido' && parsedUpdate.reuse !== 'Não mencionado') {
        updatedProfile.reuse = parsedUpdate.reuse;
      }

      return { cleanText, updatedProfile };
    } catch {
      return { cleanText: text };
    }
  };

  const handleSendMessage = async (text: string) => {
    setError(null);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Send message history to our backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocorreu um erro ao conversar com o assistente.");
      }

      const data = await response.json();
      const replyText = data.text;

      // Parse out the profile updates
      const { cleanText, updatedProfile } = parseProfileUpdate(replyText);

      if (updatedProfile) {
        setProfile((prev) => ({
          ...prev,
          ...updatedProfile,
        }));
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        profileUpdate: updatedProfile,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || "Não foi possível se conectar ao Desanuveador Tech Empático. Verifique as configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualProfileChange = (updatedFields: Partial<UserProfile>) => {
    // Check if this is a reset (all fields back to default)
    const isReset = updatedFields.mobility === 'Ainda Não Definido' &&
      updatedFields.effort === 'Ainda Não Definido' &&
      updatedFields.budget === 'Ainda Não Definido' &&
      updatedFields.reuse === 'Ainda Não Definido';

    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));

    if (isReset) {
      const resetNotice: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        text: '[Perfil reiniciado: todos os campos redefinidos para "Ainda Não Definido"]',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, resetNotice]);
      return;
    }

    // Generate individual update messages
    const parts: string[] = [];
    if (updatedFields.mobility) parts.push(`[Preferência de Mobilidade alterada para: ${updatedFields.mobility}]`);
    if (updatedFields.effort) parts.push(`[Preferência de Uso alterada para: ${updatedFields.effort}]`);
    if (updatedFields.budget) parts.push(`[Orçamento definido para: ${updatedFields.budget}]`);
    if (updatedFields.reuse) parts.push(`[Reaproveitamento definido para: ${updatedFields.reuse}]`);

    if (parts.length > 0) {
      const systemNotice: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        text: parts.join(' '),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, systemNotice]);
    }
  };

  // Get the last assistant message text to check for recommendations
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((m) => m.role === 'assistant')?.text || '';

  return (
    <div className="min-h-screen bg-natural-bg dark:bg-dark-base text-natural-dark dark:text-dark-text flex flex-col font-sans antialiased selection:bg-natural-sage/20" id="app-root">
      {/* Header */}
      <header className="bg-natural-sidebar dark:bg-dark-elevated border-b border-natural-border dark:border-dark-border py-4.5 px-6 sticky top-0 z-10 shadow-xs" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoEmpatictech} 
              alt="EmpaticTech Logo" 
              className="w-16 h-16 object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xl font-serif italic font-bold text-natural-charcoal dark:text-dark-text tracking-tight">
                Desanuveador Tech Empático
              </h1>
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted mt-0.5 max-w-xs leading-relaxed hidden sm:block">
                Um assistente conversacional empático que ajuda pessoas a escolherem o computador ideal, linguagem simplificada com metáforas do dia a dia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle dark={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            <ExportActions messages={messages} />
            <div className="hidden sm:flex items-center gap-2 bg-natural-sage/10 border border-natural-sage/20 py-1.5 px-3 rounded-xl text-xs text-natural-sage font-medium">
              <Heart className="w-4 h-4 text-natural-sage animate-pulse motion-reduce:animate-none fill-natural-sage/20" />
              <span>Apoio empático</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6" id="app-main-content">
        
        {/* Left Column: Profile Tracker & Metaphors */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start" id="sidebar-column">
          {/* Active Profile Sheet */}
          <ProfileTracker
            profile={profile}
            onChangeProfile={handleManualProfileChange}
          />

          {/* Interactive Metaphor Dictionary */}
          <MetaphorDictionary />

          {/* Pergunte Quase Tudo */}
          <AskAnything />
        </div>

        {/* Right Column: Chat Window & Recommendation Cards */}
        <div className="lg:col-span-7 space-y-6 flex flex-col" id="content-column">
          {/* Conversational Window */}
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={loading}
            error={error}
          />

          {/* Live Recommendation Cards (Unlocked dynamically once compiled in chat) */}
          <RecommendationCards chatText={lastAssistantMessage} />
        </div>

      </main>

      {/* Aesthetic Footer */}
      <footer className="bg-natural-sidebar dark:bg-dark-elevated border-t border-natural-border dark:border-dark-border py-6 text-center mt-12" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 text-xs text-natural-taupe dark:text-dark-muted space-y-2">
          <p className="font-medium">
            🌿 recurso abundante feito com empatia e afeto 🌿
          </p>
          <div className="flex items-center justify-center gap-1">
            <span>Desanuveador Tech Empático © 2025</span>
            <span>•</span>
            <span className="text-natural-sage font-bold font-serif italic">Sem complicações. Sem jargões.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

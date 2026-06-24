import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { CopyMessageButton } from './ExportActions';
// @ts-ignore
import logoIcon from '../assets/images/empatictech_icon.png';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  loading: boolean;
  error: string | null;
}

const QUICK_STARTERS = [
  'Quero um computador bom e barato para estudar',
  'Preciso trabalhar com planilhas e muitas abas abertas',
  'Quero um computador para meu filho jogar',
  'Tenho um computador antigo travando muito, o que fazer?',
];

export default function ChatWindow({ messages, onSendMessage, loading, error }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[580px] bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-natural-border dark:border-dark-border rounded-3xl shadow-sm overflow-hidden" id="chat-window-container">
      {/* Chat Header */}
      <div className="bg-natural-sidebar dark:bg-dark-elevated border-b border-natural-border dark:border-dark-border p-4.5 flex items-center justify-between text-natural-charcoal dark:text-dark-text shadow-xs">
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="Desanuveador Tech" className="w-12 h-12 rounded-full object-contain shadow-xs" />
          <div>
            <h2 className="text-sm font-serif italic font-bold text-natural-charcoal dark:text-dark-text tracking-tight">Conversa com o Desanuveador Tech</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-natural-sage rounded-full animate-pulse motion-reduce:animate-none" />
              <span className="text-[10px] text-natural-taupe dark:text-dark-muted font-bold">Paciente, atencioso e sem jargões</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-natural-bg dark:bg-dark-base">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
            <img src={logoIcon} alt="Bem-vindo" className="w-24 h-24 rounded-2xl object-contain shadow-md" />
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-sm font-serif italic font-bold text-natural-charcoal dark:text-dark-text">Seja muito bem-vindo(a)!</h3>
              <p className="text-xs text-natural-dark dark:text-dark-text leading-relaxed">
                Olá! Sou o seu <strong>Desanuveador Tech Empático</strong>. Estou aqui para ajudar você a achar o melhor computador para o seu dia a dia, com toda a paciência e de um jeito simples.
              </p>
              <p className="text-xs text-natural-taupe dark:text-dark-muted leading-relaxed">
                Para começar, me conte: qual o seu maior objetivo hoje? Ou escolha um dos assuntos prontos abaixo:
              </p>
            </div>

            {/* Quick Starters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md pt-3">
              {QUICK_STARTERS.map((text, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(text)}
                  className="p-3 text-left text-xs bg-white dark:bg-dark-elevated border border-natural-border dark:border-dark-border hover:border-natural-sage/50 hover:bg-natural-sidebar/50 dark:hover:bg-dark-hover rounded-xl transition-all shadow-xs cursor-pointer text-natural-dark dark:text-dark-text font-semibold focus-visible:ring-2 focus-visible:ring-natural-sage/50 focus-visible:ring-offset-2"
                  id={`quick-starter-${i}`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] group ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              id={`message-bubble-${msg.id}`}
            >
              {isAssistant ? (
                <img src={logoIcon} alt="Guia" className="w-10 h-10 rounded-full object-contain shadow-xs shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-base shadow-xs bg-natural-taupe text-white">
                  👤
                </div>
              )}

              <div className="space-y-1">
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed relative ${
                  isAssistant 
                    ? 'bg-white dark:bg-dark-elevated border border-natural-border dark:border-dark-border text-natural-dark dark:text-dark-text rounded-tl-none shadow-xs' 
                    : 'bg-natural-sidebar dark:bg-dark-hover border border-natural-border dark:border-dark-border text-natural-dark dark:text-dark-text rounded-tr-none shadow-xs'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="absolute top-1.5 right-1.5">
                    <CopyMessageButton text={msg.text} />
                  </div>
                </div>
                <span className="text-[9px] text-natural-taupe dark:text-dark-muted block px-1.5 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-[85%] mr-auto" id="loading-indicator">
            <img src={logoIcon} alt="Guia" className="w-10 h-10 rounded-full object-contain shadow-xs shrink-0" />
            <div className="bg-white dark:bg-dark-elevated border border-natural-border dark:border-dark-border p-3.5 rounded-2xl rounded-tl-none shadow-xs">
              <div className="flex gap-2 items-center justify-center h-4 py-1">
                <span className="w-2 h-2 bg-natural-sage rounded-full animate-[typing-pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-natural-sage rounded-full animate-[typing-pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
                <span className="w-2 h-2 bg-natural-sage rounded-full animate-[typing-pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl text-xs border border-red-100 dark:border-red-800 max-w-md mx-auto" id="chat-error">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="flex-1 font-medium">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-natural-border dark:border-dark-border bg-white dark:bg-dark-surface flex gap-2 items-center" id="chat-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={loading ? 'Guia escrevendo...' : 'Fale aqui de forma simples, com suas palavras...'}
          disabled={loading}
          className="flex-1 bg-natural-bg dark:bg-dark-input border border-natural-border dark:border-dark-border text-natural-dark dark:text-dark-text text-xs rounded-xl py-2.5 px-4 focus:outline-none focus:border-natural-sage focus:bg-white dark:focus:bg-dark-hover disabled:opacity-60 font-sans placeholder:text-natural-taupe dark:placeholder:text-dark-muted"
          id="chat-input-text"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="bg-natural-sage hover:bg-natural-charcoal text-white rounded-xl p-2.5 transition-colors disabled:opacity-40 disabled:hover:bg-natural-sage shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-natural-sage/50 focus-visible:ring-offset-2"
          id="btn-chat-send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

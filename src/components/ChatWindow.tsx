import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { CopyMessageButton } from './ExportActions';

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
    <div className="flex flex-col h-[580px] bg-white border border-[#E5E1D5] rounded-3xl shadow-sm overflow-hidden" id="chat-window-container">
      {/* Chat Header */}
      <div className="bg-[#F4F1EA] border-b border-[#E5E1D5] p-4.5 flex items-center justify-between text-[#4A4842] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A6E5F] rounded-full flex items-center justify-center text-xl shadow-xs text-white">
            🧑‍💻
          </div>
          <div>
            <h2 className="text-sm font-serif italic font-bold text-[#4A4842] tracking-tight">Conversa com o Guia Tech</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-[#5A6E5F] rounded-full animate-pulse" />
              <span className="text-[10px] text-[#8D7B68] font-bold">Paciente, atencioso e sem jargões</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFCF8]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-[#5A6E5F]/10 rounded-full flex items-center justify-center text-2xl animate-bounce">
              👋
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-sm font-serif italic font-bold text-[#4A4842]">Seja muito bem-vindo(a)!</h3>
              <p className="text-xs text-[#3D3B36] leading-relaxed">
                Olá! Sou o seu <strong>Guia Tech Empático</strong>. Estou aqui para ajudar você a achar o melhor computador para o seu dia a dia, com toda a paciência e de um jeito simples.
              </p>
              <p className="text-xs text-[#8D7B68] leading-relaxed">
                Para começar, me conte: qual o seu maior objetivo hoje? Ou escolha um dos assuntos prontos abaixo:
              </p>
            </div>

            {/* Quick Starters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md pt-3">
              {QUICK_STARTERS.map((text, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(text)}
                  className="p-3 text-left text-xs bg-white border border-[#E5E1D5] hover:border-[#5A6E5F]/50 hover:bg-[#F4F1EA]/50 rounded-xl transition-all shadow-xs cursor-pointer text-[#3D3B36] font-semibold"
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
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm shadow-xs ${
                isAssistant ? 'bg-[#5A6E5F] text-white' : 'bg-[#8D7B68] text-white'
              }`}>
                {isAssistant ? '🧑‍💻' : '👤'}
              </div>

              <div className="space-y-1">
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed relative ${
                  isAssistant 
                    ? 'bg-white border border-[#E5E1D5] text-[#3D3B36] rounded-tl-none shadow-xs' 
                    : 'bg-[#F4F1EA] border border-[#E5E1D5] text-[#3D3B36] rounded-tr-none shadow-xs'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="absolute top-1.5 right-1.5">
                    <CopyMessageButton text={msg.text} />
                  </div>
                </div>
                <span className="text-[9px] text-[#8D7B68] block px-1.5 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-[85%] mr-auto" id="loading-indicator">
            <div className="w-8 h-8 rounded-full shrink-0 bg-[#5A6E5F] text-white flex items-center justify-center text-sm">
              🧑‍💻
            </div>
            <div className="bg-white border border-[#E5E1D5] p-3.5 rounded-2xl rounded-tl-none shadow-xs">
              <div className="flex gap-1.5 items-center justify-center h-4 py-1">
                <span className="w-2 h-2 bg-[#5A6E5F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#5A6E5F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#5A6E5F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-800 rounded-xl text-xs border border-red-100 max-w-md mx-auto" id="chat-error">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="flex-1 font-medium">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#E5E1D5] bg-white flex gap-2 items-center" id="chat-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={loading ? 'Guia escrevendo...' : 'Fale aqui de forma simples, com suas palavras...'}
          disabled={loading}
          className="flex-1 bg-[#FDFCF8] border border-[#E5E1D5] text-[#3D3B36] text-xs rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5A6E5F] focus:bg-white disabled:opacity-60 font-sans"
          id="chat-input-text"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="bg-[#5A6E5F] hover:bg-[#4A4842] text-white rounded-xl p-2.5 transition-colors disabled:opacity-40 disabled:hover:bg-[#5A6E5F] shrink-0 cursor-pointer"
          id="btn-chat-send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

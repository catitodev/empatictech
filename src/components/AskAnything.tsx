import { useState, FormEvent } from 'react';
import { HelpCircle, Send, Loader2, BookOpen, ExternalLink } from 'lucide-react';
import { CopyMessageButton } from './ExportActions';

export default function AskAnything() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao consultar.');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err.message || 'Não foi possível consultar a base de conhecimento.');
    } finally {
      setLoading(false);
    }
  };

  const SUGGESTIONS = [
    'O que é hardware open source?',
    'Quais alternativas ao Photoshop?',
    'Como começar com impressão 3D?',
    'O que é o KiCad?',
  ];

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E1D5] dark:border-[#444] rounded-3xl p-6 shadow-xs space-y-4" id="ask-anything-container">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-[#D4A373]/15 rounded-xl">
          <HelpCircle className="w-5 h-5 text-[#D4A373]" />
        </div>
        <div>
          <h3 className="text-base font-serif italic font-bold text-[#4A4842] dark:text-[#e0ddd6]">
            Pergunte Quase Tudo
          </h3>
          <p className="text-[10px] text-[#8D7B68] dark:text-[#999]">
            Hardware livre, software livre, maker, DIY, commons digital
          </p>
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: O que é o FreeCAD?"
          disabled={loading}
          maxLength={1000}
          className="flex-1 bg-[#FDFCF8] dark:bg-[#2a2a2a] border border-[#E5E1D5] dark:border-[#444] text-[#3D3B36] dark:text-[#e0ddd6] text-xs rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#D4A373] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!question.trim() || loading}
          className="bg-[#D4A373] hover:bg-[#c4935f] text-white rounded-xl p-2.5 transition-colors disabled:opacity-40 cursor-pointer shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>

      {/* Quick Suggestions */}
      {!answer && !loading && !error && (
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => { setQuestion(s); }}
              className="px-2.5 py-1 text-[10px] bg-[#F4F1EA] dark:bg-[#2a2a2a] border border-[#E5E1D5] dark:border-[#444] rounded-lg text-[#4A4842] dark:text-[#ccc] hover:border-[#D4A373]/50 transition-colors cursor-pointer font-medium"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Answer */}
      {answer && (
        <div className="bg-[#FDFCF8] dark:bg-[#252525] border border-[#E5E1D5] dark:border-[#444] rounded-2xl p-4 space-y-2 group relative">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-wider">Resposta da Base</span>
            <div className="ml-auto">
              <CopyMessageButton text={answer} />
            </div>
          </div>
          <div className="text-xs text-[#3D3B36] dark:text-[#ccc] leading-relaxed whitespace-pre-wrap">
            {answer}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}
    </div>
  );
}

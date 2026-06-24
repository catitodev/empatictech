import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full border border-[#E5E1D5] dark:border-[#555] bg-[#F4F1EA] dark:bg-[#333] transition-colors cursor-pointer flex items-center px-1 shrink-0"
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={dark ? 'Modo Claro' : 'Modo Escuro'}
    >
      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
        dark ? 'translate-x-7 bg-[#5A6E5F]' : 'translate-x-0 bg-white shadow-sm border border-[#E5E1D5]'
      }`}>
        {dark ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-[#D4A373]" />}
      </div>
    </button>
  );
}

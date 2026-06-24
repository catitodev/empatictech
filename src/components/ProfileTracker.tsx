import { Monitor, Laptop, BrainCircuit, Wallet, Sparkles, RefreshCw, Send } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileTrackerProps {
  profile: UserProfile;
  onChangeProfile: (updated: Partial<UserProfile>) => void;
  onGenerate?: () => void;
}

export default function ProfileTracker({ profile, onChangeProfile, onGenerate }: ProfileTrackerProps) {
  // Check completion progress
  const mobilityDefined = profile.mobility !== 'Ainda Não Definido';
  const effortDefined = profile.effort !== 'Ainda Não Definido';
  const budgetDefined = profile.budget !== 'Ainda Não Definido' && profile.budget !== '' && profile.budget.toLowerCase() !== 'não mencionado';
  const reuseDefined = profile.reuse !== 'Ainda Não Definido' && profile.reuse !== '' && profile.reuse.toLowerCase() !== 'não mencionado';

  let filledCount = 0;
  if (mobilityDefined) filledCount++;
  if (effortDefined) filledCount++;
  if (budgetDefined) filledCount++;
  if (reuseDefined) filledCount++;

  const progressPct = Math.round((filledCount / 4) * 100);

  return (
    <div className="bg-natural-sidebar/60 dark:bg-dark-surface/60 backdrop-blur-md border border-natural-border/50 dark:border-dark-border/50 rounded-3xl p-6 shadow-sm" id="profile-tracker-container">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-natural-taupe dark:text-dark-muted uppercase">
            Ficha do Seu Perfil
          </span>
          <h3 className="text-base font-serif italic font-bold text-natural-charcoal dark:text-dark-text mt-1">
            conta um pouquinho aqui..
          </h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-natural-sage">{progressPct}%</span>
          <p className="text-[9px] text-natural-taupe dark:text-dark-muted font-medium">Análise de perfil</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-natural-border dark:bg-dark-border h-2 rounded-full overflow-hidden mb-5">
        <div
          className="bg-natural-sage h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct || 5}%` }}
        />
      </div>

      <div className="space-y-4">
        {/* 1. MOBILIDADE */}
        <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-dark-elevated/70 backdrop-blur-xs border border-natural-border dark:border-dark-border transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${mobilityDefined ? 'bg-natural-sage/15 text-natural-sage' : 'bg-natural-border/55 text-natural-taupe'}`}>
              {profile.mobility.includes('Desktop') ? <Monitor className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-natural-charcoal dark:text-dark-text">Mobilidade (Onde vai usar?)</span>
                {mobilityDefined && <span className="px-2 py-0.5 bg-natural-sage text-white rounded text-[9px] font-bold">DEFINIDO</span>}
              </div>
              
              <div className="mt-2.5 flex gap-1.5">
                <button
                  onClick={() => {
                    if (profile.mobility === 'Notebook (Portátil)') {
                      onChangeProfile({ mobility: 'Ainda Não Definido' });
                    } else if (profile.mobility === 'Ainda Não Definido') {
                      onChangeProfile({ mobility: 'Notebook (Portátil)' });
                    } else if (profile.mobility.includes('Notebook')) {
                      onChangeProfile({ mobility: 'Computador de Mesa (Desktop)' });
                    } else {
                      onChangeProfile({ mobility: profile.mobility + ', Notebook (Portátil)' });
                    }
                  }}
                  className={`px-3 py-1 text-[11px] rounded-lg border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5A6E5F]/50 focus-visible:ring-offset-2 ${
                    profile.mobility.includes('Notebook')
                      ? 'bg-[#5A6E5F] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-notebook"
                >
                  Notebook
                </button>
                <button
                  onClick={() => {
                    if (profile.mobility === 'Computador de Mesa (Desktop)') {
                      onChangeProfile({ mobility: 'Ainda Não Definido' });
                    } else if (profile.mobility === 'Ainda Não Definido') {
                      onChangeProfile({ mobility: 'Computador de Mesa (Desktop)' });
                    } else if (profile.mobility.includes('Desktop')) {
                      onChangeProfile({ mobility: 'Notebook (Portátil)' });
                    } else {
                      onChangeProfile({ mobility: profile.mobility + ', Computador de Mesa (Desktop)' });
                    }
                  }}
                  className={`px-3 py-1 text-[11px] rounded-lg border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5A6E5F]/50 focus-visible:ring-offset-2 ${
                    profile.mobility.includes('Desktop')
                      ? 'bg-[#5A6E5F] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-desktop"
                >
                  Desktop (Fixo)
                </button>
              </div>
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted mt-1.5 leading-normal">
                {profile.mobility === 'Ainda Não Definido' 
                  ? 'Você precisa levar o PC para outros lugares ou usar apenas fixo na mesa?' 
                  : profile.mobility === 'Notebook (Portátil)' 
                    ? 'Notebook: Excelente para levar para aulas, trabalho ou usar no sofá.' 
                    : 'Computador Fixo: Melhor custo-benefício para telas maiores e durabilidade.'}
              </p>
            </div>
          </div>
        </div>

        {/* 2. ESFORÇO / USO */}
        <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-dark-elevated/70 backdrop-blur-xs border border-natural-border dark:border-dark-border transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${effortDefined ? 'bg-natural-ochre/15 text-natural-ochre' : 'bg-natural-border/55 text-natural-taupe'}`}>
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-natural-charcoal dark:text-dark-text">Uso Principal (Nível de Força)</span>
                {effortDefined && <span className="px-2 py-0.5 bg-natural-ochre text-white rounded text-[9px] font-bold">DEFINIDO</span>}
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1">
                <button
                  onClick={() => {
                    const current = profile.effort;
                    if (current.includes('Básico')) {
                      const cleaned = current.replace('Básico (Textos, Vídeos, Estudos)', '').replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',').trim();
                      onChangeProfile({ effort: cleaned || 'Ainda Não Definido' });
                    } else if (current === 'Ainda Não Definido') {
                      onChangeProfile({ effort: 'Básico (Textos, Vídeos, Estudos)' });
                    } else {
                      onChangeProfile({ effort: current + ', Básico (Textos, Vídeos, Estudos)' });
                    }
                  }}
                  className={`px-2.5 py-1 text-[10px] rounded-lg border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4A373]/50 focus-visible:ring-offset-2 ${
                    profile.effort.includes('Básico')
                      ? 'bg-[#D4A373] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-effort-basic"
                >
                  Estudos/Séries
                </button>
                <button
                  onClick={() => {
                    const current = profile.effort;
                    if (current.includes('Intermediário')) {
                      const cleaned = current.replace('Intermediário (Múltiplas Abas, Planilhas)', '').replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',').trim();
                      onChangeProfile({ effort: cleaned || 'Ainda Não Definido' });
                    } else if (current === 'Ainda Não Definido') {
                      onChangeProfile({ effort: 'Intermediário (Múltiplas Abas, Planilhas)' });
                    } else {
                      onChangeProfile({ effort: current + ', Intermediário (Múltiplas Abas, Planilhas)' });
                    }
                  }}
                  className={`px-2.5 py-1 text-[10px] rounded-lg border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4A373]/50 focus-visible:ring-offset-2 ${
                    profile.effort.includes('Intermediário')
                      ? 'bg-[#D4A373] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-effort-medium"
                >
                  Trabalho pesado
                </button>
                <button
                  onClick={() => {
                    const current = profile.effort;
                    if (current.includes('Avançado')) {
                      const cleaned = current.replace('Avançado (Jogos, Edição, Design)', '').replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',').trim();
                      onChangeProfile({ effort: cleaned || 'Ainda Não Definido' });
                    } else if (current === 'Ainda Não Definido') {
                      onChangeProfile({ effort: 'Avançado (Jogos, Edição, Design)' });
                    } else {
                      onChangeProfile({ effort: current + ', Avançado (Jogos, Edição, Design)' });
                    }
                  }}
                  className={`px-2.5 py-1 text-[10px] rounded-lg border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4A373]/50 focus-visible:ring-offset-2 ${
                    profile.effort.includes('Avançado')
                      ? 'bg-[#D4A373] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-effort-advanced"
                >
                  Jogos/Design
                </button>
              </div>
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted mt-1.5 leading-normal">
                {profile.effort === 'Ainda Não Definido'
                  ? 'Como vai ser o dia a dia dele? Tarefas leves ou programas pesados?'
                  : profile.effort.includes('Básico')
                    ? 'Básico: Ideal para ler, estudar, ver filmes e usar redes sociais.'
                    : profile.effort.includes('Intermediário')
                      ? 'Intermediário: Para quem trabalha com muitas planilhas, sistemas e abas.'
                      : 'Avançado: Exige peças mais caras para processar jogos e edições de vídeo.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. ORÇAMENTO */}
        <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-dark-elevated/70 backdrop-blur-xs border border-natural-border dark:border-dark-border transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${budgetDefined ? 'bg-natural-sage/15 text-natural-sage' : 'bg-natural-border/55 text-natural-taupe'}`}>
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-natural-charcoal dark:text-dark-text">Valor Confortável (Orçamento)</span>
                {budgetDefined && <span className="px-2 py-0.5 bg-natural-sage text-white rounded text-[9px] font-bold">DEFINIDO</span>}
              </div>
              
              <div className="mt-2.5 flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Ex: R$ 2.500"
                  value={profile.budget === 'Ainda Não Definido' ? '' : profile.budget}
                  onChange={(e) => onChangeProfile({ budget: e.target.value || 'Ainda Não Definido' })}
                  className="px-2.5 py-1 text-xs border border-natural-border dark:border-dark-border rounded-lg w-32 focus:outline-none focus:border-natural-sage bg-white dark:bg-dark-input text-natural-dark dark:text-dark-text"
                  id="input-budget-field"
                />
                <span className="text-[10px] text-natural-taupe">Estipule um limite</span>
              </div>
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted mt-1.5 leading-normal">
                {budgetDefined 
                  ? `Limite definido: ${profile.budget}. Vou achar as melhores opções até este preço!`
                  : 'Saber quanto você pode investir me ajuda a escolher peças que cabem no bolso.'}
              </p>
            </div>
          </div>
        </div>

        {/* 4. REAPROVEITAMENTO */}
        <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-dark-elevated/70 backdrop-blur-xs border border-natural-border dark:border-dark-border transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${reuseDefined ? 'bg-natural-sage/15 text-natural-sage' : 'bg-natural-border/55 text-natural-taupe'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-natural-charcoal dark:text-dark-text">Reaproveitamento para Economizar</span>
                {reuseDefined && <span className="px-2 py-0.5 bg-natural-sage text-white rounded text-[9px] font-bold">DEFINIDO</span>}
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1">
                <button
                  onClick={() => onChangeProfile({ reuse: 'Nenhum, preciso de tudo' })}
                  className={`px-2 py-0.5 text-[10px] rounded-md border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5A6E5F]/50 focus-visible:ring-offset-2 ${
                    profile.reuse.toLowerCase().includes('nenhum')
                      ? 'bg-[#5A6E5F] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-reuse-none"
                >
                  Preciso de tudo
                </button>
                <button
                  onClick={() => {
                    const current = profile.reuse.toLowerCase();
                    if (current.includes('nenhum') || current === 'ainda não definido') {
                      onChangeProfile({ reuse: 'Já tenho Mouse/Teclado' });
                    } else if (current.includes('mouse')) {
                      const parts = profile.reuse.split(', ').filter(p => !p.toLowerCase().includes('mouse'));
                      onChangeProfile({ reuse: parts.length ? parts.join(', ') : 'Ainda Não Definido' });
                    } else {
                      onChangeProfile({ reuse: profile.reuse + ', Já tenho Mouse/Teclado' });
                    }
                  }}
                  className={`px-2 py-0.5 text-[10px] rounded-md border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5A6E5F]/50 focus-visible:ring-offset-2 ${
                    profile.reuse.toLowerCase().includes('mouse')
                      ? 'bg-[#5A6E5F] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-reuse-peripherals"
                >
                  Tenho Mouse/Teclado
                </button>
                <button
                  onClick={() => {
                    const current = profile.reuse.toLowerCase();
                    if (current.includes('nenhum') || current === 'ainda não definido') {
                      onChangeProfile({ reuse: 'Já tenho Monitor' });
                    } else if (current.includes('monitor')) {
                      const parts = profile.reuse.split(', ').filter(p => !p.toLowerCase().includes('monitor'));
                      onChangeProfile({ reuse: parts.length ? parts.join(', ') : 'Ainda Não Definido' });
                    } else {
                      onChangeProfile({ reuse: profile.reuse + ', Já tenho Monitor' });
                    }
                  }}
                  className={`px-2 py-0.5 text-[10px] rounded-md border font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5A6E5F]/50 focus-visible:ring-offset-2 ${
                    profile.reuse.toLowerCase().includes('monitor')
                      ? 'bg-[#5A6E5F] text-white border-transparent'
                      : 'bg-white text-natural-dark border-[#E5E1D5] hover:bg-slate-50'
                  }`}
                  id="btn-select-reuse-monitor"
                >
                  Tenho Monitor
                </button>
              </div>
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted mt-1.5 leading-normal">
                {reuseDefined
                  ? `Marcado: ${profile.reuse}. Isso vai poupar dinheiro!`
                  : 'Diga se já tem monitor, mouse, teclado ou um computador antigo para reusar.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-natural-border dark:border-dark-border flex items-center justify-between text-[11px] text-natural-taupe">
        <button
          onClick={() => onChangeProfile({
            mobility: 'Ainda Não Definido',
            effort: 'Ainda Não Definido',
            budget: 'Ainda Não Definido',
            reuse: 'Ainda Não Definido'
          })}
          className="text-natural-taupe hover:text-natural-charcoal font-bold flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-natural-sage/50 focus-visible:ring-offset-2 rounded"
          id="btn-reset-profile"
        >
          <RefreshCw className="w-3 h-3" />
          Reiniciar
        </button>
        <button
          onClick={onGenerate}
          className="bg-natural-sage hover:bg-natural-charcoal text-white font-bold flex items-center gap-1.5 px-4 py-1.5 rounded-xl cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-natural-sage/50 focus-visible:ring-offset-2 text-xs"
          id="btn-generate-profile"
        >
          <Send className="w-3.5 h-3.5" />
          Gerar
        </button>
      </div>
    </div>
  );
}

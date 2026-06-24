import { useState } from 'react';
import { Sparkles, Percent, CheckCircle2, Search, ExternalLink, ShieldCheck, ArrowUpDown, Tag } from 'lucide-react';
import { RecommendationOption } from '../types';

interface RecommendationCardsProps {
  chatText: string;
}

interface StoreResult {
  name: string;
  price: number;
  original: number;
  discount: string;
  icon: string;
  searchUrl: string;
  shipping: string;
  warranty: string;
  hasPromo: boolean;
}

type SortMode = 'price-asc' | 'price-desc' | 'promo' | 'shipping';

export default function RecommendationCards({ chatText }: RecommendationCardsProps) {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');
  const [searchingPrice, setSearchingPrice] = useState(false);
  const [storeResults, setStoreResults] = useState<StoreResult[] | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('price-asc');

  const parseRecommendations = (text: string): RecommendationOption[] => {
    if (!text || !text.includes('Opção A') || !text.includes('Opção B') || !text.includes('Opção C')) return [];

    try {
      const getOptionBlock = (optionChar: 'A' | 'B' | 'C') => {
        const startIndex = text.indexOf(`Opção ${optionChar}`);
        if (startIndex === -1) return '';
        let endIndex = text.length;
        if (optionChar === 'A') { const n = text.indexOf('Opção B'); if (n !== -1) endIndex = n; }
        else if (optionChar === 'B') { const n = text.indexOf('Opção C'); if (n !== -1) endIndex = n; }
        else { const n = text.indexOf('---', startIndex); if (n !== -1) endIndex = n; }
        return text.substring(startIndex, endIndex);
      };

      const extractDetails = (block: string, type: 'A' | 'B' | 'C'): RecommendationOption | null => {
        if (!block) return null;
        const titleMatch = block.match(/Opção\s+[A-C]\s*\[([^\]]+)\]:\**\s*([^\n]+)/i);
        const title = titleMatch ? titleMatch[1].trim() : (type === 'A' ? 'O Equilíbrio Perfeito' : type === 'B' ? 'A Opção Econômica' : 'Para Durar Muitos Anos');
        let machineName = titleMatch ? titleMatch[2].replace(/\**/g, '').trim() : '';
        if (!machineName) { const alt = block.match(/:\**\s*([^\n\*]+)/); machineName = alt ? alt[1].trim() : 'Computador Indicado'; }
        machineName = machineName.replace(/[\*\_]/g, '');

        let whyPerfect = '';
        const whyMatch = block.match(/(?:Por que é perfeito para você|Onde economizamos|O Investimento):\**\s*([^\n]+)/i);
        if (whyMatch) whyPerfect = whyMatch[1].replace(/[\*\_]/g, '').trim();
        else whyPerfect = 'Desenvolvido para atender suas necessidades cotidianas.';

        const specs: string[] = [];
        block.split('\n').forEach(line => {
          if (line.includes('Especificações') || line.includes('Especificação')) {
            const clean = line.replace(/.*Especificações.*:\s*/i, '').replace(/[\[\]]/g, '');
            if (clean) specs.push(...clean.split(',').map(p => p.trim()));
          } else if ((line.trim().startsWith('-') || line.trim().startsWith('*')) && !line.includes('Por que') && !line.includes('Investimento') && !line.includes('economizamos')) {
            const item = line.replace(/^[\s\-\*]+\s*/, '').replace(/[\*\_]/g, '').trim();
            if (item.length > 5) specs.push(item);
          }
        });

        if (specs.length === 0) {
          if (type === 'B') specs.push('Processador ideal para tarefas do dia a dia', 'SSD ultraveloz', '8GB de Memória');
          else if (type === 'C') specs.push('Processador de última geração', '16GB de Memória', 'Alta durabilidade');
          else specs.push('Excelente processador intermediário', 'Iniciação super rápida', 'Bateria duradoura');
        }

        return { title, type, machineName, whyPerfect, specs: specs.filter(s => s.length > 2) };
      };

      const results: RecommendationOption[] = [];
      const a = extractDetails(getOptionBlock('A'), 'A');
      const b = extractDetails(getOptionBlock('B'), 'B');
      const c = extractDetails(getOptionBlock('C'), 'C');
      if (a) results.push(a);
      if (b) results.push(b);
      if (c) results.push(c);
      return results;
    } catch { return []; }
  };

  const options = parseRecommendations(chatText);

  if (options.length === 0) {
    return (
      <div className="bg-[#F4F1EA]/60 dark:bg-[#2a2a2a] border border-[#E5E1D5] dark:border-[#444] rounded-3xl p-6 text-center" id="no-recommendation-cards">
        <div className="w-12 h-12 bg-[#5A6E5F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-[#5A6E5F] animate-pulse motion-reduce:animate-none" />
        </div>
        <h4 className="text-sm font-serif italic font-bold text-[#4A4842] dark:text-[#e0ddd6] mb-1">
          Buscando as Recomendações Perfeitas
        </h4>
        <p className="text-xs text-[#8D7B68] dark:text-[#aaa] max-w-sm mx-auto leading-relaxed">
          Converse mais um pouco com o Desanuveador Tech Empático no chat! Assim que ele entender sua necessidade, o painel interativo de orçamentos e lojas abrirá aqui automaticamente.
        </p>
      </div>
    );
  }

  const currentOption = options.find(o => o.type === activeTab) || options[0];

  const buildSearchUrl = (storeName: string, query: string): string => {
    const encoded = encodeURIComponent(query);
    switch (storeName) {
      case 'KaBuM!': return `https://www.kabum.com.br/busca/${encoded}`;
      case 'Amazon Brasil': return `https://www.amazon.com.br/s?k=${encoded}`;
      case 'Magazine Luiza': return `https://www.magazineluiza.com.br/busca/${encoded}/`;
      case 'Mercado Livre': return `https://lista.mercadolivre.com.br/${encoded}`;
      case 'Shopee': return `https://shopee.com.br/search?keyword=${encoded}`;
      default: return '#';
    }
  };

  const handleSearchPrices = async () => {
    setSearchingPrice(true);
    setStoreResults(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', text: `Preciso que você me dê uma estimativa de preço atual no mercado brasileiro para o produto: "${currentOption.machineName}". Responda APENAS com um JSON no formato: {"prices":[{"store":"KaBuM!","price":0000,"original":0000,"discount":"texto","shipping":"texto","warranty":"texto","hasPromo":true},{"store":"Amazon Brasil",...},{"store":"Magazine Luiza",...},{"store":"Mercado Livre",...},{"store":"Shopee",...}]}. Use 5 lojas. Preços devem ser estimativas realistas em reais para ${currentOption.type === 'B' ? 'opção econômica' : currentOption.type === 'C' ? 'opção premium/durabilidade' : 'opção custo-benefício'}. Não inclua nenhum texto além do JSON.` }
          ]
        })
      });

      if (!response.ok) throw new Error('Falha na busca');
      const data = await response.json();
      const text = data.text || '';

      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*"prices"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.prices && Array.isArray(parsed.prices)) {
          const stores: StoreResult[] = parsed.prices.map((p: any) => ({
            name: p.store || 'Loja',
            price: Number(p.price) || 0,
            original: Number(p.original) || Number(p.price) * 1.1,
            discount: p.discount || 'Desconto PIX',
            icon: getStoreIcon(p.store),
            searchUrl: buildSearchUrl(p.store, currentOption.machineName),
            shipping: p.shipping || '3-7 dias úteis',
            warranty: p.warranty || '1 ano',
            hasPromo: Boolean(p.hasPromo),
          }));
          setStoreResults(stores);
          setSearchingPrice(false);
          return;
        }
      }
      // Fallback — exibir links de busca direta
      showSearchLinksOnly();
    } catch {
      showSearchLinksOnly();
    }
  };

  const showSearchLinksOnly = () => {
    const stores: StoreResult[] = [
      { name: 'KaBuM!', price: 0, original: 0, discount: 'Ver ofertas disponíveis', icon: '🛒', searchUrl: buildSearchUrl('KaBuM!', currentOption.machineName), shipping: 'Consultar na loja', warranty: 'Consultar', hasPromo: false },
      { name: 'Amazon Brasil', price: 0, original: 0, discount: 'Ver ofertas disponíveis', icon: '📦', searchUrl: buildSearchUrl('Amazon Brasil', currentOption.machineName), shipping: 'Consultar na loja', warranty: 'Consultar', hasPromo: false },
      { name: 'Mercado Livre', price: 0, original: 0, discount: 'Ver ofertas disponíveis', icon: '🤝', searchUrl: buildSearchUrl('Mercado Livre', currentOption.machineName), shipping: 'Consultar na loja', warranty: 'Consultar', hasPromo: false },
      { name: 'Magazine Luiza', price: 0, original: 0, discount: 'Ver ofertas disponíveis', icon: '🏬', searchUrl: buildSearchUrl('Magazine Luiza', currentOption.machineName), shipping: 'Consultar na loja', warranty: 'Consultar', hasPromo: false },
      { name: 'Shopee', price: 0, original: 0, discount: 'Ver ofertas disponíveis', icon: '🧡', searchUrl: buildSearchUrl('Shopee', currentOption.machineName), shipping: 'Consultar na loja', warranty: 'Consultar', hasPromo: false },
    ];
    setStoreResults(stores);
    setSearchingPrice(false);
  };

  const getStoreIcon = (name: string): string => {
    if (name?.includes('KaBuM')) return '🛒';
    if (name?.includes('Amazon')) return '📦';
    if (name?.includes('Mercado')) return '🤝';
    if (name?.includes('Magaz') || name?.includes('Luiza')) return '🏬';
    if (name?.includes('Shopee')) return '🧡';
    return '🛍️';
  };

  const getSortedStores = (): StoreResult[] => {
    if (!storeResults) return [];
    const sorted = [...storeResults];
    switch (sortMode) {
      case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
      case 'promo': return sorted.sort((a, b) => (b.hasPromo ? 1 : 0) - (a.hasPromo ? 1 : 0));
      case 'shipping': return sorted.sort((a, b) => a.shipping.localeCompare(b.shipping));
      default: return sorted;
    }
  };

  const getOptionBadgeStyle = (type: 'A' | 'B' | 'C') => {
    switch (type) {
      case 'A': return 'text-[#5A6E5F] bg-[#5A6E5F]/10 border border-[#5A6E5F]/20';
      case 'B': return 'text-[#D4A373] bg-[#D4A373]/10 border border-[#D4A373]/20';
      case 'C': return 'text-[#8D7B68] bg-[#F4F1EA] dark:bg-[#333] border border-[#E5E1D5] dark:border-[#555]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E1D5] dark:border-[#444] rounded-3xl p-6 shadow-xs space-y-5" id="recommendation-cards-container">
      <div>
        <span className="text-[10px] font-bold tracking-wider text-[#5A6E5F] bg-[#5A6E5F]/10 px-2.5 py-1 rounded-full uppercase">
          Painel de Preços e Modelos
        </span>
        <h3 className="text-base font-serif italic font-bold text-[#4A4842] dark:text-[#e0ddd6] mt-2">
          Compare as 3 Opções Sugeridas
        </h3>
        <p className="text-xs text-[#8D7B68] dark:text-[#aaa] mt-1">
          Clique nas abas e busque preços estimados nas 5 maiores lojas do Brasil.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F4F1EA] dark:bg-[#2a2a2a] p-1 rounded-xl border border-[#E5E1D5]/40 dark:border-[#444]">
        {options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => { setActiveTab(opt.type); setStoreResults(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === opt.type
                ? 'bg-white dark:bg-[#333] text-[#4A4842] dark:text-[#e0ddd6] shadow-xs'
                : 'text-[#8D7B68] hover:text-[#4A4842] dark:hover:text-[#ddd]'
            }`}
          >
            Opção {opt.type}
            <span className="block text-[10px] font-normal opacity-85 truncate px-1">
              {opt.type === 'A' ? 'Equilíbrio' : opt.type === 'B' ? 'Econômica' : 'Durabilidade'}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Option Card */}
      <div className="border border-[#E5E1D5] dark:border-[#444] rounded-2xl p-4 bg-[#FDFCF8]/90 dark:bg-[#252525] space-y-4">
        <div>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${getOptionBadgeStyle(currentOption.type)}`}>
            ⭐ {currentOption.title}
          </span>
          <h4 className="text-md font-bold text-[#4A4842] dark:text-[#e0ddd6] mt-2 font-serif italic tracking-tight leading-snug">
            {currentOption.machineName}
          </h4>
        </div>

        <div className="bg-[#F4F1EA] dark:bg-[#2a2a2a] border border-[#E5E1D5] dark:border-[#444] p-3.5 rounded-xl text-xs text-[#3D3B36] dark:text-[#ccc]">
          <span className="font-serif italic font-bold text-[#4A4842] dark:text-[#e0ddd6] block mb-1">
            {currentOption.type === 'A' ? 'Por que é perfeito para você:' : currentOption.type === 'B' ? 'Onde economizamos:' : 'O investimento:'}
          </span>
          <p className="leading-relaxed">{currentOption.whyPerfect}</p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-wider text-[#8D7B68] dark:text-[#999] uppercase">Especificações:</span>
          <div className="grid grid-cols-1 gap-2">
            {currentOption.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs bg-white dark:bg-[#1e1e1e] p-3 rounded-xl border border-[#E5E1D5] dark:border-[#444]">
                <CheckCircle2 className="w-4 h-4 text-[#5A6E5F] mt-0.5 shrink-0" />
                <span className="text-[#3D3B36] dark:text-[#ccc] leading-relaxed font-medium">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Search */}
        <div className="pt-2">
          {!storeResults && !searchingPrice && (
            <button
              onClick={handleSearchPrices}
              className="w-full bg-[#5A6E5F] hover:bg-[#4A4842] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Buscar Preços nas 5 Maiores Lojas
            </button>
          )}

          {searchingPrice && (
            <div className="space-y-3" aria-busy="true" aria-label="Carregando preços">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-natural-border dark:border-dark-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-natural-border dark:bg-dark-border animate-pulse motion-reduce:animate-none" />
                    <div className="space-y-1.5">
                      <div className="w-20 h-3 bg-natural-border dark:bg-dark-border rounded animate-pulse motion-reduce:animate-none" />
                      <div className="w-28 h-2 bg-natural-border/60 dark:bg-dark-border/60 rounded animate-pulse motion-reduce:animate-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right">
                    <div className="w-24 h-4 bg-natural-sage/20 rounded animate-pulse motion-reduce:animate-none ml-auto" />
                    <div className="w-16 h-2 bg-natural-border/60 dark:bg-dark-border/60 rounded animate-pulse motion-reduce:animate-none ml-auto" />
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-natural-taupe dark:text-dark-muted text-center font-medium">
                Consultando KaBuM! • Amazon • Mercado Livre • Magalu • Shopee
              </p>
            </div>
          )}

          {storeResults && (
            <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E1D5] dark:border-[#444] rounded-xl p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#E5E1D5]/40 dark:border-[#444] pb-2.5">
                <span className="text-xs font-bold text-[#4A4842] dark:text-[#e0ddd6] flex items-center gap-1.5 font-serif italic">
                  <Percent className="w-4 h-4 text-[#5A6E5F]" />
                  Preços Estimados
                </span>
                <span className="text-[9px] text-[#8D7B68] dark:text-[#999] bg-[#F4F1EA] dark:bg-[#333] px-2 py-0.5 rounded font-medium">
                  Clique para ver preço real na loja
                </span>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-wrap gap-1.5">
                {([
                  { key: 'price-asc' as SortMode, label: 'Menor Preço' },
                  { key: 'price-desc' as SortMode, label: 'Maior Preço' },
                  { key: 'promo' as SortMode, label: 'Promoções' },
                  { key: 'shipping' as SortMode, label: 'Entrega' },
                ]).map(s => (
                  <button
                    key={s.key}
                    onClick={() => setSortMode(s.key)}
                    className={`px-2 py-0.5 text-[10px] rounded-md border font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      sortMode === s.key
                        ? 'bg-[#5A6E5F] text-white border-transparent'
                        : 'bg-white dark:bg-[#2a2a2a] text-[#4A4842] dark:text-[#ccc] border-[#E5E1D5] dark:border-[#555] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    {s.key.includes('price') ? <ArrowUpDown className="w-2.5 h-2.5" /> : <Tag className="w-2.5 h-2.5" />}
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Store Results */}
              <div className="space-y-2">
                {getSortedStores().map((store, index) => (
                  <a
                    key={index}
                    href={store.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[#E5E1D5] dark:border-[#444] hover:border-[#5A6E5F]/50 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{store.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-[#4A4842] dark:text-[#e0ddd6] block group-hover:text-[#5A6E5F]">{store.name}</span>
                        {store.original > 0 && (
                          <span className="text-[10px] text-[#8D7B68] dark:text-[#999] block font-mono line-through">
                            R$ {store.original.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                        <span className="text-[9px] text-[#8D7B68] dark:text-[#888]">{store.shipping}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {store.price > 0 ? (
                        <span className="text-sm font-bold text-[#5A6E5F] block">
                          R$ {store.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#5A6E5F] block">Ver preço →</span>
                      )}
                      {store.hasPromo && (
                        <span className="text-[9px] text-white bg-[#D4A373] px-1.5 py-0.5 rounded block mt-0.5 font-bold">🔥 {store.discount}</span>
                      )}
                      {!store.hasPromo && store.price > 0 && (
                        <span className="text-[9px] text-[#8D7B68] bg-[#F4F1EA] dark:bg-[#333] px-1.5 py-0.5 rounded block mt-0.5 font-semibold">{store.discount}</span>
                      )}
                      <span className="text-[9px] text-[#5A6E5F] mt-0.5 flex items-center gap-0.5 justify-end group-hover:underline">
                        <ExternalLink className="w-2.5 h-2.5" /> Ver na loja
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="text-[9px] text-[#8D7B68] dark:text-[#888] text-center pt-2 border-t border-[#E5E1D5]/40 dark:border-[#444]">
                <ShieldCheck className="w-3 h-3 inline mr-1" />
                Preços são estimativas. Clique na loja para conferir o valor atualizado em tempo real.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

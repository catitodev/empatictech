import { useState } from 'react';
import { BookOpen, Cpu, HardDrive, Layout, Paintbrush, HelpCircle } from 'lucide-react';
import { HardwareConcept } from '../types';

const CONCEPTS: HardwareConcept[] = [
  {
    id: 'ram',
    name: 'Memória RAM',
    technicalTerm: 'Memória de Acesso Aleatório (RAM)',
    metaphorTitle: 'A Mesa de Trabalho',
    metaphorDescription: 'Imagine a memória RAM como o tamanho da sua escrivaninha ou mesa de escritório física. Se a mesa for muito pequena, você só consegue colocar um caderno aberto. Para olhar outro assunto, precisa guardar o primeiro. Se a mesa for bem ampla, você consegue deixar abertos vários cadernos, papéis, canetas e uma xícara de café ao mesmo tempo, mexendo em tudo simultaneamente sem bagunça.',
    whyItMatters: 'Se seu computador tem pouca RAM, ele vai começar a engasgar ou recarregar as abas da internet toda vez que você tentar abrir mais de 3 ou 4 coisas ao mesmo tempo. Para o dia a dia moderno, uma mesa espaçosa (8GB a 16GB) é ideal.',
    icon: 'layout',
  },
  {
    id: 'cpu',
    name: 'Processador',
    technicalTerm: 'Unidade Central de Processamento (CPU)',
    metaphorTitle: 'O Chef de Cozinha',
    metaphorDescription: 'O processador é o cérebro, ou o grande Chef de Cozinha do computador. Toda vez que você clica em algo, digita uma letra ou abre um programa, você está dando um "pedido" para o Chef preparar. Um Chef rápido e experiente consegue picar cebolas, olhar o forno, temperar a carne e entregar os pratos voando, sem deixar nada queimar ou esfriar.',
    whyItMatters: 'É ele quem define a rapidez geral de tudo. Se o seu "Chef" for muito antigo ou lento, cada clique simples vai fazer o computador parar para "pensar" por vários segundos. Bons processadores modernos garantem cliques instantâneos.',
    icon: 'cpu',
  },
  {
    id: 'ssd',
    name: 'Armazenamento (SSD / HD)',
    technicalTerm: 'Unidade de Estado Sólido (SSD)',
    metaphorTitle: 'O Armário de Arquivos',
    metaphorDescription: 'O armazenamento é onde guardamos tudo permanente: fotos, vídeos, programas e o próprio sistema. O HD antigo é como um arquivo de metal de escritório daqueles bem velhos e emperrados, onde você precisa abrir gaveta por gaveta e folhear papel por papel até achar o que quer. O SSD moderno é como um armário inteligente automatizado: você aperta um botão e a pasta certa voa na sua mão em menos de um segundo.',
    whyItMatters: 'Comprar um computador sem SSD hoje em dia é um erro comum. O SSD faz o computador ligar em menos de 10 segundos, enquanto o HD antigo leva minutos para inicializar e fica com o sistema travado ao ligar.',
    icon: 'hard-drive',
  },
  {
    id: 'gpu',
    name: 'Placa de Vídeo',
    technicalTerm: 'Unidade de Processamento Gráfico (GPU)',
    metaphorTitle: 'O Pintor Artista',
    metaphorDescription: 'A placa de vídeo é como um pintor artista talentoso que trabalha ao lado do Chef (processador). O Chef sabe a receita e o texto, mas quando é preciso desenhar paisagens 3D lindas em movimento, luzes ultra realistas ou processar edições visuais pesadas, o Chef pede para o Pintor fazer isso com maestria.',
    whyItMatters: 'Se você só quer ver vídeos no YouTube, ler notícias ou usar o Word, o próprio Chef consegue fazer desenhos simples muito bem. Mas se você quer jogar jogos modernos com gráficos bonitos ou editar vídeos, precisa de um Pintor dedicado para a tela não ficar engasgando.',
    icon: 'paintbrush',
  },
];

export default function MetaphorDictionary() {
  const [selectedConcept, setSelectedConcept] = useState<HardwareConcept | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout': return <Layout className="w-5 h-5 text-[#5A6E5F]" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-[#5A6E5F]" />;
      case 'hard-drive': return <HardDrive className="w-5 h-5 text-[#5A6E5F]" />;
      case 'paintbrush': return <Paintbrush className="w-5 h-5 text-[#5A6E5F]" />;
      default: return <HelpCircle className="w-5 h-5 text-[#5A6E5F]" />;
    }
  };

  return (
    <div className="bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-sm border border-[#E5E1D5] dark:border-[#444] rounded-3xl p-6 shadow-xs" id="metaphor-dictionary-container">
      <div className="flex items-center gap-2.5 mb-4">
        <BookOpen className="w-5 h-5 text-[#5A6E5F]" />
        <h3 className="text-base font-serif italic font-bold text-natural-charcoal dark:text-dark-text">
          Dicionário Amigável de Peças
        </h3>
      </div>
      <p className="text-xs text-[#8D7B68] mb-4 leading-relaxed">
        Não entende as letrinhas técnicas dos anúncios? Clique nos componentes abaixo para ver como eles funcionam usando exemplos fáceis do nosso dia a dia!
      </p>

      <div className="grid grid-cols-1 gap-3">
        {CONCEPTS.map((concept) => (
          <div key={concept.id} className="border border-[#E5E1D5] bg-white rounded-2xl overflow-hidden transition-all duration-200 shadow-xs hover:border-[#5A6E5F]/35">
            <button
              onClick={() => setSelectedConcept(selectedConcept?.id === concept.id ? null : concept)}
              aria-expanded={selectedConcept?.id === concept.id}
              className="w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none focus:ring-1 focus:ring-[#5A6E5F]/30 cursor-pointer"
              id={`btn-concept-${concept.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F4F1EA] rounded-xl">
                  {getIcon(concept.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#4A4842]">{concept.name}</h4>
                  <span className="text-[10px] text-[#8D7B68] font-mono tracking-tight bg-[#F4F1EA] px-2 py-0.5 rounded mt-1 inline-block">
                    {concept.technicalTerm}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#5A6E5F] font-bold select-none shrink-0">
                {selectedConcept?.id === concept.id ? 'Fechar' : 'Entender'}
              </span>
            </button>

            {selectedConcept?.id === concept.id && (
              <div className="px-4 pb-4 pt-1 bg-[#FDFCF8] border-t border-[#E5E1D5]/40 text-xs text-[#3D3B36] space-y-3.5 leading-relaxed animate-fade-in">
                <div className="bg-[#F4F1EA]/70 p-3.5 rounded-xl border border-[#E5E1D5]">
                  <div className="font-serif italic font-bold text-[#4A4842] flex items-center gap-1.5 mb-1.5 text-[13px]">
                    ✨ Metáfora: {concept.metaphorTitle}
                  </div>
                  <p className="text-[#3D3B36] leading-relaxed">{concept.metaphorDescription}</p>
                </div>
                <div className="px-1">
                  <span className="font-bold text-[#4A4842] block mb-1">⚠️ Por que isso importa na sua escolha?</span>
                  <p className="text-[#8D7B68] leading-relaxed">{concept.whyItMatters}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

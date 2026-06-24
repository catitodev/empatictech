import { useState, useRef, useEffect } from 'react';
import { Download, Copy, Check, FileText, File, FileCode } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { jsPDF } from 'jspdf';
import { Message } from '../types';

interface ExportActionsProps {
  messages: Message[];
}

type ExportFormat = 'pdf' | 'txt' | 'md' | 'docx';

export default function ExportActions({ messages }: ExportActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const assistantMessages = messages.filter(m => m.role === 'assistant');

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showMenu]);

  if (assistantMessages.length === 0) return null;

  const getConversationText = (): string => {
    return messages
      .filter(m => !m.text.startsWith('['))
      .map(m => `${m.role === 'user' ? '👤 Você' : '🧑‍💻 Desanuveador Tech'} (${m.timestamp}):\n${m.text}`)
      .join('\n\n---\n\n');
  };

  const getMarkdown = (): string => {
    let md = '# Conversa com o Desanuveador Tech Empático\n\n';
    md += `> Exportado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n`;
    md += '---\n\n';

    messages
      .filter(m => !m.text.startsWith('['))
      .forEach(m => {
        const role = m.role === 'user' ? '**👤 Você**' : '**🧑‍💻 Desanuveador Tech**';
        md += `### ${role} — ${m.timestamp}\n\n${m.text}\n\n---\n\n`;
      });

    md += '\n*Gerado pelo Desanuveador Tech Empático — recurso abundante feito com empatia e afeto*\n';
    return md;
  };

  const exportAsTxt = () => {
    const text = `CONVERSA COM O DESANUVEADOR TECH EMPÁTICO\nExportado em: ${new Date().toLocaleDateString('pt-BR')}\n${'='.repeat(50)}\n\n${getConversationText()}\n\n${'='.repeat(50)}\nGerado pelo Desanuveador Tech Empático — recurso abundante feito com empatia e afeto`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `desanuveador-tech-conversa-${Date.now()}.txt`);
  };

  const exportAsMd = () => {
    const blob = new Blob([getMarkdown()], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `desanuveador-tech-conversa-${Date.now()}.md`);
  };

  const exportAsPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Desanuveador Tech Empático', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Exportado em ${new Date().toLocaleDateString('pt-BR')}`, margin, y);
    y += 12;

    messages
      .filter(m => !m.text.startsWith('['))
      .forEach(m => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        const role = m.role === 'user' ? 'Você' : 'Desanuveador Tech';
        doc.text(`${role} (${m.timestamp}):`, margin, y);
        y += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(m.text, maxWidth);
        lines.forEach((line: string) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin, y);
          y += 4.5;
        });
        y += 6;
      });

    doc.setFontSize(8);
    doc.text('Gerado pelo Desanuveador Tech Empatico', margin, 285);
    doc.save(`desanuveador-tech-conversa-${Date.now()}.pdf`);
  };

  const exportAsDocx = async () => {
    const children: Paragraph[] = [
      new Paragraph({
        text: 'Conversa com o Desanuveador Tech Empático',
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Exportado em ${new Date().toLocaleDateString('pt-BR')}`, italics: true, size: 20 }),
        ],
      }),
      new Paragraph({ text: '' }),
    ];

    messages
      .filter(m => !m.text.startsWith('['))
      .forEach(m => {
        const role = m.role === 'user' ? 'Você' : 'Desanuveador Tech';
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${role} (${m.timestamp}):`, bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: m.text, size: 20 })],
          }),
          new Paragraph({ text: '' }),
        );
      });

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Gerado pelo Desanuveador Tech Empático — recurso abundante feito com empatia e afeto', italics: true, size: 18 }),
        ],
      }),
    );

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `desanuveador-tech-conversa-${Date.now()}.docx`);
  };

  const handleExport = async (format: ExportFormat) => {
    setExporting(true);
    setShowMenu(false);
    try {
      switch (format) {
        case 'txt': exportAsTxt(); break;
        case 'md': exportAsMd(); break;
        case 'pdf': exportAsPdf(); break;
        case 'docx': await exportAsDocx(); break;
      }
    } finally {
      setExporting(false);
    }
  };

  const formats: { key: ExportFormat; label: string; icon: typeof FileText }[] = [
    { key: 'pdf', label: 'PDF', icon: FileText },
    { key: 'txt', label: 'Texto (.txt)', icon: File },
    { key: 'md', label: 'Markdown (.md)', icon: FileCode },
    { key: 'docx', label: 'Word (.docx)', icon: FileText },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
        aria-expanded={showMenu}
        aria-haspopup="true"
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-natural-sage bg-natural-sage/10 border border-natural-sage/20 rounded-lg hover:bg-natural-sage/20 transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-natural-sage/50 focus-visible:ring-offset-2"
        title="Exportar conversa"
      >
        <Download className="w-3.5 h-3.5" />
        {exporting ? 'Exportando...' : 'Baixar Resultado'}
      </button>

      {showMenu && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 bg-white dark:bg-dark-elevated border border-natural-border dark:border-dark-border rounded-xl shadow-lg py-1.5 z-50 min-w-[160px]"
        >
          {formats.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              role="menuitem"
              onClick={() => handleExport(key)}
              className="w-full text-left px-3.5 py-2 text-xs text-natural-dark dark:text-dark-text hover:bg-natural-sidebar dark:hover:bg-dark-hover flex items-center gap-2 transition-colors cursor-pointer focus-visible:bg-natural-sidebar dark:focus-visible:bg-dark-hover outline-none"
            >
              <Icon className="w-3.5 h-3.5 text-natural-sage" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CopyMessageButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-natural-border/60 dark:hover:bg-dark-border/60 cursor-pointer"
      title="Copiar mensagem"
      aria-label={copied ? 'Copiado' : 'Copiar mensagem'}
    >
      {copied ? (
        <Check className="w-3 h-3 text-natural-sage" />
      ) : (
        <Copy className="w-3 h-3 text-natural-taupe" />
      )}
    </button>
  );
}

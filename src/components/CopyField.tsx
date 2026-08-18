import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface Props {
  label: string;
  value: string;
}

export default function CopyField({ label, value }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
      } catch {
        /* ignora */
      }
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-faint">{label}</div>
        <div className="mt-1 truncate font-mono text-[13.5px] text-ink">{value}</div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[12px] text-sub hover:text-ink hover:border-white/20 active:scale-[0.97] transition"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
        )}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  );
}

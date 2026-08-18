import { useState } from 'react';
import type { ScreenCtx } from './index';

/** Linha de campo do formulário, com toque-pra-copiar quando há valor real. */
export function FieldRow({
  label,
  value,
  canCopy,
  highlight,
}: {
  label: string;
  value: string;
  canCopy: boolean;
  highlight?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    if (!canCopy) return;
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      })
      .catch(() => {});
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!canCopy}
      className={`w-full text-left rounded-lg border px-2.5 py-1.5 transition ${
        highlight ? 'border-brandPink/60 bg-brandPink/10' : 'border-white/10 bg-white/5'
      } ${canCopy ? 'active:scale-[0.99]' : 'cursor-default'}`}
    >
      <div className="text-[9px] uppercase tracking-wide text-white/40">{label}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[12px] font-semibold text-white font-mono">{value}</span>
        {canCopy && (
          <span className="shrink-0 text-[9px] text-brandPink">{copied ? '✓ copiado' : 'copiar'}</span>
        )}
      </div>
    </button>
  );
}

/** Formulário Xtream (comum a VU / 9Xtream / Smarters / IBO). */
export function XtreamForm({
  usuario,
  senha,
  url,
  filled,
  title = 'Xtream Codes Login',
}: ScreenCtx & { title?: string }) {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-4 pt-8 pb-2 text-[12px] font-semibold border-b border-white/10">{title}</div>
      <div className="flex-1 overflow-auto p-3 flex flex-col justify-center">
        <div className="mx-auto w-full max-w-[230px] space-y-2">
          <FieldRow label="Nome (qualquer)" value="CineRush" canCopy={false} />
          <FieldRow label="Usuário" value={usuario} canCopy={filled} highlight />
          <FieldRow label="Senha" value={senha} canCopy={filled} highlight />
          <FieldRow label="URL do servidor" value={url} canCopy={filled} />
          <div className="mt-1 rounded-lg bg-[#0a84ff] text-center text-[12px] font-bold py-2">
            Adicionar usuário
          </div>
        </div>
      </div>
    </div>
  );
}

/** Grade de canais (tela final). cols muda entre celular (3) e TV/PC (5). */
export function ChannelsGrid({ cols = 3, label = 'Carregando canais…' }: { cols?: number; label?: string }) {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-4 pt-8 pb-2 text-[12px] font-semibold">Canais</div>
      <div
        className="flex-1 grid gap-1.5 p-3 content-start overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols * 3 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-white/5 border border-white/10" />
        ))}
      </div>
      <div className="pb-4 text-center text-[11px] text-white/50">{label}</div>
    </div>
  );
}

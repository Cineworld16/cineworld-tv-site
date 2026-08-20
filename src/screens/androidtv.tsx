import { useState } from 'react';
import type { ScreenCtx, VisualStep } from './index';
import { ChannelsGrid, FieldRow } from './parts';

// Passo 1 — Downloader com o link do PLAYSIM
function Downloader() {
  return (
    <div className="h-full bg-[#12203a] text-white flex flex-col">
      <div className="px-3 pt-5 pb-2 text-[11px] font-semibold text-white/80">Downloader</div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-2.5">
        <div className="text-[10px] text-white/60">Digite o link na barra:</div>
        <div className="w-full max-w-[240px] flex items-center gap-2">
          <div className="flex-1 rounded-md bg-white/10 border border-brandPink/60 px-2.5 py-2 text-center text-[13px] font-bold tracking-tight">
            aftv.news/5082303
          </div>
          <div className="rounded-md bg-[#0a84ff] px-3 py-2 text-[11px] font-bold">Go</div>
        </div>
      </div>
    </div>
  );
}

// Passo 2 — instalar PLAYSIM
function InstallPrompt() {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[240px] rounded-xl border border-white/10 bg-white/5 p-4 text-center space-y-3">
        <div className="text-[13px] font-semibold">Instalar PLAYSIM?</div>
        <div className="flex gap-2 justify-center">
          <div className="rounded-md bg-white/10 px-4 py-1.5 text-[11px]">Cancelar</div>
          <div className="rounded-md bg-brandPink px-4 py-1.5 text-[11px] font-bold text-white">Instalar</div>
        </div>
      </div>
    </div>
  );
}

// Passo 3 — home do PLAYSIM, tocar em adicionar lista
function PlaysimHome() {
  return (
    <div className="h-full bg-gradient-to-b from-[#2a0a0a] to-[#0b0b12] text-white flex flex-col">
      <div className="px-3 pt-5 pb-2 text-center">
        <span className="text-[15px] font-extrabold tracking-tight">
          PLAY<span className="text-brandPink">SIM</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="rounded-xl border border-brandPink/60 bg-brandPink/15 px-5 py-4 text-[12px] font-semibold flex items-center gap-2">
          <span className="text-lg leading-none">＋</span> Adicionar lista de reprodução
        </div>
      </div>
    </div>
  );
}

// Passo 4 — formulário Código / Usuário / Senha
function PlaysimForm({ usuario, senha, filled }: ScreenCtx) {
  const [copiedCode, setCopiedCode] = useState(false);
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-4 pt-8 pb-2 text-[12px] font-semibold border-b border-white/10 text-center">
        Adicionar lista de reprodução
      </div>
      <div className="flex-1 overflow-auto p-3 flex flex-col justify-center">
        <div className="mx-auto w-full max-w-[230px] space-y-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText('739285').then(() => {
                setCopiedCode(true);
                window.setTimeout(() => setCopiedCode(false), 1200);
              });
            }}
            className="w-full text-left rounded-lg border border-brandPink/60 bg-brandPink/10 px-2.5 py-1.5 active:scale-[0.99]"
          >
            <div className="text-[9px] uppercase tracking-wide text-white/40">Código (sempre o mesmo)</div>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[12px] font-semibold text-white font-mono">739285</span>
              <span className="shrink-0 text-[9px] text-brandPink">{copiedCode ? '✓ copiado' : 'copiar'}</span>
            </div>
          </button>
          <FieldRow label="Nome de usuário" value={usuario} canCopy={filled} highlight />
          <FieldRow label="Senha" value={senha} canCopy={filled} highlight />
          <div className="mt-1 flex gap-2">
            <div className="flex-1 rounded-lg border border-white/15 text-center text-[12px] font-semibold py-2 text-white/70">
              Cancelar
            </div>
            <div className="flex-1 rounded-lg bg-[#0a84ff] text-center text-[12px] font-bold py-2">Ok</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const androidtvScreens: VisualStep[] = [
  { frame: 'tv', render: () => <Downloader /> },
  { frame: 'tv', render: () => <InstallPrompt /> },
  { frame: 'tv', render: () => <PlaysimHome /> },
  { frame: 'tv', render: (ctx) => <PlaysimForm {...ctx} /> },
  { frame: 'tv', render: () => <ChannelsGrid cols={5} /> },
];

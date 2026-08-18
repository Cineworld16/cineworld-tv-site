import type { VisualStep } from './index';
import { ChannelsGrid, XtreamForm } from './parts';

// Passo 1 — Downloader com o código
function Downloader() {
  return (
    <div className="h-full bg-[#12203a] text-white flex flex-col">
      <div className="px-3 pt-5 pb-2 text-[11px] font-semibold text-white/80">Downloader</div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-2.5">
        <div className="text-[10px] text-white/60">Digite o código na barra:</div>
        <div className="w-full max-w-[240px] flex items-center gap-2">
          <div className="flex-1 rounded-md bg-white/10 border border-brandPink/60 px-3 py-2 text-center text-[16px] font-bold tracking-[0.2em]">
            8621576
          </div>
          <div className="rounded-md bg-[#0a84ff] px-3 py-2 text-[11px] font-bold">Go</div>
        </div>
      </div>
    </div>
  );
}

// Passo 2 — instalar 9Xtream
function InstallPrompt() {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[240px] rounded-xl border border-white/10 bg-white/5 p-4 text-center space-y-3">
        <div className="text-[13px] font-semibold">Instalar 9Xtream?</div>
        <div className="flex gap-2 justify-center">
          <div className="rounded-md bg-white/10 px-4 py-1.5 text-[11px]">Cancelar</div>
          <div className="rounded-md bg-brandPink px-4 py-1.5 text-[11px] font-bold text-white">Instalar</div>
        </div>
      </div>
    </div>
  );
}

// Passo 3 — adicionar usuário no 9Xtream
function AddUser9Xtream() {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-3 pt-5 pb-2 text-[12px] font-extrabold brand-gradient">9Xtream</div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="rounded-xl border border-brandPink/60 bg-brandPink/15 px-5 py-4 text-[12px] font-semibold flex items-center gap-2">
          <span className="text-lg leading-none">＋</span> Adicionar usuário
        </div>
      </div>
    </div>
  );
}

export const androidtvScreens: VisualStep[] = [
  { frame: 'tv', render: () => <Downloader /> },
  { frame: 'tv', render: () => <InstallPrompt /> },
  { frame: 'tv', render: () => <AddUser9Xtream /> },
  { frame: 'tv', render: (ctx) => <XtreamForm {...ctx} title="9Xtream — Xtream Codes" /> },
  { frame: 'tv', render: () => <ChannelsGrid cols={5} /> },
];

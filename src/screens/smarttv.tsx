import type { VisualStep } from './index';
import { ChannelsGrid, XtreamForm } from './parts';

// Passo 1 — IBO Player na TV mostrando MAC + Key
function IboMacKey() {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-3 pt-5 pb-2 text-[11px] font-semibold">IBO Player Pro</div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
        <div className="text-[10px] text-white/50">Anote os dados que aparecem na TV:</div>
        <div className="w-full max-w-[240px] space-y-1.5">
          <div className="rounded-md bg-white/5 border border-white/10 px-3 py-1.5 flex justify-between text-[11px]">
            <span className="text-white/40">MAC</span>
            <span className="font-mono">1A:2B:3C:4D:5E:6F</span>
          </div>
          <div className="rounded-md bg-white/5 border border-white/10 px-3 py-1.5 flex justify-between text-[11px]">
            <span className="text-white/40">Key</span>
            <span className="font-mono">482913</span>
          </div>
        </div>
        <div className="text-[9px] text-white/40">(na sua TV vão aparecer os seus)</div>
      </div>
    </div>
  );
}

// Passo 2 — site iboplayer.com/device (no celular/PC)
function IboWebsite() {
  return (
    <div className="h-full bg-white text-black flex flex-col">
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-black/5 text-[9px] text-black/50">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 rounded bg-white px-2 py-0.5 truncate font-mono">iboplayer.com/device</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 p-3">
        <div className="text-[12px] font-bold">Adicionar dispositivo</div>
        <div className="w-full max-w-[220px] space-y-1.5 text-[10px]">
          <div className="rounded border border-black/15 px-2 py-1.5 text-black/40">MAC address</div>
          <div className="rounded border border-black/15 px-2 py-1.5 text-black/40">Device key</div>
          <div className="rounded bg-[#0a84ff] text-white text-center py-1.5 font-bold">Continuar</div>
        </div>
      </div>
    </div>
  );
}

export const smarttvScreens: VisualStep[] = [
  { frame: 'tv', render: () => <IboMacKey /> },
  { frame: 'laptop', render: () => <IboWebsite /> },
  { frame: 'laptop', render: (ctx) => <XtreamForm {...ctx} title="Adicionar lista (Xtream)" /> },
  { frame: 'tv', render: () => <ChannelsGrid cols={5} label="Abra o IBO Player na TV" /> },
];

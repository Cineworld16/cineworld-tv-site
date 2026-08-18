import type { VisualStep } from './index';
import { ChannelsGrid, XtreamForm } from './parts';

// Passo 1 — Play Store
function PlayStore() {
  return (
    <div className="h-full bg-white text-black flex flex-col">
      <div className="px-3 pt-9 pb-2 text-[13px] font-bold text-[#0a84ff]">Google Play</div>
      <div className="px-3 py-3 flex items-center gap-2.5 border-t border-black/5">
        <div className="h-14 w-14 rounded-[14px] brand-bg flex items-center justify-center text-white text-xl">
          ▶
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold leading-tight truncate">IPTV Smarters Pro</div>
          <div className="text-[10px] text-black/50">WhiteCode · 4,3 ★</div>
        </div>
        <div className="rounded-full bg-[#00875f] text-white text-[11px] font-bold px-4 py-1">INSTALAR</div>
      </div>
      <div className="px-3 pt-1 flex gap-2">
        <div className="h-24 flex-1 rounded-lg bg-black/5" />
        <div className="h-24 flex-1 rounded-lg bg-black/5" />
      </div>
    </div>
  );
}

// Passo 2 — login
function SmartersLogin() {
  return (
    <div className="h-full bg-[#0b0b12] text-white flex flex-col">
      <div className="px-4 pt-9 pb-5 text-center">
        <div className="text-base font-extrabold brand-gradient">IPTV Smarters</div>
      </div>
      <div className="flex-1 px-3 space-y-2.5">
        <div className="rounded-xl border border-brandPink/60 bg-brandPink/15 px-3 py-3 text-[12px] font-semibold flex items-center gap-2">
          <span>🔑</span>
          <span>Login com Xtream Codes</span>
          <span className="ml-auto text-brandPink">←</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-[12px] text-white/60">
          Login com lista M3U
        </div>
      </div>
    </div>
  );
}

export const androidScreens: VisualStep[] = [
  { frame: 'phone', render: () => <PlayStore /> },
  { frame: 'phone', render: () => <SmartersLogin /> },
  { frame: 'phone', render: (ctx) => <XtreamForm {...ctx} title="IPTV Smarters — Xtream" /> },
  { frame: 'phone', render: () => <ChannelsGrid cols={3} /> },
];

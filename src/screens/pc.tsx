import type { ScreenCtx, VisualStep } from './index';
import { ChannelsGrid, XtreamForm } from './parts';

// Passo 1 — navegador no endereço de acesso
function BrowserAddress({ url }: { url: string }) {
  return (
    <div className="h-full bg-white text-black flex flex-col">
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-black/5 text-[9px] text-black/50">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 rounded bg-white px-2 py-0.5 truncate font-mono">{url}</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-[#0b0b12] text-white">
        <div className="text-lg font-extrabold brand-gradient">CineRush TV</div>
        <div className="text-[10px] text-white/50">Player web · entre com seu acesso</div>
      </div>
    </div>
  );
}

export const pcScreens: VisualStep[] = [
  { frame: 'laptop', render: (ctx: ScreenCtx) => <BrowserAddress url={ctx.url} /> },
  { frame: 'laptop', render: (ctx) => <XtreamForm {...ctx} title="Login no player" /> },
  { frame: 'laptop', render: () => <ChannelsGrid cols={5} label="Pronto! Escolha o que assistir 🍿" /> },
];

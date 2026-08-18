import type { ReactNode } from 'react';

export type FrameVariant = 'phone' | 'tv' | 'laptop' | 'phone-landscape' | 'iphone-landscape';

interface Props {
  variant?: FrameVariant;
  children: ReactNode;
}

/** Reflexo de vidro por cima da tela — dá o aspecto "aparelho real". */
function Gloss() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background:
          'linear-gradient(125deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 38%)',
      }}
    />
  );
}

/** Moldura realista do aparelho (frente), com o app dentro + glow ambiente. */
export default function DeviceFrame({ variant = 'phone', children }: Props) {
  let frame: ReactNode;

  if (variant === 'tv') {
    frame = (
      <div className="relative w-[330px] max-w-full">
        <div className="rounded-[14px] bg-gradient-to-b from-neutral-700 to-black p-[6px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75)]">
          <div className="relative overflow-hidden rounded-[9px] bg-[#0b0b12] aspect-video">
            {children}
            <Gloss />
          </div>
        </div>
        <div
          className="mx-auto h-4 w-20 bg-gradient-to-b from-neutral-600 to-neutral-900"
          style={{ clipPath: 'polygon(28% 0, 72% 0, 86% 100%, 14% 100%)' }}
        />
        <div className="mx-auto h-1.5 w-36 rounded-full bg-neutral-800" />
      </div>
    );
  } else if (variant === 'phone-landscape') {
    frame = (
      <div className="relative w-[440px] max-w-full">
        {/* trilho metálico */}
        <div
          className="rounded-[1.7rem] p-[2px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.8),0_14px_36px_-14px_rgba(168,85,247,0.35)]"
          style={{
            background: 'linear-gradient(150deg,#ececef,#9a9aa2 22%,#48484c 50%,#9a9aa2 78%,#ececef)',
          }}
        >
          <div className="rounded-[1.6rem] bg-black p-[7px]">
            <div className="relative overflow-hidden rounded-[1.15rem] bg-black aspect-video">
              {children}
              {/* câmera na lateral esquerda (celular deitado) */}
              <div className="absolute left-[8px] top-1/2 z-30 flex h-[46px] w-[8px] -translate-y-1/2 items-center justify-center rounded-full bg-black">
                <span className="h-[5px] w-[5px] rounded-full bg-[#14141b] ring-1 ring-white/10" />
              </div>
              <Gloss />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variant === 'iphone-landscape') {
    // iPhone deitado (tela 19.5:9) — usado nos prints reais do iOS
    frame = (
      <div className="relative w-[480px] max-w-full">
        <div
          className="rounded-[1.8rem] p-[2px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.8),0_14px_36px_-14px_rgba(168,85,247,0.35)]"
          style={{
            background: 'linear-gradient(150deg,#ececef,#9a9aa2 22%,#48484c 50%,#9a9aa2 78%,#ececef)',
          }}
        >
          <div className="rounded-[1.7rem] bg-black p-[7px]">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-black aspect-[128/59]">
              {children}
              {/* dynamic island na lateral esquerda (celular deitado) */}
              <div className="absolute left-[8px] top-1/2 z-30 flex h-[54px] w-[9px] -translate-y-1/2 items-center justify-center rounded-full bg-black">
                <span className="h-[5px] w-[5px] rounded-full bg-[#14141b] ring-1 ring-white/10" />
              </div>
              <Gloss />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variant === 'laptop') {
    frame = (
      <div className="relative w-[360px] max-w-full">
        <div className="rounded-t-[14px] rounded-b-[6px] bg-gradient-to-b from-neutral-600 to-neutral-800 p-[7px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75)]">
          <div className="relative overflow-hidden rounded-[6px] bg-[#0b0b12] aspect-video">
            {children}
            <Gloss />
          </div>
        </div>
        {/* base do notebook */}
        <div className="mx-auto h-3 w-[116%] -ml-[8%] rounded-b-2xl bg-gradient-to-b from-neutral-500 to-neutral-800" />
        <div className="mx-auto -mt-3 h-3 w-20 rounded-b-lg bg-neutral-700/80" />
      </div>
    );
  } else {
    frame = (
      <div className="relative w-[248px] max-w-full">
        {/* trilho metálico (borda) */}
        <div
          className="rounded-[3rem] p-[2px] shadow-[0_44px_90px_-22px_rgba(0,0,0,0.8),0_14px_36px_-14px_rgba(168,85,247,0.4)]"
          style={{
            background:
              'linear-gradient(150deg,#ececef,#9a9aa2 22%,#48484c 50%,#9a9aa2 78%,#ececef)',
          }}
        >
          {/* bezel */}
          <div className="rounded-[2.9rem] bg-black p-[9px]">
            {/* tela */}
            <div className="relative overflow-hidden rounded-[2.3rem] bg-[#0b0b12] aspect-[9/19.5]">
              {children}
              {/* dynamic island */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[9px] z-30 flex h-[22px] w-[76px] items-center justify-end rounded-full bg-black pr-2.5">
                <span className="h-[6px] w-[6px] rounded-full bg-[#14141b] ring-1 ring-white/10" />
              </div>
              <Gloss />
            </div>
          </div>
        </div>
        {/* botões laterais */}
        <div className="absolute -left-[3px] top-[96px] h-8 w-[3px] rounded-l bg-neutral-500/70" />
        <div className="absolute -left-[3px] top-[140px] h-12 w-[3px] rounded-l bg-neutral-500/70" />
        <div className="absolute -right-[3px] top-[128px] h-16 w-[3px] rounded-r bg-neutral-500/70" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-fit max-w-full">
      {/* glow ambiente da marca por trás do aparelho (gradiente puro, sem filtro blur) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8"
        style={{
          background:
            'radial-gradient(closest-side, rgba(168,85,247,0.28), rgba(236,72,153,0.12), transparent)',
        }}
      />
      <div className="relative">{frame}</div>
    </div>
  );
}

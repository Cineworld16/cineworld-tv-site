import { ArrowLeft, ChevronRight } from 'lucide-react';
import { DEVICE_BY_ID, TV_CHOICES, type DeviceGuide } from '../content';
import { DEVICE_ICON, DEVICE_ICON_STYLE } from '../deviceIcons';

interface Props {
  onPick: (device: DeviceGuide) => void;
  onBack: () => void;
}

export default function TvChoice({ onPick, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Sua TV</div>
        <h2 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight text-ink">
          Qual é o tipo da sua TV?
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-sub">
          Escolha para ver o passo a passo certo. Na dúvida, use a dica de cada opção.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface divide-y divide-white/[0.06]">
        {TV_CHOICES.map((c, idx) => {
          const st = DEVICE_ICON_STYLE[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(DEVICE_BY_ID[c.id])}
              style={{ animationDelay: `${idx * 45}ms` }}
              className="animate-card-in group flex w-full items-start gap-3.5 px-4 py-4 text-left transition hover:bg-white/[0.025]"
            >
              <span
                className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition duration-200 group-hover:scale-105 ${st.chip}`}
              >
                <span className={st.icon}>{DEVICE_ICON[c.id]({ className: 'h-5 w-5' })}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-ink">{c.label}</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-sub">{c.hint}</span>
              </span>
              <ChevronRight className="mt-2.5 h-4 w-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-sub" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2.5 text-[14px] font-medium text-ink transition hover:bg-white/[0.04] active:scale-[0.98]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Voltar
      </button>
    </div>
  );
}

import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import type { DeviceGuide } from '../content';
import { DEVICE_ICON, DEVICE_ICON_STYLE } from '../deviceIcons';
import { VISUAL_SCREENS } from '../screens';
import { WhatsAppIcon } from './BrandIcons';
import CredentialsCard, { type Creds } from './CredentialsCard';
import DeviceFrame from './DeviceFrame';

interface Props {
  device: DeviceGuide;
  creds: Creds | null;
  accessUrl: string;
  supportUrl: string;
  onBackToHome: () => void;
  onDone: () => void;
}

function renderBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-medium text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Wizard({
  device,
  creds,
  accessUrl,
  supportUrl,
  onBackToHome,
  onDone,
}: Props) {
  const [i, setI] = useState(0);
  const [useAlt, setUseAlt] = useState(false);
  const flow = useAlt && device.alt ? device.alt : null;
  const steps = flow ? flow.steps : device.steps;
  const screenKey = flow ? flow.screenKey : device.id;
  const step = steps[i];
  const isFirst = i === 0;
  const isLast = i === steps.length - 1;
  const iconStyle = DEVICE_ICON_STYLE[device.id];

  const withUrl = (s: string) => s.replaceAll('{{url}}', accessUrl);

  const vsteps = VISUAL_SCREENS[screenKey];
  const vstep = vsteps?.[i];

  const switchFlow = () => {
    setUseAlt((v) => !v);
    setI(0);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [i]);

  const next = () => (isLast ? onDone() : setI((v) => v + 1));
  const back = () => (isFirst ? onBackToHome() : setI((v) => v - 1));

  const ctx = {
    usuario: creds?.usuario ?? 'seu-usuário',
    senha: creds?.senha ?? 'sua-senha',
    url: accessUrl,
    filled: !!creds,
  };

  return (
    <div className="space-y-6">
      {/* meta do passo */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[13px] text-sub">
          <span className={iconStyle.icon}>{DEVICE_ICON[device.id]({ className: 'h-4 w-4' })}</span>
          {device.label}
        </span>
        <span className="font-mono text-[12px] tracking-wide text-faint">
          {pad(i + 1)} <span className="text-white/20">/</span> {pad(steps.length)}
        </span>
      </div>

      {/* progresso */}
      <div className="h-px w-full bg-white/10">
        <div
          className="h-px bg-ink transition-[width] duration-300 ease-out"
          style={{ width: `${((i + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* legenda */}
      <div key={`cap-${i}`} className="animate-fade-up">
        <h2 className="text-[19px] font-semibold tracking-tight text-ink">{step.title}</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-sub whitespace-pre-line">
          {renderBold(withUrl(step.body))}
        </p>
        {vstep && step.link && (
          <a
            href={withUrl(step.link.url)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition hover:opacity-80"
          >
            {step.link.label}
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        )}
      </div>

      {vstep ? (
        <div className="space-y-4">
          <div className="flex justify-center py-3">
            <div key={vstep.frame} className="animate-device">
              <DeviceFrame variant={vstep.frame}>
                <div key={i} className="absolute inset-0 animate-screen-in">
                  {vstep.render(ctx)}
                </div>
                {vstep.hotspot && <Hotspot {...vstep.hotspot} />}
              </DeviceFrame>
            </div>
          </div>
          {step.showCredentials && <CredentialsCard creds={creds} accessUrl={accessUrl} />}
        </div>
      ) : (
        <div className="space-y-4">
          {step.link && (
            <a
              href={withUrl(step.link.url)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:opacity-80"
            >
              {step.link.label}
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          )}
          {step.showCredentials && <CredentialsCard creds={creds} accessUrl={accessUrl} />}
        </div>
      )}

      {/* navegação */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2.5 text-[14px] font-medium text-ink transition hover:bg-white/[0.04] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          {isFirst ? 'Voltar' : 'Anterior'}
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-[14px] font-semibold text-black transition hover:bg-white active:scale-[0.99]"
        >
          {isLast ? (
            <>
              Concluir
              <Check className="h-4 w-4" strokeWidth={2} />
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </>
          )}
        </button>
      </div>

      {device.alt && (
        <button
          type="button"
          onClick={switchFlow}
          className="block w-full text-center text-[13px] text-faint underline underline-offset-4 transition hover:text-sub"
        >
          {flow
            ? `Voltar para o ${device.app}`
            : `O ${device.app} não funcionou? Usar o ${device.alt.app}`}
        </button>
      )}

      <a
        href={supportUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-1.5 text-[13px] text-faint transition hover:text-sub"
      >
        <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
        Travou nesse passo? Falar com o suporte
      </a>
    </div>
  );
}

/** Marcação pulsante (anel + label) sobre o botão que a pessoa deve tocar. */
function Hotspot({ x, y, label }: { x: number; y: number; label?: string }) {
  const labelBelow = y < 38;
  return (
    <div className="pointer-events-none absolute z-30" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="relative block -translate-x-1/2 -translate-y-1/2">
        <span className="relative grid h-7 w-7 place-items-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
          <span className="relative h-5 w-5 rounded-full border-2 border-white bg-white/25 shadow-[0_0_0_4px_rgba(0,0,0,0.45)]" />
        </span>
        {label && (
          <span
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-[3px] text-[10px] font-bold text-black shadow-lg ${
              labelBelow ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
            }`}
          >
            {label}
          </span>
        )}
      </span>
    </div>
  );
}

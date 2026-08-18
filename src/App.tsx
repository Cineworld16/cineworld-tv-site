import { Check } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Background from './components/Background';
import CredentialsCard, { type Creds } from './components/CredentialsCard';
import DeviceGrid from './components/DeviceGrid';
import SupportButton from './components/SupportButton';
import TvActivation from './components/TvActivation';
import TvChoice from './components/TvChoice';
import Wizard from './components/Wizard';
import Wordmark from './components/Wordmark';
import type { DeviceGuide } from './content';
import { DEFAULT_ACCESS_URL, DEFAULT_SUPPORT_URL, fetchOnboard, type OnboardData } from './lib/api';

type Screen =
  | { name: 'home' }
  | { name: 'tv' }
  | { name: 'wizard'; device: DeviceGuide }
  | { name: 'done' };

export default function App() {
  const [data, setData] = useState<OnboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const token = useMemo(() => params.get('t')?.trim() ?? '', [params]);
  const demo = useMemo(() => params.has('demo'), [params]);
  // Override de teste: força a tela nova de TV mesmo antes de liberar pra todos.
  // Com token real (?t=...&tvauto) o Mateus testa o fluxo completo; clientes não veem.
  const tvautoOverride = useMemo(() => params.has('tvauto'), [params]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      if (token) {
        const d = await fetchOnboard(token);
        if (alive && d) setData(d);
      } else if (demo) {
        setData({
          status: 'ready',
          nome: 'Cliente Demo',
          usuario: '4550040',
          senha: '3769521',
          access_url: DEFAULT_ACCESS_URL,
          support_url: DEFAULT_SUPPORT_URL,
          tvAuto: params.has('tvauto'), // ?demo&tvauto → ver a tela nova sem backend
        });
      }
      if (alive) setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [token, demo]);

  const accessUrl = data?.access_url ?? DEFAULT_ACCESS_URL;
  const supportUrl = data?.support_url ?? DEFAULT_SUPPORT_URL;
  const creds: Creds | null =
    data?.status === 'ready' && data.usuario && data.senha
      ? { usuario: data.usuario, senha: data.senha }
      : null;
  const firstName = data?.nome ? data.nome.split(/\s+/)[0] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Background />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
          <Wordmark />
          <SupportButton url={supportUrl} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-9">
        {loading ? (
          <LoadingState />
        ) : screen.name === 'home' ? (
          <div key="home" className="animate-fade-up">
            <Home
              creds={creds}
              pending={data?.status === 'pending'}
              accessUrl={accessUrl}
              firstName={firstName}
              onPickDevice={(device) => setScreen({ name: 'wizard', device })}
              onPickTv={() => setScreen({ name: 'tv' })}
            />
          </div>
        ) : screen.name === 'tv' ? (
          <div key="tv" className="animate-fade-up">
            {(data?.tvAuto || tvautoOverride) && (token || demo) ? (
              // Fluxo novo: o cliente digita o código da TV e a gente ativa. Ele nunca
              // vê usuário/senha. Precisa de token pra valer — `demo` só serve pra
              // conferir o visual da tela (?demo&tvauto), sem ativar nada de verdade.
              <TvActivation
                token={token}
                supportUrl={supportUrl}
                onBack={() => setScreen({ name: 'home' })}
                onDone={() => setScreen({ name: 'done' })}
              />
            ) : (
              <TvChoice
                onPick={(device) => setScreen({ name: 'wizard', device })}
                onBack={() => setScreen({ name: 'home' })}
              />
            )}
          </div>
        ) : screen.name === 'wizard' ? (
          <div key="wizard" className="animate-fade-up">
            <Wizard
              device={screen.device}
              creds={creds}
              accessUrl={accessUrl}
              supportUrl={supportUrl}
              onBackToHome={() => setScreen({ name: 'home' })}
              onDone={() => setScreen({ name: 'done' })}
            />
          </div>
        ) : (
          <div key="done" className="animate-fade-up">
            <DoneScreen onRestart={() => setScreen({ name: 'home' })} />
          </div>
        )}
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-5 text-[12px] text-faint">
          <span>© CineRush TV</span>
          <span className="font-mono uppercase tracking-wider">Configuração de acesso</span>
        </div>
      </footer>
    </div>
  );
}

function Home({
  creds,
  pending,
  accessUrl,
  firstName,
  onPickDevice,
  onPickTv,
}: {
  creds: Creds | null;
  pending: boolean;
  accessUrl: string;
  firstName: string | null;
  onPickDevice: (device: DeviceGuide) => void;
  onPickTv: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Configuração de acesso
        </div>
        <h1 className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-ink">
          {firstName ? `Olá, ${firstName}.` : 'Vamos configurar seu acesso.'}
        </h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-sub">
          Escolha seu aparelho e siga o passo a passo. Leva cerca de 2 minutos.
        </p>
      </div>

      <CredentialsCard creds={creds} accessUrl={accessUrl} pending={pending} />

      <div>
        <div className="mb-2.5 text-[12px] uppercase tracking-wider text-faint">
          Onde você vai assistir
        </div>
        <DeviceGrid onPickDevice={onPickDevice} onPickTv={onPickTv} />
      </div>
    </div>
  );
}

function DoneScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-surface">
        <Check className="h-6 w-6 text-accent" strokeWidth={2} />
      </div>
      <h2 className="mt-5 text-[22px] font-semibold tracking-tight text-ink">Tudo pronto</h2>
      <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-sub">
        Seu CineRush TV está configurado. Bom filme.
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center rounded-lg border border-white/10 px-4 py-2.5 text-[14px] font-medium text-ink transition hover:bg-white/[0.04]"
      >
        Configurar em outro aparelho
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-40 rounded bg-white/5" />
        <div className="h-7 w-64 rounded bg-white/5" />
      </div>
      <div className="h-40 rounded-xl border border-white/10 bg-surface" />
      <div className="h-56 rounded-xl border border-white/10 bg-surface" />
    </div>
  );
}

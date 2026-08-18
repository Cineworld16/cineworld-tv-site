import { ArrowLeft, Check, Loader2, RefreshCw, Tv } from 'lucide-react';
import { useState } from 'react';
import { ativarTv, validarCodigoTv } from '../lib/api';

interface Props {
  token: string;
  onBack: () => void;
  onDone: () => void;
  supportUrl: string;
}

type Etapa = 'instalar' | 'codigo' | 'pronto';

/** Onde baixar o app, por tipo de TV. A ativação depois é idêntica pros dois. */
const ONDE_BAIXAR = [
  {
    id: 'loja',
    titulo: 'Samsung ou LG',
    texto: 'Abra a loja de aplicativos da própria TV e procure por **XCloud**.',
  },
  {
    id: 'apk',
    titulo: 'Fire Stick, TV Box ou Android TV',
    texto: 'Instale pelo **Downloader** ou pela Play Store, procurando por **XCloud**.',
  },
];

/** Deixa **negrito** virar <strong>, igual ao resto do site. */
function Texto({ children }: { children: string }) {
  const partes = children.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/** Foto real da TV numa moldura discreta, com legenda. `children` = overlays (destaques). */
function TvFrame({
  src,
  alt,
  legenda,
  children,
}: {
  src: string;
  alt: string;
  legenda: string;
  children?: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-black">
      <div className="relative">
        <img src={src} alt={alt} className="block w-full" loading="lazy" />
        {children}
      </div>
      <figcaption className="border-t border-white/[0.06] px-3 py-2 text-center text-[12px] text-faint">
        {legenda}
      </figcaption>
    </figure>
  );
}

export default function TvActivation({ token, onBack, onDone, supportUrl }: Props) {
  const [etapa, setEtapa] = useState<Etapa>('instalar');
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const codigoLimpo = codigo.trim().toUpperCase();
  const podeEnviar = codigoLimpo.length >= 4 && !carregando;

  async function ativar() {
    setErro(null);
    setCarregando(true);
    try {
      // 1) confere o código antes de tentar ativar — assim o erro mais comum
      //    (digitou errado) vira uma mensagem clara em vez de uma falha genérica.
      const v = await validarCodigoTv(token, codigoLimpo);
      if (!v.ok) {
        setErro(
          v.erro === 'invalido'
            ? 'Não encontramos esse código. Confira na tela da TV — ele costuma ter 6 caracteres.'
            : v.erro === 'rede'
              ? 'Não conseguimos falar com o servidor. Verifique sua internet e tente de novo.'
              : 'Não foi possível verificar agora. Tente de novo em instantes.',
        );
        return;
      }

      // 2) ativa de verdade
      const a = await ativarTv(token, codigoLimpo);
      if (!a.ok) {
        setErro(
          a.erro === 'nao_pronto'
            ? 'Seu acesso ainda está sendo preparado. Aguarde alguns minutos e tente de novo.'
            : 'Não conseguimos ativar agora. Chame o suporte que a gente resolve rapidinho.',
        );
        return;
      }
      setEtapa('pronto');
    } finally {
      setCarregando(false);
    }
  }

  if (etapa === 'pronto') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-surface p-5 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-bg">
            <Check className="h-6 w-6 text-accent" strokeWidth={2} />
          </div>
          <h2 className="mt-4 text-[20px] font-semibold tracking-tight text-ink">
            TV ativada com sucesso
          </h2>
          <p className="mx-auto mt-2 max-w-[19rem] text-[14px] leading-relaxed text-sub">
            Falta só um toque na TV pra tudo aparecer.
          </p>
        </div>

        <div className="rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <div className="text-[14px] leading-relaxed text-sub">
              Na TV, aperte o botão <strong className="font-semibold text-ink">Recarregar</strong> —
              ele fica logo abaixo do botão <strong className="font-semibold text-ink">Iniciar</strong>.
              Os canais aparecem na hora.
            </div>
          </div>
        </div>

        <TvFrame
          src="/apps/tv/pronto.jpg"
          alt="App XCloud aberto na TV com filmes e séries"
          legenda="É assim que sua TV vai ficar"
        />

        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-lg bg-accent px-4 py-3 text-[15px] font-semibold text-bg transition hover:brightness-110 active:scale-[0.99]"
        >
          Pronto, já apareceu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Sua TV</div>
        <h2 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight text-ink">
          {etapa === 'instalar' ? 'Instale o app na TV' : 'Digite o código da TV'}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-sub">
          {etapa === 'instalar'
            ? 'Baixe o XCloud na sua TV. Depois a gente ativa pra você — sem digitar senha nenhuma.'
            : 'Assim que o app abrir, ele mostra um código na tela. É esse que a gente precisa.'}
        </p>
      </div>

      {etapa === 'instalar' ? (
        <>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-surface divide-y divide-white/[0.06]">
            {ONDE_BAIXAR.map((o, idx) => (
              <div
                key={o.id}
                style={{ animationDelay: `${idx * 45}ms` }}
                className="animate-card-in flex items-start gap-3.5 px-4 py-4"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-bg">
                  <Tv className="h-5 w-5 text-sub" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-medium text-ink">{o.titulo}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-sub">
                    <Texto>{o.texto}</Texto>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <TvFrame
            src="/apps/tv/busca.jpg"
            alt="Busca por XCloud na loja da TV"
            legenda="Procure por XCloud — é o app XCloud-TV"
          />

          <button
            type="button"
            onClick={() => setEtapa('codigo')}
            className="w-full rounded-lg bg-accent px-4 py-3 text-[15px] font-semibold text-bg transition hover:brightness-110 active:scale-[0.99]"
          >
            Já instalei, continuar
          </button>
        </>
      ) : (
        <>
          <TvFrame
            src="/apps/tv/codigo.jpg"
            alt="Tela do XCloud mostrando a Chave do dispositivo"
            legenda="Na sua TV, o código fica no canto de baixo"
          >
            {/* destaque sobre o "Chave do dispositivo" no canto inferior esquerdo da foto */}
            <div className="pointer-events-none absolute bottom-[3%] left-[2%] w-[34%] rounded-md border-2 border-accent shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]">
              <div className="aspect-[6/1]" />
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-bg">
                seu código ↓
              </span>
            </div>
          </TvFrame>

          <div className="rounded-xl border border-white/10 bg-surface p-4">
            <label htmlFor="device_key" className="text-[12px] uppercase tracking-wider text-faint">
              Código do aparelho
            </label>
            <input
              id="device_key"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
                setErro(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && podeEnviar) void ativar();
              }}
              placeholder="Ex.: 13HKGA"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              maxLength={12}
              className="mt-2 w-full rounded-lg border border-white/10 bg-bg px-3.5 py-3 text-center font-mono text-[22px] uppercase tracking-[0.25em] text-ink outline-none transition placeholder:tracking-normal placeholder:text-faint focus:border-accent/50"
            />
            <p className="mt-2.5 text-[13px] leading-relaxed text-sub">
              O código aparece na primeira tela do XCloud, como{' '}
              <span className="font-mono text-ink">Device key</span>.
            </p>
          </div>

          {erro && (
            <div className="rounded-lg border border-red-500/25 bg-red-500/[0.07] px-4 py-3 text-[13px] leading-relaxed text-red-200">
              {erro}
            </div>
          )}

          <button
            type="button"
            disabled={!podeEnviar}
            onClick={() => void ativar()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-[15px] font-semibold text-bg transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {carregando && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />}
            {carregando ? 'Ativando...' : 'Ativar minha TV'}
          </button>

          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[13px] text-sub underline decoration-white/20 underline-offset-4 transition hover:text-ink"
          >
            Não achei o código na TV
          </a>
        </>
      )}

      <button
        type="button"
        onClick={() => (etapa === 'codigo' ? setEtapa('instalar') : onBack())}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2.5 text-[14px] font-medium text-ink transition hover:bg-white/[0.04] active:scale-[0.98]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Voltar
      </button>
    </div>
  );
}

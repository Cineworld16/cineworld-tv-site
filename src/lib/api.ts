const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://seu-backend.up.railway.app'
).replace(/\/+$/, '');

export const DEFAULT_ACCESS_URL = import.meta.env.VITE_ACCESS_URL ?? 'http://seu-dns-de-acesso.exemplo';
export const DEFAULT_SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL ?? 'https://wa.me/5599999999999';

export interface OnboardData {
  status: 'ready' | 'pending';
  nome: string | null;
  usuario: string | null;
  senha: string | null;
  access_url: string;
  support_url: string;
  /** true = TV ativa por código (XCloud). false = passo a passo antigo. */
  tvAuto: boolean;
}

/** Resposta de validar/ativar a TV. `erro` traz o código cru pro chamador tratar. */
export interface TvResult {
  ok: boolean;
  jaAtivado?: boolean;
  plataforma?: string | null;
  erro?: 'invalido' | 'nao_pronto' | 'desligado' | 'rede' | 'falhou';
}

/** Confere se o código digitado existe no painel. NÃO gasta ativação. */
export async function validarCodigoTv(token: string, codigo: string): Promise<TvResult> {
  try {
    const res = await fetch(`${API_BASE}/api/onboard/${encodeURIComponent(token)}/tv/validar`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ device_key: codigo }),
    });
    if (res.status === 503) return { ok: false, erro: 'desligado' };
    if (!res.ok) return { ok: false, erro: 'falhou' };
    const j = (await res.json()) as { valido?: boolean; plataforma?: string | null };
    return j.valido
      ? { ok: true, plataforma: j.plataforma ?? null }
      : { ok: false, erro: 'invalido' };
  } catch {
    return { ok: false, erro: 'rede' };
  }
}

/** Ativa a TV de fato. Idempotente no backend — repetir não gasta ativação a mais. */
export async function ativarTv(token: string, codigo: string): Promise<TvResult> {
  try {
    const res = await fetch(`${API_BASE}/api/onboard/${encodeURIComponent(token)}/tv/ativar`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ device_key: codigo }),
    });
    if (res.status === 503) return { ok: false, erro: 'desligado' };
    if (res.status === 409) return { ok: false, erro: 'nao_pronto' };
    if (!res.ok) return { ok: false, erro: 'falhou' };
    const j = (await res.json()) as { ok?: boolean; ja_ativado?: boolean };
    return { ok: !!j.ok, jaAtivado: !!j.ja_ativado };
  } catch {
    return { ok: false, erro: 'rede' };
  }
}

/**
 * Busca os dados do assinante pelo token do link (?t=). Retorna null em
 * qualquer falha (token inválido, rede, backend fora) → o site cai no modo
 * genérico (mostra o passo a passo sem pré-preencher credenciais).
 */
export async function fetchOnboard(token: string): Promise<OnboardData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/onboard/${encodeURIComponent(token)}`, {
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<OnboardData> & { tv_auto?: boolean };
    if (data?.status !== 'ready' && data?.status !== 'pending') return null;
    return {
      status: data.status,
      nome: data.nome ?? null,
      usuario: data.usuario ?? null,
      senha: data.senha ?? null,
      access_url: data.access_url ?? DEFAULT_ACCESS_URL,
      support_url: data.support_url ?? DEFAULT_SUPPORT_URL,
      tvAuto: data.tv_auto === true,
    };
  } catch {
    return null;
  }
}

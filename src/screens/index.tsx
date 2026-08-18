import type { ReactNode } from 'react';
import type { FrameVariant } from '../components/DeviceFrame';
import { androidtvScreens } from './androidtv';
import { iosScreens, iosSmartersScreens } from './ios';
import { pcScreens } from './pc';
import { smarttvScreens } from './smarttv';
import { xciptvScreens } from './xciptv';

export interface ScreenCtx {
  usuario: string;
  senha: string;
  url: string;
  /** true quando temos as credenciais reais (link com token) */
  filled: boolean;
}

export type ScreenRenderer = (ctx: ScreenCtx) => ReactNode;

/** Marcação de onde tocar pra prosseguir (coordenadas em % da tela). */
export interface Hotspot {
  x: number;
  y: number;
  label?: string;
}

/** Cada passo visual define a moldura (celular/TV/notebook) + a tela do app. */
export interface VisualStep {
  frame: FrameVariant;
  render: ScreenRenderer;
  hotspot?: Hotspot;
}

/**
 * Telas por chave de fluxo. Normalmente = id do aparelho, mas um aparelho pode
 * ter um app reserva (ex.: `ios_smarters`). Sem entrada = modo texto.
 */
export const VISUAL_SCREENS: Record<string, VisualStep[]> = {
  ios: iosScreens,
  ios_smarters: iosSmartersScreens,
  android: xciptvScreens,
  androidtv: androidtvScreens,
  smarttv: smarttvScreens,
  pc: pcScreens,
};

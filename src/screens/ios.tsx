import { ImageScreen } from './ImageScreen';
import type { VisualStep } from './index';

/**
 * iPhone — prints REAIS. O app roda deitado (landscape 19.5:9), menos a App Store
 * (retrato). `hotspot` marca onde tocar pra prosseguir (anel pulsante + label).
 */

// VU IPTV Player — fluxo principal
export const iosScreens: VisualStep[] = [
  {
    frame: 'phone',
    render: () => <ImageScreen src="/apps/ios/vu-store.jpg" alt="VU IPTV Player na App Store" />,
    hotspot: { x: 44, y: 26, label: 'Toque em Abrir' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/vu-lang.jpg" alt="Escolher idioma e aceitar os termos" />,
    hotspot: { x: 50, y: 86, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/vu-menu.jpg" alt="Opções de login do VU IPTV Player" />,
    hotspot: { x: 72, y: 63, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/vu-login.jpg" alt="Formulário de login Xtream do VU" />,
    hotspot: { x: 72, y: 83, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/vu-home.jpg" alt="Tela inicial do VU IPTV Player" />,
  },
];

// Smarters Player Lite — fluxo reserva (caso o VU não funcione)
export const iosSmartersScreens: VisualStep[] = [
  {
    frame: 'phone',
    render: () => <ImageScreen src="/apps/ios/sm-store.jpg" alt="Smarters Player Lite na App Store" />,
    hotspot: { x: 44, y: 24, label: 'Toque em Abrir' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/sm-list.jpg" alt="Adicionar playlist no Smarters" />,
    hotspot: { x: 52, y: 52, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/sm-type.jpg" alt="Escolher Xtream Code no Smarters" />,
    hotspot: { x: 51, y: 40, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/sm-login.jpg" alt="Formulário de login do Smarters" />,
    hotspot: { x: 75, y: 81, label: 'Toque aqui' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/sm-parental.jpg" alt="Controle parental do Smarters" />,
    hotspot: { x: 38, y: 70, label: 'Toque em Pular' },
  },
  {
    frame: 'iphone-landscape',
    render: () => <ImageScreen src="/apps/ios/sm-home.jpg" alt="Tela inicial do Smarters Player" />,
  },
];

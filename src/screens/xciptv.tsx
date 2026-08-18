import { ImageScreen } from './ImageScreen';
import type { VisualStep } from './index';

/**
 * Telas reais do XCIPTV Player, capturadas no BlueStacks com a linha de teste
 * (2026-07-24). O app substituiu o Havok TV no fluxo de Celular Android.
 * Login é Xtream Codes: URL do servidor + usuário + senha (os 3 no topo da página).
 */
export const xciptvScreens: VisualStep[] = [
  // 1) instalar da Play Store (foto retrato)
  {
    frame: 'phone',
    render: () => (
      <ImageScreen src="/apps/xciptv/instalar.jpg" alt="XCIPTV Player na Play Store" />
    ),
  },
  // 2) login preenchido — URL, usuário e senha (foto landscape, é como o app força a tela)
  {
    frame: 'phone-landscape',
    render: () => (
      <ImageScreen
        src="/apps/xciptv/login.jpg"
        alt="Login do XCIPTV com URL do servidor, usuário e senha"
      />
    ),
  },
  // 3) pronto — catálogo carregado (foto landscape)
  {
    frame: 'phone-landscape',
    render: () => (
      <ImageScreen src="/apps/xciptv/catalogo.jpg" alt="Catálogo do XCIPTV com filmes e séries" />
    ),
  },
];

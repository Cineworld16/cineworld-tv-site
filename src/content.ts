/**
 * Passo a passo de configuração por aparelho.
 * Baseado no roteiro real do suporte CineRush TV.
 *
 * - `**negrito**` é renderizado em destaque.
 * - `{{url}}` vira a URL de acesso (access_url) em runtime.
 * - `showCredentials` insere o card com usuário/senha/URL naquele passo.
 */

export type DeviceId = 'ios' | 'androidtv' | 'smarttv' | 'android' | 'pc';

export interface Step {
  title: string;
  body: string;
  link?: { label: string; url: string };
  showCredentials?: boolean;
}

/** Fluxo alternativo (outro app) — usado quando o app principal não funciona. */
export interface AppFlow {
  app: string;
  screenKey: string;
  steps: Step[];
}

export interface DeviceGuide {
  id: DeviceId;
  label: string;
  sublabel: string;
  /** Nome do app do fluxo principal (quando o aparelho tem app reserva). */
  app?: string;
  steps: Step[];
  /** Fluxo reserva (outro app) — mostrado via link "não funcionou?". */
  alt?: AppFlow;
}

const carregando: Step = {
  title: 'Aguarde carregar',
  body: 'Salve e aguarde alguns segundos enquanto os canais carregam. Na primeira vez pode demorar um pouco — quando a lista aparecer, está pronto.',
};

export const DEVICES: DeviceGuide[] = [
  {
    id: 'ios',
    label: 'iPhone / iPad',
    sublabel: 'VU IPTV Player',
    app: 'VU IPTV Player',
    steps: [
      {
        title: 'Baixe e abra o app',
        body: 'Na **App Store**, baixe o **VU IPTV Player** e toque em **Abrir**.\nNão funcionou no seu aparelho? Troque pelo **Smarters Player Lite** no link lá embaixo.',
        link: { label: 'Abrir na App Store', url: 'https://apps.apple.com/app/id1628995509' },
      },
      {
        title: 'Escolha português e aceite',
        body: 'Toque no idioma e escolha **Português**, marque a **caixinha** dos termos e toque em **Get Started**.',
      },
      {
        title: 'Entre com Xtream Codes',
        body: 'Na tela de opções, toque em **Login with Xtream Codes API** — é a opção de entrar com usuário e senha.',
      },
      {
        title: 'Preencha seus dados',
        body: 'No campo **Nome**, escreva CineRush. Depois preencha o **usuário**, a **senha** e a **URL** (o endereço "Servidor", aqui embaixo) e toque em **Add User**.',
        showCredentials: true,
      },
      {
        title: 'Pronto!',
        body: 'Seu CineRush TV está configurado. Toque em **TV ao Vivo**, **Filmes** ou **Séries** e bom filme!',
      },
    ],
    alt: {
      app: 'Smarters Player Lite',
      screenKey: 'ios_smarters',
      steps: [
        {
          title: 'Baixe e abra o app',
          body: 'Na **App Store**, procure por **Smarters Player Lite** e toque em **Abrir**.',
        },
        {
          title: 'Adicione uma playlist',
          body: 'Toque em **Add Playlist** (o botão com o **+**).',
        },
        {
          title: 'Escolha Xtream Code',
          body: 'Na lista de tipos, toque em **XTREAM CODE** — é a opção de entrar com usuário e senha.',
        },
        {
          title: 'Preencha seus dados',
          body: 'Em **seu nome**, escreva CineRush. Depois preencha o **usuário**, a **senha** e a **URL** (o endereço "Servidor", aqui embaixo) e toque em **ADD PLAYLIST**.',
          showCredentials: true,
        },
        {
          title: 'Pule o controle parental',
          body: 'Se aparecer a tela de **Controle Parental**, é só tocar em **Pular** — você não precisa criar PIN.',
        },
        {
          title: 'Pronto!',
          body: 'Seu CineRush TV está configurado. Toque em **LIVE**, **MOVIES** ou **SERIES** e bom filme!',
        },
      ],
    },
  },
  {
    id: 'androidtv',
    label: 'TV Android / Fire Stick',
    sublabel: 'Downloader + 9Xtream',
    steps: [
      {
        title: 'Instale o Downloader',
        body: 'Na sua TV, abra a loja de apps (Play Store ou Amazon Appstore) e instale o app **Downloader**.',
      },
      {
        title: 'Baixe o 9Xtream',
        body: 'Abra o Downloader e digite o código **8621576** na busca. Baixe e instale o app **9Xtream**.',
      },
      {
        title: 'Adicione um usuário',
        body: 'Abra o 9Xtream e escolha **adicionar usuário** — a opção **Xtream Codes** é entrar com usuário e senha.',
      },
      {
        title: 'Preencha seus dados',
        body: 'No campo **Nome**, use CineRush. Depois preencha o **usuário**, a **senha** e a **URL** (a URL é o endereço "Servidor" do seu acesso).',
        showCredentials: true,
      },
      carregando,
    ],
  },
  {
    id: 'smarttv',
    label: 'TV Smart (Samsung / LG)',
    sublabel: 'IBO Player Pro',
    steps: [
      {
        title: 'Instale o IBO Player Pro',
        body: 'Na loja de apps da sua TV Samsung ou LG, instale o **IBO Player Pro**. Ele mostra um **MAC** e uma **Key** na tela — são dois códigos; anote os dois.',
      },
      {
        title: 'Ative pelo navegador',
        body: 'No celular ou computador, acesse **iboplayer.com/device** e digite o **MAC** e a **Key** (os dois códigos que a TV mostrou).',
        link: { label: 'Abrir iboplayer.com/device', url: 'https://iboplayer.com/device' },
      },
      {
        title: 'Adicione sua lista',
        body: 'Adicione uma lista do tipo **Xtream Codes** (entrar com usuário e senha) com o **usuário**, a **senha** e a **URL** (o endereço "Servidor" do seu acesso).',
        showCredentials: true,
      },
      {
        title: 'Abra na TV',
        body: 'Volte ao IBO Player na TV e aguarde alguns segundos enquanto os canais carregam.',
      },
    ],
  },
  {
    id: 'android',
    label: 'Celular Android',
    sublabel: 'XCIPTV Player',
    steps: [
      {
        title: 'Baixe o XCIPTV',
        body: 'Na **Play Store** do seu Android, procure por **XCIPTV Player** e instale (é o app azul da OTTRUN). Toque no botão abaixo para abrir direto na loja.',
        link: {
          label: 'Abrir na Play Store',
          url: 'https://play.google.com/store/apps/details?id=com.nathnetwork.xciptv',
        },
      },
      {
        title: 'Faça login',
        body: 'Abra o XCIPTV e preencha os 3 campos com os dados que estão aqui embaixo:\n• **URL** → o endereço do **Servidor**\n• **Nome de usuário**\n• **Senha**\nDepois toque em **ENTRAR**.',
        showCredentials: true,
      },
      {
        title: 'Pronto!',
        body: 'Aguarde o app carregar a lista (aparece "Please wait…"). Quando abrir, você tem **filmes, séries e canais ao vivo** na palma da mão. Bom filme!',
      },
    ],
  },
  {
    id: 'pc',
    label: 'Notebook / PC',
    sublabel: 'Navegador',
    steps: [
      {
        title: 'Abra no navegador',
        body: 'No computador, abra o navegador (Chrome, Edge…) e acesse o endereço do seu acesso.',
        link: { label: 'Abrir o player', url: '{{url}}' },
      },
      {
        title: 'Entre com seu acesso',
        body: 'Faça login com o usuário e a senha do seu acesso.',
        showCredentials: true,
      },
      {
        title: 'Pronto',
        body: 'É só escolher o que assistir. Para usar em um app como o **VLC**, use a mesma **URL** (o endereço "Servidor" do seu acesso).',
      },
    ],
  },
];

export const DEVICE_BY_ID = Object.fromEntries(DEVICES.map((d) => [d.id, d])) as Record<
  DeviceId,
  DeviceGuide
>;

/** Tiles da home. As duas TVs viram um tile único "TV" que abre um seletor. */
export type HomeTile = { kind: 'device'; device: DeviceGuide } | { kind: 'tv' };

// Notebook/PC está oculto: o guia segue definido em DEVICES, mas fora desta lista
// ele não é alcançável (não há deep link por aparelho — a URL só aceita ?t= e ?demo).
// Pra voltar a exibir, basta readicionar a linha do DEVICE_BY_ID.pc aqui.
export const HOME_TILES: HomeTile[] = [
  { kind: 'device', device: DEVICE_BY_ID.ios },
  { kind: 'device', device: DEVICE_BY_ID.android },
  { kind: 'tv' },
];

/** Opções ao clicar em "TV" — decide entre TV Android e TV Smart. */
export interface TvOption {
  id: Extract<DeviceId, 'androidtv' | 'smarttv'>;
  label: string;
  hint: string;
}

export const TV_CHOICES: TvOption[] = [
  {
    id: 'androidtv',
    label: 'TV Android / Fire Stick',
    hint: 'Tem loja de apps própria (Play Store). Ex.: Fire Stick, Google TV, Mi Box, TV Box.',
  },
  {
    id: 'smarttv',
    label: 'TV Smart (Samsung / LG)',
    hint: 'Sistema da própria fabricante, sem Play Store. Samsung (Tizen) ou LG (webOS).',
  },
];

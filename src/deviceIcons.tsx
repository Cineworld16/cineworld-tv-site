import { Laptop, Tv, type LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';
import { AndroidIcon, AppleIcon, TvBrandIcon } from './components/BrandIcons';
import type { DeviceId } from './content';

type IconProps = { className?: string };

/** Chaves de ícone: aparelhos reais + o grupo "tv" da home. */
export type IconKey = DeviceId | 'tv';

/** Ícone por aparelho — logo de marca onde faz sentido (Apple, Android). */
export const DEVICE_ICON: Record<IconKey, (p: IconProps) => ReactNode> = {
  ios: (p) => <AppleIcon {...p} />,
  androidtv: (p) => <AndroidIcon {...p} />,
  smarttv: (p) => <Tv {...(p as LucideProps)} strokeWidth={1.75} />,
  android: (p) => <AndroidIcon {...p} />,
  pc: (p) => <Laptop {...(p as LucideProps)} strokeWidth={1.75} />,
  tv: (p) => <TvBrandIcon {...p} />,
};

/** Cor da marca + tint do chip por aparelho (dá vida, mantendo sóbrio). */
export const DEVICE_ICON_STYLE: Record<IconKey, { icon: string; chip: string }> = {
  ios: { icon: 'text-zinc-100', chip: 'bg-white/[0.06] border-white/12' },
  androidtv: { icon: 'text-[#3ddc84]', chip: 'bg-[#3ddc84]/10 border-[#3ddc84]/25' },
  smarttv: { icon: 'text-[#60a5fa]', chip: 'bg-[#60a5fa]/10 border-[#60a5fa]/25' },
  android: { icon: 'text-[#3ddc84]', chip: 'bg-[#3ddc84]/10 border-[#3ddc84]/25' },
  pc: { icon: 'text-[#a78bfa]', chip: 'bg-[#a78bfa]/10 border-[#a78bfa]/25' },
  // TV genérica = cor da marca (roxo → rosa da landing)
  tv: {
    icon: '',
    chip: 'bg-gradient-to-br from-brandPurple/20 to-brandPink/20 border-brandPink/30',
  },
};

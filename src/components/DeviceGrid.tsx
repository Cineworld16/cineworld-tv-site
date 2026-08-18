import { ChevronRight } from 'lucide-react';
import { HOME_TILES, type DeviceGuide } from '../content';
import { DEVICE_ICON, DEVICE_ICON_STYLE } from '../deviceIcons';

interface Props {
  onPickDevice: (device: DeviceGuide) => void;
  onPickTv: () => void;
}

export default function DeviceGrid({ onPickDevice, onPickTv }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface divide-y divide-white/[0.06]">
      {HOME_TILES.map((tile, idx) => {
        const key = tile.kind === 'tv' ? 'tv' : tile.device.id;
        const label = tile.kind === 'tv' ? 'TV' : tile.device.label;
        const st = DEVICE_ICON_STYLE[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => (tile.kind === 'tv' ? onPickTv() : onPickDevice(tile.device))}
            style={{ animationDelay: `${idx * 45}ms` }}
            className="animate-card-in group flex w-full items-center gap-3.5 px-4 py-4 text-left transition hover:bg-white/[0.025]"
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition duration-200 group-hover:scale-105 ${st.chip}`}
            >
              <span className={st.icon}>{DEVICE_ICON[key]({ className: 'h-5 w-5' })}</span>
            </span>
            <span className="min-w-0 flex-1 text-[15px] font-medium text-ink">{label}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-sub" />
          </button>
        );
      })}
    </div>
  );
}

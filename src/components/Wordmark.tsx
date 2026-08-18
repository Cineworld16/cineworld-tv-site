import { Play } from 'lucide-react';

export default function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span className="grid place-items-center h-6 w-6 rounded-md bg-gradient-to-br from-brandPurple to-brandPink ring-1 ring-inset ring-white/15 shadow-[0_2px_10px_-3px_rgba(236,72,153,0.5)]">
        <Play className="h-3 w-3 text-white" fill="currentColor" strokeWidth={0} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        CineWorld
      </span>
    </span>
  );
}

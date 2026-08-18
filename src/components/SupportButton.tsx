import { WhatsAppIcon } from './BrandIcons';

/** Botão de suporte no header — verde WhatsApp, logo + texto explícito. */
export default function SupportButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(37,211,102,0.55)] transition hover:bg-[#20bd5a] active:scale-[0.98]"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Suporte
    </a>
  );
}

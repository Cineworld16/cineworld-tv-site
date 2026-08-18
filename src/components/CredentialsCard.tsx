import CopyField from './CopyField';

export interface Creds {
  usuario: string;
  senha: string;
}

interface Props {
  creds: Creds | null;
  accessUrl: string;
  pending?: boolean;
}

export default function CredentialsCard({ creds, accessUrl, pending }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">Seu acesso</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-faint">CineWorld</span>
      </div>
      <div className="divide-y divide-white/[0.06] px-4">
        {creds ? (
          <>
            <CopyField label="Usuário" value={creds.usuario} />
            <CopyField label="Senha" value={creds.senha} />
          </>
        ) : (
          <div className="py-3.5 text-[13px] leading-relaxed text-sub">
            {pending
              ? 'Seu acesso está sendo gerado. Assim que ficar pronto, enviamos por email — volte aqui em instantes.'
              : 'Use o usuário e a senha que enviamos no seu email.'}
          </div>
        )}
        <CopyField label="Servidor" value={accessUrl} />
      </div>
    </div>
  );
}

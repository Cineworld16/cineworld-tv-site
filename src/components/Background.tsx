/**
 * Glow ambiente sutil via gradiente PURO (sem filtro blur).
 * Evita o bug do Safari iOS que renderiza a tela toda preta com blur grande.
 */
export default function Background() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          'radial-gradient(55% 45% at 50% -5%, rgba(124,108,255,0.12), rgba(124,108,255,0) 70%),' +
          'radial-gradient(45% 40% at 100% 105%, rgba(236,72,153,0.10), rgba(236,72,153,0) 70%)',
      }}
    />
  );
}

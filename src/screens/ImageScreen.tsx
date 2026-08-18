/**
 * Tela real capturada do app (imagem preenchendo a moldura).
 * `zoom` amplia e centraliza um ponto da imagem (ex.: um formulário pequeno).
 */
export function ImageScreen({
  src,
  alt,
  zoom,
  origin = 'center',
}: {
  src: string;
  alt: string;
  zoom?: number;
  origin?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover"
      style={zoom ? { transform: `scale(${zoom})`, transformOrigin: origin } : undefined}
    />
  );
}

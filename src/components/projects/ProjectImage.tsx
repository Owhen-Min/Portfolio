import { ImageIcon } from "lucide-react";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}

export default function ProjectImage({
  src,
  alt,
  className = "",
  label = "이미지를 추가해 주세요",
}: ProjectImageProps) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 via-white to-blue-100 text-slate-400 ${className}`}
      role="img"
      aria-label={alt}
    >
      <ImageIcon aria-hidden="true" className="size-8" strokeWidth={1.4} />
      <span className="text-xs font-medium tracking-wide">{label}</span>
    </div>
  );
}

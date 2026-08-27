import {
  Atom,
  Braces,
  Code2,
  Database,
  FileJson,
  Server,
  Wind,
  type LucideIcon,
} from "lucide-react";

import type { ProjectTech } from "../../types/project";

const techIcons: Record<string, LucideIcon> = {
  api: Server,
  css: Braces,
  database: Database,
  javascript: FileJson,
  nextjs: Code2,
  python: Code2,
  react: Atom,
  tailwind: Wind,
  typescript: Braces,
};

interface TechBadgeProps {
  tech: ProjectTech;
  compact?: boolean;
}

export default function TechBadge({ tech, compact = false }: TechBadgeProps) {
  const Icon = techIcons[tech.icon.toLowerCase()] ?? Code2;

  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white text-slate-700 ${
        compact ? "gap-1 px-2 py-1 text-xs" : "gap-1.5 px-3 py-1.5 text-sm"
      }`}
    >
      <Icon aria-hidden="true" className={compact ? "size-3.5" : "size-4"} strokeWidth={1.8} />
      {tech.name}
    </span>
  );
}

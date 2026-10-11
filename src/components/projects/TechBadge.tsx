import {
  ArrowLeftRight,
  Atom,
  Braces,
  ChartColumn,
  Code2,
  Database,
  FileJson,
  Leaf,
  PawPrint,
  RadioTower,
  RefreshCw,
  Server,
  Smartphone,
  Wind,
  type LucideIcon,
} from "lucide-react";

import type { ProjectTech } from "../../types/project";

const techIcons: Record<string, LucideIcon> = {
  api: Server,
  chartjs: ChartColumn,
  css: Braces,
  database: Database,
  javascript: FileJson,
  nativewind: Wind,
  nextjs: Code2,
  python: Code2,
  react: Atom,
  reactnative: Smartphone,
  reactquery: RefreshCw,
  serversentevent: RadioTower,
  springboot: Leaf,
  tailwind: Wind,
  typescript: Braces,
  websocket: ArrowLeftRight,
  zustand: PawPrint,
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

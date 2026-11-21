import React from "react";
import {
  BarChart3,
  Blocks,
  Bot,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  Glasses,
  Globe,
  Image as ImageIcon,
  Layers,
  MessageSquareCode,
  Network,
  Palette,
  ScanEye,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "programming-fundamentals": Terminal,
  "web-development": Globe,
  "software-engineering": Layers,
  "app-development": Smartphone,
  "ai-ml": Bot,
  "data-science": BarChart3,
  "cyber-security": ShieldCheck,
  "cloud-computing": Cloud,
  "devops": Server,
  "database-engineering": Database,
  "computer-networking": Network,
  "game-development": Gamepad2,
  "embedded-systems": Cpu,
  "robotics": Cpu,
  "blockchain-web3": Blocks,
  "ui-ux-design": Palette,
  "computer-graphics": ImageIcon,
  "ar-vr": Glasses,
  "natural-language-processing": MessageSquareCode,
  "computer-vision": ScanEye,
  "system-administration": Server,
  "qa-testing": CheckCircle2,
  "competitive-programming": Trophy,
  "tech-career-freelancing": Briefcase,
};

type Props = {
  slug: string;
  className?: string;
  size?: number;
  fallbackIcon?: string;
};

export default function SectorIcon({
  slug,
  className = "h-5 w-5",
  size,
  fallbackIcon,
}: Props) {
  const IconComponent = ICON_MAP[slug];

  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  if (fallbackIcon) {
    return <span className="inline-block leading-none">{fallbackIcon}</span>;
  }

  return <Code2 className={className} size={size} />;
}

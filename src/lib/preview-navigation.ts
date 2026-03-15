import {
  Activity,
  BarChart3,
  BookOpenText,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  ListTodo,
  Radar,
  ShieldCheck,
} from "lucide-react";

export type PreviewVariant = "base" | "a" | "b" | "c";

type PreviewNavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navDefinitions = {
  primary: [
    { slug: "", label: "Dashboard", icon: LayoutDashboard },
    { slug: "tasks", label: "Tasks", icon: ListTodo },
    { slug: "projects", label: "Projects", icon: FolderKanban },
    { slug: "pipeline", label: "Pipeline", icon: Radar },
    { slug: "workflows", label: "Workflows", icon: GitBranch },
  ],
  system: [
    { slug: "activity", label: "Activity", icon: Activity },
    { slug: "metrics", label: "Metrics", icon: BarChart3 },
    { slug: "skill-factory", label: "Skill Factory", icon: ShieldCheck },
    { slug: "knowledge-review", label: "Knowledge Review", icon: BookOpenText },
  ],
} as const;

export function getPreviewVariant(pathname: string): PreviewVariant {
  if (pathname.startsWith("/preview/mission-control/variant-a")) return "a";
  if (pathname.startsWith("/preview/mission-control/variant-b")) return "b";
  if (pathname.startsWith("/preview/mission-control/variant-c")) return "c";
  return "base";
}

export function getPreviewBasePath(variant: PreviewVariant): string {
  switch (variant) {
    case "a":
      return "/preview/mission-control/variant-a";
    case "b":
      return "/preview/mission-control/variant-b";
    case "c":
      return "/preview/mission-control/variant-c";
    default:
      return "/preview/mission-control";
  }
}

export function getPreviewNavigation(variant: PreviewVariant): { primary: PreviewNavItem[]; system: PreviewNavItem[] } {
  const base = getPreviewBasePath(variant);

  const mapSection = (section: typeof navDefinitions.primary | typeof navDefinitions.system) =>
    section.map((item) => ({
      href: item.slug ? `${base}/${item.slug}` : base,
      label: item.label,
      icon: item.icon,
    }));

  return {
    primary: mapSection(navDefinitions.primary),
    system: mapSection(navDefinitions.system),
  };
}

export function getPreviewNavigationItems(variant: PreviewVariant): PreviewNavItem[] {
  const navigation = getPreviewNavigation(variant);
  return [...navigation.primary, ...navigation.system];
}

export const previewNavigation = getPreviewNavigation("base");

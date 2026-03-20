import {
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  ListTodo,
  Radar,
} from "lucide-react";

export type PreviewVariant = "base" | "a" | "b" | "c";

type PreviewNavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navDefinitions = {
  primary: [
    { slug: "", label: "Agency Overview", icon: LayoutDashboard },
    { slug: "tasks", label: "Tasks", icon: ListTodo },
    { slug: "projects", label: "Projects", icon: FolderKanban },
    { slug: "pipeline", label: "Pipeline", icon: Radar },
    { slug: "workflows", label: "Workflow", icon: GitBranch },
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

  const primary = navDefinitions.primary.map((item) => ({
    href: item.slug ? `${base}/${item.slug}` : base,
    label: item.label,
    icon: item.icon,
  }));

  return {
    primary,
    system: [],
  };
}

export function getPreviewNavigationItems(variant: PreviewVariant): PreviewNavItem[] {
  const navigation = getPreviewNavigation(variant);
  return [...navigation.primary];
}

export const previewNavigation = getPreviewNavigation("base");

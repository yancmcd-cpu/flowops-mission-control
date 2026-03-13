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

export const navigation = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/action-queue", label: "Action Queue", icon: ListTodo },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/opportunities", label: "Opportunities", icon: Radar },
  { href: "/workflow-progress", label: "Workflow Progress", icon: GitBranch },
  { href: "/skill-factory-review", label: "Skill Factory Review", icon: ShieldCheck },
  { href: "/knowledge-review", label: "Knowledge Review", icon: BookOpenText },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/metrics", label: "Metrics", icon: BarChart3 },
] as const;

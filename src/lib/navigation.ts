import {
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  ListTodo,
  Radar,
} from "lucide-react";

export const navigation = [
  { href: "/", label: "Agency Overview", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/pipeline", label: "Pipeline", icon: Radar },
  { href: "/workflows", label: "Workflow", icon: GitBranch },
] as const;

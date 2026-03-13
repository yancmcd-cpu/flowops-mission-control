import type { ReactNode } from "react";

type PanelHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PanelHeader({ eyebrow, title, description, action }: PanelHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-5 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          {eyebrow ? <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary">{eyebrow}</p> : null}
          <h2 className="text-lg font-semibold tracking-tight text-primary sm:text-[1.15rem]">{title}</h2>
          {description ? <p className="max-w-2xl text-sm leading-6 text-secondary">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}

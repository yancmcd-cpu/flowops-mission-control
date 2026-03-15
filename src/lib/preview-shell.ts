import type { PreviewVariant } from "@/lib/preview-navigation";

export function getPreviewShellClasses(variant: PreviewVariant) {
  switch (variant) {
    case "a":
      return {
        app:
          "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(122,132,255,0.10),transparent_26%),radial-gradient(circle_at_82%_10%,rgba(65,214,255,0.06),transparent_22%),linear-gradient(180deg,#07090f,#090d14_44%,#06080d)] text-primary",
        frame:
          "flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col rounded-[34px] bg-[linear-gradient(180deg,rgba(9,12,19,0.78),rgba(8,10,16,0.72))] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm",
        gap: "flex min-h-screen gap-3 px-3 py-3 lg:gap-4 lg:px-4 lg:py-4",
      };
    case "b":
      return {
        app:
          "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(112,88,255,0.18),transparent_28%),radial-gradient(circle_at_72%_18%,rgba(90,110,255,0.10),transparent_24%),linear-gradient(180deg,#0a0b1a,#0d1024_42%,#080a14)] text-primary",
        frame:
          "flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col rounded-[36px] bg-[linear-gradient(180deg,rgba(16,17,36,0.78),rgba(10,11,24,0.74))] shadow-[0_28px_96px_rgba(0,0,0,0.34)] backdrop-blur-md",
        gap: "flex min-h-screen gap-3 px-3 py-3 lg:gap-4 lg:px-4 lg:py-4",
      };
    case "c":
      return {
        app:
          "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(122,132,255,0.12),transparent_24%),radial-gradient(circle_at_78%_16%,rgba(65,214,255,0.08),transparent_22%),linear-gradient(180deg,#07090f,#0a0d15_45%,#06080d)] text-primary",
        frame:
          "flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col rounded-[34px] bg-[linear-gradient(180deg,rgba(11,14,21,0.86),rgba(8,10,16,0.8))] shadow-[0_24px_80px_rgba(0,0,0,0.30)] backdrop-blur-sm",
        gap: "flex min-h-screen gap-3 px-3 py-3 lg:gap-4 lg:px-4 lg:py-4",
      };
    default:
      return {
        app:
          "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(122,132,255,0.12),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(65,214,255,0.08),transparent_24%),linear-gradient(180deg,#070a11,#090d15_42%,#06080d)] text-primary",
        frame:
          "flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col rounded-[34px] bg-[linear-gradient(180deg,rgba(9,12,19,0.86),rgba(8,10,16,0.82))] shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm",
        gap: "flex min-h-screen gap-3 px-3 py-3 lg:gap-4 lg:px-4 lg:py-4",
      };
  }
}

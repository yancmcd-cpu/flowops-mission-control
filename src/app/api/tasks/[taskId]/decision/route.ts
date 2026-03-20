import { applySystemTaskDecision } from "@/lib/mission-control-state";
import type { SystemTaskDecision } from "@/lib/types";
import { NextResponse } from "next/server";

const allowedDecisions: SystemTaskDecision[] = ["Proceed", "Defer", "Reassign"];

export async function POST(
  request: Request,
  context: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await context.params;
  const payload = (await request.json().catch(() => ({}))) as { decision?: SystemTaskDecision };

  if (!payload.decision || !allowedDecisions.includes(payload.decision)) {
    return NextResponse.json({ error: "Invalid decision." }, { status: 400 });
  }

  const task = await applySystemTaskDecision(taskId, payload.decision);
  return NextResponse.json({ task });
}

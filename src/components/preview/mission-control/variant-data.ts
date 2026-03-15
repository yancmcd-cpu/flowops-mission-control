import { opportunities, projects, tasks, workflows } from "@/lib/mock-data";

const priorityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };

export const focusTasks = tasks
  .filter((task) => !["Completed", "Archived"].includes(task.status))
  .sort((left, right) => {
    const leftScore = (left.nextAction ? 10 : 0) + priorityRank[left.priority];
    const rightScore = (right.nextAction ? 10 : 0) + priorityRank[right.priority];
    return rightScore - leftScore;
  });

export const leadTask = focusTasks[0];
export const supportingPriority = focusTasks.slice(1, 4);
export const taskPreview = focusTasks.slice(0, 5);

export const workflowState = {
  active: workflows.filter((workflow) => workflow.workflowStatus === "Active").length,
  blocked: workflows.filter((workflow) => workflow.workflowStatus === "Blocked").length,
  queued: workflows.reduce((count, workflow) => count + workflow.nodes.filter((node) => node.status === "Queued").length, 0),
};

const pipelineRevenue = opportunities.reduce((sum, opportunity) => {
  return sum + Number(opportunity.pipelineValue.replace(/[$,]/g, ""));
}, 0);

export const pipelineRevenueLabel = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(pipelineRevenue);

export const openTaskCount = tasks.filter((task) => !["Completed", "Archived"].includes(task.status)).length;

export const blockerCount =
  workflows.reduce((count, workflow) => count + workflow.blockingIssues.length, 0) +
  tasks.filter((task) => task.priority === "Critical").length;

export const urgentCount = focusTasks.filter((task) => task.nextAction || task.priority === "Critical").length;

export const reviewCount = tasks.filter((task) => ["Review", "Inbox"].includes(task.status)).length;

export const workflowMix = [
  { label: "Active", value: workflowState.active, color: "#41d6ff" },
  { label: "Queued", value: workflowState.queued, color: "#7a84ff" },
  { label: "Blocked", value: Math.max(workflowState.blocked, 1), color: "#ff6b7a" },
];

export const pipelineStageBreakdown = opportunities.map((opportunity) => ({
  label: opportunity.pipelineStage,
  value: Number(opportunity.pipelineValue.replace(/[$,]/g, "")),
}));

const openStatuses = ["Inbox", "To Do", "In Progress", "Waiting", "Review"] as const;

export const taskStatusBreakdown = openStatuses.map((status) => ({
  label: status,
  value: tasks.filter((task) => task.status === status).length,
}));

export const projectProgressBreakdown = projects.map((project) => ({
  label: project.projectName.replace(" Property Partners", "").replace(" City Rentals", "").replace(" Aesthetics", ""),
  value: project.progress,
}));

export const clientLoadBreakdown = projects.map((project) => ({
  label: project.projectName.replace(" Property Partners", "").replace(" City Rentals", "").replace(" Aesthetics", ""),
  value: tasks.filter(
    (task) =>
      task.linkedProject === project.projectName ||
      task.linkedOpportunityOrClient === project.projectName,
  ).length,
}));

export const workflowNodeBreakdown = workflows.map((workflow) => ({
  label: workflow.activeWorkflow.replace(" Flow", "").replace(" Lead Recovery", "").replace(" Enquiry", ""),
  value: workflow.nodes.filter((node) => node.status === "Queued" || node.status === "Active").length,
}));

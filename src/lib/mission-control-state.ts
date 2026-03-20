import "server-only";

import type {
  AgencyOverviewSummary,
  CampaignRecord,
  DeliveryProgressItem,
  HeaderState,
  MissionControlData,
  OpportunityRecord,
  PipelineStageSummary,
  Priority,
  ProjectRecord,
  ProjectStage,
  SystemTaskDecision,
  SystemTaskDecisionState,
  TaskCategory,
  TaskOwnerType,
  TaskRecord,
  TaskStatus,
  WorkflowNode,
  WorkflowRecord,
} from "@/lib/types";
import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";

const PIPELINE_STAGES = [
  "Initial Contact",
  "Discovery",
  "Prototype/Proposal Sent",
  "In Negotiation",
  "Closed Won",
  "Closed Lost",
] as const;

const PROJECT_STAGES: ProjectStage[] = [
  "Idea",
  "Research",
  "Evaluation",
  "Solution Design",
  "Prototype",
  "Website / Asset Build",
  "Implementation",
  "Review / Approval",
  "Delivered - Live",
  "Optimization",
  "Closed / Archived",
];

type RawMissionControlState = {
  generated_at?: string;
  agency_overview?: {
    recurring_revenue?: number;
    one_off_revenue?: number;
    active_clients_revenue?: number;
    expired_clients_revenue?: number;
    active_clients_count?: number;
    open_opportunities_count?: number;
    open_projects_count?: number;
    expired_clients_count?: number;
    open_tasks_count?: number;
    overdue_tasks_count?: number;
    review_tasks_count?: number;
  };
  campaigns?: RawCampaign[];
  pipeline_records?: RawPipelineRecord[];
  projects?: RawProject[];
  tasks?: RawTask[];
  workflows?: RawWorkflow[];
};

type RawCampaign = {
  campaign_id: string;
  campaign_name: string;
  campaign_type?: string;
  segment?: string;
  owner?: string;
  status?: string;
  notes?: string;
};

type RawPipelineRecord = {
  record_id: string;
  record_type?: "contact" | "opportunity";
  campaign_id?: string;
  company_name?: string;
  contact_name?: string;
  pipeline_stage?: string;
  owner?: string;
  status?: string;
  next_step?: string;
  next_step_due_date?: string;
  last_contact_date?: string;
  value_once_off?: number;
  value_recurring?: number;
  linked_task_ids?: string[];
  linked_project_id?: string;
  summary?: string;
};

type RawProject = {
  project_id: string;
  project_name?: string;
  project_category?: "Client" | "Internal";
  project_track?: "Service Delivery" | "Offer Development" | "Outbound / Growth" | "Product / OS Improvement";
  linked_company_name?: string;
  linked_pipeline_record_id?: string;
  project_stage?: ProjectStage;
  project_status?: string;
  progress_percent?: number;
  summary?: string;
  next_action?: string;
  next_due_date?: string;
  linked_task_ids?: string[];
  active_workflow?: string;
};

type RawTask = {
  task_id: string;
  title?: string;
  details?: string;
  priority?: Priority;
  category?: TaskCategory;
  owner?: string;
  owner_type?: TaskOwnerType;
  status?: TaskStatus;
  due_date?: string;
  source?: "system" | "human" | "manual";
  linked_entity_type?: string;
  linked_entity_id?: string;
  linked_entity_name?: string;
  updated_at?: string;
  system_decision_prompt?: string;
  system_suggested_action?: string;
  system_decision_state?: SystemTaskDecisionState;
  system_last_decision_at?: string;
};

type RawWorkflowNode = {
  id?: string;
  name?: string;
  type?: string;
  status?: "Complete" | "Active" | "Blocked" | "Queued";
  summary?: string;
};

type RawWorkflow = {
  workflow_id: string;
  project_id?: string;
  project_name?: string;
  project_stage?: ProjectStage;
  active_workflow?: string;
  status?: string;
  next_due_date?: string;
  left_summary?: string | string[];
  stage_nodes?: RawWorkflowNode[];
};

const emptyData: MissionControlData = {
  campaigns: [],
  tasks: [],
  projects: [],
  opportunities: [],
  workflows: [],
  headerState: {
    activeProject: "No active project",
    activeWorkflow: "No active workflow",
    nextActionCount: 0,
    pendingApprovals: 0,
    blockers: 0,
    overdueCount: 0,
    reviewCount: 0,
  },
  agencyOverview: {
    recurringRevenue: 0,
    oneOffRevenue: 0,
    activeClientsRevenue: 0,
    clientPipelineValue: 0,
    activeClientsCount: 0,
    openOpportunitiesCount: 0,
    openProjectsCount: 0,
    expiredClientsCount: 0,
    expiredClientsRevenue: 0,
    openTasksCount: 0,
    overdueTasksCount: 0,
    reviewTasksCount: 0,
  },
  deliveryProgress: [],
  pipelineStageSummary: PIPELINE_STAGES.map((stage) => ({ stage, count: 0, revenue: 0 })),
  source: "fallback",
};

function resolveStatePath() {
  const cwd = process.cwd();
  const candidates = [
    path.resolve(cwd, "memory", "mission_control_state.json"),
    path.resolve(cwd, "..", "memory", "mission_control_state.json"),
    path.resolve(cwd, "..", "..", "memory", "mission_control_state.json"),
  ];

  return candidates[0] && candidates.find(Boolean) ? candidates : [];
}

async function readRawState(): Promise<RawMissionControlState | null> {
  for (const candidate of resolveStatePath()) {
    try {
      const raw = await fs.readFile(candidate, "utf-8");
      return JSON.parse(raw) as RawMissionControlState;
    } catch {
      continue;
    }
  }
  return null;
}

function isLiveStateUsable(raw: RawMissionControlState | null) {
  if (!raw) return false;
  return Boolean(
    raw.campaigns?.length ||
      raw.pipeline_records?.length ||
      raw.projects?.length ||
      raw.tasks?.length ||
      raw.workflows?.length,
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function taskIsComplete(status?: string) {
  return status === "Complete" || status === "Completed" || status === "Archived";
}

function isOverdue(dueDate?: string, status?: string) {
  if (!dueDate || taskIsComplete(status)) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

function normalizeTaskStatus(rawStatus?: string): TaskStatus {
  if (rawStatus === "Completed") return "Complete";
  if (rawStatus === "Inbox" || rawStatus === "To Do" || rawStatus === "Open" || rawStatus === "In Progress" || rawStatus === "Waiting" || rawStatus === "Review" || rawStatus === "Complete" || rawStatus === "Archived") {
    return rawStatus;
  }
  return "Open";
}

function deriveSystemDecisionState(task: RawTask): SystemTaskDecisionState | undefined {
  if ((task.owner_type !== "System" && task.source !== "system") || task.status === "Complete") return undefined;
  if (task.system_decision_state) return task.system_decision_state;
  if (task.owner_type === "Human") return "Reassigned";
  if (task.status === "In Progress") return "Accepted";
  return "Pending";
}

function mapCampaigns(rawCampaigns: RawCampaign[] = []): CampaignRecord[] {
  return rawCampaigns.map((campaign) => ({
    id: campaign.campaign_id,
    name: campaign.campaign_name,
    segment: campaign.segment ?? "",
    status: campaign.status ?? "Active",
    owner: campaign.owner ?? "Yan",
    contactsCount: 0,
    notes: campaign.notes ?? "",
  }));
}

function mapTasks(rawTasks: RawTask[] = []): TaskRecord[] {
  return rawTasks.map((task) => {
    const status = normalizeTaskStatus(task.status);
    const overdue = isOverdue(task.due_date, status);
    const ownerType = (task.owner_type === "System" ? "System" : "Human") as TaskOwnerType;

    return {
      id: task.task_id,
      title: task.title ?? "Untitled Task",
      status,
      priority: task.priority ?? "Medium",
      dueDate: task.due_date ?? "",
      owner: task.owner ?? (ownerType === "System" ? "System" : "Yan"),
      ownerType,
      linkedProject: task.linked_entity_type === "project" ? task.linked_entity_name ?? "" : undefined,
      linkedWorkflow: task.linked_entity_type === "workflow" ? task.linked_entity_name ?? "" : undefined,
      linkedOpportunityOrClient:
        task.linked_entity_type === "pipeline" || task.linked_entity_type === "contact" || task.linked_entity_type === "opportunity" || task.linked_entity_type === "client" || !task.linked_entity_type
          ? task.linked_entity_name ?? ""
          : undefined,
      notes: task.details ?? "",
      details: task.details ?? "",
      source: task.source === "system" ? "system" : "manual",
      nextAction: false,
      category: task.category ?? "Internal",
      overdue,
      systemDecisionPrompt:
        ownerType === "System"
          ? task.system_decision_prompt ??
            `The system created this task. Do you want FlowOps to proceed with "${task.title ?? "this action"}", defer it, or reassign it to you?`
          : undefined,
      systemSuggestedAction: ownerType === "System" ? task.system_suggested_action ?? task.details ?? "" : undefined,
      systemDecisionState: deriveSystemDecisionState(task),
      systemLastDecisionAt: task.system_last_decision_at,
    };
  });
}

function deriveProjectHealth(project: RawProject, tasks: TaskRecord[]) {
  const linked = tasks.filter((task) => task.linkedProject === project.project_name);
  if (linked.some((task) => task.overdue)) return "Overdue";
  if (linked.some((task) => task.status === "Review")) return "Review";
  if (linked.some((task) => task.status === "In Progress")) return "In Progress";
  return "Open";
}

function mapProjects(rawProjects: RawProject[] = [], tasks: TaskRecord[] = []): ProjectRecord[] {
  return rawProjects.map((project) => ({
    projectId: project.project_id,
    projectName: project.project_name ?? "Untitled Project",
    projectStatus: project.project_status ?? "Open",
    currentPhase: project.active_workflow ? `${project.active_workflow} in progress` : project.summary ?? "Open",
    ownerRole: "Yan",
    linkedClient: project.linked_company_name ?? "Unlinked",
    blockers: tasks.filter((task) => task.linkedProject === project.project_name && task.overdue).length,
    nextProjectAction: project.next_action ?? "Review next step",
    linkedTasks: project.linked_task_ids?.length ?? 0,
    progress: project.progress_percent ?? 0,
    projectStage: project.project_stage ?? "Idea",
    taskHealthStatus: deriveProjectHealth(project, tasks),
    projectCategory: project.project_category ?? "Client",
    projectTrack: project.project_track ?? "Service Delivery",
    summary: project.summary ?? "",
    nextDueDate: project.next_due_date ?? "",
  }));
}

function buildStageNodes(projectStage: ProjectStage): WorkflowNode[] {
  const activeIndex = PROJECT_STAGES.indexOf(projectStage);
  return PROJECT_STAGES.map((stage, index) => ({
    id: `derived-${stage}`,
    name: stage,
    type: "Project Stage",
    status: index < activeIndex ? "Complete" : index === activeIndex ? "Active" : "Queued",
    summary:
      index < activeIndex
        ? `${stage} completed.`
        : index === activeIndex
          ? `${stage} is the current active project stage.`
          : `${stage} is queued for later.`,
  }));
}

function mapWorkflows(rawWorkflows: RawWorkflow[] = [], projects: ProjectRecord[] = []): WorkflowRecord[] {
  return rawWorkflows.map((workflow) => {
    const project = projects.find((item) => item.projectId === workflow.project_id || item.projectName === workflow.project_name);
    const nodes =
      workflow.stage_nodes?.length
        ? workflow.stage_nodes.map((node, index) => ({
            id: node.id ?? `${workflow.workflow_id}-n${index + 1}`,
            name: node.name ?? `Stage ${index + 1}`,
            type: node.type ?? "Project Stage",
            status: node.status ?? "Queued",
            summary: node.summary ?? "",
          }))
        : buildStageNodes((workflow.project_stage ?? project?.projectStage ?? "Idea") as ProjectStage);

    const leftSummary = Array.isArray(workflow.left_summary)
      ? workflow.left_summary
      : typeof workflow.left_summary === "string" && workflow.left_summary
        ? workflow.left_summary.split(" | ").map((entry) => entry.trim()).filter(Boolean)
        : [
            `Client: ${project?.linkedClient ?? "Unlinked"}`,
            `Commercial stage: ${project?.projectStage ?? workflow.project_stage ?? "Open"}`,
            `Tasks: ${project?.linkedTasks ?? 0} linked`,
          ];

    const currentNode = nodes.find((node) => node.status === "Active");

    return {
      id: workflow.workflow_id,
      activeWorkflow: workflow.active_workflow ?? project?.currentPhase ?? "Workflow",
      workflowStatus: workflow.status ?? "Open",
      currentStep: currentNode?.name ?? workflow.active_workflow ?? "Open",
      blockingIssues: [],
      nextWorkflowCandidate: "",
      linkedProject: workflow.project_name ?? project?.projectName ?? "Untitled Project",
      nodes,
      projectStage: (workflow.project_stage ?? project?.projectStage ?? "Idea") as ProjectStage,
      nextDueDate: workflow.next_due_date ?? project?.nextDueDate ?? "",
      leftSummary,
    };
  });
}

function mapOpportunities(rawPipeline: RawPipelineRecord[] = [], campaigns: CampaignRecord[] = [], projects: ProjectRecord[] = []): OpportunityRecord[] {
  const campaignMap = new Map(campaigns.map((campaign) => [campaign.id, campaign.name]));
  const projectMap = new Map(projects.map((project) => [project.projectId, project.projectName]));

  return rawPipeline.map((record) => {
    const totalValue = Number(record.value_once_off ?? 0) + Number(record.value_recurring ?? 0);
    const urgent = Boolean(record.next_step_due_date && record.next_step_due_date < new Date().toISOString().slice(0, 10) && record.pipeline_stage !== "Closed Won" && record.pipeline_stage !== "Closed Lost");

    return {
      opportunityId: record.record_id,
      opportunityName: record.company_name ?? "Unnamed Opportunity",
      pipelineStage: record.pipeline_stage ?? "Initial Contact",
      owner: record.owner ?? "Yan",
      linkedClient: record.contact_name ?? record.company_name ?? "",
      nextOpportunityAction: record.next_step ?? "Review next step",
      classificationStatus: record.status ?? "Open",
      linkedTasks: record.linked_task_ids?.length ?? 0,
      pipelineValue: formatCurrency(totalValue),
      recordType: record.record_type ?? "contact",
      campaignName: record.campaign_id ? campaignMap.get(record.campaign_id) ?? "" : "",
      summary: record.summary ?? "",
      nextStepDueDate: record.next_step_due_date ?? "",
      linkedProjectName: record.linked_project_id ? projectMap.get(record.linked_project_id) ?? "" : "",
      urgent,
      status: (record.status as OpportunityRecord["status"]) ?? "Open",
    };
  });
}

function buildAgencyOverview(raw: RawMissionControlState["agency_overview"], opportunities: OpportunityRecord[], projects: ProjectRecord[], tasks: TaskRecord[]): AgencyOverviewSummary {
  const pipelineTotal = opportunities
    .filter((item) => item.pipelineStage !== "Closed Lost")
    .reduce((sum, item) => sum + Number(item.pipelineValue.replace(/[$,]/g, "")), 0);

  return {
    recurringRevenue: raw?.recurring_revenue ?? 0,
    oneOffRevenue: raw?.one_off_revenue ?? 0,
    activeClientsRevenue: raw?.active_clients_revenue ?? 0,
    clientPipelineValue: pipelineTotal,
    activeClientsCount: raw?.active_clients_count ?? projects.filter((project) => project.projectStage !== "Closed / Archived").length,
    openOpportunitiesCount: raw?.open_opportunities_count ?? opportunities.filter((item) => !["Closed Won", "Closed Lost"].includes(item.pipelineStage)).length,
    openProjectsCount: raw?.open_projects_count ?? projects.filter((project) => project.projectStage !== "Closed / Archived").length,
    expiredClientsCount: raw?.expired_clients_count ?? projects.filter((project) => project.projectStage === "Closed / Archived").length,
    expiredClientsRevenue: raw?.expired_clients_revenue ?? 0,
    openTasksCount: raw?.open_tasks_count ?? tasks.filter((task) => !taskIsComplete(task.status)).length,
    overdueTasksCount: raw?.overdue_tasks_count ?? tasks.filter((task) => task.overdue).length,
    reviewTasksCount: raw?.review_tasks_count ?? tasks.filter((task) => task.status === "Review").length,
  };
}

function buildPipelineStageSummary(opportunities: OpportunityRecord[]): PipelineStageSummary[] {
  return PIPELINE_STAGES.map((stage) => {
    const records = opportunities.filter((item) => item.pipelineStage === stage);
    return {
      stage,
      count: records.length,
      revenue: records.reduce((sum, item) => sum + Number(item.pipelineValue.replace(/[$,]/g, "")), 0),
    };
  });
}

function buildHeaderState(tasks: TaskRecord[], projects: ProjectRecord[], workflows: WorkflowRecord[]): HeaderState {
  const activeProject = projects.find((project) => project.projectStage !== "Closed / Archived");
  const activeWorkflow = workflows.find((workflow) => workflow.workflowStatus !== "Complete");

  return {
    activeProject: activeProject?.projectName ?? "No active project",
    activeWorkflow: activeWorkflow?.activeWorkflow ?? "No active workflow",
    nextActionCount: tasks.filter((task) => !taskIsComplete(task.status)).length,
    pendingApprovals: tasks.filter((task) => task.status === "Review").length,
    blockers: projects.filter((project) => project.taskHealthStatus === "Overdue").length,
    overdueCount: tasks.filter((task) => task.overdue).length,
    reviewCount: tasks.filter((task) => task.status === "Review").length,
  };
}

function buildDeliveryProgress(projects: ProjectRecord[]): DeliveryProgressItem[] {
  return projects
    .filter((project) => project.projectStage !== "Closed / Archived")
    .map((project) => ({
      label: project.projectName,
      stage: project.projectStage,
      progress: project.progress,
    }));
}

function mapRawStateToData(raw: RawMissionControlState): MissionControlData {
  const campaigns = mapCampaigns(raw.campaigns);
  const tasks = mapTasks(raw.tasks);
  const projects = mapProjects(raw.projects, tasks);
  const opportunities = mapOpportunities(raw.pipeline_records, campaigns, projects);
  const workflows = mapWorkflows(raw.workflows, projects);
  const agencyOverview = buildAgencyOverview(raw.agency_overview, opportunities, projects, tasks);

  return {
    campaigns,
    tasks,
    projects,
    opportunities,
    workflows,
    headerState: buildHeaderState(tasks, projects, workflows),
    agencyOverview,
    deliveryProgress: buildDeliveryProgress(projects),
    pipelineStageSummary: buildPipelineStageSummary(opportunities),
    source: "live",
    generatedAt: raw.generated_at,
  };
}

export async function getMissionControlData(): Promise<MissionControlData> {
  noStore();
  const raw = await readRawState();
  if (!isLiveStateUsable(raw)) return emptyData;
  return mapRawStateToData(raw as RawMissionControlState);
}

async function writeRawState(raw: RawMissionControlState) {
  for (const candidate of resolveStatePath()) {
    try {
      await fs.mkdir(path.dirname(candidate), { recursive: true });
      await fs.writeFile(candidate, JSON.stringify(raw, null, 2) + "\n", "utf-8");
      return;
    } catch {
      continue;
    }
  }
  throw new Error("Unable to write mission control state.");
}

export async function applySystemTaskDecision(taskId: string, decision: SystemTaskDecision): Promise<TaskRecord | null> {
  const raw = await readRawState();
  if (!raw?.tasks?.length) return null;

  const task = raw.tasks.find((item) => item.task_id === taskId);
  if (!task) return null;

  task.system_last_decision_at = new Date().toISOString();

  if (decision === "Proceed") {
    task.system_decision_state = "Accepted";
    task.status = "In Progress";
  } else if (decision === "Defer") {
    task.system_decision_state = "Deferred";
    task.status = task.status === "Review" ? "Review" : "Open";
  } else {
    task.system_decision_state = "Reassigned";
    task.owner = "Yan";
    task.owner_type = "Human";
    task.status = "Open";
  }

  raw.generated_at = new Date().toISOString();
  await writeRawState(raw);

  const live = mapRawStateToData(raw);
  return live.tasks.find((item) => item.id === taskId) ?? null;
}

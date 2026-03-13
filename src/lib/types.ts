export type TaskStatus =
  | "Inbox"
  | "To Do"
  | "In Progress"
  | "Waiting"
  | "Review"
  | "Completed"
  | "Archived";

export type TaskSource = "system" | "manual";
export type Priority = "Critical" | "High" | "Medium" | "Low";

export type TaskRecord = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  owner: string;
  linkedProject?: string;
  linkedWorkflow?: string;
  linkedOpportunityOrClient?: string;
  notes: string;
  source: TaskSource;
  nextAction: boolean;
};

export type ProjectRecord = {
  projectId: string;
  projectName: string;
  projectStatus: string;
  currentPhase: string;
  ownerRole: string;
  linkedClient: string;
  blockers: number;
  nextProjectAction: string;
  linkedTasks: number;
  progress: number;
};

export type OpportunityRecord = {
  opportunityId: string;
  opportunityName: string;
  pipelineStage: string;
  owner: string;
  linkedClient: string;
  nextOpportunityAction: string;
  classificationStatus: string;
  linkedTasks: number;
  pipelineValue: string;
};

export type WorkflowNode = {
  id: string;
  name: string;
  type: string;
  status: "Complete" | "Active" | "Blocked" | "Queued";
  summary: string;
};

export type WorkflowRecord = {
  id: string;
  activeWorkflow: string;
  workflowStatus: string;
  currentStep: string;
  blockingIssues: string[];
  nextWorkflowCandidate: string;
  linkedProject: string;
  nodes: WorkflowNode[];
};

export type ReviewItem = {
  id: string;
  title: string;
  reviewer: string;
  status: string;
  blockers: string[];
  summary: string[];
  lastDisposition: string;
};

export type ActivityItem = {
  id: string;
  activityType: string;
  activityTime: string;
  linkedDomain: string;
  linkedRecord: string;
  operatorOrSystemSource: string;
  summary: string;
};

export type MetricCard = {
  id: string;
  label: string;
  value: string;
  trend: string;
  context: string;
};

export type HeaderState = {
  activeProject: string;
  activeWorkflow: string;
  nextActionCount: number;
  pendingApprovals: number;
  blockers: number;
};

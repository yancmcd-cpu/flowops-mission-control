export type TaskStatus =
  | "Inbox"
  | "To Do"
  | "Open"
  | "In Progress"
  | "Waiting"
  | "Review"
  | "Complete"
  | "Completed"
  | "Archived";

export type TaskSource = "system" | "manual";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type TaskCategory = "Client" | "Project" | "Pipeline" | "Internal";
export type TaskOwnerType = "Human" | "System";
export type SystemTaskDecision = "Proceed" | "Defer" | "Reassign";
export type SystemTaskDecisionState = "Pending" | "Accepted" | "Deferred" | "Reassigned";

export type TaskRecord = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  owner: string;
  ownerType?: TaskOwnerType;
  linkedProject?: string;
  linkedWorkflow?: string;
  linkedOpportunityOrClient?: string;
  notes: string;
  details?: string;
  source: TaskSource;
  nextAction: boolean;
  category?: TaskCategory;
  overdue?: boolean;
  systemDecisionPrompt?: string;
  systemSuggestedAction?: string;
  systemDecisionState?: SystemTaskDecisionState;
  systemLastDecisionAt?: string;
};

export type ProjectStage =
  | "Idea"
  | "Research"
  | "Evaluation"
  | "Solution Design"
  | "Prototype"
  | "Website / Asset Build"
  | "Implementation"
  | "Review / Approval"
  | "Delivered - Live"
  | "Optimization"
  | "Closed / Archived";

export type ProjectTaskHealth = "Open" | "Overdue" | "In Progress" | "Review";

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
  projectStage: ProjectStage;
  taskHealthStatus?: ProjectTaskHealth;
  projectCategory?: "Client" | "Internal";
  projectTrack?: "Service Delivery" | "Offer Development" | "Outbound / Growth" | "Product / OS Improvement";
  summary?: string;
  nextDueDate?: string;
};

export type OpportunityRecordType = "contact" | "opportunity";
export type OpportunityStatus = "Open" | "Review" | "In Progress" | "Complete";

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
  recordType?: OpportunityRecordType;
  campaignName?: string;
  summary?: string;
  nextStepDueDate?: string;
  linkedProjectName?: string;
  urgent?: boolean;
  status?: OpportunityStatus;
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
  projectStage?: ProjectStage;
  nextDueDate?: string;
  leftSummary?: string[];
};

export type CampaignRecord = {
  id: string;
  name: string;
  segment: string;
  status: string;
  owner: string;
  contactsCount: number;
  notes: string;
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
  overdueCount?: number;
  reviewCount?: number;
};

export type DeliveryProgressItem = {
  label: string;
  stage: ProjectStage;
  progress: number;
};

export type PipelineStageSummary = {
  stage: string;
  count: number;
  revenue: number;
};

export type AgencyOverviewSummary = {
  recurringRevenue: number;
  oneOffRevenue: number;
  activeClientsRevenue: number;
  clientPipelineValue: number;
  activeClientsCount: number;
  openOpportunitiesCount: number;
  openProjectsCount: number;
  expiredClientsCount: number;
  expiredClientsRevenue: number;
  openTasksCount: number;
  overdueTasksCount: number;
  reviewTasksCount: number;
};

export type MissionControlData = {
  campaigns: CampaignRecord[];
  tasks: TaskRecord[];
  projects: ProjectRecord[];
  opportunities: OpportunityRecord[];
  workflows: WorkflowRecord[];
  headerState: HeaderState;
  agencyOverview: AgencyOverviewSummary;
  deliveryProgress: DeliveryProgressItem[];
  pipelineStageSummary: PipelineStageSummary[];
  source: "live" | "fallback";
  generatedAt?: string;
};

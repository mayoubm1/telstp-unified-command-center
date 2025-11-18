      isPublic: insertWorkspace.isPublic ?? false,
      allowCrossChaining: insertWorkspace.allowCrossChaining ?? true,
      settings: insertWorkspace.settings || {},
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.workspaces.set(id, workspace);
    return workspace;
  }

  async updateWorkspace(id: string, updates: Partial<Workspace>): Promise<Workspace> {
    const workspace = this.workspaces.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    const updatedWorkspace = { ...workspace, ...updates, updatedAt: new Date() };
    this.workspaces.set(id, updatedWorkspace);
    return updatedWorkspace;
  }

  // Workspace member operations
  async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    return Array.from(this.workspaceMembers.values()).filter(
      (member) => member.workspaceId === workspaceId
    );
  }

  async getUserWorkspaceMembership(userId: string, workspaceId: string): Promise<WorkspaceMember | undefined> {
    return Array.from(this.workspaceMembers.values()).find(
      (member) => member.userId === userId && member.workspaceId === workspaceId
    );
  }

  async addWorkspaceMember(insertMember: InsertWorkspaceMember): Promise<WorkspaceMember> {
    const id = randomUUID();
    const member: WorkspaceMember = {
      ...insertMember,
      workspaceId: insertMember.workspaceId || null,
      userId: insertMember.userId || null,
      role: insertMember.role || "member",
      permissions: insertMember.permissions || {},
      id,
      joinedAt: new Date()
    };
    this.workspaceMembers.set(id, member);
    return member;
  }

  async updateWorkspaceMember(id: string, updates: Partial<WorkspaceMember>): Promise<WorkspaceMember> {
    const member = this.workspaceMembers.get(id);
    if (!member) {
      throw new Error("Workspace member not found");
    }
    const updatedMember = { ...member, ...updates };
    this.workspaceMembers.set(id, updatedMember);
    return updatedMember;
  }

  async removeWorkspaceMember(id: string): Promise<void> {
    this.workspaceMembers.delete(id);
  }

  // Message chain operations
  async getMessageChainsByWorkspaceId(workspaceId: string): Promise<MessageChain[]> {
    return Array.from(this.messageChains.values()).filter(
      (chain) => chain.workspaceId === workspaceId
    );
  }

  async createMessageChain(insertChain: InsertMessageChain): Promise<MessageChain> {
    const id = randomUUID();
    const chain: MessageChain = {
      ...insertChain,
      workspaceId: insertChain.workspaceId || null,
      chainOrder: insertChain.chainOrder || 0,
      sourcePlatformId: insertChain.sourcePlatformId || null,
      targetPlatformId: insertChain.targetPlatformId || null,
      triggerCondition: insertChain.triggerCondition || "automatic",
      isActive: insertChain.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.messageChains.set(id, chain);
    return chain;
  }

  async updateMessageChain(id: string, updates: Partial<MessageChain>): Promise<MessageChain> {
    const chain = this.messageChains.get(id);
    if (!chain) {
      throw new Error("Message chain not found");
    }
    const updatedChain = { ...chain, ...updates };
    this.messageChains.set(id, updatedChain);
    return updatedChain;
  }

  // Scheduled task operations
  async getScheduledTasksByUserId(userId: string): Promise<ScheduledTask[]> {
    // Support wildcard to get all tasks for maintenance operations
    if (userId === "*") {
      return Array.from(this.scheduledTasks.values());
    }
    
    return Array.from(this.scheduledTasks.values()).filter(
      (task) => task.userId === userId
    );
  }

  async getScheduledTask(id: string): Promise<ScheduledTask | undefined> {
    return this.scheduledTasks.get(id);
  }

  async getActiveScheduledTasks(): Promise<ScheduledTask[]> {
    const now = new Date();
    return Array.from(this.scheduledTasks.values()).filter(
      (task) => task.isActive && 
      (!task.nextExecution || new Date(task.nextExecution) <= now)
    );
  }

  async createScheduledTask(insertTask: InsertScheduledTask): Promise<ScheduledTask> {
    const id = randomUUID();
    const task: ScheduledTask = {
      ...insertTask,
      userId: insertTask.userId || null,
      workspaceId: insertTask.workspaceId || null,
      description: insertTask.description || null,
      timezone: insertTask.timezone || "UTC",
      isActive: insertTask.isActive ?? true,
      lastExecuted: null,
      nextExecution: null,
      executionCount: 0,
      maxExecutions: insertTask.maxExecutions || null,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.scheduledTasks.set(id, task);
    return task;
  }

  async updateScheduledTask(id: string, updates: Partial<ScheduledTask>): Promise<ScheduledTask> {
    const task = this.scheduledTasks.get(id);
    if (!task) {
      throw new Error("Scheduled task not found");
    }
    const updatedTask = { ...task, ...updates, updatedAt: new Date() };
    this.scheduledTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteScheduledTask(id: string): Promise<void> {
    this.scheduledTasks.delete(id);
  }

  // Task execution operations
  async getTaskExecutionsByTaskId(taskId: string): Promise<TaskExecution[]> {
    return Array.from(this.taskExecutions.values()).filter(
      (execution) => execution.taskId === taskId
    );
  }

  async getTaskExecutionsByStatus(status: string): Promise<TaskExecution[]> {
    return Array.from(this.taskExecutions.values()).filter(
      (execution) => execution.status === status
    );
  }

  async createTaskExecution(insertExecution: InsertTaskExecution): Promise<TaskExecution> {
    const id = randomUUID();
    const execution: TaskExecution = {
      ...insertExecution,
      taskId: insertExecution.taskId || null,
      conversationId: insertExecution.conversationId || null,
      endTime: insertExecution.endTime || null,
      responseCount: insertExecution.responseCount || 0,
      averageResponseTime: insertExecution.averageResponseTime || null,
      errors: insertExecution.errors || null,
      results: insertExecution.results || null,
      id,
      startTime: new Date(),
      createdAt: new Date()
    };
    this.taskExecutions.set(id, execution);
    return execution;
  }

  async updateTaskExecution(id: string, updates: Partial<TaskExecution>): Promise<TaskExecution> {
    const execution = this.taskExecutions.get(id);
    if (!execution) {
      throw new Error("Task execution not found");
    }
    const updatedExecution = { ...execution, ...updates };
    this.taskExecutions.set(id, updatedExecution);
    return updatedExecution;
  }

  // Response time notification operations
  async getResponseTimeNotifications(userId: string, workspaceId?: string): Promise<ResponseTimeNotification[]> {
    return Array.from(this.responseTimeNotifications.values()).filter(
      (notification) => notification.userId === userId && 
      (!workspaceId || notification.workspaceId === workspaceId)
    );
  }

  async createResponseTimeNotification(insertNotification: InsertResponseTimeNotification): Promise<ResponseTimeNotification> {
    const id = randomUUID();
    const notification: ResponseTimeNotification = {
      ...insertNotification,
      userId: insertNotification.userId || null,
      workspaceId: insertNotification.workspaceId || null,
      platformId: insertNotification.platformId || null,
      isActive: insertNotification.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.responseTimeNotifications.set(id, notification);
    return notification;
  }

  async updateResponseTimeNotification(id: string, updates: Partial<ResponseTimeNotification>): Promise<ResponseTimeNotification> {
    const notification = this.responseTimeNotifications.get(id);
    if (!notification) {
      throw new Error("Response time notification not found");
    }
    const updatedNotification = { ...notification, ...updates };
    this.responseTimeNotifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteResponseTimeNotification(id: string): Promise<void> {
    this.responseTimeNotifications.delete(id);
  }

  // Response metrics operations
  async createResponseMetrics(insertMetrics: InsertResponseMetrics): Promise<ResponseMetrics> {
    const id = randomUUID();
    const metrics: ResponseMetrics = {
      ...insertMetrics,
      messageId: insertMetrics.messageId || null,
      platformId: insertMetrics.platformId || null,
      workspaceId: insertMetrics.workspaceId || null,
      userId: insertMetrics.userId || null,
      id,
      timestamp: new Date()
    };
    this.responseMetrics.set(id, metrics);
    return metrics;
  }

  async getResponseMetricsByWorkspace(workspaceId: string, fromDate?: Date): Promise<ResponseMetrics[]> {
    return Array.from(this.responseMetrics.values()).filter(
      (metrics) => metrics.workspaceId === workspaceId &&
      (!fromDate || new Date(metrics.timestamp!) >= fromDate)
    );
  }

  // Helper methods
  async getAllPlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values());
  }
}

export const storage = new MemStorage();

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  description: string;
  deadline: Date;
  estimatedTime: number; // in minutes
  priority: Priority;
  completed: boolean;
}

export interface ScheduleItem {
  taskId: string;
  startTime: string;
  endTime: string;
}

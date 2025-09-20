'use client';

import type { Task } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  tasks: Task[];
}

export default function ProgressTracker({ tasks }: ProgressTrackerProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <span>Progress</span>
        <span>
          {completedTasks} / {totalTasks}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}

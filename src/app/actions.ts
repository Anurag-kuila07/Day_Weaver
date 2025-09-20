'use server';

import { optimizeSchedule, type OptimizeScheduleInput, type OptimizeScheduleOutput } from "@/ai/flows/optimize-schedule";
import type { Task } from "@/lib/types";

export async function getOptimizedSchedule(tasks: Task[]): Promise<OptimizeScheduleOutput> {
  const formattedTasks: OptimizeScheduleInput['tasks'] = tasks
    .filter(task => !task.completed)
    .map(task => ({
      id: task.id,
      description: task.description,
      deadline: task.deadline.toISOString(),
      estimatedTime: task.estimatedTime,
      priority: task.priority,
    }));

  if (formattedTasks.length === 0) {
    return { schedule: [] };
  }

  const input: OptimizeScheduleInput = {
    tasks: formattedTasks,
  };

  try {
    const result = await optimizeSchedule(input);
    return result;
  } catch (error) {
    console.error("Error optimizing schedule:", error);
    throw new Error("Failed to get optimized schedule from AI.");
  }
}

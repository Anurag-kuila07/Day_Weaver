// src/ai/flows/optimize-schedule.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing a daily schedule based on user-provided tasks, deadlines, estimated time, and priorities.
 *
 * - optimizeSchedule - The main function to initiate the schedule optimization flow.
 * - OptimizeScheduleInput - The input type for the optimizeSchedule function, defining the structure of tasks.
 * - OptimizeScheduleOutput - The output type for the optimizeSchedule function, representing the optimized schedule.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a single task
const TaskSchema = z.object({
  id: z.string().describe('Unique identifier for the task'),
  description: z.string().describe('Description of the task'),
  deadline: z.string().describe('Deadline for the task (e.g., YYYY-MM-DDTHH:MM:SSZ)'),
  estimatedTime: z.number().describe('Estimated time to complete the task in minutes'),
  priority: z.enum(['high', 'medium', 'low']).describe('Priority of the task'),
});

// Define the input schema for the optimizeSchedule function
const OptimizeScheduleInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('Array of tasks to be scheduled'),
});
export type OptimizeScheduleInput = z.infer<typeof OptimizeScheduleInputSchema>;

// Define the output schema for the optimizeSchedule function
const OptimizeScheduleOutputSchema = z.object({
  schedule: z.array(z.object({
    taskId: z.string().describe('The ID of the scheduled task'),
    startTime: z.string().describe('Suggested start time for the task (e.g., YYYY-MM-DDTHH:MM:SSZ)'),
    endTime: z.string().describe('Suggested end time for the task (e.g., YYYY-MM-DDTHH:MM:SSZ)'),
  })).describe('Optimized schedule with task IDs and suggested start/end times'),
});
export type OptimizeScheduleOutput = z.infer<typeof OptimizeScheduleOutputSchema>;

// Exported function to call the flow
export async function optimizeSchedule(input: OptimizeScheduleInput): Promise<OptimizeScheduleOutput> {
  return optimizeScheduleFlow(input);
}

// Define the prompt
const optimizeSchedulePrompt = ai.definePrompt({
  name: 'optimizeSchedulePrompt',
  input: {schema: OptimizeScheduleInputSchema},
  output: {schema: OptimizeScheduleOutputSchema},
  prompt: `You are an AI assistant designed to create optimized daily schedules for users.

  Given the following tasks with their descriptions, deadlines, estimated completion times, and priorities, create an optimized schedule that maximizes the user's productivity.
  Take into account reasonable estimates of human performance.

  Tasks:
  {{#each tasks}}
  - ID: {{id}}
    Description: {{description}}
    Deadline: {{deadline}}
    Estimated Time (minutes): {{estimatedTime}}
    Priority: {{priority}}
  {{/each}}

  Return a schedule that lists the task IDs with their suggested start and end times. Adhere to the deadlines and prioritize tasks accordingly.

  Ensure that the start and end times are in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).

  Output the schedule in a JSON format:
  {
    "schedule": [
      {
        "taskId": "task_id_1",
        "startTime": "2024-01-01T09:00:00Z",
        "endTime": "2024-01-01T10:00:00Z"
      },
      {
        "taskId": "task_id_2",
        "startTime": "2024-01-01T10:00:00Z",
        "endTime": "2024-01-01T12:00:00Z"
      }
    ]
  }`,
});

// Define the flow
const optimizeScheduleFlow = ai.defineFlow(
  {
    name: 'optimizeScheduleFlow',
    inputSchema: OptimizeScheduleInputSchema,
    outputSchema: OptimizeScheduleOutputSchema,
  },
  async input => {
    const {output} = await optimizeSchedulePrompt(input);
    return output!;
  }
);

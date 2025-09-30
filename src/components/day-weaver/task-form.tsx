
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { PlusCircle } from 'lucide-react';
import type { Task } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Clock } from 'lucide-react';
import { useState } from 'react';

const taskSchema = z.object({
  description: z.string().min(3, 'Description must be at least 3 characters long.'),
  estimatedTime: z.coerce.number().int().min(1, 'Estimated time must be at least 1 minute.'),
  priority: z.enum(['low', 'medium', 'high']),
  deadlineDate: z.date({ required_error: 'Deadline date is required.' }),
  deadlineHour: z.coerce.number().min(1).max(12),
  deadlineMinute: z.coerce.number().min(0).max(59),
  deadlinePeriod: z.enum(['AM', 'PM']),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: '',
      estimatedTime: 30,
      priority: 'medium',
      deadlineHour: 5,
      deadlineMinute: 0,
      deadlinePeriod: 'PM',
    },
  });

  function onSubmit(values: TaskFormValues) {
    let hours = values.deadlineHour;
    if (values.deadlinePeriod === 'PM' && hours < 12) {
      hours += 12;
    }
    if (values.deadlinePeriod === 'AM' && hours === 12) {
      hours = 0;
    }
    const deadline = new Date(values.deadlineDate);
    deadline.setHours(hours, values.deadlineMinute);

    onAddTask({
      description: values.description,
      estimatedTime: values.estimatedTime,
      priority: values.priority,
      deadline,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Finalize project report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="estimatedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Estimate (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deadlineDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Deadline</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                </FormItem>
            )}
          />
          <div className="flex flex-col">
              <FormLabel>Time</FormLabel>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="deadlineHour"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input type="number" min="1" max="12" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <span className="font-bold">:</span>
                <FormField
                  control={form.control}
                  name="deadlineMinute"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input type="number" min="0" max="59" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadlinePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </form>
    </Form>
  );
}

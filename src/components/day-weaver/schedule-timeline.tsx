'use client';

import type { ScheduleItem, Task, Priority } from '@/lib/types';
import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface ScheduleTimelineProps {
  schedule: ScheduleItem[];
  tasks: Task[];
}

const priorityColors: Record<Priority, { bg: string; text: string, border: string }> = {
  high: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', border: 'border-red-500'},
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-800/50', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-500' },
  low: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-200', border: 'border-blue-500' },
};

export default function ScheduleTimeline({ schedule, tasks }: ScheduleTimelineProps) {
  const taskMap = useMemo(() => new Map(tasks.map(task => [task.id, task])), [tasks]);

  const sortedSchedule = useMemo(() => {
    return [...schedule].sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime());
  }, [schedule]);

  if (schedule.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Your schedule will appear here.</p>
        <p className="text-sm text-muted-foreground/80">Add tasks and click "Optimize Schedule".</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {sortedSchedule.map((item, index) => {
          const task = taskMap.get(item.taskId);
          if (!task) return null;

          const startTime = parseISO(item.startTime);
          const endTime = parseISO(item.endTime);

          return (
            <motion.div
              key={item.taskId}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn('p-4 rounded-lg border-l-4', priorityColors[task.priority].bg, priorityColors[task.priority].border)}>
                <div className="flex justify-between items-center">
                  <p className={cn('font-bold', priorityColors[task.priority].text)}>{task.description}</p>
                  <div className={cn('text-sm font-semibold px-2 py-1 rounded-full', priorityColors[task.priority].bg, priorityColors[task.priority].text)}>
                    {task.priority}
                  </div>
                </div>
                <p className={cn('text-sm mt-1', priorityColors[task.priority].text, 'opacity-90')}>
                  {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

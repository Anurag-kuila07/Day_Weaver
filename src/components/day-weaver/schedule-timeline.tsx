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

const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7 AM to 10 PM
const PIXELS_PER_MINUTE = 1.5;

const priorityColors: Record<Priority, { bg: string; text: string, border: string }> = {
  high: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', border: 'border-red-500'},
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-800/50', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-500' },
  low: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-200', border: 'border-blue-500' },
};

export default function ScheduleTimeline({ schedule, tasks }: ScheduleTimelineProps) {
  const taskMap = useMemo(() => new Map(tasks.map(task => [task.id, task])), [tasks]);

  const timelineItems = useMemo(() => {
    return schedule.map(item => {
      const task = taskMap.get(item.taskId);
      if (!task) return null;

      const startTime = parseISO(item.startTime);
      const endTime = parseISO(item.endTime);
      const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
      const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
      
      const timelineStartMinutes = hours[0] * 60;
      
      const top = (startMinutes - timelineStartMinutes) * PIXELS_PER_MINUTE;
      const height = (endMinutes - startMinutes) * PIXELS_PER_MINUTE;

      return {
        ...item,
        task,
        top,
        height,
        startTime,
        endTime
      };
    }).filter(Boolean);
  }, [schedule, taskMap]);

  if (schedule.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Your schedule will appear here.</p>
        <p className="text-sm text-muted-foreground/80">Add tasks and click "Optimize Schedule".</p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: `${(hours.length-1) * 60 * PIXELS_PER_MINUTE}px` }}>
      <div className="absolute inset-0 grid grid-cols-[auto_1fr]">
        <div className="flex flex-col">
          {hours.map(hour => (
            <div key={hour} className="h-[90px] flex items-start -translate-y-2">
              <span className="text-xs text-muted-foreground pr-2">
                {format(new Date(0, 0, 0, hour), 'h a')}
              </span>
            </div>
          ))}
        </div>
        <div className="relative">
          {hours.map((hour, index) =>
            index < hours.length - 1 ? (
              <div
                key={hour}
                className="h-[90px] border-t border-dashed"
              />
            ) : null
          )}
        </div>
      </div>
      <div className="absolute inset-0 ml-12">
        <AnimatePresence>
          {timelineItems.map((item, index) => item && (
            <motion.div
              key={item.taskId}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'absolute w-full p-2 rounded-md border-l-4',
                priorityColors[item.task.priority].bg,
                priorityColors[item.task.priority].border
              )}
              style={{ top: item.top, height: item.height }}
            >
              <p className={cn('font-bold text-sm leading-tight', priorityColors[item.task.priority].text)}>
                {item.task.description}
              </p>
              <p className={cn('text-xs', priorityColors[item.task.priority].text, 'opacity-80')}>
                {format(item.startTime, 'h:mm a')} - {format(item.endTime, 'h:mm a')}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

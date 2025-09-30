'use client';

import type { ScheduleItem, Task, Priority } from '@/lib/types';
import { useMemo, useState } from 'react';
import { format, parseISO, startOfWeek, addDays, eachDayOfInterval, isSameDay, getDay, differenceInMinutes } from 'date-fns';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleCalendarProps {
  schedule: ScheduleItem[];
  tasks: Task[];
}

const priorityColors: Record<Priority, { bg: string; text: string, border: string }> = {
  high: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', border: 'border-red-500'},
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-800/50', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-500' },
  low: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-200', border: 'border-blue-500' },
};

const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7 AM to 10 PM
const PIXELS_PER_HOUR = 60;

export default function ScheduleCalendar({ schedule, tasks }: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const taskMap = useMemo(() => new Map(tasks.map(task => [task.id, task])), [tasks]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const scheduledItemsByDay = useMemo(() => {
    const items: Record<string, any[]> = {};
    weekDays.forEach(day => {
      items[format(day, 'yyyy-MM-dd')] = [];
    });

    schedule.forEach(item => {
      const task = taskMap.get(item.taskId);
      if (!task) return;
      
      const startTime = parseISO(item.startTime);
      const dayKey = format(startTime, 'yyyy-MM-dd');

      if (items[dayKey]) {
        const startHour = startTime.getHours() + startTime.getMinutes() / 60;
        const top = (startHour - hours[0]) * PIXELS_PER_HOUR;
        const durationInMinutes = differenceInMinutes(parseISO(item.endTime), startTime);
        const height = (durationInMinutes / 60) * PIXELS_PER_HOUR;

        items[dayKey].push({
          ...item,
          task,
          top,
          height,
          startTime,
        });
      }
    });
    return items;
  }, [schedule, taskMap, weekDays]);
  
  const goToPreviousWeek = () => setCurrentDate(prev => addDays(prev, -7));
  const goToNextWeek = () => setCurrentDate(prev => addDays(prev, 7));
  const goToCurrentWeek = () => setCurrentDate(new Date());

  if (schedule.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Your schedule will appear here.</p>
        <p className="text-sm text-muted-foreground/80">Add tasks and click "Optimize Schedule".</p>
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousWeek}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={goToNextWeek}><ChevronRight className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={goToCurrentWeek}>Today</Button>
            </div>
            <h3 className="text-lg font-semibold">
                {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
            </h3>
        </div>
      <div className="grid grid-cols-[auto_repeat(7,1fr)]">
        {/* Time column */}
        <div className="pr-2">
          {hours.map(hour => (
            <div key={hour} style={{ height: `${PIXELS_PER_HOUR}px` }} className="flex justify-end items-start pt-1">
              <span className="text-xs text-muted-foreground -translate-y-1/2">
                {format(new Date(0, 0, 0, hour), 'h a')}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map(day => (
          <div key={day.toString()} className="relative border-l border-dashed">
            <div className="text-center py-2 border-b border-dashed sticky top-0 bg-card z-10">
              <p className="font-medium text-sm">{format(day, 'EEE')}</p>
              <p className={cn(
                  "text-xl font-bold",
                  isSameDay(day, new Date()) && "text-primary"
                )}>{format(day, 'd')}</p>
            </div>
            <div className="relative">
              {/* Hour lines */}
              {hours.map(hour => (
                <div key={hour} style={{ height: `${PIXELS_PER_HOUR}px` }} className="border-t border-dashed"></div>
              ))}

              {/* Scheduled Items */}
              <AnimatePresence>
                {(scheduledItemsByDay[format(day, 'yyyy-MM-dd')] || []).map((item, index) => (
                  <motion.div
                    key={item.taskId}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'absolute w-full p-2 rounded-md border-l-4 text-xs',
                      priorityColors[item.task.priority].bg,
                      priorityColors[item.task.priority].border
                    )}
                    style={{ top: item.top, height: item.height, left: '2px', right: '2px', width: 'calc(100% - 4px)'}}
                  >
                    <p className={cn('font-bold leading-tight', priorityColors[item.task.priority].text)}>
                      {item.task.description}
                    </p>
                    <p className={cn(priorityColors[item.task.priority].text, 'opacity-80')}>
                      {format(item.startTime, 'h:mm a')}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

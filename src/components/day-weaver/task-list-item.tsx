'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, Priority } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Trash2, AlertCircle } from 'lucide-react';
import { format, isWithinInterval, addHours } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskListItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityClasses: Record<Priority, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-500',
};

export default function TaskListItem({ task, onUpdateTask, onDeleteTask }: TaskListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleComplete = (checked: boolean) => {
    onUpdateTask({ ...task, completed: checked });
  };

  const handlePriorityChange = (priority: Priority) => {
    onUpdateTask({ ...task, priority });
  };

  const isDeadlineSoon = isWithinInterval(task.deadline, {
    start: new Date(),
    end: addHours(new Date(), 24),
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 bg-card p-3 rounded-lg border border-l-4 transition-shadow hover:shadow-md',
        priorityClasses[task.priority],
        task.completed && 'bg-muted/50'
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab p-2">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        className="h-5 w-5"
      />
      <div className="flex-grow">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            'font-medium transition-colors',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.description}
        </label>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>{format(task.deadline, 'MMM d, h:mm a')}</span>
          {isDeadlineSoon && !task.completed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Deadline is within 24 hours!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <Select onValueChange={handlePriorityChange} defaultValue={task.priority}>
        <SelectTrigger className="w-[110px] h-8">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onDeleteTask(task.id)}
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

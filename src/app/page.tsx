'use client';

import { useState, useMemo } from 'react';
import type { Task, ScheduleItem } from '@/lib/types';
import { getOptimizedSchedule } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import AppHeader from '@/components/day-weaver/header';
import TaskForm from '@/components/day-weaver/task-form';
import TaskList from '@/components/day-weaver/task-list';
import ProgressTracker from '@/components/day-weaver/progress-tracker';
import ScheduleTimeline from '@/components/day-weaver/schedule-timeline';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const taskIds = useMemo(() => tasks.map(task => task.id), [tasks]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const taskWithId: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
    };
    setTasks(prev => [...prev, taskWithId]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSchedule(prev => prev.filter(item => item.taskId !== taskId));
  };

  const handleOptimizeSchedule = async () => {
    if (tasks.length === 0) {
      toast({
        title: 'No tasks to schedule',
        description: 'Please add some tasks before optimizing.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await getOptimizedSchedule(tasks);
      if (result.schedule) {
        setSchedule(result.schedule);
        toast({
          title: 'Schedule Optimized!',
          description: 'Your new schedule is ready.',
        });
      } else {
        throw new Error('Optimization failed to return a schedule.');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Optimization Failed',
        description: 'Could not generate a schedule. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow p-4 md:p-6 lg:p-8 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 font-headline">Add a New Task</h2>
                  <TaskForm onAddTask={handleAddTask} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold font-headline">Your Tasks</h2>
                    <Button onClick={handleOptimizeSchedule} disabled={isLoading || tasks.length === 0}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Optimize Schedule
                    </Button>
                  </div>
                  <ProgressTracker tasks={tasks} />
                  <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    <TaskList
                      tasks={tasks}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                    />
                  </SortableContext>
                </CardContent>
              </Card>
            </div>

            <Card className="lg:sticky lg:top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-headline">Optimized Schedule</h2>
                <ScheduleTimeline schedule={schedule} tasks={tasks} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DndContext>
  );
}

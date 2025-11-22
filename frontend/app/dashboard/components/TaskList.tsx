"use client";

import { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimate: string;
}

interface TaskListProps {
  initialTasks?: Task[];
}

const defaultTasks: Task[] = [
  { id: 1, text: 'Review project proposal', completed: false, priority: 'high', estimate: '1.5h' },
  { id: 2, text: 'Complete focus session', completed: true, priority: 'medium', estimate: '45m' },
  { id: 3, text: 'Respond to emails', completed: false, priority: 'low', estimate: '30m' },
  { id: 4, text: 'Prepare presentation', completed: false, priority: 'high', estimate: '2h' }
];

export function TaskList({ initialTasks = defaultTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="p-6 rounded-3xl bg-slate-800/40 dark:bg-slate-800/40 light:bg-white/40 backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-black/5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold mb-1 text-white dark:text-white light:text-black">Today's Tasks</h3>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
            {completedCount} of {tasks.length} completed
          </p>
        </div>
      </div>

      <div className="mb-5 h-2 bg-slate-700/50 dark:bg-slate-700/50 light:bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 rounded-full"
          style={{ width: `${(completedCount / tasks.length) * 100}%` }}
        ></div>
      </div>

      <div className="space-y-2 mb-5">
        {tasks.map(task => (
          <div
            key={task.id}
            className="group flex items-start gap-3 p-4 rounded-xl hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-black/5 transition-all"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`mt-1 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed
                  ? 'bg-gradient-to-br from-primary-500 to-secondary-500 border-transparent'
                  : 'border-slate-600 dark:border-slate-600 light:border-slate-300 hover:border-primary-500'
                }`}
            >
              {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${task.priority === 'high'
                      ? 'bg-red-400'
                      : task.priority === 'medium'
                        ? 'bg-yellow-400'
                        : 'bg-blue-400'
                    }`}
                ></div>
                <span
                  className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500 dark:text-slate-500 light:text-slate-400' : 'text-white dark:text-white light:text-black'
                    }`}
                >
                  {task.text}
                </span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 ml-4">{task.estimate}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 dark:border-slate-700 light:border-slate-300 hover:border-primary-500 hover:bg-primary-500/5 transition-all flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-primary-400 font-medium">
        <Plus className="w-4 h-4" />
        Add a new task...
      </button>
    </div>
  );
}
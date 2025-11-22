"use client";

import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import {
    LayoutList,
    Kanban,
    Calendar as CalendarIcon,
    Plus,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const initialTasks = [
    { id: '1', title: 'Review Q3 Financials', status: 'todo', priority: 'high', tag: 'Finance', due: 'Today', time: '2h' },
    { id: '2', title: 'Update Landing Page', status: 'in-progress', priority: 'medium', tag: 'Design', due: 'Tomorrow', time: '4h' },
    { id: '3', title: 'Team Sync Meeting', status: 'done', priority: 'low', tag: 'Meeting', due: 'Yesterday', time: '1h' },
    { id: '4', title: 'Write Blog Post', status: 'todo', priority: 'medium', tag: 'Content', due: 'Fri', time: '3h' },
];

export default function TasksPage() {
    const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
    const [tasks, setTasks] = useState(initialTasks);

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex font-sans selection:bg-primary-500/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
            </div>

            <Sidebar activeTab="tasks" />

            <div className="relative flex-1 overflow-auto z-10">
                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Tasks</h1>
                            <p className="text-slate-400 mt-1">Manage your daily goals and projects</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <LayoutList className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('kanban')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Kanban className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <CalendarIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-105">
                                <Plus className="w-5 h-5" />
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Tasks', value: '12', icon: LayoutList, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Completed', value: '5', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                            { label: 'In Progress', value: '4', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                            { label: 'Overdue', value: '1', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all text-white placeholder:text-slate-500"
                            />
                        </div>
                        <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-slate-400 hover:text-white transition-all">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    {/* Task View Content */}
                    <div className="min-h-[400px]">
                        {viewMode === 'list' ? (
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 flex items-center gap-4 transition-all cursor-pointer"
                                    >
                                        <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 hover:border-primary-500'}`}>
                                            {task.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </button>

                                        <div className="flex-1">
                                            <h3 className={`font-medium text-white ${task.status === 'done' ? 'line-through text-slate-500' : ''}`}>{task.title}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                <span className={`px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${task.priority === 'high' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                                                    task.priority === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                                        'text-blue-400 border-blue-500/20 bg-blue-500/10'
                                                    }`}>
                                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                </span>
                                                <span>{task.tag}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
                                            </div>
                                        </div>

                                        <div className="text-sm text-slate-400 font-medium px-3 py-1 rounded-lg bg-white/5">
                                            {task.due}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {['todo', 'in-progress', 'done'].map((status) => (
                                    <div key={status} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold capitalize text-white">{status.replace('-', ' ')}</h3>
                                            <span className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-slate-400">
                                                {tasks.filter(t => t.status === status).length}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {tasks.filter(t => t.status === status).map(task => (
                                                <div key={task.id} className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm hover:border-white/20 transition-all cursor-grab active:cursor-grabbing">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${task.priority === 'high' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                                                            task.priority === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                                                'text-blue-400 border-blue-500/20 bg-blue-500/10'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-medium text-white mb-2">{task.title}</h4>
                                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                                        <span>{task.tag}</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="w-full py-2 rounded-xl border border-dashed border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2">
                                                <Plus className="w-4 h-4" /> Add Task
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

"use client";

import { Sidebar } from '../../components/Sidebar';
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Download,
    Zap,
    Award,
    Flame,
    Clock,
    Target,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock Data
const focusTrendData = [
    { name: 'Mon', hours: 4.5 },
    { name: 'Tue', hours: 6.2 },
    { name: 'Wed', hours: 5.8 },
    { name: 'Thu', hours: 7.5 },
    { name: 'Fri', hours: 5.1 },
    { name: 'Sat', hours: 3.2 },
    { name: 'Sun', hours: 2.0 },
];

const categoryData = [
    { name: 'Coding', value: 45, color: '#8b5cf6' }, // Purple
    { name: 'Design', value: 25, color: '#06b6d4' }, // Cyan
    { name: 'Meetings', value: 15, color: '#f43f5e' }, // Rose
    { name: 'Writing', value: 15, color: '#f59e0b' }, // Amber
];

const insights = [
    { icon: Zap, title: 'Peak Performance', desc: 'Your best focus time is 10 AM - 12 PM', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Clock, title: 'Session Length', desc: '45-min sessions work best for you', color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { icon: Calendar, title: 'Consistency', desc: 'Evening planning boosts next day by 23%', color: 'text-secondary-400', bg: 'bg-secondary-500/10' },
];

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-[#09090b] text-white flex font-sans selection:bg-primary-500/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
            </div>

            <Sidebar activeTab="analytics" />

            <div className="relative flex-1 overflow-auto z-10">
                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Analytics</h1>
                            <p className="text-slate-400 mt-1">Deep dive into your productivity metrics</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                                {['Today', 'Week', 'Month', 'Year'].map((range, i) => (
                                    <button
                                        key={range}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${i === 1 ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>

                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Focus Hours', value: '34.5h', change: '+12%', icon: Clock, color: 'text-primary-400' },
                            { label: 'Sessions Completed', value: '42', change: '+8%', icon: Target, color: 'text-secondary-400' },
                            { label: 'Productivity Score', value: '87', change: '+5%', icon: BarChart3, color: 'text-emerald-400' },
                            { label: 'Current Streak', value: '12 Days', change: 'Best!', icon: Flame, color: 'text-amber-400' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Main Chart */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Focus Trends</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-primary-500"></span> Focus Hours
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={focusTrendData}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorHours)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Two Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Category Breakdown */}
                        <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
                            <h3 className="text-lg font-bold text-white mb-6">Category Breakdown</h3>
                            <div className="h-[250px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-white">34.5h</span>
                                    <span className="text-xs text-slate-400">Total</span>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                {categoryData.map((cat, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                                            <span className="text-slate-400">{cat.name}</span>
                                        </div>
                                        <span className="font-medium text-white">{cat.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: AI Insights */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-lg font-bold text-white">AI Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {insights.map((insight, i) => (
                                    <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all">
                                        <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center mb-4`}>
                                            <insight.icon className={`w-5 h-5 ${insight.color}`} />
                                        </div>
                                        <h4 className="font-bold text-white mb-1">{insight.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">{insight.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Activity Heatmap Placeholder (Simplified) */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Activity Heatmap</h3>
                                    <div className="flex gap-1 text-xs text-slate-400">
                                        <span>Less</span>
                                        <div className="flex gap-0.5">
                                            <div className="w-3 h-3 bg-white/5 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-primary-500/30 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-primary-500/60 rounded-sm"></div>
                                            <div className="w-3 h-3 bg-primary-500 rounded-sm"></div>
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-1 h-32">
                                    {Array.from({ length: 84 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-sm transition-all hover:scale-125 ${Math.random() > 0.7 ? 'bg-primary-500' :
                                                Math.random() > 0.4 ? 'bg-primary-500/60' :
                                                    Math.random() > 0.2 ? 'bg-primary-500/30' : 'bg-white/5'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

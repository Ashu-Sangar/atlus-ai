"use client";

import { TrendingUp, Calendar, Target, Activity, Settings, LogOut, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
}

export function Sidebar({ activeTab = 'overview' }: SidebarProps) {
  const navItems = [
    { icon: TrendingUp, label: 'Overview', id: 'overview' },
    { icon: Calendar, label: 'Sessions', id: 'sessions' },
    { icon: Target, label: 'Tasks', id: 'tasks' },
    { icon: Activity, label: 'Analytics', id: 'analytics' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className="relative w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-lg">FocusMate AI</div>
          <div className="text-xs text-slate-400">Stay focused</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all text-slate-400 hover:text-white">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </div>
    </div>
  );
}
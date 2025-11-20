"use client";

import { TrendingUp, Calendar, Target, Activity, Settings, LogOut, Zap } from 'lucide-react';

import Link from 'next/link';

interface SidebarProps {
  activeTab?: string;
}

export function Sidebar({ activeTab = 'overview' }: SidebarProps) {
  const navItems = [
    { icon: TrendingUp, label: 'Overview', id: 'overview', href: '/dashboard' },
    { icon: Calendar, label: 'Sessions', id: 'sessions', href: '/session' },
    { icon: Target, label: 'Tasks', id: 'tasks', href: '/tasks' },
    { icon: Activity, label: 'Analytics', id: 'analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', id: 'settings', href: '/settings' }
  ];

  return (
    <div className="relative w-72 bg-[#0a0a12]/80 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl blur-lg opacity-50"></div>
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-xl border border-white/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
        <div>
          <div className="font-bold text-lg tracking-tight text-white">FocusMate</div>
          <div className="text-xs font-medium text-slate-400 tracking-wide uppercase">Pro Workspace</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 ${activeTab === item.id
              ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-white border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
              }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 cursor-pointer transition-all text-slate-400 hover:text-red-400 group">
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
}
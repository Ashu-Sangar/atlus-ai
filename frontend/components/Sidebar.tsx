"use client";

import { TrendingUp, Calendar, Target, Activity, Settings, LogOut, Zap } from 'lucide-react';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeTab?: string;
}

export function Sidebar({ activeTab = 'overview' }: SidebarProps) {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const navItems = [
    { icon: TrendingUp, label: 'Overview', id: 'overview', href: '/dashboard' },
    { icon: Calendar, label: 'Sessions', id: 'sessions', href: '/session' },
    { icon: Target, label: 'Tasks', id: 'tasks', href: '/tasks' },
    { icon: Activity, label: 'Analytics', id: 'analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', id: 'settings', href: '/settings' }
  ];

  return (
    <div className="relative w-72 bg-[#09090b]/80 dark:bg-[#09090b]/80 light:bg-white/80 backdrop-blur-xl border-r border-white/5 dark:border-white/5 light:border-black/5 p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl blur-lg opacity-50"></div>
          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-xl border border-white/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
        <div>
          <div className="font-bold text-lg tracking-tight text-white dark:text-white light:text-black">Atlus</div>
          <div className="text-xs font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 tracking-wide uppercase">Pro Workspace</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 ${activeTab === item.id
              ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-white dark:text-white light:text-black border border-primary-500/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
              : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 border border-transparent hover:border-white/5 dark:hover:border-white/5 light:hover:border-black/5'
              }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-primary-400' : 'group-hover:text-primary-400'}`} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/5 dark:border-white/5 light:border-black/5 space-y-2">
        <div
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 cursor-pointer transition-all text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-red-400 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
}
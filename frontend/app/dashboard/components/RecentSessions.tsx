"use client";

import { MoreHorizontal } from 'lucide-react';

interface Session {
  title: string;
  tag: string;
  time: string;
  duration: string;
  score: string;
  tagColor: string;
}

const sessions: Session[] = [
  {
    title: 'Deep Work: Project Review',
    tag: 'Deep Work',
    time: '2 hours ago',
    duration: '45 min',
    score: '92%',
    tagColor: 'bg-primary-500/20 text-primary-300 border-primary-500/30'
  },
  {
    title: 'Focus Session: Writing',
    tag: 'Writing',
    time: '4 hours ago',
    duration: '25 min',
    score: '88%',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    title: 'Study Session: Research',
    tag: 'Research',
    time: 'Yesterday',
    duration: '50 min',
    score: '95%',
    tagColor: 'bg-secondary-500/20 text-secondary-300 border-secondary-500/30'
  }
];

export function RecentSessions() {
  return (
    <div className="p-6 rounded-3xl bg-slate-800/40 dark:bg-slate-800/40 light:bg-white/40 backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-black/5">
      <h4 className="text-lg font-bold mb-4 text-white dark:text-white light:text-black">Recent Sessions</h4>
      <div className="space-y-3">
        {sessions.map((session, i) => (
          <div
            key={i}
            className="group p-5 rounded-2xl bg-slate-800/50 dark:bg-slate-800/50 light:bg-black/5 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-black/10 border border-slate-700/50 dark:border-slate-700/50 light:border-black/5 hover:border-slate-600/50 dark:hover:border-slate-600/50 light:hover:border-black/10 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="font-semibold text-white dark:text-white light:text-black">{session.title}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${session.tagColor}`}
                  >
                    {session.tag}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 ml-5">
                  <span>{session.time}</span>
                  <span>•</span>
                  <span>{session.duration}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{session.score} focus</span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-600/50 dark:hover:bg-slate-600/50 light:hover:bg-black/10 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
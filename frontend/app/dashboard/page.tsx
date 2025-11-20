"use client";

import { Sidebar } from "../../components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCards } from "./components/StatsCard";
import { NextSessionCard } from "./components/NextSession";
import { RecentSessions } from "./components/RecentSessions";
import { ProductivityChart } from "./components/ProductivityChart";
import { TaskList } from "./components/TaskList";
import { AIInsights } from "./components/AIInsights";

export default function DashboardPage() {
  const handleStartSession = () => {
    console.log("Starting session...");
    // Add your session start logic here
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white flex font-sans selection:bg-purple-500/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar */}
      <Sidebar activeTab="overview" />

      {/* Main Content */}
      <div className="relative flex-1 overflow-auto z-10">
        <DashboardHeader userName="Alex" onStartSession={handleStartSession} />

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Overview Header */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Overview</h2>
              <p className="text-slate-400 mt-1">Your productivity ecosystem at a glance</p>
            </div>
            <div className="text-sm text-slate-500 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5">
              Last updated: Just now
            </div>
          </div>

          {/* Stats Grid */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Sessions & Chart */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Focus Sessions</h3>
                    <p className="text-sm text-slate-400">Manage your deep work blocks</p>
                  </div>
                </div>

                <NextSessionCard
                  title="Deep Focus Block"
                  scheduledTime="3:00 PM today"
                  duration="60 minutes"
                  priority="High Priority"
                  onStart={handleStartSession}
                />

                <RecentSessions />
              </div>

              <ProductivityChart />
            </div>

            {/* Right Column - Tasks & Insights */}
            <div className="space-y-8">
              <TaskList />
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
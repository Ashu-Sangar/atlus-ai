"use client";

import { Sidebar } from "./components/Sidebar";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Sidebar */}
      <Sidebar activeTab="overview" />

      {/* Main Content */}
      <div className="relative flex-1 overflow-auto">
        <DashboardHeader userName="Alex" onStartSession={handleStartSession} />

        <div className="p-8">
          {/* Overview Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p className="text-slate-400">Your productivity at a glance</p>
          </div>

          {/* Stats Grid */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Sessions */}
            <div className="col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Focus Sessions</h3>
                    <p className="text-sm text-slate-400">Your recent and upcoming sessions</p>
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
            <div className="space-y-6">
              <TaskList />
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  TrendingUp,
  GraduationCap,
  Database,
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    id: 'students',
    label: 'Student Profiles',
    icon: Users,
    description: 'Directory & Management',
    badgeKey: 'totalStudents'
  },
  {
    id: 'tasks',
    label: 'Tasks & Assignments',
    icon: CheckSquare,
    description: 'Deadlines & Tracking',
    badgeKey: 'pendingTasks'
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: Calendar,
    description: 'Class Schedules',
    badgeKey: 'totalClasses'
  },
  {
    id: 'progress',
    label: 'Progress Tracking',
    icon: TrendingUp,
    description: 'Grades & Attendance'
  }
];

export default function Sidebar({ onCloseMobile }) {
  const { activeTab, setActiveTab, stats, resetToDefaults } = useApp();

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data back to the default seed datasets?")) {
      resetToDefaults();
    }
  };

  return (
    <aside className="w-64 xl:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-full select-none text-slate-300">
      {/* Top: Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">EduTrack</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-400">Student Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const badgeCount = item.badgeKey ? stats[item.badgeKey] : null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive
                          ? 'text-white scale-110'
                          : 'text-slate-400 group-hover:text-slate-200 group-hover:scale-105'
                      }`}
                    />
                    <div className="text-left">
                      <span className="block leading-none">{item.label}</span>
                      <span
                        className={`text-[11px] block mt-1 leading-none ${
                          isActive ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {item.description}
                      </span>
                    </div>
                  </div>

                  {badgeCount !== null && badgeCount !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isActive
                          ? 'bg-indigo-700/80 text-white border border-indigo-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom: Storage Status & Admin Profile */}
      <div className="p-4 border-t border-slate-800/80 space-y-4">
        {/* Storage Persistence Pill */}
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Local Storage
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-400">Offline Auto-Sync</p>
            <button
              onClick={handleReset}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 transition"
              title="Reset all data to seed defaults"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Data
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200 leading-tight">Admin Portal</p>
              <p className="text-xs text-slate-400">admin@edutrack.edu</p>
            </div>
          </div>
          <div className="text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-800" title="Active Session">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}

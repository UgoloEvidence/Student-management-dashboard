import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  Calendar as CalendarIcon,
  Plus,
  UserPlus,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const VIEW_TITLES = {
  dashboard: {
    title: 'Dashboard Overview',
    subtitle: 'Welcome back! Here is a summary of student activities and key metrics.'
  },
  students: {
    title: 'Student Profiles',
    subtitle: 'Manage student records, contact details, academic standing, and enrolments.'
  },
  tasks: {
    title: 'Tasks & Assignments',
    subtitle: 'Organise coursework, assign tasks, track deadlines, and monitor completion.'
  },
  timetable: {
    title: 'Class Timetable',
    subtitle: 'Weekly schedule of lectures, laboratory sessions, and classrooms.'
  },
  progress: {
    title: 'Academic Progress',
    subtitle: 'Track subject performance, grade point averages, and attendance rates.'
  }
};

export default function Header({ onOpenMobile, onQuickAddStudent, onQuickAddTask }) {
  const { activeTab, activities, stats } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentView = VIEW_TITLES[activeTab] || VIEW_TITLES.dashboard;

  // Formatted current date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 md:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {currentView.title}
            </h1>
            <p className="hidden sm:block text-xs text-slate-500 mt-0.5 max-w-md truncate">
              {currentView.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Date, Search, Notifications, Quick Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Date Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 text-slate-600 text-xs font-medium border border-slate-200/70">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span>{todayFormatted}</span>
          </div>

          {/* Search Input */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-100 border border-transparent rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
              title="Recent Activities"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Notifications & Activity</h4>
                      <p className="text-[11px] text-slate-400">Recent system actions</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-600">
                      {activities.length} new
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 px-2 py-1">
                    {activities.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">No recent activities</p>
                    ) : (
                      activities.map((act) => (
                        <div key={act.id} className="p-2.5 rounded-lg hover:bg-slate-50 transition flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-800 truncate">{act.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{act.description}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Action Button */}
          {onQuickAddStudent && (
            <button
              onClick={onQuickAddStudent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/30 transition hover:shadow-indigo-600/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Student</span>
            </button>
          )}

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
              ED
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

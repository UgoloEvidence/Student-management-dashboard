import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider, useToast } from './components/common/Toast';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';

// Feature Views
import DashboardView from './modules/dashboard/DashboardView';
import StudentsView from './modules/students/StudentsView';
import TasksView from './modules/tasks/TasksView';
import TimetableView from './modules/timetable/TimetableView';
import ProgressView from './modules/progress/ProgressView';

function DashboardShell() {
  const { activeTab, setActiveTab } = useApp();
  const { addToast } = useToast();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Quick Action Handler from Header
  const handleQuickAddStudent = () => {
    setActiveTab('students');
    addToast('Navigated to Student Directory. Click "Add Student" to enroll.', 'info');
  };

  // View Switcher Router
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView />;
      case 'tasks':
        return <TasksView />;
      case 'timetable':
        return <TimetableView />;
      case 'progress':
        return <ProgressView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row">
      {/* 1. Desktop Persistent Sidebar (Hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* 2. Mobile / Tablet Slide-over Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* 3. Main Application Shell */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Sticky Top Header */}
        <Header
          onOpenMobile={() => setIsMobileNavOpen(true)}
          onQuickAddStudent={handleQuickAddStudent}
        />

        {/* Scrollable View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Subtle Bottom Footer */}
        <footer className="border-t border-slate-200/80 bg-white/70 py-4 px-6 text-center text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <p>EduTrack Student Management Dashboard &bull; Modern React & Tailwind CSS</p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Local Storage Engine Online
              </span>
              <span>All records synced</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <DashboardShell />
      </ToastProvider>
    </AppProvider>
  );
}

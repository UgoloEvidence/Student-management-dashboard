import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/common/Toast';
import StudentModal from '../students/StudentModal';
import TaskModal from '../tasks/TaskModal';
import ClassSlotModal from '../timetable/ClassSlotModal';
import Button from '../../components/common/Button';
import {
  Users,
  CheckSquare,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  UserPlus,
  PlusCircle,
  CalendarPlus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function DashboardView() {
  const {
    stats,
    students,
    tasks,
    timetable,
    activities,
    setActiveTab,
    addStudent,
    addTask,
    addClassSlot,
    toggleTaskStatus
  } = useApp();

  const { addToast } = useToast();

  // Quick Action Modal States
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // Urgent upcoming deadlines (sorted by due date, pending or in progress)
  const urgentTasks = useMemo(() => {
    return tasks
      .filter((t) => t.status !== 'Completed')
      .slice(0, 4);
  }, [tasks]);

  // Today's / Upcoming Classes
  const upcomingClasses = useMemo(() => {
    return timetable.slice(0, 4);
  }, [timetable]);

  // Modal Save Handlers
  const handleSaveStudent = (data) => {
    addStudent(data);
    addToast(`Enrolled student: ${data.name}`, 'success');
  };

  const handleSaveTask = (data) => {
    addTask(data);
    addToast(`Created assignment: ${data.title}`, 'success');
  };

  const handleSaveClass = (data) => {
    addClassSlot(data);
    addToast(`Scheduled class: ${data.subject} on ${data.day}`, 'success');
  };

  const handleToggleTask = (id, title) => {
    toggleTaskStatus(id);
    addToast(`Status updated for "${title}"`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Banner with Quick Actions */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white shadow-xl shadow-indigo-600/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-indigo-100 backdrop-blur-xs mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Term 2026-2027 &bull; Active Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            EduTrack Executive Dashboard
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
            Live monitoring of student profiles, assignments, weekly timetables, and academic performance metrics.
          </p>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              icon={UserPlus}
              onClick={() => setIsAddStudentOpen(true)}
              className="bg-white text-indigo-700 hover:bg-indigo-50 border-transparent shadow-xs"
            >
              Add Student
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={PlusCircle}
              onClick={() => setIsAddTaskOpen(true)}
              className="bg-indigo-900/50 hover:bg-indigo-900/70 text-white border border-indigo-400/30"
            >
              Create Assignment
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={CalendarPlus}
              onClick={() => setIsAddClassOpen(true)}
              className="bg-indigo-900/50 hover:bg-indigo-900/70 text-white border border-indigo-400/30"
            >
              Schedule Class
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Interactive KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Students */}
        <div
          onClick={() => setActiveTab('students')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalStudents}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              100% Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Manage directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* Stat 2: Pending Tasks */}
        <div
          onClick={() => setActiveTab('tasks')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Coursework
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition shadow-2xs">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.pendingTasks}</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              {stats.inProgressTasks} In Progress
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>{stats.completedTasks} completed</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* Stat 3: Timetable Classes */}
        <div
          onClick={() => setActiveTab('timetable')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Scheduled Classes
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalClasses}</span>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
              Mon &ndash; Fri
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>View weekly grid</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-1 transition" />
          </p>
        </div>

        {/* Stat 4: Average Attendance */}
        <div
          onClick={() => setActiveTab('progress')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Attendance
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition shadow-2xs">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.avgAttendance}%</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              GPA {stats.avgGpa}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Academic reports</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition" />
          </p>
        </div>
      </div>

      {/* 3. Middle Section: Urgent Deadlines & Upcoming Lectures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Deadlines Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Urgent Tasks & Deadlines</h3>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              All Tasks ({tasks.length}) &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentTasks.length === 0 ? (
              <p className="text-center py-6 text-xs text-slate-400">All current coursework completed!</p>
            ) : (
              urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <button
                      onClick={() => handleToggleTask(task.id, task.title)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition shrink-0"
                      title="Mark as completed"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{task.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {task.subject} &bull; <span className="text-slate-700 font-medium">{task.studentName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        task.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Lectures Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Upcoming Classes</h3>
            </div>
            <button
              onClick={() => setActiveTab('timetable')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              Full Timetable &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 truncate">{cls.subject}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-indigo-700 border border-slate-200">
                      {cls.day}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {cls.room} &bull; {cls.instructor}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-semibold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200">
                    {cls.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Student Leaderboard & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Student Quick Roster */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Student Performance Leaderboard</h3>
              <p className="text-xs text-slate-400">High GPA & consistent attendance records</p>
            </div>
            <button
              onClick={() => setActiveTab('students')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              View All ({students.length}) &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {students.slice(0, 4).map((student) => (
              <div
                key={student.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition cursor-pointer"
                onClick={() => setActiveTab('students')}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.name}</p>
                    <p className="text-xs text-slate-400 truncate">{student.department} &bull; {student.grade}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800">GPA {student.gpa}</span>
                    <span className="block text-[11px] text-emerald-600 font-medium">
                      {student.attendanceRate}% Attd
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      student.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 col): Recent Activity Stream */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Live Activity Feed
            </h3>
            <span className="text-xs text-slate-400">System Log</span>
          </div>

          <div className="space-y-4">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0 ring-4 ring-indigo-50" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">{act.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{act.description}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Modals */}
      <StudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSave={handleSaveStudent}
      />

      <TaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onSave={handleSaveTask}
      />

      <ClassSlotModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onSave={handleSaveClass}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/common/Toast';
import TaskModal from './TaskModal';
import Button from '../../components/common/Button';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Calendar,
  User,
  CheckCircle2,
  Filter,
  Edit2,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';

const PRIORITY_STYLES = {
  High: 'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-sky-50 text-sky-700 border-sky-200'
};

const STATUS_TABS = ['All', 'Pending', 'In Progress', 'Completed'];

export default function TasksView() {
  const { tasks, addTask, updateTask, toggleTaskStatus, deleteTask } = useApp();
  const { addToast } = useToast();

  const [activeStatusTab, setActiveStatusTab] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTab = activeStatusTab === 'All' || task.status === activeStatusTab;
      const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.studentName && task.studentName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesPriority && matchesSearch;
    });
  }, [tasks, activeStatusTab, selectedPriority, searchQuery]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      addToast(`Updated assignment: "${taskData.title}"`, 'success');
    } else {
      addTask(taskData);
      addToast(`Created assignment: "${taskData.title}"`, 'success');
    }
  };

  const handleToggle = (id, title) => {
    toggleTaskStatus(id);
    addToast(`Status updated for "${title}"`, 'info');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteTask(id);
      addToast(`Deleted assignment: "${title}"`, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tasks & Assignments</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organise coursework, set milestones, and track student completion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
            New Assignment
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {STATUS_TABS.map((tab) => {
            const count =
              tab === 'All'
                ? tasks.length
                : tasks.filter((t) => t.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveStatusTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeStatusTab === tab
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeStatusTab === tab
                      ? 'bg-indigo-700/80 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Priority Filter and Search */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="w-full sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Task List Content */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No assignments found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            There are no tasks matching your selected filters. Create a new task to get started!
          </p>
          <div className="mt-4">
            <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
              Create Assignment
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border bg-white transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:shadow-sm ${
                  isCompleted
                    ? 'border-slate-200 bg-slate-50/50 opacity-80'
                    : 'border-slate-200 hover:border-indigo-200'
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggle(task.id, task.title)}
                    className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-amber-100 border-amber-300 text-amber-700'
                        : 'border-slate-300 hover:border-indigo-500 bg-white text-transparent'
                    }`}
                    title="Click to toggle status: Pending -> In Progress -> Completed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {task.subject}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          PRIORITY_STYLES[task.priority] || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold text-slate-900 leading-snug ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      {task.studentName && (
                        <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {task.studentName}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Pill, Edit & Delete */}
                <div className="flex items-center justify-between md:justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  <button
                    onClick={() => handleToggle(task.id, task.title)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isInProgress
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {task.status}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(task)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                    title="Edit assignment"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(task.id, task.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Add / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/common/Toast';
import ClassSlotModal from './ClassSlotModal';
import Button from '../../components/common/Button';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  LayoutGrid,
  Columns
} from 'lucide-react';

const DAYS = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const COLOR_MAP = {
  indigo: {
    card: 'border-l-indigo-600 bg-white hover:border-indigo-300',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  emerald: {
    card: 'border-l-emerald-600 bg-white hover:border-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  sky: {
    card: 'border-l-sky-600 bg-white hover:border-sky-300',
    badge: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  purple: {
    card: 'border-l-purple-600 bg-white hover:border-purple-300',
    badge: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  amber: {
    card: 'border-l-amber-600 bg-white hover:border-amber-300',
    badge: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  rose: {
    card: 'border-l-rose-600 bg-white hover:border-rose-300',
    badge: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  teal: {
    card: 'border-l-teal-600 bg-white hover:border-teal-300',
    badge: 'bg-teal-50 text-teal-700 border-teal-200'
  }
};

export default function TimetableView() {
  const { timetable, addClassSlot, deleteClassSlot } = useApp();
  const { addToast } = useToast();

  const [selectedDay, setSelectedDay] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'weekly-columns'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const filteredSchedule = useMemo(() => {
    return timetable.filter((slot) => selectedDay === 'All' || slot.day === selectedDay);
  }, [timetable, selectedDay]);

  const handleOpenAdd = () => {
    setEditingSlot(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slot) => {
    setEditingSlot(slot);
    setIsModalOpen(true);
  };

  const handleSaveSlot = (slotData) => {
    if (editingSlot) {
      deleteClassSlot(editingSlot.id);
      addClassSlot({ ...slotData, id: editingSlot.id });
      addToast(`Updated class schedule for ${slotData.subject}`, 'success');
    } else {
      addClassSlot(slotData);
      addToast(`Scheduled class: ${slotData.subject} on ${slotData.day}`, 'success');
    }
  };

  const handleDelete = (id, subject) => {
    if (window.confirm(`Are you sure you want to remove the scheduled slot for "${subject}"?`)) {
      deleteClassSlot(id);
      addToast(`Removed ${subject} from timetable`, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Class Timetable</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organise weekly lectures, lab sessions, and classroom allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
            Schedule Class
          </Button>
        </div>
      </div>

      {/* Filter and View Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Day Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {DAYS.map((day) => {
            const count =
              day === 'All'
                ? timetable.length
                : timetable.filter((s) => s.day === day).length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{day}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedDay === day
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

        {/* View Toggle (Grid vs Weekly Column Board) */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition flex items-center gap-1.5 text-xs font-semibold ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Card Grid"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Cards</span>
          </button>
          <button
            onClick={() => {
              setViewMode('weekly-columns');
              setSelectedDay('All');
            }}
            className={`p-1.5 rounded-lg transition flex items-center gap-1.5 text-xs font-semibold ${
              viewMode === 'weekly-columns' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Weekly Kanban View"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Day Board</span>
          </button>
        </div>
      </div>

      {/* Schedule Content */}
      {viewMode === 'weekly-columns' ? (
        /* 5-Column Weekly Schedule Board */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {WEEKDAYS.map((day) => {
            const daySlots = timetable.filter((s) => s.day === day);

            return (
              <div key={day} className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{day}</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {daySlots.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {daySlots.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      No classes
                    </div>
                  ) : (
                    daySlots.map((slot) => {
                      const colorInfo = COLOR_MAP[slot.color] || COLOR_MAP.indigo;

                      return (
                        <div
                          key={slot.id}
                          className={`p-3 rounded-xl border-l-4 border bg-white shadow-xs hover:shadow-sm transition space-y-2 ${colorInfo.card}`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                              {slot.subject}
                            </h5>
                            <button
                              onClick={() => handleDelete(slot.id, slot.subject)}
                              className="text-slate-400 hover:text-rose-600 p-0.5 shrink-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-[11px] space-y-1 text-slate-500">
                            <p className="flex items-center gap-1 font-semibold text-slate-700">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{slot.time}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{slot.room}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{slot.instructor}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : filteredSchedule.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No classes scheduled</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            There are no classes scheduled for {selectedDay}. Add a new lecture or lab session to populate this day.
          </p>
          <div className="mt-4">
            <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
              Schedule Class
            </Button>
          </div>
        </div>
      ) : (
        /* Regular Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedule.map((slot) => {
            const colorInfo = COLOR_MAP[slot.color] || COLOR_MAP.indigo;

            return (
              <div
                key={slot.id}
                className={`border-l-4 rounded-2xl p-5 border shadow-xs hover:shadow-sm transition flex flex-col justify-between ${colorInfo.card}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${colorInfo.badge}`}
                    >
                      {slot.day}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(slot)}
                        className="text-slate-400 hover:text-indigo-600 p-1 rounded-lg transition"
                        title="Edit slot"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(slot.id, slot.subject)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition"
                        title="Remove class"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-3 leading-snug">
                    {slot.subject}
                  </h4>

                  <div className="space-y-2 mt-4 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{slot.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{slot.room}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{slot.instructor}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Slot ID: {slot.id}</span>
                  <span className="font-medium text-emerald-600">Confirmed</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Class Slot Modal */}
      <ClassSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSlot}
        slotToEdit={editingSlot}
      />
    </div>
  );
}

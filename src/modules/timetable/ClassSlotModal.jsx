import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const COLORS = [
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
  { id: 'sky', label: 'Sky Blue', bg: 'bg-sky-500' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-500' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-500' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-500' },
  { id: 'teal', label: 'Teal', bg: 'bg-teal-500' }
];

export default function ClassSlotModal({ isOpen, onClose, onSave, slotToEdit = null }) {
  const isEditing = Boolean(slotToEdit);

  const [formData, setFormData] = useState({
    day: 'Monday',
    subject: '',
    time: '09:00 AM - 10:30 AM',
    room: '',
    instructor: '',
    color: 'indigo'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (slotToEdit) {
      setFormData({
        day: slotToEdit.day || 'Monday',
        subject: slotToEdit.subject || '',
        time: slotToEdit.time || '09:00 AM - 10:30 AM',
        room: slotToEdit.room || '',
        instructor: slotToEdit.instructor || '',
        color: slotToEdit.color || 'indigo'
      });
    } else {
      setFormData({
        day: 'Monday',
        subject: '',
        time: '09:00 AM - 10:30 AM',
        room: '',
        instructor: '',
        color: 'indigo'
      });
    }
    setErrors({});
  }, [slotToEdit, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = 'Subject name is required';
    if (!formData.time.trim()) newErrors.time = 'Time slot is required';
    if (!formData.room.trim()) newErrors.room = 'Classroom or Lab is required';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Class Slot' : 'Schedule New Class'}
      subtitle={
        isEditing
          ? 'Update lecture time, location or instructor'
          : 'Add a new lecture, lab or seminar to the weekly timetable.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Day & Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Day of Week <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Distributed Systems"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.subject ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
          </div>
        </div>

        {/* Time Slot & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Time Slot <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="09:00 AM - 10:30 AM"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.time ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.time && <p className="text-[11px] text-rose-500 mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / Room <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="e.g. Lab 402 or Aud A"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.room ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.room && <p className="text-[11px] text-rose-500 mt-1">{errors.room}</p>}
          </div>
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Instructor / Professor <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="e.g. Dr. Alan Vance"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
              errors.instructor ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
            }`}
          />
          {errors.instructor && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.instructor}</p>
          )}
        </div>

        {/* Color Theme */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Color Accent</label>
          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setFormData({ ...formData, color: c.id })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  formData.color === c.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Schedule Class'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

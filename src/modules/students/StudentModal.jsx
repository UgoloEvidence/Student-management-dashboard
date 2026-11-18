import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
  'Electrical Engineering',
  'Business Analytics'
];

const GRADES = [
  'Freshman (Year 1)',
  'Sophomore (Year 2)',
  'Junior (Year 3)',
  'Senior (Year 4)'
];

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80'
];

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit = null }) {
  const isEditing = Boolean(studentToEdit);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: DEPARTMENTS[0],
    grade: GRADES[0],
    gpa: '3.50',
    attendanceRate: '95',
    status: 'Active',
    emergencyContact: '',
    enrolledSubjects: 'Data Structures, Database Systems',
    avatar: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        department: studentToEdit.department || DEPARTMENTS[0],
        grade: studentToEdit.grade || GRADES[0],
        gpa: String(studentToEdit.gpa || '3.50'),
        attendanceRate: String(studentToEdit.attendanceRate || '95'),
        status: studentToEdit.status || 'Active',
        emergencyContact: studentToEdit.emergencyContact || '',
        enrolledSubjects: Array.isArray(studentToEdit.enrolledSubjects)
          ? studentToEdit.enrolledSubjects.join(', ')
          : studentToEdit.enrolledSubjects || '',
        avatar: studentToEdit.avatar || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: DEPARTMENTS[0],
        grade: GRADES[0],
        gpa: '3.50',
        attendanceRate: '95',
        status: 'Active',
        emergencyContact: '',
        enrolledSubjects: 'Data Structures, Database Systems',
        avatar: ''
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      newErrors.gpa = 'GPA must be between 0.00 and 4.00';
    }

    const attNum = parseInt(formData.attendanceRate, 10);
    if (isNaN(attNum) || attNum < 0 || attNum > 100) {
      newErrors.attendanceRate = 'Attendance must be between 0% and 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Process enrolled subjects
    const subjectsArray = formData.enrolledSubjects
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Pick avatar if none provided
    const randomAvatar = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
    const finalAvatar = formData.avatar.trim() || randomAvatar;

    const payload = {
      ...formData,
      gpa: parseFloat(formData.gpa).toFixed(2),
      attendanceRate: parseInt(formData.attendanceRate, 10),
      enrolledSubjects: subjectsArray.length > 0 ? subjectsArray : ['General Studies'],
      avatar: finalAvatar
    };

    onSave(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Student Profile' : 'Enroll New Student'}
      subtitle={
        isEditing
          ? `Update details and academic standing for ${studentToEdit?.name}`
          : 'Complete the form below to register a new student.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.name ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. alex.morgan@university.edu"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.email ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.phone ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade Level & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            >
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            >
              <option value="Active">Active (Good Standing)</option>
              <option value="At Risk">At Risk (Academic Advisory)</option>
            </select>
          </div>
        </div>

        {/* GPA & Attendance Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              GPA (0.00 - 4.00)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.00"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.gpa ? 'border-rose-300 ring-rose-200' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.gpa && <p className="text-[11px] text-rose-500 mt-1">{errors.gpa}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attendance Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.attendanceRate}
              onChange={(e) => setFormData({ ...formData, attendanceRate: e.target.value })}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                errors.attendanceRate
                  ? 'border-rose-300 ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.attendanceRate && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.attendanceRate}</p>
            )}
          </div>
        </div>

        {/* Enrolled Courses (Comma separated) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Enrolled Subjects (comma-separated)
          </label>
          <input
            type="text"
            value={formData.enrolledSubjects}
            onChange={(e) => setFormData({ ...formData, enrolledSubjects: e.target.value })}
            placeholder="e.g. Data Structures, Cloud Computing, AI Ethics"
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />
          <p className="text-[11px] text-slate-400 mt-1">Separate multiple course codes with commas.</p>
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Emergency Contact Information
          </label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            placeholder="e.g. Jane Doe (Mother) - +1 (555) 987-6543"
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Register Student'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

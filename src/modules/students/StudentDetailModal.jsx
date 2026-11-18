import React from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Award,
  BookOpen,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function StudentDetailModal({
  isOpen,
  onClose,
  student,
  onEdit,
  onDelete
}) {
  const { tasks } = useApp();

  if (!student) return null;

  // Filter tasks assigned to this specific student
  const studentTasks = tasks.filter(
    (t) => t.assignedTo === student.id || t.studentName === student.name
  );

  const isHonours = parseFloat(student.gpa) >= 3.8;
  const isAtRisk = student.status === 'At Risk' || parseFloat(student.gpa) < 3.5;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile Dossier"
      subtitle={`Student ID: ${student.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    student.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                {student.department} • {student.grade}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Enrolled: {student.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            <Button
              variant="outline"
              size="sm"
              icon={Edit2}
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => {
                onDelete(student.id, student.name);
                onClose();
              }}
            >
              Archive
            </Button>
          </div>
        </div>

        {/* Academic Standing Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Cumulative GPA
            </span>
            <span className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              {student.gpa} / 4.0
            </span>
            <span
              className={`inline-block text-[10px] font-semibold mt-1 px-1.5 py-0.2 rounded ${
                isHonours
                  ? 'bg-purple-50 text-purple-700'
                  : isAtRisk
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              {isHonours ? "Dean's Honours" : isAtRisk ? 'Academic Warning' : 'Good Standing'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Attendance
            </span>
            <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
              {student.attendanceRate}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              {student.attendanceRate >= 90 ? 'Regular Attendance' : 'Low Attendance Alert'}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Assigned Tasks
            </span>
            <span className="text-xl font-extrabold text-indigo-600 mt-1 block">
              {studentTasks.length}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              {studentTasks.filter((t) => t.status === 'Completed').length} completed
            </span>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 text-xs">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
            Contact Channels
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800 truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800">{student.phone}</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        {student.emergencyContact && (
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-rose-900">Emergency Contact</h5>
              <p className="text-xs text-rose-700 mt-0.5">{student.emergencyContact}</p>
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        <div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">
            Enrolled Subjects ({student.enrolledSubjects?.length || 0})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {student.enrolledSubjects?.map((sub, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center gap-2 text-xs text-slate-700"
              >
                <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="font-semibold text-slate-800">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Coursework Preview */}
        {studentTasks.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">
              Assigned Coursework ({studentTasks.length})
            </h4>
            <div className="space-y-2">
              {studentTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-slate-800 truncate">{task.title}</p>
                    <p className="text-[11px] text-slate-400">{task.subject} • Due {task.dueDate}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      task.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : task.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

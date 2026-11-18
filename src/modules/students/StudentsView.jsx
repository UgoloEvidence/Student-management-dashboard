import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/common/Toast';
import StudentModal from './StudentModal';
import StudentDetailModal from './StudentDetailModal';
import Button from '../../components/common/Button';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Trash2,
  Edit2,
  ExternalLink,
  Award,
  Download,
  ArrowUpDown,
  LayoutGrid,
  List
} from 'lucide-react';

export default function StudentsView() {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'gpa', 'attendance'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  // Departments list for filter
  const departments = useMemo(() => {
    const set = new Set(students.map((s) => s.department));
    return ['All', ...Array.from(set)];
  }, [students]);

  // Filtered & Sorted students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = selectedDept === 'All' || s.department === selectedDept;
        return matchesSearch && matchesDept;
      })
      .sort((a, b) => {
        if (sortBy === 'gpa') return parseFloat(b.gpa) - parseFloat(a.gpa);
        if (sortBy === 'attendance') return b.attendanceRate - a.attendanceRate;
        return a.name.localeCompare(b.name);
      });
  }, [students, searchTerm, selectedDept, sortBy]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsAddEditModalOpen(true);
  };

  const handleSaveStudent = (formData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      addToast(`Updated record for ${formData.name}`, 'success');
    } else {
      addStudent(formData);
      addToast(`Enrolled new student: ${formData.name}`, 'success');
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}'s profile?`)) {
      deleteStudent(id);
      addToast(`Archived student record: ${name}`, 'error');
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Grade', 'GPA', 'AttendanceRate', 'Status'];
    const rows = students.map((s) => [
      s.id,
      `"${s.name}"`,
      s.email,
      s.phone,
      `"${s.department}"`,
      `"${s.grade}"`,
      s.gpa,
      `${s.attendanceRate}%`,
      s.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Student roster exported to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage academic profiles, course enrolments, and emergency records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
            Add Student
          </Button>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, ID, email or department..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
          />
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="name">Sort by Name</option>
              <option value="gpa">Sort by GPA (High to Low)</option>
              <option value="attendance">Sort by Attendance</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs font-semibold text-slate-400 px-1 whitespace-nowrap">
            {filteredStudents.length} of {students.length}
          </span>
        </div>
      </div>

      {/* Students Content Area: Grid or Table */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No students found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or enroll a new student profile.
          </p>
          <div className="mt-4">
            <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
              Enroll Student
            </Button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition group flex flex-col justify-between"
            >
              <div>
                {/* Top: Avatar, Name, Status */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => setViewingStudent(student)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                        {student.name}
                      </h4>
                      <p className="text-xs text-indigo-600 font-semibold">{student.id}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      student.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{student.department} • {student.grade}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-500">{student.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-500">{student.phone}</span>
                  </p>
                </div>

                {/* Metrics Pill */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cumulative GPA</span>
                    <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {student.gpa} / 4.0
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Attendance</span>
                    <span className="text-sm font-extrabold text-emerald-600">
                      {student.attendanceRate}%
                    </span>
                  </div>
                </div>

                {/* Enrolled Subjects Preview */}
                <div className="mt-3">
                  <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                    Enrolled Courses ({student.enrolledSubjects?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {student.enrolledSubjects?.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {sub}
                      </span>
                    ))}
                    {student.enrolledSubjects?.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-medium px-1">
                        +{student.enrolledSubjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setViewingStudent(student)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Dossier
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(student)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Remove Profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Department & Grade</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4 text-center">GPA</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div
                        onClick={() => setViewingStudent(student)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 hover:text-indigo-600">{student.name}</p>
                          <p className="text-[11px] text-indigo-600 font-semibold">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{student.department}</p>
                      <p className="text-[11px] text-slate-400">{student.grade}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-700">{student.email}</p>
                      <p className="text-[11px] text-slate-400">{student.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-slate-900">{student.gpa}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-emerald-600">{student.attendanceRate}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                          title="View Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id, student.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={editingStudent}
      />

      {/* Student Profile Detail Drawer Modal */}
      <StudentDetailModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Calculator,
  UserCheck,
  Star,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2
} from 'lucide-react';

const GRADE_POINTS = {
  'A (4.0)': 4.0,
  'A- (3.7)': 3.7,
  'B+ (3.3)': 3.3,
  'B (3.0)': 3.0,
  'B- (2.7)': 2.7,
  'C+ (2.3)': 2.3,
  'C (2.0)': 2.0,
  'F (0.0)': 0.0
};

export default function ProgressView() {
  const { students, subjectPerformance, stats, setActiveTab } = useApp();
  const { addToast } = useToast();

  const honoursStudents = students.filter((s) => parseFloat(s.gpa) >= 3.8);
  const atRiskStudents = students.filter((s) => parseFloat(s.gpa) < 3.5 || s.attendanceRate < 90);

  // Interactive Grade Calculator State
  const [calculatorCourses, setCalculatorCourses] = useState([
    { id: 1, course: 'Data Structures', credits: 4, grade: 'A (4.0)' },
    { id: 2, course: 'Cloud Computing', credits: 3, grade: 'B+ (3.3)' },
    { id: 3, course: 'Database Systems', credits: 3, grade: 'A- (3.7)' }
  ]);

  const addCalculatorRow = () => {
    setCalculatorCourses([
      ...calculatorCourses,
      {
        id: Date.now(),
        course: `Elective ${calculatorCourses.length + 1}`,
        credits: 3,
        grade: 'A (4.0)'
      }
    ]);
  };

  const removeCalculatorRow = (id) => {
    if (calculatorCourses.length <= 1) return;
    setCalculatorCourses(calculatorCourses.filter((c) => c.id !== id));
  };

  const updateCalculatorRow = (id, field, value) => {
    setCalculatorCourses(
      calculatorCourses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Compute calculated GPA
  const totalCredits = calculatorCourses.reduce((sum, c) => sum + (parseInt(c.credits) || 0), 0);
  const totalPoints = calculatorCourses.reduce(
    (sum, c) => sum + (parseInt(c.credits) || 0) * (GRADE_POINTS[c.grade] || 0),
    0
  );
  const projectedGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Academic Progress Tracking</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor institutional benchmarks, course subject mastery, and Dean's Honour Roll standings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Term: Fall 2026
          </span>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Average GPA */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average GPA</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.avgGpa}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Target: 3.50
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Institution-wide cumulative</p>
        </div>

        {/* Stat 2: Attendance */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.avgAttendance}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              &gt;85% Standard
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Classroom attendance rate</p>
        </div>

        {/* Stat 3: Dean's Honour Roll */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dean's Honour Roll</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-700">{honoursStudents.length}</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              GPA &ge; 3.8
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Distinguished scholars</p>
        </div>

        {/* Stat 4: Advisory Attention */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Advisory Watch</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">{atRiskStudents.length}</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Need Support
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Low attendance or GPA &lt; 3.5</p>
        </div>
      </div>

      {/* Two Column Section: Course Breakdown & GPA Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Course Score & Attendance Mastery */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Course Mastery & Attendance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Performance distribution per curriculum subject</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {subjectPerformance.length} Subjects
            </span>
          </div>

          <div className="space-y-4">
            {subjectPerformance.map((subj, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-800">{subj.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-indigo-600">{subj.averageScore}% Score</span>
                    <span className="text-xs font-bold text-emerald-600">{subj.attendance}% Attd</span>
                  </div>
                </div>

                {/* Score Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Average Exam Score</span>
                    <span>{subj.averageScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${subj.color} transition-all duration-500`}
                      style={{ width: `${subj.averageScore}%` }}
                    />
                  </div>
                </div>

                {/* Attendance Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Lecture Attendance</span>
                    <span>{subj.attendance}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${subj.attendance}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive GPA Simulator & Calculator */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">GPA Simulator</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Project semester GPA based on target course grades</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Projected GPA
                </span>
                <span className="text-2xl font-black text-indigo-600 leading-none">
                  {projectedGpa}
                </span>
              </div>
            </div>

            {/* Course rows */}
            <div className="space-y-3 mt-4 max-h-72 overflow-y-auto pr-1">
              {calculatorCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 text-xs"
                >
                  <input
                    type="text"
                    value={c.course}
                    onChange={(e) => updateCalculatorRow(c.id, 'course', e.target.value)}
                    className="flex-1 font-semibold text-slate-800 bg-transparent focus:outline-none focus:border-b focus:border-indigo-500"
                  />

                  <div className="flex items-center gap-2">
                    <select
                      value={c.credits}
                      onChange={(e) => updateCalculatorRow(c.id, 'credits', e.target.value)}
                      className="px-2 py-1 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="1">1 Credit</option>
                      <option value="2">2 Credits</option>
                      <option value="3">3 Credits</option>
                      <option value="4">4 Credits</option>
                    </select>

                    <select
                      value={c.grade}
                      onChange={(e) => updateCalculatorRow(c.id, 'grade', e.target.value)}
                      className="px-2 py-1 rounded-lg border border-slate-200 bg-white font-bold text-indigo-600 focus:outline-none"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeCalculatorRow(c.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCalculatorRow}
              className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Course to Simulator
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 flex items-center justify-between">
            <span>Total Credit Hours: <strong>{totalCredits}</strong></span>
            <span>Grade Scale: <strong>Standard 4.0</strong></span>
          </div>
        </div>
      </div>

      {/* Dean's Honour Roll Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Dean's Honour Roll Scholars</h3>
              <p className="text-xs text-slate-400 mt-0.5">Students maintaining a cumulative GPA of 3.80 or higher</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('students')}
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
          >
            Manage Profiles &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {honoursStudents.map((scholar, idx) => (
            <div
              key={scholar.id}
              className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 hover:border-purple-200 transition flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={scholar.avatar}
                  alt={scholar.name}
                  className="w-11 h-11 rounded-xl object-cover border border-purple-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-purple-900 truncate">{scholar.name}</span>
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{scholar.department}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-purple-700 block">GPA {scholar.gpa}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">{scholar.attendanceRate}% Attd</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Advisory & Intervention Spotlight */}
      {atRiskStudents.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 text-base">Academic Advisory Attention</h3>
                <p className="text-xs text-amber-700 mt-0.5">
                  Early alert list for students approaching GPA or attendance minimum thresholds
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {atRiskStudents.length} Students
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {atRiskStudents.map((st) => (
              <div
                key={st.id}
                className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs flex items-center justify-between gap-4"
              >
                <div>
                  <h5 className="font-bold text-xs text-slate-900">{st.name}</h5>
                  <p className="text-[11px] text-slate-400">{st.department} • {st.grade}</p>
                  <p className="text-[11px] text-rose-600 font-medium mt-1">
                    {st.attendanceRate < 90
                      ? `Low Attendance: ${st.attendanceRate}%`
                      : `Academic Warning: GPA ${st.gpa}`}
                  </p>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => {
                      setActiveTab('tasks');
                      addToast(`Navigated to tasks for ${st.name}`, 'info');
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition"
                  >
                    Assign Task &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

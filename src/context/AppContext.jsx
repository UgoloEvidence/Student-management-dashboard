import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  INITIAL_STUDENTS,
  INITIAL_TASKS,
  INITIAL_TIMETABLE,
  INITIAL_ACTIVITIES,
  SUBJECT_PERFORMANCE
} from '../data/initialData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useLocalStorage('edu_active_tab', 'dashboard');

  // Core Data States (persisted to localStorage)
  const [students, setStudents] = useLocalStorage('edu_students', INITIAL_STUDENTS);
  const [tasks, setTasks] = useLocalStorage('edu_tasks', INITIAL_TASKS);
  const [timetable, setTimetable] = useLocalStorage('edu_timetable', INITIAL_TIMETABLE);
  const [activities, setActivities] = useLocalStorage('edu_activities', INITIAL_ACTIVITIES);

  // Student CRUD
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: studentData.id || `STU-${String(students.length + 1).padStart(3, '0')}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setStudents((prev) => [newStudent, ...prev]);

    // Record activity
    const activity = {
      id: `ACT-${Date.now()}`,
      title: "New Student Enrolled",
      description: `${newStudent.name} (${newStudent.department}) enrolled.`,
      time: "Just now",
      type: "enrollment"
    };
    setActivities((prev) => [activity, ...prev.slice(0, 9)]);
  };

  const updateStudent = (id, updatedFields) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, ...updatedFields } : student))
    );
  };

  const deleteStudent = (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((student) => student.id !== id));

    if (studentToDelete) {
      const activity = {
        id: `ACT-${Date.now()}`,
        title: "Student Record Removed",
        description: `${studentToDelete.name}'s profile was archived.`,
        time: "Just now",
        type: "archive"
      };
      setActivities((prev) => [activity, ...prev.slice(0, 9)]);
    }
  };

  // Task CRUD
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: taskData.id || `TSK-${Date.now().toString().slice(-4)}`,
      status: taskData.status || "Pending"
    };
    setTasks((prev) => [newTask, ...prev]);

    const activity = {
      id: `ACT-${Date.now()}`,
      title: "New Assignment Created",
      description: `Task "${newTask.title}" assigned for ${newTask.subject}.`,
      time: "Just now",
      type: "task"
    };
    setActivities((prev) => [activity, ...prev.slice(0, 9)]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextStatus =
            task.status === "Pending"
              ? "In Progress"
              : task.status === "In Progress"
              ? "Completed"
              : "Pending";
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Timetable CRUD
  const addClassSlot = (slotData) => {
    const newSlot = {
      ...slotData,
      id: slotData.id || `SCH-${Date.now().toString().slice(-4)}`
    };
    setTimetable((prev) => [...prev, newSlot]);
  };

  const deleteClassSlot = (id) => {
    setTimetable((prev) => prev.filter((slot) => slot.id !== id));
  };

  // Reset to initial seed data
  const resetToDefaults = () => {
    setStudents(INITIAL_STUDENTS);
    setTasks(INITIAL_TASKS);
    setTimetable(INITIAL_TIMETABLE);
    setActivities(INITIAL_ACTIVITIES);
  };

  // Summary statistics for KPI cards
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
    const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const totalTasks = tasks.length;

    const avgGpa = totalStudents > 0
      ? (students.reduce((acc, s) => acc + (parseFloat(s.gpa) || 0), 0) / totalStudents).toFixed(2)
      : "0.00";

    const avgAttendance = totalStudents > 0
      ? Math.round(students.reduce((acc, s) => acc + (parseFloat(s.attendanceRate) || 0), 0) / totalStudents)
      : 0;

    return {
      totalStudents,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      totalTasks,
      avgGpa,
      avgAttendance,
      totalClasses: timetable.length
    };
  }, [students, tasks, timetable]);

  const value = {
    activeTab,
    setActiveTab,
    students,
    tasks,
    timetable,
    activities,
    subjectPerformance: SUBJECT_PERFORMANCE,
    stats,
    addStudent,
    updateStudent,
    deleteStudent,
    addTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    addClassSlot,
    deleteClassSlot,
    resetToDefaults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

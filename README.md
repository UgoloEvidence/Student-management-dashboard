# 🎓 EduTrack — Modern Student Management Dashboard

A modern, responsive, and feature-rich **Student Management Dashboard** built with **React**, **JavaScript**, **Tailwind CSS**, and **LocalStorage**.

---

## 🚀 Key Modules & Features

### 1. 📊 Executive Dashboard Overview
- **Interactive KPI Cards:** Real-time statistics on Enrolled Students, Pending Coursework, Weekly Scheduled Classes, and Average Attendance Rate.
- **Quick Action Triggers:** Modal dialogs to add new students, create assignments, and schedule class slots directly from the dashboard hero banner.
- **Urgent Deadlines Widget:** Prioritised assignment alerts with direct status-completion toggles.
- **Today's Classes:** Quick preview of daily lectures, room numbers, and instructor allocations.
- **Live Activity Feed:** System event log capturing student enrolments, assignment submissions, and grade updates.

### 2. 👥 Student Profiles & Management
- **Full CRUD Support:** Add, edit, archive/delete, and view in-depth student profiles.
- **Search & Department Filters:** Real-time filtering by name, email, student ID, or academic department.
- **Multi-criteria Sorting:** Sort student directory by Name, Cumulative GPA, or Attendance Rate.
- **Dual View Modes:** Switch seamlessly between **Card Grid** and **Table View**.
- **Student Dossier Drawer:** Comprehensive profile view with GPA honours classification, contact info, emergency contacts, enrolled subjects, and assigned tasks.
- **CSV Export:** One-click export of the student roster to a `.csv` spreadsheet file.

### 3. ✅ Tasks & Assignments
- **Coursework Management:** Create, edit, and assign tasks with due dates, priority tiers (*High*, *Medium*, *Low*), and subject tags.
- **Student Association:** Assign tasks directly to students enrolled in the system.
- **Interactive Status Workflow:** Cycle task statuses (*Pending* ➔ *In Progress* ➔ *Completed*) with real-time checkbox animations.
- **Status Tabs & Priority Filters:** Easily filter tasks by completion status and urgency.

### 4. 📅 Student Timetable & Class Schedules
- **Weekly Schedule Organisation:** Organize lectures, lab sessions, seminars, rooms, and professors from Monday to Friday.
- **Day Filters:** View all classes or filter specifically by day of the week.
- **Weekly Kanban Board View:** Dedicated 5-column day board displaying daily schedules side-by-side.
- **Color Accents:** Custom color badges (Indigo, Emerald, Sky Blue, Purple, Amber, Rose, Teal) per course subject.

### 5. 📈 Academic Progress & Performance
- **Institutional Benchmarks:** Track institutional average GPA (target: 3.50) and overall attendance standards (&gt;85%).
- **Subject Mastery Gauges:** Visual progress bars displaying exam score averages and lecture attendance percentages across curriculum subjects.
- **Dean's Honour Roll Leaderboard:** Spotlight dedicated to high-achieving scholars with GPAs &ge; 3.80.
- **Academic Advisory Alerts:** Early warning system flagging students needing academic support or tutoring.
- **Interactive GPA Simulator:** Built-in credit hour & grade projection calculator.

---

## 🛠️ Technology Stack

- **Framework:** React 18 (Functional Components, Hooks, Context API)
- **Build Tool:** Vite 6 (Ultra-fast Hot Module Replacement)
- **Styling:** Tailwind CSS 3 (Responsive utility-first classes, custom color palettes)
- **Icons:** Lucide React (Clean, modern iconography)
- **Persistence:** Custom `useLocalStorage` hook (Offline-first data retention without external backend setup)
- **Notifications:** Built-in Toast notification toaster

---

## 📁 Project Architecture

```text
student-management-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx                     # Application entry point
    ├── App.jsx                      # App shell, responsive layout & view router
    ├── index.css                    # Tailwind CSS directives & scrollbar styles
    │
    ├── components/
    │   ├── common/                  # Reusable UI primitives
    │   │   ├── Button.jsx           # Customizable button variants & sizes
    │   │   ├── Modal.jsx            # Accessible dialog modal with backdrop
    │   │   ├── Badge.jsx            # Status & priority badges
    │   │   └── Toast.jsx            # Global notification toaster
    │   │
    │   └── layout/                  # Shell navigation
    │       ├── Sidebar.jsx          # Desktop persistent sidebar
    │       ├── Header.jsx           # Responsive header with search & notifications
    │       └── MobileNav.jsx        # Mobile slide-over navigation drawer
    │
    ├── context/                     # Global State Store
    │   ├── AppContext.jsx           # Unified React Context (Students, Tasks, Timetable)
    │   └── useLocalStorage.js       # LocalStorage synchronization hook
    │
    ├── data/
    │   └── initialData.js           # Seed datasets for instant dashboard interaction
    │
    └── modules/                     # Core Feature Modules
        ├── dashboard/               # Module 1: Dashboard Overview
        ├── students/                # Module 2: Student Profiles & Management
        ├── tasks/                   # Module 3: Tasks and Assignments
        ├── timetable/               # Module 4: Student Timetable
        └── progress/                # Module 5: Progress Tracking & GPA Simulator
```

---

## 💻 How to Run Locally

### 1. Navigate to Project Directory
```powershell
cd C:\Users\HomePC\.gemini\antigravity\scratch\student-management-dashboard
```

### 2. Start the Development Server
```powershell
npm run dev
```

The Vite dev server will start instantly at:
```text
http://localhost:3000
```

### 3. Build for Production
To verify or compile an optimized production distribution:
```powershell
npm run build
```

### 4. Preview Production Build
```powershell
npm run preview
```

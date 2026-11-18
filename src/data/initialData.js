/**
 * Initial seed data for the Student Management Dashboard.
 * This provides rich, realistic data so all features are interactive right from the start.
 */

export const INITIAL_STUDENTS = [
  {
    id: "STU-001",
    name: "Sophia Martinez",
    email: "sophia.martinez@university.edu",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    grade: "Senior (Year 4)",
    department: "Computer Science",
    gpa: 3.92,
    attendanceRate: 96,
    status: "Active",
    emergencyContact: "Elena Martinez (Mother) - +1 (555) 987-6543",
    enrolledSubjects: ["Data Structures", "Cloud Computing", "AI Ethics", "Database Systems"],
    joinedDate: "2023-09-01"
  },
  {
    id: "STU-002",
    name: "Marcus Chen",
    email: "marcus.chen@university.edu",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    grade: "Junior (Year 3)",
    department: "Information Technology",
    gpa: 3.75,
    attendanceRate: 91,
    status: "Active",
    emergencyContact: "David Chen (Father) - +1 (555) 876-5432",
    enrolledSubjects: ["Web Development", "Network Security", "Cloud Computing", "Operating Systems"],
    joinedDate: "2024-01-15"
  },
  {
    id: "STU-003",
    name: "Amara Patel",
    email: "amara.patel@university.edu",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    grade: "Sophomore (Year 2)",
    department: "Software Engineering",
    gpa: 3.88,
    attendanceRate: 94,
    status: "Active",
    emergencyContact: "Rajesh Patel (Father) - +1 (555) 765-4321",
    enrolledSubjects: ["Algorithms", "Object-Oriented Programming", "Discrete Mathematics", "Database Systems"],
    joinedDate: "2024-09-01"
  },
  {
    id: "STU-004",
    name: "Liam O'Connor",
    email: "liam.oconnor@university.edu",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    grade: "Senior (Year 4)",
    department: "Computer Science",
    gpa: 3.45,
    attendanceRate: 85,
    status: "At Risk",
    emergencyContact: "Fiona O'Connor (Sister) - +1 (555) 654-3210",
    enrolledSubjects: ["Compiler Design", "Computer Graphics", "AI Ethics"],
    joinedDate: "2023-09-01"
  },
  {
    id: "STU-005",
    name: "Zoe Washington",
    email: "zoe.washington@university.edu",
    phone: "+1 (555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    grade: "Freshman (Year 1)",
    department: "Data Science",
    gpa: 3.98,
    attendanceRate: 99,
    status: "Active",
    emergencyContact: "Angela Washington (Mother) - +1 (555) 543-2109",
    enrolledSubjects: ["Intro to Programming", "Linear Algebra", "Calculus I", "Data Science Principles"],
    joinedDate: "2025-09-01"
  },
  {
    id: "STU-006",
    name: "Ethan Wright",
    email: "ethan.wright@university.edu",
    phone: "+1 (555) 789-0123",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    grade: "Junior (Year 3)",
    department: "Information Technology",
    gpa: 3.62,
    attendanceRate: 89,
    status: "Active",
    emergencyContact: "Robert Wright (Father) - +1 (555) 432-1098",
    enrolledSubjects: ["Network Security", "Database Systems", "Software Testing"],
    joinedDate: "2024-01-15"
  }
];

export const INITIAL_TASKS = [
  {
    id: "TSK-101",
    title: "Implement Binary Search Tree Assignment",
    subject: "Data Structures",
    dueDate: "2026-11-22",
    priority: "High",
    status: "In Progress",
    assignedTo: "STU-001",
    studentName: "Sophia Martinez",
    description: "Build an AVL self-balancing search tree in C++ with deletion and rotation unit tests."
  },
  {
    id: "TSK-102",
    title: "Configure AWS VPC and Subnets Lab",
    subject: "Cloud Computing",
    dueDate: "2026-11-20",
    priority: "High",
    status: "Pending",
    assignedTo: "STU-002",
    studentName: "Marcus Chen",
    description: "Create public and private subnets, internet gateway, and route tables in AWS us-east-1."
  },
  {
    id: "TSK-103",
    title: "Prepare SQL Schema for Library Management",
    subject: "Database Systems",
    dueDate: "2026-11-25",
    priority: "Medium",
    status: "Completed",
    assignedTo: "STU-003",
    studentName: "Amara Patel",
    description: "Design 3NF relational schema with ER diagrams and sample queries in PostgreSQL."
  },
  {
    id: "TSK-104",
    title: "Essay: Ethical Implications of Generative Models",
    subject: "AI Ethics",
    dueDate: "2026-11-28",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "STU-004",
    studentName: "Liam O'Connor",
    description: "Write a 2000-word critical evaluation on copyright and synthetic media governance."
  },
  {
    id: "TSK-105",
    title: "Linear Algebra Eigenvalues Problem Set",
    subject: "Linear Algebra",
    dueDate: "2026-11-21",
    priority: "High",
    status: "Pending",
    assignedTo: "STU-005",
    studentName: "Zoe Washington",
    description: "Solve problems 4.1 to 4.18 regarding characteristic polynomials and diagonalization."
  },
  {
    id: "TSK-106",
    title: "Penetration Testing Vulnerability Report",
    subject: "Network Security",
    dueDate: "2026-12-02",
    priority: "Low",
    status: "Pending",
    assignedTo: "STU-006",
    studentName: "Ethan Wright",
    description: "Run Wireshark and Nmap analysis against the test virtual laboratory and document findings."
  }
];

export const INITIAL_TIMETABLE = [
  {
    id: "SCH-01",
    day: "Monday",
    subject: "Data Structures",
    time: "09:00 AM - 10:30 AM",
    room: "Lab 302",
    instructor: "Dr. Sarah Jenkins",
    color: "indigo"
  },
  {
    id: "SCH-02",
    day: "Monday",
    subject: "Database Systems",
    time: "11:00 AM - 12:30 PM",
    room: "Hall B",
    instructor: "Prof. Alan Ross",
    color: "emerald"
  },
  {
    id: "SCH-03",
    day: "Tuesday",
    subject: "Cloud Computing",
    time: "10:00 AM - 11:30 AM",
    room: "Lab 105",
    instructor: "Dr. Maria Torres",
    color: "sky"
  },
  {
    id: "SCH-04",
    day: "Tuesday",
    subject: "AI Ethics",
    time: "02:00 PM - 03:30 PM",
    room: "Auditorium 1",
    instructor: "Dr. Neil Vance",
    color: "purple"
  },
  {
    id: "SCH-05",
    day: "Wednesday",
    subject: "Web Development",
    time: "09:00 AM - 11:00 AM",
    room: "Lab 204",
    instructor: "Prof. Kenneth Meyer",
    color: "amber"
  },
  {
    id: "SCH-06",
    day: "Wednesday",
    subject: "Linear Algebra",
    time: "01:00 PM - 02:30 PM",
    room: "Room 401",
    instructor: "Dr. Emily Zhang",
    color: "rose"
  },
  {
    id: "SCH-07",
    day: "Thursday",
    subject: "Network Security",
    time: "11:00 AM - 12:30 PM",
    room: "Lab 302",
    instructor: "Prof. Marcus Thorne",
    color: "teal"
  },
  {
    id: "SCH-08",
    day: "Friday",
    subject: "Algorithms Workshop",
    time: "10:00 AM - 12:00 PM",
    room: "Lab 101",
    instructor: "Dr. Sarah Jenkins",
    color: "indigo"
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "ACT-01",
    title: "Assignment Submitted",
    description: "Amara Patel submitted 'Prepare SQL Schema for Library Management'",
    time: "20 minutes ago",
    type: "submission"
  },
  {
    id: "ACT-02",
    title: "New Student Enrolled",
    description: "Zoe Washington was enrolled into Data Science (Freshman)",
    time: "2 hours ago",
    type: "enrollment"
  },
  {
    id: "ACT-03",
    title: "Attendance Logged",
    description: "Cloud Computing class marked: 28/30 present (93%)",
    time: "4 hours ago",
    type: "attendance"
  },
  {
    id: "ACT-04",
    title: "Grade Published",
    description: "Data Structures Midterm results published (Avg: 88.4%)",
    time: "Yesterday",
    type: "grade"
  }
];

export const SUBJECT_PERFORMANCE = [
  { subject: "Data Structures", averageScore: 89, attendance: 95, color: "bg-indigo-500" },
  { subject: "Cloud Computing", averageScore: 84, attendance: 91, color: "bg-sky-500" },
  { subject: "Database Systems", averageScore: 92, attendance: 96, color: "bg-emerald-500" },
  { subject: "AI Ethics", averageScore: 88, attendance: 89, color: "bg-purple-500" },
  { subject: "Network Security", averageScore: 81, attendance: 87, color: "bg-teal-500" },
  { subject: "Linear Algebra", averageScore: 94, attendance: 98, color: "bg-rose-500" }
];

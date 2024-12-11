import { User, Course, Assignment, Grade, Message, Payment, Attendance, Schedule } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Mamadou Diop',
    role: 'teacher',
    email: 'mamadou.diop@edutrack.com',
    username: 'M5DIOP'
  },
  {
    id: '2',
    name: 'Mohamed Seck',
    role: 'student',
    email: 'mohamed.seck@edutrack.com',
    username: 'M1SECK'
  },
  {
    id: '3',
    name: 'Marieme Seck',
    role: 'parent',
    email: 'marieme.seck@edutrack.com',
    username: 'M12SECK'
  },
  {
    id: '4',
    name: 'Pierre Ndiaye',
    role: 'accountant',
    email: 'pierre.ndiaye@bs.edutrack',
    username: 'pierre.ndiaye'
  },
  {
    id: '5',
    name: 'Aminata Ndiaye',
    role: 'teacher',
    email: 'aminata.ndiaye@edutrack.com',
    username: 'A3NDIAYE'
  },
  {
    id: '6',
    name: 'Pierre Martin',
    role: 'teacher',
    email: 'pierre.martin@edutrack.com',
    username: 'P2MARTIN'
  },
  {
    id: '7',
    name: 'Sophie Dubois',
    role: 'teacher',
    email: 'sophie.dubois@edutrack.com',
    username: 'S4DUBOIS'
  },
  {
    id: '8',
    name: 'Fatou Seck',
    role: 'cpe',
    email: 'fatou.seck@edutrack.com',
    username: 'F8SECK'
  },
  {
    id: '9',
    name: 'Ibrahima Touré',
    role: 'student',
    email: 'ibrahima.toure@edutrack.com',
    username: 'I7TOURE'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    name: 'Histoire et Géographie',
    teacherId: '5', // Aminata Ndiaye
    schedule: 'Lun/Mer 9:00',
    room: '2A',
    fees: 45000,
    class: '2nde'
  },
  {
    id: '2',
    name: 'Mathématiques',
    teacherId: '1', // Mamadou Diop
    schedule: 'Mar/Jeu 10:30',
    room: '2B',
    fees: 50000,
    class: '2nde'
  },
  {
    id: '3',
    name: 'Anglais',
    teacherId: '6', // Pierre Martin
    schedule: 'Mer/Ven 14:00',
    room: '6A',
    fees: 45000,
    class: '2nde'
  },
  {
    id: '4',
    name: 'Français',
    teacherId: '7', // Sophie Dubois
    schedule: 'Lun/Jeu 15:30',
    room: '6B',
    fees: 45000,
    class: '2nde'
  }
];

export const assignments: Assignment[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Devoir Histoire - La Révolution Industrielle',
    description: 'Analyse des impacts sociaux et économiques',
    dueDate: '2024-03-20',
    points: 100
  },
  {
    id: '2',
    courseId: '2',
    title: 'Contrôle Mathématiques - Fonctions',
    description: 'Étude des fonctions et leurs graphiques',
    dueDate: '2024-03-22',
    points: 100
  },
  {
    id: '3',
    courseId: '3',
    title: 'Test Anglais - Present Perfect',
    description: 'Grammar and vocabulary test',
    dueDate: '2024-03-25',
    points: 100
  },
  {
    id: '4',
    courseId: '4',
    title: 'Dissertation Français',
    description: 'Analyse littéraire',
    dueDate: '2024-03-28',
    points: 100
  }
];

export const schedules: Schedule[] = [
  {
    id: '1',
    userId: '2', // Mohamed Seck (student)
    timeSlots: [
      { day: 'Lundi', time: '09:00-10:30', courseId: '1', room: '2A' },
      { day: 'Lundi', time: '15:30-17:00', courseId: '4', room: '6B' },
      { day: 'Mardi', time: '10:30-12:00', courseId: '2', room: '2B' },
      { day: 'Mercredi', time: '09:00-10:30', courseId: '1', room: '2A' },
      { day: 'Mercredi', time: '14:00-15:30', courseId: '3', room: '6A' },
      { day: 'Jeudi', time: '10:30-12:00', courseId: '2', room: '2B' },
      { day: 'Jeudi', time: '15:30-17:00', courseId: '4', room: '6B' },
      { day: 'Vendredi', time: '14:00-15:30', courseId: '3', room: '6A' }
    ]
  },
  {
    id: '2',
    userId: '1', // Mamadou Diop (teacher)
    timeSlots: [
      { day: 'Mardi', time: '10:30-12:00', courseId: '2', room: '2B' },
      { day: 'Jeudi', time: '10:30-12:00', courseId: '2', room: '2B' }
    ]
  },
  {
    id: '3',
    userId: '5', // Aminata Ndiaye
    timeSlots: [
      { day: 'Lundi', time: '09:00-10:30', courseId: '1', room: '2A' },
      { day: 'Mercredi', time: '09:00-10:30', courseId: '1', room: '2A' }
    ]
  },
  {
    id: '4',
    userId: '6', // Pierre Martin
    timeSlots: [
      { day: 'Mercredi', time: '14:00-15:30', courseId: '3', room: '6A' },
      { day: 'Vendredi', time: '14:00-15:30', courseId: '3', room: '6A' }
    ]
  },
  {
    id: '5',
    userId: '7', // Sophie Dubois
    timeSlots: [
      { day: 'Lundi', time: '15:30-17:00', courseId: '4', room: '6B' },
      { day: 'Jeudi', time: '15:30-17:00', courseId: '4', room: '6B' }
    ]
  },
  {
    id: '6',
    userId: '9', // Ibrahima Touré (student)
    timeSlots: [
      { day: 'Lundi', time: '09:00-10:30', courseId: '1', room: '2A' },
      { day: 'Lundi', time: '15:30-17:00', courseId: '4', room: '6B' },
      { day: 'Mardi', time: '10:30-12:00', courseId: '2', room: '2B' },
      { day: 'Mercredi', time: '09:00-10:30', courseId: '1', room: '2A' },
      { day: 'Mercredi', time: '14:00-15:30', courseId: '3', room: '6A' },
      { day: 'Jeudi', time: '10:30-12:00', courseId: '2', room: '2B' },
      { day: 'Jeudi', time: '15:30-17:00', courseId: '4', room: '6B' },
      { day: 'Vendredi', time: '14:00-15:30', courseId: '3', room: '6A' }
    ]
  }
];

export const grades: Grade[] = [
  {
    id: '1',
    studentId: '2',
    assignmentId: '1',
    score: 85,
    feedback: 'Bonne analyse historique, continuez ainsi!'
  },
  {
    id: '2',
    studentId: '2',
    assignmentId: '2',
    score: 78,
    feedback: 'Bon travail sur les graphiques'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Bonjour Monsieur, j\'ai une question sur l\'exercice de mathématiques.',
    timestamp: '2024-03-15T10:30:00Z',
    courseId: '2'
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Bien sûr, je peux vous aider. Quelle est votre question?',
    timestamp: '2024-03-15T10:35:00Z',
    courseId: '2'
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    studentId: '2',
    amount: 50000,
    date: '2024-02-01',
    status: 'paid',
    description: 'Frais de scolarité - Trimestre 1'
  },
  {
    id: '2',
    studentId: '2',
    amount: 45000,
    date: '2024-03-01',
    status: 'pending',
    description: 'Frais de scolarité - Trimestre 2'
  }
];

export const attendance: Attendance[] = [
  {
    id: '1',
    studentId: '2',
    courseId: '2',
    date: '2024-03-15',
    status: 'present'
  },
  {
    id: '2',
    studentId: '2',
    courseId: '1',
    date: '2024-03-15',
    status: 'late',
    justification: 'Retard de bus',
    justified: true
  },
  {
    id: '3',
    studentId: '9', // Ibrahima Touré
    courseId: '2', // Mathematics
    date: '2024-03-15',
    status: 'absent',
    justified: false
  }
];
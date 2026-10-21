import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubjectItem, NoteItem, StudentUser, AdminUser, Language, ThemeMode, SubjectGroup } from '../types';
import { INITIAL_SUBJECTS, INITIAL_STUDENTS, INITIAL_NOTES, INITIAL_PENDING_NOTES } from '../data/initialData';
import { translations, TranslationDict } from '../translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: TranslationDict;
  subjects: SubjectItem[];
  notes: NoteItem[];
  students: StudentUser[];
  currentStudent: StudentUser | null;
  admin: AdminUser;
  studentLogin: (name: string, phone: string, institution?: string) => void;
  studentLogout: () => void;
  adminLogin: (username: string, pass: string) => boolean;
  adminLogout: () => void;
  submitNote: (note: Omit<NoteItem, 'id' | 'status' | 'downloadsCount' | 'likesCount' | 'submittedAt' | 'uploaderPointsAwarded'>) => NoteItem;
  approveNote: (noteId: string) => void;
  rejectNote: (noteId: string, reason?: string) => void;
  deleteNote: (noteId: string) => void;
  downloadNote: (noteId: string) => void;
  likeNote: (noteId: string) => void;
  addSubject: (subject: Omit<SubjectItem, 'id'>) => void;
  updateSubject: (id: string, updated: Partial<SubjectItem>) => void;
  deleteSubject: (id: string) => void;
  adjustStudentPoints: (studentId: string, deltaPoints: number) => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'notemate_lang_v1',
  THEME: 'notemate_theme_v1',
  SUBJECTS: 'notemate_subjects_v1',
  NOTES: 'notemate_notes_v1',
  STUDENTS: 'notemate_students_v1',
  CURRENT_STUDENT: 'notemate_current_student_v1',
  ADMIN: 'notemate_admin_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' ? 'en' : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  // 2. Theme State
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Dark theme default for vivid glassmorphism
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. Subjects State
  const [subjects, setSubjects] = useState<SubjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SUBJECTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  // 4. Notes State
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [...INITIAL_NOTES, ...INITIAL_PENDING_NOTES];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  // 5. Students State (for Leaderboard & Points)
  const [students, setStudents] = useState<StudentUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  // 6. Currently Logged In Student
  const [currentStudent, setCurrentStudent] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_STUDENT);
    }
  }, [currentStudent]);

  // 7. Admin Session State
  const [admin, setAdmin] = useState<AdminUser>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { username: 'admin', isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(admin));
  }, [admin]);

  // Helper for Student Login
  const studentLogin = (name: string, phone: string, institution?: string) => {
    const cleanPhone = phone.trim();
    const cleanName = name.trim();

    // Check if student with this phone exists
    const existing = students.find((s) => s.phone === cleanPhone);

    if (existing) {
      const updatedStudent: StudentUser = {
        ...existing,
        name: cleanName || existing.name,
        institution: institution || existing.institution,
      };
      setStudents((prev) => prev.map((s) => (s.phone === cleanPhone ? updatedStudent : s)));
      setCurrentStudent(updatedStudent);
    } else {
      const newStudent: StudentUser = {
        id: 'stu-' + Date.now(),
        name: cleanName,
        phone: cleanPhone,
        institution: institution || '',
        points: 0,
        approvedNotesCount: 0,
        totalSubmissions: 0,
        joinedAt: new Date().toISOString().split('T')[0],
      };
      setStudents((prev) => [newStudent, ...prev]);
      setCurrentStudent(newStudent);
    }
  };

  const studentLogout = () => {
    setCurrentStudent(null);
  };

  // Admin login check (username: admin, pass: admin123)
  const adminLogin = (username: string, pass: string): boolean => {
    if (username.trim() === 'admin' && pass.trim() === 'admin123') {
      const authState = { username: 'admin', isAuthenticated: true };
      setAdmin(authState);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdmin({ username: 'admin', isAuthenticated: false });
  };

  // Student submits note
  const submitNote = (
    noteData: Omit<NoteItem, 'id' | 'status' | 'downloadsCount' | 'likesCount' | 'submittedAt' | 'uploaderPointsAwarded'>
  ): NoteItem => {
    const newNote: NoteItem = {
      ...noteData,
      id: 'note-' + Date.now(),
      status: 'pending',
      downloadsCount: 0,
      likesCount: 0,
      submittedAt: new Date().toISOString().split('T')[0],
      uploaderPointsAwarded: 0,
    };

    setNotes((prev) => [newNote, ...prev]);

    // Update student's totalSubmissions
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.phone === noteData.uploaderPhone) {
          return {
            ...stu,
            totalSubmissions: stu.totalSubmissions + 1,
          };
        }
        return stu;
      })
    );

    if (currentStudent && currentStudent.phone === noteData.uploaderPhone) {
      setCurrentStudent((prev) =>
        prev
          ? {
              ...prev,
              totalSubmissions: prev.totalSubmissions + 1,
            }
          : null
      );
    }

    return newNote;
  };

  // Admin approves note (awards +50 points to the student)
  const approveNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note || note.status === 'approved') return;

    const pointsDelta = 50;

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            status: 'approved',
            uploaderPointsAwarded: pointsDelta,
          };
        }
        return n;
      })
    );

    // Award points to the student submitter
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.phone === note.uploaderPhone) {
          return {
            ...stu,
            points: stu.points + pointsDelta,
            approvedNotesCount: stu.approvedNotesCount + 1,
          };
        }
        return stu;
      })
    );

    // If current logged-in student is the submitter, update their session
    if (currentStudent && currentStudent.phone === note.uploaderPhone) {
      setCurrentStudent((prev) =>
        prev
          ? {
              ...prev,
              points: prev.points + pointsDelta,
              approvedNotesCount: prev.approvedNotesCount + 1,
            }
          : null
      );
    }
  };

  // Admin rejects note
  const rejectNote = (noteId: string, reason?: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            status: 'rejected',
            rejectionReason: reason || 'অসম্পূর্ণ বা অস্পষ্ট তথ্যের কারণে প্রত্যাখ্যান করা হয়েছে।',
          };
        }
        return n;
      })
    );
  };

  // Admin deletes note
  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Free direct download of notes
  const downloadNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    // Increment download count
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, downloadsCount: n.downloadsCount + 1 } : n))
    );

    // Create a real downloadable file blob with structured educational notes content
    const formulasText = note.keyFormulas && note.keyFormulas.length > 0
      ? `\n=========================================\nগুরুত্বপূর্ণ সূত্রাবলী (KEY FORMULAS):\n=========================================\n${note.keyFormulas.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n`
      : '';

    const fileContent = `================================================================================
${note.title}
================================================================================
বিষয় (Subject): ${note.subjectNameBn} (${note.subjectNameEn})
বিভাগ (Group): ${note.group.toUpperCase()}
অধ্যায় (Chapter): ${note.chapter}
শ্রেণি (Class Level): ${note.classLevel}
কন্ট্রিবিউটর (Uploaded by): ${note.uploaderName} ${note.uploaderInstitution ? `[${note.uploaderInstitution}]` : ''}
আপলোড তারিখ: ${note.submittedAt}
নোটমেট প্ল্যাটফর্ম: Free Academic Study Materials (Open Source Hub)
================================================================================

[সারসংক্ষেপ ও আলোচনা (SUMMARY & DETAILS)]
${note.description}

[প্রধান পয়েন্টসমূহ (HIGHLIGHTS & POINTS)]
${note.previewSnippet}
${formulasText}
================================================================================
নোটমেট - বাংলাদেশের শিক্ষার্থীদের উন্মুক্ত স্টাডি হাব
সবার জন্য উন্মুক্ত ও বিনামূল্যে পড়াশোনার প্ল্যাটফর্ম।
================================================================================
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = note.fileName.replace(/\.(pdf|doc|docx)$/i, '') + '_StudyNote.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const likeNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, likesCount: n.likesCount + 1 } : n))
    );
  };

  // Admin Manage Subjects
  const addSubject = (subjectData: Omit<SubjectItem, 'id'>) => {
    const newSubject: SubjectItem = {
      ...subjectData,
      id: 'sub-' + Date.now(),
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const updateSubject = (id: string, updated: Partial<SubjectItem>) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const adjustStudentPoints = (studentId: string, deltaPoints: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, points: Math.max(0, s.points + deltaPoints) } : s))
    );
  };

  const resetAllDataToDefault = () => {
    setSubjects(INITIAL_SUBJECTS);
    setNotes([...INITIAL_NOTES, ...INITIAL_PENDING_NOTES]);
    setStudents(INITIAL_STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        subjects,
        notes,
        students,
        currentStudent,
        admin,
        studentLogin,
        studentLogout,
        adminLogin,
        adminLogout,
        submitNote,
        approveNote,
        rejectNote,
        deleteNote,
        downloadNote,
        likeNote,
        addSubject,
        updateSubject,
        deleteSubject,
        adjustStudentPoints,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

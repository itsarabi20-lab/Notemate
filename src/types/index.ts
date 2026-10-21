export type SubjectGroup = 'common' | 'science' | 'arts' | 'commerce';

export interface SubjectItem {
  id: string;
  group: SubjectGroup;
  nameBn: string;
  nameEn: string;
  chapters: string[];
}

export interface NoteItem {
  id: string;
  title: string;
  subjectId: string;
  subjectNameBn: string;
  subjectNameEn: string;
  group: SubjectGroup;
  chapter: string;
  classLevel: string;
  description: string;
  previewSnippet: string;
  keyFormulas?: string[];
  fileType: 'pdf' | 'doc' | 'image' | 'sheet';
  fileName: string;
  fileSize: string;
  fileData?: string; // base64 or text content
  images?: string[]; // uploaded picture URLs or base64 previews
  pageCount: number;
  uploaderName: string;
  uploaderPhone: string;
  uploaderInstitution?: string;
  uploaderPointsAwarded: number;
  status: 'approved' | 'pending' | 'rejected';
  rejectionReason?: string;
  submittedAt: string;
  downloadsCount: number;
  likesCount: number;
  tags: string[];
}

export interface StudentUser {
  id: string;
  name: string;
  phone: string;
  institution?: string;
  points: number;
  approvedNotesCount: number;
  totalSubmissions: number;
  joinedAt: string;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export type Language = 'bn' | 'en';
export type ThemeMode = 'dark' | 'light';

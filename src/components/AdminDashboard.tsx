import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectItem, NoteItem, SubjectGroup } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  Edit3, 
  BookOpen, 
  Users, 
  LogOut, 
  RefreshCw, 
  FolderPlus,
  Eye,
  Phone,
  Save
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onPreviewNote: (note: NoteItem) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onPreviewNote }) => {
  const { 
    t, 
    notes, 
    subjects, 
    students, 
    adminLogout, 
    approveNote, 
    rejectNote, 
    deleteNote, 
    addSubject, 
    updateSubject, 
    deleteSubject,
    adjustStudentPoints,
    resetAllDataToDefault 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'subjects' | 'students' | 'approved'>('pending');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<SubjectGroup | 'all'>('all');
  
  // Subject Edit / Add State
  const [editingSubject, setEditingSubject] = useState<SubjectItem | null>(null);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubGroup, setNewSubGroup] = useState<SubjectGroup>('common');
  const [newSubNameBn, setNewSubNameBn] = useState('');
  const [newSubNameEn, setNewSubNameEn] = useState('');
  const [newChapterInput, setNewChapterInput] = useState('');

  // Status message
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const pendingNotes = notes.filter((n) => n.status === 'pending');
  const approvedNotes = notes.filter((n) => n.status === 'approved');

  // Filtered subjects
  const filteredSubjects = selectedGroupFilter === 'all' 
    ? subjects 
    : subjects.filter((s) => s.group === selectedGroupFilter);

  // Handle Add Subject Submit
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubNameBn.trim()) return;

    addSubject({
      group: newSubGroup,
      nameBn: newSubNameBn.trim(),
      nameEn: newSubNameEn.trim() || newSubNameBn.trim(),
      chapters: [
        '১ম অধ্যায় - প্রারম্ভিক আলোচনা',
        '২য় অধ্যায় - মৌলিক ধারণা'
      ],
    });

    setNewSubNameBn('');
    setNewSubNameEn('');
    setIsAddingSubject(false);
    showFeedback('নতুন বিষয় সফলভাবে যুক্ত হয়েছে!');
  };

  // Handle Save Edited Subject
  const handleSaveSubjectEdit = () => {
    if (!editingSubject) return;
    updateSubject(editingSubject.id, {
      nameBn: editingSubject.nameBn,
      nameEn: editingSubject.nameEn,
      group: editingSubject.group,
      chapters: editingSubject.chapters,
    });
    setEditingSubject(null);
    showFeedback('বিষয় ও অধ্যায় সফলভাবে আপডেট করা হয়েছে!');
  };

  // Add Chapter to Editing Subject
  const handleAddChapterToEditing = () => {
    if (!editingSubject || !newChapterInput.trim()) return;
    setEditingSubject({
      ...editingSubject,
      chapters: [...editingSubject.chapters, newChapterInput.trim()],
    });
    setNewChapterInput('');
  };

  // Remove Chapter from Editing Subject
  const handleRemoveChapterFromEditing = (index: number) => {
    if (!editingSubject) return;
    const updated = [...editingSubject.chapters];
    updated.splice(index, 1);
    setEditingSubject({
      ...editingSubject,
      chapters: updated,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-black dark:text-white">
      
      {/* Top Banner & Control Strip */}
      <div className="bg-white dark:bg-black rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-black/15 dark:border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
              {t.adminDashboardTitle}
            </h1>
            <p className="text-xs text-black/60 dark:text-white/60">
              নোট অনুমোদন, বিষয় ও অধ্যায় সম্পাদনা এবং লিডারবোর্ড নিয়ন্ত্রণ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToSite}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white hover:border-red-600"
          >
            ওয়েবসাইটে ফিরুন
          </button>
          <button
            onClick={() => {
              adminLogout();
              onBackToSite();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center gap-1.5 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 rounded-2xl border border-red-600 bg-white dark:bg-black text-xs sm:text-sm text-red-600 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Metric Cards Overview (No Grey Box, Pure White/Black with Red Accent) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('pending')}
          className={`bg-white dark:bg-black rounded-3xl p-5 cursor-pointer transition-all border ${
            activeTab === 'pending' ? 'border-2 border-red-600 shadow-md' : 'border-black/15 dark:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/70 dark:text-white/70">অপেক্ষমাণ রিভিউ</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-red-600 mt-2">
            {pendingNotes.length}
          </p>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">অনুমোদনের অপেক্ষায়</p>
        </div>

        <div 
          onClick={() => setActiveTab('approved')}
          className={`bg-white dark:bg-black rounded-3xl p-5 cursor-pointer transition-all border ${
            activeTab === 'approved' ? 'border-2 border-red-600 shadow-md' : 'border-black/15 dark:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/70 dark:text-white/70">অনুমোদিত নোটস</span>
            <CheckCircle2 className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-black dark:text-white mt-2">
            {approvedNotes.length}
          </p>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">লাইভ রয়েছে</p>
        </div>

        <div 
          onClick={() => setActiveTab('subjects')}
          className={`bg-white dark:bg-black rounded-3xl p-5 cursor-pointer transition-all border ${
            activeTab === 'subjects' ? 'border-2 border-red-600 shadow-md' : 'border-black/15 dark:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/70 dark:text-white/70">বিষয় ও সিলেবাস</span>
            <BookOpen className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-black dark:text-white mt-2">
            {subjects.length}
          </p>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">৪টি বিভাগে সাজানো</p>
        </div>

        <div 
          onClick={() => setActiveTab('students')}
          className={`bg-white dark:bg-black rounded-3xl p-5 cursor-pointer transition-all border ${
            activeTab === 'students' ? 'border-2 border-red-600 shadow-md' : 'border-black/15 dark:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/70 dark:text-white/70">নিবন্ধিত শিক্ষার্থী</span>
            <Users className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-black dark:text-white mt-2">
            {students.length}
          </p>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">কন্ট্রিবিউটর শিক্ষার্থী</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/15 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
            activeTab === 'pending'
              ? 'bg-red-600 text-white border-red-600'
              : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
          }`}
        >
          <span>{t.adminPendingTab}</span>
          {pendingNotes.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-red-600 font-mono text-xs flex items-center justify-center font-bold">
              {pendingNotes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
            activeTab === 'subjects'
              ? 'bg-red-600 text-white border-red-600'
              : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.adminSubjectsTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
            activeTab === 'students'
              ? 'bg-red-600 text-white border-red-600'
              : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.adminLeaderboardTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
            activeTab === 'approved'
              ? 'bg-red-600 text-white border-red-600'
              : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>অনুমোদিত নোটস ({approvedNotes.length})</span>
        </button>
      </div>

      {/* TAB 1: PENDING NOTES REVIEW */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingNotes.length > 0 ? (
            <div className="space-y-4">
              {pendingNotes.map((note) => (
                <div key={note.id} className="bg-white dark:bg-black rounded-3xl p-5 border-2 border-red-600 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                        <span className="font-bold text-red-600 uppercase">
                          {note.group}
                        </span>
                        <span>·</span>
                        <span className="font-bold text-black dark:text-white">
                          {note.subjectNameBn}
                        </span>
                        <span>·</span>
                        <span>{note.chapter}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-black dark:text-white mt-1">
                        {note.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onPreviewNote(note)}
                        className="px-3 py-1.5 text-xs font-bold rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white hover:border-red-600 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>প্রিভিউ</span>
                      </button>

                      <button
                        onClick={() => {
                          approveNote(note.id);
                          showFeedback(`'${note.title}' অনুমোদিত হয়েছে এবং শিক্ষার্থী ৫০ পয়েন্ট পেয়েছেন!`);
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex items-center gap-1.5 active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>অনুমোদন (+৫০ পয়েন্ট)</span>
                      </button>

                      <button
                        onClick={() => {
                          rejectNote(note.id);
                          showFeedback(`নোটটি প্রত্যাখ্যান করা হয়েছে।`);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-black dark:text-white border border-black/20 dark:border-white/30 hover:border-red-600 rounded-xl flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>প্রত্যাখ্যান</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-black/80 dark:text-white/80 p-3.5 rounded-2xl border border-black/15 dark:border-white/20">
                    {note.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-black/60 dark:text-white/60 pt-1 border-t border-black/10 dark:border-white/15">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black dark:text-white">
                        আপলোডার: {note.uploaderName}
                      </span>
                      <span className="font-mono text-red-600 font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {note.uploaderPhone}
                      </span>
                    </div>

                    <div className="font-mono">
                      <span>ফাইল: {note.fileName} ({note.fileSize})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-black rounded-3xl p-12 text-center space-y-2 border border-black/15 dark:border-white/20">
              <CheckCircle2 className="w-12 h-12 mx-auto text-red-600" />
              <h3 className="text-base font-bold text-black dark:text-white">
                কোনো অপেক্ষমাণ নোট নেই!
              </h3>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MANAGE SUBJECTS & CHAPTERS */}
      {activeTab === 'subjects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
              {[
                { id: 'all', label: 'সকল বিভাগ' },
                { id: 'common', label: 'সবার আবশ্যিক' },
                { id: 'science', label: 'বিজ্ঞান' },
                { id: 'arts', label: 'মানবিক' },
                { id: 'commerce', label: 'ব্যবসায় শিক্ষা' },
              ].map((grp) => (
                <button
                  key={grp.id}
                  onClick={() => setSelectedGroupFilter(grp.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                    selectedGroupFilter === grp.id
                      ? 'bg-red-600 text-white border-red-600'
                      : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
                  }`}
                >
                  {grp.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddingSubject(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex items-center gap-1.5 whitespace-nowrap self-start"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addSubject}</span>
            </button>
          </div>

          {/* Add Subject Modal / Inline Form */}
          {isAddingSubject && (
            <div className="bg-white dark:bg-black rounded-3xl p-5 border-2 border-red-600 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-red-600" />
                  <span>নতুন বিষয় যোগ করুন</span>
                </h3>
                <button
                  onClick={() => setIsAddingSubject(false)}
                  className="text-xs text-red-600 font-bold"
                >
                  বাতিল
                </button>
              </div>

              <form onSubmit={handleCreateSubject} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-black dark:text-white block mb-1">
                    বিভাগ *
                  </label>
                  <select
                    value={newSubGroup}
                    onChange={(e) => setNewSubGroup(e.target.value as SubjectGroup)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                  >
                    <option value="common" className="bg-white dark:bg-black">সবার আবশ্যিক</option>
                    <option value="science" className="bg-white dark:bg-black">বিজ্ঞান</option>
                    <option value="arts" className="bg-white dark:bg-black">মানবিক</option>
                    <option value="commerce" className="bg-white dark:bg-black">ব্যবসায় শিক্ষা</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black dark:text-white block mb-1">
                    বিষয়ের নাম (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSubNameBn}
                    onChange={(e) => setNewSubNameBn(e.target.value)}
                    placeholder="যেমন: সমাজবিজ্ঞান"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-black dark:text-white block mb-1">
                    বিষয়ের নাম (ইংরেজিতে)
                  </label>
                  <input
                    type="text"
                    value={newSubNameEn}
                    onChange={(e) => setNewSubNameEn(e.target.value)}
                    placeholder="Sociology"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingSubject(false)}
                    className="px-4 py-2 rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
                  >
                    যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map((sub) => (
              <div 
                key={sub.id} 
                className="bg-white dark:bg-black rounded-3xl p-5 flex flex-col justify-between border border-black/15 dark:border-white/20 space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-black/50 dark:text-white/50">
                    <span className="font-mono uppercase font-bold text-[10px] text-red-600">
                      {sub.group}
                    </span>
                    <span className="font-mono text-[11px]">{sub.chapters.length} টি অধ্যায়</span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white mt-1">
                    {sub.nameBn}
                  </h3>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {sub.nameEn}
                  </p>
                </div>

                <div className="p-3 rounded-2xl border border-black/10 dark:border-white/15 text-xs text-black/75 dark:text-white/80 space-y-1">
                  <p className="font-bold text-black dark:text-white text-[11px]">অধ্যায়সমূহ:</p>
                  <div className="space-y-0.5 line-clamp-3">
                    {sub.chapters.slice(0, 3).map((ch, i) => (
                      <p key={i} className="truncate text-[11px]">• {ch}</p>
                    ))}
                    {sub.chapters.length > 3 && (
                      <p className="text-[10px] text-red-600 font-bold">
                        + আরো {sub.chapters.length - 3} টি অধ্যায়...
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/15 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setEditingSubject({ ...sub, chapters: [...sub.chapters] })}
                    className="px-3 py-1.5 font-bold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>অধ্যায় ও বিষয় এডিট</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`আপনি কি '${sub.nameBn}' বিষয়টি মুছে ফেলতে চান?`)) {
                        deleteSubject(sub.id);
                        showFeedback(`'${sub.nameBn}' মুছে ফেলা হয়েছে।`);
                      }
                    }}
                    className="p-1.5 text-black/50 dark:text-white/50 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Subject Modal Drawer */}
          {editingSubject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div 
                className="w-full max-w-xl max-h-[90vh] bg-white dark:bg-black rounded-3xl shadow-2xl border border-black/15 dark:border-white/25 flex flex-col overflow-hidden text-black dark:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-5 py-4 border-b border-black/10 dark:border-white/15 flex items-center justify-between">
                  <h3 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-red-600" />
                    <span>বিষয় ও অধ্যায় এডিটর: {editingSubject.nameBn}</span>
                  </h3>
                  <button
                    onClick={() => setEditingSubject(null)}
                    className="p-1 text-black/60 dark:text-white/60 hover:text-red-600"
                  >
                    বাতিল
                  </button>
                </div>

                <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-black dark:text-white block mb-1">
                        বিষয়ের নাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        value={editingSubject.nameBn}
                        onChange={(e) => setEditingSubject({ ...editingSubject, nameBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-black dark:text-white block mb-1">
                        বিষয়ের নাম (English)
                      </label>
                      <input
                        type="text"
                        value={editingSubject.nameEn}
                        onChange={(e) => setEditingSubject({ ...editingSubject, nameEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                      />
                    </div>
                  </div>

                  {/* Chapters List Editor */}
                  <div className="space-y-2">
                    <label className="font-bold text-black dark:text-white block">
                      অধ্যায়ের তালিকা ({editingSubject.chapters.length} টি)
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newChapterInput}
                        onChange={(e) => setNewChapterInput(e.target.value)}
                        placeholder="নতুন অধ্যায়ের নাম লিখুন..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30"
                      />
                      <button
                        type="button"
                        onClick={handleAddChapterToEditing}
                        className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
                      >
                        যোগ করুন
                      </button>
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-1.5 pt-1">
                      {editingSubject.chapters.map((chap, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-black/10 dark:border-white/15 text-xs text-black dark:text-white"
                        >
                          <span className="truncate">{chap}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveChapterFromEditing(idx)}
                            className="text-red-600 font-bold p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-black/10 dark:border-white/15 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingSubject(null)}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleSaveSubjectEdit}
                    className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>সংরক্ষণ করুন</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: STUDENTS & LEADERBOARD CONTROLS */}
      {activeTab === 'students' && (
        <div className="bg-white dark:bg-black rounded-3xl p-5 sm:p-6 space-y-4 border border-black/15 dark:border-white/20">
          <h3 className="text-base font-bold text-black dark:text-white">
            কন্ট্রিবিউটর শিক্ষার্থী ও পয়েন্ট অ্যাডজাস্টমেন্ট
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/15 text-black/60 dark:text-white/60 font-bold">
                  <th className="py-2.5 px-3">নাম</th>
                  <th className="py-2.5 px-3">মোবাইল ফোন</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">প্রতিষ্ঠান</th>
                  <th className="py-2.5 px-3 text-center">অনুমোদিত</th>
                  <th className="py-2.5 px-3 text-right">পয়েন্ট</th>
                  <th className="py-2.5 px-3 text-right">পয়েন্ট অ্যাডজাস্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                {students.map((stu) => (
                  <tr key={stu.id} className="hover:bg-red-500/5">
                    <td className="py-3 px-3 font-bold text-black dark:text-white">
                      {stu.name}
                    </td>
                    <td className="py-3 px-3 font-mono text-black/70 dark:text-white/70">
                      {stu.phone}
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell text-black/60 dark:text-white/60 truncate max-w-xs">
                      {stu.institution || '—'}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {stu.approvedNotesCount}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-red-600">
                      {stu.points}
                    </td>
                    <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          adjustStudentPoints(stu.id, 50);
                          showFeedback(`${stu.name}-কে +৫০ বোনাস পয়েন্ট প্রদান করা হয়েছে!`);
                        }}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        +৫০
                      </button>
                      <button
                        onClick={() => {
                          adjustStudentPoints(stu.id, -20);
                          showFeedback(`${stu.name}-এর ২০ পয়েন্ট কমানো হয়েছে।`);
                        }}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-black/30 dark:border-white/30 text-black dark:text-white hover:border-red-600"
                      >
                        -২০
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: APPROVED NOTES LIST */}
      {activeTab === 'approved' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedNotes.map((note) => (
              <div key={note.id} className="bg-white dark:bg-black rounded-3xl p-5 flex flex-col justify-between space-y-2 border border-black/15 dark:border-white/20">
                <div>
                  <div className="flex items-center justify-between text-xs text-black/50 dark:text-white/50">
                    <span className="font-bold text-red-600">
                      {note.subjectNameBn} · {note.chapter}
                    </span>
                    <span className="font-mono">{note.downloadsCount} ডাউনলোড</span>
                  </div>
                  <h4 className="font-bold text-black dark:text-white mt-1 line-clamp-1">
                    {note.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/15 flex items-center justify-between text-xs">
                  <span className="text-black/60 dark:text-white/60">
                    আপলোডার: {note.uploaderName}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPreviewNote(note)}
                      className="px-3 py-1 rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white hover:border-red-600"
                    >
                      প্রিভিউ
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`আপনি কি '${note.title}' নোটটি মুছে ফেলতে চান?`)) {
                          deleteNote(note.id);
                          showFeedback(`নোটটি মুছে ফেলা হয়েছে।`);
                        }
                      }}
                      className="p-1 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset System Data */}
      <div className="pt-4 border-t border-black/10 dark:border-white/15 flex items-center justify-between text-xs text-black/50 dark:text-white/50">
        <span>নোটমেট সিস্টেম</span>
        <button
          onClick={() => {
            if (confirm('আপনি কি সমস্ত ডাটা প্রাথমিক ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
              resetAllDataToDefault();
              showFeedback('সকল বিষয় ও নোটস ডিফল্ট অবস্থায় ফিরিয়ে নেওয়া হয়েছে!');
            }
          }}
          className="text-red-600 font-bold flex items-center gap-1 hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          <span>ডিফল্ট ডাটা রিসেট করুন</span>
        </button>
      </div>

    </div>
  );
};

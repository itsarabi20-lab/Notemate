import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NoteItem, SubjectGroup } from '../types';
import { NoteCard } from './NoteCard';
import { Search, X, BookOpen } from 'lucide-react';

interface NotesBrowserProps {
  onPreviewNote: (note: NoteItem) => void;
  onOpenSubmitModal: () => void;
}

export const NotesBrowser: React.FC<NotesBrowserProps> = ({ onPreviewNote, onOpenSubmitModal }) => {
  const { language, t, notes, subjects } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<SubjectGroup | 'all'>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'downloads'>('newest');

  // Filter subjects by the active group
  const availableSubjects = useMemo(() => {
    if (selectedGroup === 'all') return subjects;
    return subjects.filter((s) => s.group === selectedGroup);
  }, [subjects, selectedGroup]);

  // When selected subject changes, get its available chapters
  const availableChapters = useMemo(() => {
    if (selectedSubjectId === 'all') return [];
    const found = subjects.find((s) => s.id === selectedSubjectId);
    return found ? found.chapters : [];
  }, [subjects, selectedSubjectId]);

  // Filter approved notes
  const filteredNotes = useMemo(() => {
    let list = notes.filter((n) => n.status === 'approved');

    if (selectedGroup !== 'all') {
      list = list.filter((n) => n.group === selectedGroup);
    }

    if (selectedSubjectId !== 'all') {
      list = list.filter((n) => n.subjectId === selectedSubjectId);
    }

    if (selectedChapter !== 'all') {
      list = list.filter((n) => n.chapter.toLowerCase().includes(selectedChapter.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.subjectNameBn.toLowerCase().includes(q) ||
          n.subjectNameEn.toLowerCase().includes(q) ||
          n.chapter.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.uploaderName.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === 'downloads') {
      list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    }

    return list;
  }, [notes, selectedGroup, selectedSubjectId, selectedChapter, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGroup('all');
    setSelectedSubjectId('all');
    setSelectedChapter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedGroup !== 'all' || 
    selectedSubjectId !== 'all' || 
    selectedChapter !== 'all';

  return (
    <div id="notes-section" className="space-y-6">
      
      {/* Search & Main Filter Controls Header (Pure White/Black & Red - Zero Grey Box) */}
      <div className="bg-white dark:bg-black rounded-3xl p-5 sm:p-6 space-y-4 border border-black/10 dark:border-white/20 shadow-[0_10px_30px_rgba(220,38,38,0.04)]">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50 dark:text-white/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="বিষয় বা অধ্যায় লিখে সার্চ করুন..."
            className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-2xl bg-white dark:bg-black text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 border border-black/15 dark:border-white/25 focus:outline-none focus:border-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Group Filter Tabs (Red & White/Black buttons only - No Grey Boxes) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'সকল বিভাগ' },
            { id: 'common', label: 'সবার আবশ্যিক' },
            { id: 'science', label: 'বিজ্ঞান' },
            { id: 'arts', label: 'মানবিক' },
            { id: 'commerce', label: 'ব্যবসায় শিক্ষা' },
          ].map((grp) => (
            <button
              key={grp.id}
              onClick={() => {
                setSelectedGroup(grp.id as any);
                setSelectedSubjectId('all');
                setSelectedChapter('all');
              }}
              className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap shrink-0 border ${
                selectedGroup === grp.id
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-white dark:bg-black text-black dark:text-white border-black/15 dark:border-white/25 hover:border-red-600'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>

        {/* Dropdowns Row: Subject & Chapter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedChapter('all');
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/25 focus:outline-none focus:border-red-600"
          >
            <option value="all" className="bg-white dark:bg-black text-black dark:text-white">সকল বিষয়</option>
            {availableSubjects.map((sub) => (
              <option key={sub.id} value={sub.id} className="bg-white dark:bg-black text-black dark:text-white">
                {language === 'en' ? sub.nameEn : sub.nameBn}
              </option>
            ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={selectedSubjectId === 'all'}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/25 focus:outline-none focus:border-red-600 disabled:opacity-40"
          >
            <option value="all" className="bg-white dark:bg-black text-black dark:text-white">
              {selectedSubjectId === 'all' ? 'আগে বিষয় বাছুন' : 'সকল অধ্যায়'}
            </option>
            {availableChapters.map((chap, idx) => (
              <option key={idx} value={chap} className="bg-white dark:bg-black text-black dark:text-white">
                {chap}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/25 focus:outline-none focus:border-red-600"
          >
            <option value="newest" className="bg-white dark:bg-black text-black dark:text-white">সর্বশেষ আপলোড</option>
            <option value="popular" className="bg-white dark:bg-black text-black dark:text-white">জনপ্রিয়</option>
            <option value="downloads" className="bg-white dark:bg-black text-black dark:text-white">সর্বোচ্চ ডাউনলোড</option>
          </select>

        </div>

        {/* Results Counter */}
        <div className="pt-1 flex items-center justify-between text-xs text-black/60 dark:text-white/60">
          <p>
            <span className="font-mono font-bold text-red-600 dark:text-red-500">{filteredNotes.length}</span> টি নোট পাওয়া গেছে
          </p>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-bold"
            >
              <X className="w-3.5 h-3.5" />
              <span>রিসেট</span>
            </button>
          )}
        </div>

      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onPreview={onPreviewNote} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-black rounded-3xl p-10 text-center space-y-3 max-w-md mx-auto text-xs border border-black/10 dark:border-white/20">
          <BookOpen className="w-8 h-8 mx-auto text-red-600" />
          <h3 className="text-base font-bold text-black dark:text-white">
            কোনো নোট পাওয়া যায়নি
          </h3>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl border border-black/20 dark:border-white/30 text-black dark:text-white hover:border-red-600"
            >
              রিসেট
            </button>
            <button
              onClick={onOpenSubmitModal}
              className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
            >
              নোট আপলোড করুন
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

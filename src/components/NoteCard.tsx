import React, { useState } from 'react';
import { NoteItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  Eye, 
  Heart, 
  User, 
  Camera
} from 'lucide-react';

interface NoteCardProps {
  note: NoteItem;
  onPreview: (note: NoteItem) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPreview }) => {
  const { language, t, downloadNote, likeNote } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    downloadNote(note.id);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      likeNote(note.id);
      setLiked(true);
    }
  };

  const subjectDisplay = language === 'en' ? note.subjectNameEn : note.subjectNameBn;
  const hasPictures = note.images && note.images.length > 0;

  return (
    <div 
      onClick={() => onPreview(note)}
      className="bg-white dark:bg-black rounded-3xl p-5 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-200 border border-black/10 dark:border-white/15 hover:border-red-600 dark:hover:border-red-600 shadow-[0_10px_25px_rgba(220,38,38,0.04)]"
    >
      <div className="space-y-3">
        
        {/* Photo Thumbnail */}
        {hasPictures && (
          <div className="relative h-44 rounded-2xl overflow-hidden mb-2 bg-black border border-black/10 dark:border-white/20">
            <img 
              src={note.images![0]} 
              alt={note.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
              <Camera className="w-3 h-3 text-white" />
              <span>{note.images!.length} ছবি</span>
            </div>
          </div>
        )}

        {/* Top Metadata Line */}
        <div className="flex items-center justify-between text-xs text-black/70 dark:text-white/70">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-bold text-red-600 truncate">
              {subjectDisplay}
            </span>
            <span>·</span>
            <span className="truncate">{note.chapter}</span>
          </div>

          <span className="shrink-0 font-mono text-[11px] text-black/50 dark:text-white/50">
            {note.classLevel}
          </span>
        </div>

        {/* Note Title */}
        <h3 className="text-base font-bold text-black dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
          {note.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-black/75 dark:text-white/80 line-clamp-2 leading-relaxed">
          {note.description}
        </p>

        {/* Uploader Attribution */}
        <div className="pt-1 flex items-center justify-between text-xs text-black/60 dark:text-white/60">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="font-semibold text-black dark:text-white truncate">
              {note.uploaderName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] tabular-nums">
            <span>{note.pageCount} {t.pages}</span>
            <span>·</span>
            <span>{note.fileSize}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-black/70 dark:text-white/70">
          <span className="flex items-center gap-1 font-mono tabular-nums font-bold">
            <Download className="w-3.5 h-3.5 text-red-600" />
            {note.downloadsCount}
          </span>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              liked ? 'text-red-600 font-bold' : 'hover:text-red-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-600 text-red-600' : ''}`} />
            <span className="font-mono tabular-nums">{note.likesCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(note);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl text-black dark:text-white border border-black/15 dark:border-white/20 hover:border-red-600 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>দেখুন</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? '...' : 'ডাউনলোড'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

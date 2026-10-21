import React, { useState } from 'react';
import { NoteItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Download, 
  Heart, 
  Share2, 
  Check, 
  BookOpen, 
  Maximize2
} from 'lucide-react';

interface NotePreviewModalProps {
  note: NoteItem | null;
  onClose: () => void;
}

export const NotePreviewModal: React.FC<NotePreviewModalProps> = ({ note, onClose }) => {
  const { language, downloadNote, likeNote } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null);

  if (!note) return null;

  const handleDownload = () => {
    setDownloading(true);
    downloadNote(note.id);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleLike = () => {
    if (!liked) {
      likeNote(note.id);
      setLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subjectDisplay = language === 'en' ? note.subjectNameEn : note.subjectNameBn;
  const hasPictures = note.images && note.images.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[92vh] bg-white dark:bg-black rounded-3xl shadow-2xl border border-black/15 dark:border-white/25 flex flex-col overflow-hidden text-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/15 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
              <span className="font-bold text-red-600">
                {subjectDisplay}
              </span>
              <span>·</span>
              <span className="truncate">{note.chapter}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-black dark:text-white truncate mt-0.5">
              {note.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-black/10 dark:border-white/15 hover:border-red-600 text-black dark:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-red-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-black/10 dark:border-white/15 hover:border-red-600 text-black dark:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body (Zero Grey Boxes) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Photo Gallery Viewer */}
          {hasPictures && (
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] flex items-center justify-center border border-black/15 dark:border-white/20">
                <img
                  src={note.images![selectedPhotoIndex]}
                  alt={`Page ${selectedPhotoIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setFullscreenPhoto(note.images![selectedPhotoIndex])}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-black text-white border border-white/30 hover:border-red-600"
                  title="বড় করে দেখুন"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold font-mono">
                  ছবি {selectedPhotoIndex + 1} / {note.images!.length}
                </div>
              </div>

              {/* Thumbnails row */}
              {note.images!.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {note.images!.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedPhotoIndex === idx ? 'border-red-600' : 'border-black/20 dark:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Uploader Strip (No Grey Box, Clean White/Black with Border) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-black border border-black/15 dark:border-white/20 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                {note.uploaderName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">
                  {note.uploaderName}
                </p>
                <p className="text-[11px] text-black/60 dark:text-white/60">
                  {note.uploaderInstitution || 'শিক্ষার্থী কন্ট্রিবিউটর'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-black/60 dark:text-white/60">
              <span>{note.pageCount} পৃষ্ঠা</span>
              <span>·</span>
              <span>{note.fileSize}</span>
            </div>
          </div>

          {/* Description Box (No Grey Box) */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-black dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>নোটের বিবরণ</span>
            </h4>
            <div className="text-black/80 dark:text-white/90 leading-relaxed bg-white dark:bg-black p-3.5 rounded-2xl border border-black/15 dark:border-white/20">
              {note.description}
            </div>
          </div>

          {/* Formulas if available */}
          {note.keyFormulas && note.keyFormulas.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-black dark:text-white">
                গুরুত্বপূর্ণ সূত্রাবলী
              </h4>
              <div className="space-y-1">
                {note.keyFormulas.map((f, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-black border border-red-600/40 font-mono text-xs text-red-600 dark:text-red-400 font-bold">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-black/10 dark:border-white/15 bg-white dark:bg-black flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs transition-colors ${
                liked ? 'border-red-600 text-red-600 font-bold' : 'border-black/15 dark:border-white/20 text-black dark:text-white hover:border-red-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-600 text-red-600' : ''}`} />
              <span className="font-mono tabular-nums">{note.likesCount}</span>
            </button>
            <span className="text-xs text-black/60 dark:text-white/60 font-mono font-bold">
              {note.downloadsCount} ডাউনলোড
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-black dark:text-white border border-black/15 dark:border-white/20 hover:border-red-600"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? '...' : 'ফ্রি ডাউনলোড'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox */}
      {fullscreenPhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black flex items-center justify-center p-4"
          onClick={() => setFullscreenPhoto(null)}
        >
          <button 
            onClick={() => setFullscreenPhoto(null)} 
            className="absolute top-4 right-4 p-2 text-white bg-red-600 rounded-full hover:bg-red-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={fullscreenPhoto} alt="Zoomed view" className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
};

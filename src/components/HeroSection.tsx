import React from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Search, Sparkles, BookOpen, Download, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenSubmitModal: () => void;
  onScrollToNotes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSubmitModal, onScrollToNotes }) => {
  const { notes, students } = useApp();

  const approvedNotes = notes.filter((n) => n.status === 'approved');
  const totalDownloads = notes.reduce((sum, n) => sum + n.downloadsCount, 0);

  return (
    <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16 text-center">
      
      {/* Background Soft Red Ambient Glow */}
      <div className="absolute -top-16 -left-20 w-[480px] h-[480px] bg-red-600/10 dark:bg-red-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-24 w-[380px] h-[380px] bg-red-600/10 dark:bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Kicker Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-black border border-black/15 dark:border-white/25 text-xs text-black dark:text-white shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span className="font-semibold">বাংলা স্টাডি ও হ্যান্ডনোট হাব</span>
        </div>

        {/* Headline with Red Highlight Word */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white leading-[1.2] text-balance">
          পড়াশোনার নোট এখন <span className="text-red-600 font-extrabold">সহজ</span> ও উন্মুক্ত
        </h1>

        {/* Reduced, clean subtext */}
        <p className="mt-4 text-sm sm:text-base text-black/75 dark:text-white/80 max-w-xl mx-auto leading-relaxed">
          খাতার ছবি ও হ্যান্ডনোট শেয়ার করুন। কোনো রেজিস্ট্রেশন ছাড়াই ১০০% ফ্রি ডাউনলোড করুন।
        </p>

        {/* Central Floating Card (No grey box, pure white/black with crisp red) */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(220,38,38,0.08)] border border-black/10 dark:border-white/20 space-y-4 text-left">
            
            {/* Quick Upload Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-black dark:text-white block">
                খাতার ছবি বা পিডিএফ আপলোড
              </label>
              <button
                onClick={onOpenSubmitModal}
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-black text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white flex items-center justify-between transition-colors border border-black/20 dark:border-white/30 hover:border-red-600"
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-red-600" />
                  <span>খাতার ছবি তুলুন বা নোট আপলোড করুন...</span>
                </div>
                <span className="text-[11px] font-mono bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                  +৫০
                </span>
              </button>
            </div>

            {/* Red Action Button */}
            <button
              onClick={onOpenSubmitModal}
              className="w-full py-3.5 text-sm sm:text-base font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>নোটের ছবি জমা দিন</span>
            </button>

            {/* Secondary Action */}
            <div className="pt-1 flex items-center justify-center">
              <button
                onClick={onScrollToNotes}
                className="text-xs text-black/70 dark:text-white/70 hover:text-red-600 dark:hover:text-red-500 transition-colors flex items-center gap-1 font-semibold"
              >
                <Search className="w-3.5 h-3.5" />
                <span>নিচে নোটস ব্রাউজ ও ফ্রি ডাউনলোড করুন</span>
              </button>
            </div>

          </div>

          {/* Minimal Footnote */}
          <p className="mt-4 text-xs text-black/60 dark:text-white/60">
            স্বচ্ছ কাচের মতো সহজ — নোট ডাউনলোডে কোনো সাইন-আপ লাগবে না।
          </p>
        </div>

        {/* Minimal 3-Point Counter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-black/75 dark:text-white/80">
          <div className="flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-red-600" />
            <span className="font-bold text-black dark:text-white tabular-nums">{approvedNotes.length}</span>
            <span>নোটস</span>
          </div>

          <span className="text-black/30 dark:text-white/30">·</span>

          <div className="flex items-center gap-1.5 font-mono">
            <Download className="w-3.5 h-3.5 text-red-600" />
            <span className="font-bold text-black dark:text-white tabular-nums">{totalDownloads}</span>
            <span>ফ্রি ডাউনলোড</span>
          </div>

          <span className="text-black/30 dark:text-white/30">·</span>

          <div className="flex items-center gap-1.5 font-mono">
            <Users className="w-3.5 h-3.5 text-red-600" />
            <span className="font-bold text-black dark:text-white tabular-nums">{students.length}</span>
            <span>শিক্ষার্থী</span>
          </div>
        </div>

      </div>
    </section>
  );
};

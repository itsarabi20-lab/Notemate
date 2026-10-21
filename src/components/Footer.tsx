import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmitModal }) => {
  const { t } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/15 bg-white dark:bg-black pb-20 md:pb-8 pt-8 text-xs text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-black dark:text-white">
              {t.brandName}
            </span>
            <span className="text-black/30 dark:text-white/30">·</span>
            <span className="text-black/60 dark:text-white/60">
              উন্মুক্ত হ্যান্ডনোট হাব
            </span>
          </div>

          <div className="flex items-center gap-4 text-black/60 dark:text-white/60">
            <button
              onClick={onOpenSubmitModal}
              className="hover:text-red-600 transition-colors"
            >
              নোট জমা দিন (+৫০ পয়েন্ট)
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>উপরে যান</span>
            </button>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/15 flex flex-col sm:flex-row items-center justify-between text-black/50 dark:text-white/50 gap-2 text-[11px]">
          <p>© {new Date().getFullYear()} {t.brandName} · ১০০% উন্মুক্ত ও ফ্রি</p>
          <p className="flex items-center gap-1">
            <span>নির্মিত হয়েছে শিক্ষার্থীদের সহায়তায়</span>
            <Heart className="w-3 h-3 text-red-600 fill-red-600" />
          </p>
        </div>
      </div>
    </footer>
  );
};

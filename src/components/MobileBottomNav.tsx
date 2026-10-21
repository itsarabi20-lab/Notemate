import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Camera, Trophy, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'browse' | 'submit' | 'leaderboard' | 'admin';
  setActiveTab: (tab: 'browse' | 'submit' | 'leaderboard' | 'admin') => void;
  onOpenSubmitModal: () => void;
  onOpenLoginModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSubmitModal,
  onOpenLoginModal,
}) => {
  const { currentStudent } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 pointer-events-none">
      <div className="max-w-md mx-auto bg-white dark:bg-black rounded-3xl shadow-2xl border border-black/15 dark:border-white/25 p-1.5 flex items-center justify-around pointer-events-auto">
        
        {/* Browse */}
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'browse'
              ? 'text-red-600 font-bold'
              : 'text-black dark:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">নোট খুঁজুন</span>
        </button>

        {/* Upload Note / Photo (Prominent center CTA) */}
        <button
          onClick={onOpenSubmitModal}
          className="flex flex-col items-center justify-center -translate-y-2"
        >
          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40 active:scale-95 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-red-600 mt-0.5">
            ছবি আপলোড
          </span>
        </button>

        {/* Leaderboard */}
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            activeTab === 'leaderboard'
              ? 'text-red-600 font-bold'
              : 'text-black dark:text-white'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">লিডারবোর্ড</span>
        </button>

        {/* Student Profile / Login */}
        <button
          onClick={onOpenLoginModal}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all text-black dark:text-white"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {currentStudent ? 'প্রোফাইল' : 'লগইন'}
          </span>
        </button>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Upload, 
  Trophy, 
  Sun, 
  Moon, 
  Globe, 
  User, 
  LogOut, 
  Award,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'browse' | 'submit' | 'leaderboard' | 'admin';
  setActiveTab: (tab: 'browse' | 'submit' | 'leaderboard' | 'admin') => void;
  onOpenSubmitModal: () => void;
  onOpenLoginModal: () => void;
  onSecretAdminTrigger?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSubmitModal,
  onOpenLoginModal,
  onSecretAdminTrigger,
}) => {
  const { language, setLanguage, theme, toggleTheme, t, currentStudent, studentLogout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const handleLogoClick = () => {
    setActiveTab('browse');
    const newCount = logoClickCount + 1;
    if (newCount >= 4) {
      setLogoClickCount(0);
      if (onSecretAdminTrigger) {
        onSecretAdminTrigger();
      }
    } else {
      setLogoClickCount(newCount);
      setTimeout(() => setLogoClickCount(0), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left group focus:outline-none rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white block leading-tight">
                {t.brandName}
              </span>
              <span className="text-[11px] text-black/60 dark:text-white/60 hidden sm:block leading-none">
                {t.brandTagline}
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3.5 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'browse'
                ? 'bg-red-600 text-white'
                : 'text-black dark:text-white hover:text-red-600 dark:hover:text-red-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.navBrowse}</span>
          </button>

          <button
            onClick={onOpenSubmitModal}
            className="px-3.5 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 text-black dark:text-white hover:text-red-600 dark:hover:text-red-500"
          >
            <Upload className="w-4 h-4 text-red-600" />
            <span>{t.navSubmit}</span>
            <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-mono font-bold">
              +৫০
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3.5 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-red-600 text-white'
                : 'text-black dark:text-white hover:text-red-600 dark:hover:text-red-500'
            }`}
          >
            <Trophy className="w-4 h-4 text-red-600" />
            <span>{t.navLeaderboard}</span>
          </button>
        </nav>

        {/* Controls & Student Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-black/15 dark:border-white/25 bg-white dark:bg-black text-black dark:text-white hover:border-red-600 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-red-600" />
            <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-black/15 dark:border-white/25 bg-white dark:bg-black text-black dark:text-white hover:border-red-600 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-white" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
            )}
          </button>

          {/* Student Profile / Login */}
          {currentStudent ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-bold text-black dark:text-white leading-tight">
                  {currentStudent.name}
                </span>
                <span className="text-[11px] font-mono font-bold text-red-600 dark:text-red-500 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {currentStudent.points} {t.points}
                </span>
              </div>
              
              <button
                onClick={studentLogout}
                title={t.logout}
                className="p-1.5 rounded-lg text-black/60 dark:text-white/60 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>{t.loginAsStudent}</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-black dark:text-white hover:text-red-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white dark:bg-black border-b border-black/10 dark:border-white/15 space-y-2">
          <button
            onClick={() => {
              setActiveTab('browse');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-xl ${
              activeTab === 'browse'
                ? 'bg-red-600 text-white'
                : 'text-black dark:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.navBrowse}</span>
          </button>

          <button
            onClick={() => {
              onOpenSubmitModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl text-black dark:text-white"
          >
            <div className="flex items-center gap-2.5">
              <Upload className="w-4 h-4 text-red-600" />
              <span>{t.navSubmit}</span>
            </div>
            <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-full font-mono font-bold">
              +৫০
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('leaderboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-xl ${
              activeTab === 'leaderboard'
                ? 'bg-red-600 text-white'
                : 'text-black dark:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-red-600" />
            <span>{t.navLeaderboard}</span>
          </button>

          {currentStudent && (
            <div className="pt-2 border-t border-black/10 dark:border-white/15 flex items-center justify-between px-3">
              <div>
                <p className="text-xs font-bold text-black dark:text-white">{currentStudent.name}</p>
                <p className="text-[11px] text-red-600 dark:text-red-500 font-mono font-bold">
                  {currentStudent.points} {t.points}
                </p>
              </div>
              <button
                onClick={() => {
                  studentLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logout}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

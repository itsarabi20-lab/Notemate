import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Lock, User, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t, adminLogin } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = adminLogin(username, password);
    if (success) {
      onSuccess();
      onClose();
    } else {
      setError('ভুল ইউজারনেম বা পাসওয়ার্ড। সঠিক ক্রেডেনশিয়াল: admin / admin123');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white dark:bg-black rounded-3xl shadow-2xl border border-black/15 dark:border-white/25 overflow-hidden text-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-black dark:text-white">
                {t.adminLoginTitle}
              </h3>
              <p className="text-[11px] text-black/60 dark:text-white/60">
                বিষয়, অধ্যায় ও নোটস অনুমোদন প্যানেল
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-black/60 dark:text-white/60 hover:text-red-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="p-3 rounded-2xl bg-white dark:bg-black border border-red-600/40 text-black dark:text-white flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono">
              <KeyRound className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>admin / admin123</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-red-600 font-bold hover:underline"
            >
              স্বয়ংক্রিয় পূরণ
            </button>
          </div>

          <div>
            <label className="font-bold text-black dark:text-white block mb-1">
              {t.adminUsernameLabel}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-black dark:text-white block mb-1">
              {t.adminPasswordLabel}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl border border-red-600 text-xs text-red-600 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.adminLoginBtn}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

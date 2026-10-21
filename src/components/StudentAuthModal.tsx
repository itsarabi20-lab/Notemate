import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Phone, School, ArrowRight } from 'lucide-react';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({ isOpen, onClose }) => {
  const { studentLogin, currentStudent, studentLogout } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('নাম লিখুন।');
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setError('সঠিক মোবাইল নম্বর লিখুন।');
      return;
    }

    studentLogin(name.trim(), phone.trim(), institution.trim());
    onClose();
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
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-black dark:text-white">
                {currentStudent ? 'আমার প্রোফাইল' : 'শিক্ষার্থী লগইন'}
              </h3>
              <p className="text-[11px] text-black/60 dark:text-white/60">
                নাম ও ফোন নম্বর দিয়ে প্রবেশ করুন
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

        {/* Content */}
        {currentStudent ? (
          <div className="p-5 space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-600 text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-red-600/30">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-base font-bold text-black dark:text-white">
                {currentStudent.name}
              </h4>
              <p className="text-xs text-black/60 dark:text-white/60 font-mono">
                {currentStudent.phone} {currentStudent.institution && `· ${currentStudent.institution}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-black rounded-2xl p-3 border border-black/15 dark:border-white/20">
                <span className="text-xl font-bold font-mono text-red-600 tabular-nums">
                  {currentStudent.points}
                </span>
                <p className="text-black/60 dark:text-white/60 mt-0.5">মোট পয়েন্ট</p>
              </div>

              <div className="bg-white dark:bg-black rounded-2xl p-3 border border-black/15 dark:border-white/20">
                <span className="text-xl font-bold font-mono text-black dark:text-white tabular-nums">
                  {currentStudent.approvedNotesCount}
                </span>
                <p className="text-black/60 dark:text-white/60 mt-0.5">অনুমোদিত নোটস</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  studentLogout();
                  onClose();
                }}
                className="px-3 py-1.5 text-red-600 font-bold hover:underline"
              >
                লগআউট
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
              >
                সম্পন্ন
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
            <div>
              <label className="font-bold text-black dark:text-white block mb-1">
                আপনার পূর্ণ নাম *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর হাসান"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-black dark:text-white block mb-1">
                মোবাইল ফোন নম্বর *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-black dark:text-white block mb-1">
                শিক্ষা প্রতিষ্ঠান (ঐচ্ছিক)
              </label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="যেমন: নটর ডেম কলেজ"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 font-bold text-xs">{error}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

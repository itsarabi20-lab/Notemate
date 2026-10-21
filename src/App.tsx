/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NotesBrowser } from './components/NotesBrowser';
import { LeaderboardSection } from './components/LeaderboardSection';
import { AdminDashboard } from './components/AdminDashboard';
import { SubmitNoteModal } from './components/SubmitNoteModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { NotePreviewModal } from './components/NotePreviewModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { NoteItem } from './types';

const MainAppContent: React.FC = () => {
  const { admin } = useApp();
  
  // Active Navigation Tab ('browse' | 'submit' | 'leaderboard' | 'admin')
  const [activeTab, setActiveTab] = useState<'browse' | 'submit' | 'leaderboard' | 'admin'>('browse');

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isStudentAuthOpen, setIsStudentAuthOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);

  // Secret URL access for admin: ?admin=1 or keyboard shortcut Ctrl+Shift+A
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || params.get('admin') === 'true') {
      if (admin.isAuthenticated) {
        setActiveTab('admin');
      } else {
        setIsAdminLoginOpen(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (admin.isAuthenticated) {
          setActiveTab('admin');
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [admin.isAuthenticated]);

  const handleScrollToNotes = () => {
    setActiveTab('browse');
    const el = document.getElementById('notes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecretAdminTrigger = () => {
    if (admin.isAuthenticated) {
      setActiveTab('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white selection:bg-red-600 selection:text-white transition-colors duration-200">
      
      {/* Background ambient radial gradients in soft red only */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-red-600/10 dark:bg-red-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-red-600/10 dark:bg-red-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar (Admin hidden from public view) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenLoginModal={() => setIsStudentAuthOpen(true)}
        onSecretAdminTrigger={handleSecretAdminTrigger}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'admin' && admin.isAuthenticated ? (
          <AdminDashboard
            onBackToSite={() => setActiveTab('browse')}
            onPreviewNote={(note) => setPreviewNote(note)}
          />
        ) : activeTab === 'leaderboard' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <LeaderboardSection
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>
        ) : (
          <div>
            {/* Hero Section styled after user's reference image */}
            <HeroSection
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              onScrollToNotes={handleScrollToNotes}
            />

            {/* Notes Browser Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <NotesBrowser
                onPreviewNote={(note) => setPreviewNote(note)}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer (Admin hidden from public view) */}
      <Footer
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation (Admin hidden from public view) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenLoginModal={() => setIsStudentAuthOpen(true)}
      />

      {/* Modals */}
      <SubmitNoteModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={() => {}}
      />

      <StudentAuthModal
        isOpen={isStudentAuthOpen}
        onClose={() => setIsStudentAuthOpen(false)}
      />

      {/* Admin Login Modal (only accessed via secret key/url/triple-logo-click) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setActiveTab('admin');
        }}
      />

      <NotePreviewModal
        note={previewNote}
        onClose={() => setPreviewNote(null)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export interface TranslationDict {
  brandName: string;
  brandTagline: string;
  navBrowse: string;
  navSubmit: string;
  navLeaderboard: string;
  navAdmin: string;
  loginAsStudent: string;
  studentProfile: string;
  logout: string;
  points: string;
  approvedNotes: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroStatsNotes: string;
  heroStatsDownloads: string;
  heroStatsStudents: string;
  heroStatsGroups: string;
  searchPlaceholder: string;
  allGroups: string;
  groupCommon: string;
  groupScience: string;
  groupArts: string;
  groupCommerce: string;
  filterBySubject: string;
  allSubjects: string;
  filterByChapter: string;
  allChapters: string;
  sortBy: string;
  sortNewest: string;
  sortPopular: string;
  sortDownloads: string;
  freeDownload: string;
  previewNote: string;
  downloaded: string;
  likes: string;
  pages: string;
  uploadedBy: string;
  submitNotesTitle: string;
  submitNotesSub: string;
  noteTitleLabel: string;
  noteTitlePlaceholder: string;
  groupLabel: string;
  selectGroup: string;
  subjectLabel: string;
  selectSubject: string;
  chapterLabel: string;
  chapterPlaceholder: string;
  classLabel: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  keyFormulasLabel: string;
  keyFormulasPlaceholder: string;
  uploadFileLabel: string;
  uploadFileHint: string;
  submitForReview: string;
  submissionSuccess: string;
  submissionSuccessDesc: string;
  studentLoginTitle: string;
  studentLoginSub: string;
  studentNameLabel: string;
  studentNamePlaceholder: string;
  studentPhoneLabel: string;
  studentPhonePlaceholder: string;
  studentInstLabel: string;
  studentInstPlaceholder: string;
  loginButton: string;
  adminLoginTitle: string;
  adminUsernameLabel: string;
  adminPasswordLabel: string;
  adminLoginBtn: string;
  adminDashboardTitle: string;
  adminPendingTab: string;
  adminSubjectsTab: string;
  adminLeaderboardTab: string;
  approve: string;
  reject: string;
  approved: string;
  pending: string;
  rejected: string;
  awardPointsNote: string;
  editSubject: string;
  addSubject: string;
  subjectNameBnLabel: string;
  subjectNameEnLabel: string;
  chaptersListLabel: string;
  addChapterPlaceholder: string;
  addChapterBtn: string;
  saveChanges: string;
  deleteSubject: string;
  leaderboardRank: string;
  leaderboardStudent: string;
  leaderboardInstitution: string;
  leaderboardApproved: string;
  leaderboardPoints: string;
  leaderboardBadge: string;
  emptyNotes: string;
  emptyNotesDesc: string;
  resetFilters: string;
  downloadSuccess: string;
  close: string;
  cancel: string;
  themeDark: string;
  themeLight: string;
  langName: string;
}

export const translations: Record<'bn' | 'en', TranslationDict> = {
  bn: {
    brandName: 'নোটমেট',
    brandTagline: 'শিক্ষার্থীদের উন্মুক্ত স্টাডি প্ল্যাটফর্ম',
    navBrowse: 'নোট খুঁজুন',
    navSubmit: 'নোট আপলোড করুন',
    navLeaderboard: 'লিডারবোর্ড',
    navAdmin: 'অ্যাডমিন প্যানেল',
    loginAsStudent: 'শিক্ষার্থী লগইন',
    studentProfile: 'আমার প্রোফাইল',
    logout: 'লগআউট',
    points: 'পয়েন্ট',
    approvedNotes: 'অনুমোদিত নোট',
    heroHeadline: 'জ্ঞান ভাগ করুন, পয়েন্ট জিতুন — সবার জন্য ফ্রি স্টাডি নোটস',
    heroSubheadline: 'বাংলাদেশের শিক্ষার্থীদের তৈরি বিষয়ভিত্তিক হ্যান্ডনোট, ফর্মুলা শিট ও বোর্ড সমাধান এখন সম্পূর্ণ বিনামূল্যে ডাউনলোড করুন। আপনিও নোট জমা দিন এবং লিডারবোর্ডের শীর্ষে পৌঁছান!',
    heroStatsNotes: 'অনুমোদিত নোটস',
    heroStatsDownloads: 'বিনামূল্যে ডাউনলোড',
    heroStatsStudents: 'কন্ট্রিবিউটর শিক্ষার্থী',
    heroStatsGroups: 'বিভাগ ও বিষয়সমূহ',
    searchPlaceholder: 'বিষয়, অধ্যায় বা টপিকের নাম দিয়ে সার্চ করুন...',
    allGroups: 'সকল বিভাগ',
    groupCommon: 'সবার জন্য আবশ্যিক বিষয়',
    groupScience: 'বিজ্ঞান বিভাগ',
    groupArts: 'মানবিক বিভাগ',
    groupCommerce: 'ব্যবসায় শিক্ষা বিভাগ',
    filterBySubject: 'বিষয় নির্বাচন করুন',
    allSubjects: 'সকল বিষয়',
    filterByChapter: 'অধ্যায় নির্বাচন করুন',
    allChapters: 'সকল অধ্যায়',
    sortBy: 'বাছাই ক্রম',
    sortNewest: 'সর্বশেষ আপলোড',
    sortPopular: 'সবচেয়ে জনপ্রিয়',
    sortDownloads: 'সর্বোচ্চ ডাউনলোড',
    freeDownload: 'ফ্রি ডাউনলোড',
    previewNote: 'একনজরে পড়ুন',
    downloaded: 'বার ডাউনলোড',
    likes: 'পছন্দ',
    pages: 'পৃষ্ঠা',
    uploadedBy: 'আপলোড করেছেন',
    submitNotesTitle: 'স্টাডি নোট জমা দিন',
    submitNotesSub: 'আপনার নোট অ্যাডমিন যাচাই করে অনুমোদন করলেই পাবেন ৫০ পয়েন্ট এবং লিডারবোর্ডে যুক্ত হবেন!',
    noteTitleLabel: 'নোটের শিরোনাম',
    noteTitlePlaceholder: 'যেমন: পদার্থবিজ্ঞান গতি অধ্যায়ের শর্টকাট সূত্র ও বোর্ড সমাধান',
    groupLabel: 'বিভাগ (Group)',
    selectGroup: 'একটি বিভাগ বেছে নিন',
    subjectLabel: 'বিষয় (Subject)',
    selectSubject: 'একটি বিষয় বেছে নিন',
    chapterLabel: 'অধ্যায় (Chapter নাম বা নম্বর)',
    chapterPlaceholder: 'যেমন: ২য় অধ্যায় - গতি',
    classLabel: 'শ্রেণি / স্তর',
    descriptionLabel: 'নোটের সারসংক্ষেপ ও বিস্তারিত',
    descriptionPlaceholder: 'নোটটিতে কী কী আলোচনা করা হয়েছে, কী ধরণের সূত্র বা ট্রিকস রয়েছে লিখুন...',
    keyFormulasLabel: 'গুরুত্বপূর্ণ সূত্র বা কি-পয়েন্টস (ঐচ্ছিক)',
    keyFormulasPlaceholder: 'যেমন: v = u + at, s = ut + 1/2 at^2 (প্রতি লাইনে একটি)',
    uploadFileLabel: 'নোটের ফাইল আপলোড করুন (PDF / ছবি / Doc)',
    uploadFileHint: 'সর্বোচ্চ সাইজ ১০ মেগাবাইট। হাতে লেখা খাতার ছবি বা স্পষ্ট PDF গ্রহণযোগ্য।',
    submitForReview: 'অনুমোদনের জন্য জমা দিন',
    submissionSuccess: 'নোট সফলভাবে জমা হয়েছে!',
    submissionSuccessDesc: 'আপনার নোটটি অ্যাডমিন রিভিউয়ের জন্য অপেক্ষমাণ। অনুমোদিত হলে স্বয়ংক্রিয়ভাবে ৫০ পয়েন্ট আপনার অ্যাকাউন্টে যোগ হবে।',
    studentLoginTitle: 'শিক্ষার্থী লগইন / সাইন-ইন',
    studentLoginSub: 'নোট জমা দিতে ও পয়েন্ট অর্জন করতে আপনার নাম এবং ফোন নম্বর দিন। কোনো পাসওয়ার্ডের ঝামেলা নেই!',
    studentNameLabel: 'আপনার পূর্ণ নাম',
    studentNamePlaceholder: 'যেমন: তানভীর হাসান',
    studentPhoneLabel: 'মোবাইল ফোন নম্বর',
    studentPhonePlaceholder: 'যেমন: 017XXXXXXXX',
    studentInstLabel: 'স্কুল / কলেজ / প্রতিষ্ঠান (ঐচ্ছিক)',
    studentInstPlaceholder: 'যেমন: নটর ডেম কলেজ, ঢাকা',
    loginButton: 'প্রবেশ করুন',
    adminLoginTitle: 'অ্যাডমিন লগইন',
    adminUsernameLabel: 'ইউজারনেম (admin)',
    adminPasswordLabel: 'পাসওয়ার্ড (admin123)',
    adminLoginBtn: 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ',
    adminDashboardTitle: 'নোটমেট অ্যাডমিন কন্ট্রোল প্যানেল',
    adminPendingTab: 'অপেক্ষমাণ নোটস রিভিউ',
    adminSubjectsTab: 'বিষয় ও অধ্যায় ব্যবস্থাপনা',
    adminLeaderboardTab: 'শিক্ষার্থী ও লিডারবোর্ড কন্ট্রোল',
    approve: 'অনুমোদন দিন (+৫০ পয়েন্ট)',
    reject: 'প্রত্যাখ্যান করুন',
    approved: 'অনুমোদিত',
    pending: 'অপেক্ষমাণ',
    rejected: 'প্রত্যাখ্যাত',
    awardPointsNote: 'অনুমোদন করলে শিক্ষার্থী স্বয়ংক্রিয়ভাবে ৫০ পয়েন্ট পাবেন।',
    editSubject: 'বিষয় সম্পাদনা',
    addSubject: 'নতুন বিষয় যোগ করুন',
    subjectNameBnLabel: 'বিষয়ের নাম (বাংলা)',
    subjectNameEnLabel: 'বিষয়ের নাম (English)',
    chaptersListLabel: 'অধ্যায়ের তালিকাসমূহ',
    addChapterPlaceholder: 'নতুন অধ্যায় যোগ করুন (যেমন: ৩য় অধ্যায় - বল)',
    addChapterBtn: 'যোগ করুন',
    saveChanges: 'সংরক্ষণ করুন',
    deleteSubject: 'বিষয় মুছে ফেলুন',
    leaderboardRank: 'র‍্যাংক',
    leaderboardStudent: 'শিক্ষার্থী',
    leaderboardInstitution: 'শিক্ষা প্রতিষ্ঠান',
    leaderboardApproved: 'অনুমোদিত নোটস',
    leaderboardPoints: 'মোট পয়েন্ট',
    leaderboardBadge: 'বিশেষ ব্যাজ',
    emptyNotes: 'কোনো নোট পাওয়া যায়নি',
    emptyNotesDesc: 'অন্য কোনো বিভাগ বা বিষয় অনুসন্ধান করে দেখুন অথবা প্রথম ব্যক্তি হিসেবে নোট আপলোড করুন!',
    resetFilters: 'ফিল্টার রিসেট করুন',
    downloadSuccess: 'নোট ডাউনলোড সম্পন্ন হয়েছে!',
    close: 'বন্ধ করুন',
    cancel: 'বাতিল',
    themeDark: 'ডার্ক মোড',
    themeLight: 'লাইট মোড',
    langName: 'বাংলা'
  },
  en: {
    brandName: 'NoteMate',
    brandTagline: 'Open Student Notes & Study Hub',
    navBrowse: 'Browse Notes',
    navSubmit: 'Submit Notes',
    navLeaderboard: 'Leaderboard',
    navAdmin: 'Admin Panel',
    loginAsStudent: 'Student Login',
    studentProfile: 'My Profile',
    logout: 'Logout',
    points: 'Points',
    approvedNotes: 'Approved Notes',
    heroHeadline: 'Share Notes, Earn Points — Free Study Resources For All',
    heroSubheadline: 'Handwritten academic notes, formula cheat sheets, and board solutions curated by students across Bangladesh. Download freely without sign up or submit notes to climb the leaderboard!',
    heroStatsNotes: 'Approved Notes',
    heroStatsDownloads: 'Free Downloads',
    heroStatsStudents: 'Active Contributors',
    heroStatsGroups: 'Academic Groups & Subjects',
    searchPlaceholder: 'Search by subject, chapter, or keyword...',
    allGroups: 'All Groups',
    groupCommon: 'Common Subjects',
    groupScience: 'Science',
    groupArts: 'Arts / Humanities',
    groupCommerce: 'Commerce / Business',
    filterBySubject: 'Select Subject',
    allSubjects: 'All Subjects',
    filterByChapter: 'Select Chapter',
    allChapters: 'All Chapters',
    sortBy: 'Sort By',
    sortNewest: 'Newest Uploads',
    sortPopular: 'Most Popular',
    sortDownloads: 'Most Downloaded',
    freeDownload: 'Free Download',
    previewNote: 'Quick Preview',
    downloaded: 'Downloads',
    likes: 'Likes',
    pages: 'Pages',
    uploadedBy: 'Uploaded by',
    submitNotesTitle: 'Submit Study Notes',
    submitNotesSub: 'Once reviewed and approved by Admin, you will receive +50 points and be ranked on the leaderboard!',
    noteTitleLabel: 'Note Title',
    noteTitlePlaceholder: 'e.g., Physics Motion & Velocity Board Solution Handbook',
    groupLabel: 'Group',
    selectGroup: 'Select a group',
    subjectLabel: 'Subject',
    selectSubject: 'Select a subject',
    chapterLabel: 'Chapter (Name or Number)',
    chapterPlaceholder: 'e.g., Chapter 2 - Motion',
    classLabel: 'Class / Level',
    descriptionLabel: 'Summary & Description',
    descriptionPlaceholder: 'Summarize key topics, core concepts, or formulas covered in this note...',
    keyFormulasLabel: 'Key Formulas or Highlights (Optional)',
    keyFormulasPlaceholder: 'e.g., v = u + at, s = ut + 1/2 at^2 (one per line)',
    uploadFileLabel: 'Upload Note Document (PDF / Image / Doc)',
    uploadFileHint: 'Max file size: 10MB. Clear handwritten scans or readable PDFs accepted.',
    submitForReview: 'Submit for Approval',
    submissionSuccess: 'Note Submitted Successfully!',
    submissionSuccessDesc: 'Your note is now in review. Once approved by the administrator, +50 points will be added to your profile.',
    studentLoginTitle: 'Student Login / Sign In',
    studentLoginSub: 'Submit notes and earn points by entering your Name and Phone number. No passwords required!',
    studentNameLabel: 'Your Full Name',
    studentNamePlaceholder: 'e.g., Tanvir Hasan',
    studentPhoneLabel: 'Phone Number',
    studentPhonePlaceholder: 'e.g., 017XXXXXXXX',
    studentInstLabel: 'School / College / Institution (Optional)',
    studentInstPlaceholder: 'e.g., Notre Dame College, Dhaka',
    loginButton: 'Sign In',
    adminLoginTitle: 'Admin Authentication',
    adminUsernameLabel: 'Username (admin)',
    adminPasswordLabel: 'Password (admin123)',
    adminLoginBtn: 'Access Admin Dashboard',
    adminDashboardTitle: 'NoteMate Administration Control',
    adminPendingTab: 'Pending Notes Review',
    adminSubjectsTab: 'Manage Subjects & Chapters',
    adminLeaderboardTab: 'Leaderboard & Student Management',
    approve: 'Approve (+50 Points)',
    reject: 'Reject Note',
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected',
    awardPointsNote: 'Approving awards +50 points directly to the submitter.',
    editSubject: 'Edit Subject',
    addSubject: 'Add New Subject',
    subjectNameBnLabel: 'Subject Name (Bangla)',
    subjectNameEnLabel: 'Subject Name (English)',
    chaptersListLabel: 'Chapters List',
    addChapterPlaceholder: 'Add a new chapter (e.g. Chapter 3 - Force)',
    addChapterBtn: 'Add',
    saveChanges: 'Save Changes',
    deleteSubject: 'Delete Subject',
    leaderboardRank: 'Rank',
    leaderboardStudent: 'Student',
    leaderboardInstitution: 'Institution',
    leaderboardApproved: 'Approved Notes',
    leaderboardPoints: 'Total Points',
    leaderboardBadge: 'Badge',
    emptyNotes: 'No notes found',
    emptyNotesDesc: 'Try adjusting your group/subject filters or be the first student to upload a note!',
    resetFilters: 'Reset Filters',
    downloadSuccess: 'Note downloaded successfully!',
    close: 'Close',
    cancel: 'Cancel',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    langName: 'English'
  }
};
